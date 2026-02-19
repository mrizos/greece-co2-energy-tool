/**
 * FOOTPRINT CALCULATOR — CALCULATION ENGINE
 * ==========================================
 * Takes the user's answers and computes:
 *   1. Annual CO₂e (kg) and Energy (kWh) per category
 *   2. Total annual footprint
 *   3. Projections (what-if scenarios)
 *   4. Personalised recommendations ranked by impact
 *
 * TO EDIT emission factors: change the numbers in the FACTORS object below.
 * Each factor has a source comment for traceability.
 */

import { CONSTANTS } from './constants';

// ─── Types ────────────────────────────────────────────────────
export type Answers = Record<string, string | number>;

export interface CategoryResult {
  id: string;
  label: { el: string; en: string };
  icon: string;
  co2eKg: number;   // annual kg CO₂e
  energyKwh: number; // annual kWh
}

export interface FootprintResult {
  categories: CategoryResult[];
  totalCo2eKg: number;
  totalEnergyKwh: number;
  perCapitaComparison: {
    greece: number;
    eu: number;
    global: number;
    parisBudget: number;
  };
  treesNeeded: number;
}

export interface Scenario {
  id: string;
  label: { el: string; en: string };
  description: { el: string; en: string };
  co2eSavedKg: number;
  energySavedKwh: number;
  applicable: boolean;
}

export interface Recommendation {
  id: string;
  icon: string;
  title: { el: string; en: string };
  description: { el: string; en: string };
  savingKg: number;
  category: string;
}

// ─── Emission & Energy Factors ────────────────────────────────
// Sources: IPCC AR6, EEA, DEFRA 2023, IEA, Poore & Nemecek 2018
const FACTORS = {
  // ── Transport ──
  // Car g CO₂/km (tank-to-wheel + well-to-wheel upstream ~15%)
  car: {
    petrol_small: { co2GPerKm: 140, whPerKm: 570 },    // ~6L/100km × 2310gCO₂/L / 100
    petrol_medium: { co2GPerKm: 180, whPerKm: 710 },   // ~7.5L/100km
    petrol_large: { co2GPerKm: 240, whPerKm: 950 },    // ~10L/100km
    diesel_small: { co2GPerKm: 120, whPerKm: 450 },    // ~4.5L/100km
    diesel_medium: { co2GPerKm: 155, whPerKm: 580 },   // ~5.8L/100km
    diesel_large: { co2GPerKm: 200, whPerKm: 750 },    // ~7.5L/100km
    hybrid: { co2GPerKm: 95, whPerKm: 400 },           // ~4.2L/100km
    plugin_hybrid: { co2GPerKm: 60, whPerKm: 280 },    // 50% electric assumption
    ev: { co2GPerKm: 40, whPerKm: 160 },               // 16kWh/100km × 256g/kWh grid
    lpg: { co2GPerKm: 130, whPerKm: 640 },             // ~9L/100km LPG
  } as Record<string, { co2GPerKm: number; whPerKm: number }>,

  // Flights — kg CO₂ per one-way passenger (with RFI ~1.9 for non-CO₂ effects)
  flights: {
    domestic: { co2Kg: 65, energyKwh: 210 },           // ATH-SKG ~400km
    short_europe: { co2Kg: 170, energyKwh: 550 },      // ~1500km avg
    long_europe: { co2Kg: 350, energyKwh: 1130 },      // ~3000km avg
    intercontinental: { co2Kg: 1200, energyKwh: 3870 }, // ~8000km avg
  },

  // Ferry — g CO₂ per passenger-km
  ferry: {
    conventional: { co2GPerPaxKm: 25, whPerPaxKm: 90 },
    highspeed: { co2GPerPaxKm: 55, whPerPaxKm: 190 },
    mixed: { co2GPerPaxKm: 38, whPerPaxKm: 130 },
  } as Record<string, { co2GPerPaxKm: number; whPerPaxKm: number }>,

  // Public transport
  publicTransit: { co2GPerKm: 50, whPerKm: 180 },    // Athens metro/bus avg
  motorcycle: { co2GPerKm: 80, whPerKm: 320 },

  // ── Home ──
  // Heating: annual kWh demand per m² (Greece climate, mild)
  heatingDemandKwhPerM2PerMonth: {
    none: 0,
    partial: 12,   // older building
    good: 7,       // post-2010
    excellent: 4,   // renovated / A+ energy class
  } as Record<string, number>,

  homeSizeM2: {
    studio: 35,
    small: 55,
    medium: 85,
    large: 125,
    xlarge: 175,
  } as Record<string, number>,

  // Heating system efficiency & CO₂
  heatingSystem: {
    oil: { efficiency: 0.85, co2GPerKwhThermal: 320, energyFactorKwhPerKwhThermal: 1.18 },
    gas: { efficiency: 0.92, co2GPerKwhThermal: 227, energyFactorKwhPerKwhThermal: 1.09 },
    heat_pump: { efficiency: 3.5, co2GPerKwhThermal: 73, energyFactorKwhPerKwhThermal: 0.29 },
    ac_heating: { efficiency: 3.0, co2GPerKwhThermal: 85, energyFactorKwhPerKwhThermal: 0.33 },
    wood: { efficiency: 0.75, co2GPerKwhThermal: 40, energyFactorKwhPerKwhThermal: 1.33 },
    electric_heater: { efficiency: 1.0, co2GPerKwhThermal: 256, energyFactorKwhPerKwhThermal: 1.0 },
    none: { efficiency: 1, co2GPerKwhThermal: 0, energyFactorKwhPerKwhThermal: 0 },
  } as Record<string, { efficiency: number; co2GPerKwhThermal: number; energyFactorKwhPerKwhThermal: number }>,

  // AC cooling: kW typical unit, COP ~3.5
  acTypicalKw: 2.5,
  acCOP: 3.5,

  // Water heating annual kWh per person
  waterHeater: {
    solar: { kwhPerYear: 200, co2KgPerYear: 15 },      // backup electric only
    electric: { kwhPerYear: 1200, co2KgPerYear: 307 },
    gas: { kwhPerYear: 1050, co2KgPerYear: 210 },
    heat_pump_water: { kwhPerYear: 400, co2KgPerYear: 102 },
  } as Record<string, { kwhPerYear: number; co2KgPerYear: number }>,

  // ── Diet ──
  // Annual CO₂e (kg) by diet type — Poore & Nemecek 2018, adjusted for Greece
  dietAnnual: {
    heavy_meat: { co2Kg: 3200, energyKwh: 4500 },
    medium_meat: { co2Kg: 2300, energyKwh: 3300 },
    low_meat: { co2Kg: 1700, energyKwh: 2500 },
    pescatarian: { co2Kg: 1400, energyKwh: 2100 },
    vegetarian: { co2Kg: 1100, energyKwh: 1700 },
    vegan: { co2Kg: 800, energyKwh: 1300 },
  } as Record<string, { co2Kg: number; energyKwh: number }>,

  // Beef/lamb frequency modifier (additional CO₂ kg/year on top of diet base)
  beefModifier: {
    daily: 800,
    '3_week': 400,
    '1_week': 0,   // already accounted in base
    '2_month': -200,
    rarely: -400,
  } as Record<string, number>,

  // Dairy modifier kg CO₂/year
  dairyModifier: {
    heavy: 300,
    moderate: 0,
    light: -150,
    none: -350,
  } as Record<string, number>,

  // Coffee: ~0.3 kg CO₂e per cup (production + transport + energy)
  coffeeCo2KgPerCup: 0.3,

  // Food waste multiplier
  foodWasteMultiplier: {
    a_lot: 1.25,
    some: 1.10,
    little: 1.03,
    almost_none: 1.0,
  } as Record<string, number>,

  // Bottled water: kg CO₂/year
  bottledWater: {
    always: 45,
    sometimes: 20,
    rarely: 5,
  } as Record<string, number>,

  // ── Consumption ──
  shoppingAnnualCo2: {
    high: 1500,
    medium: 800,
    low: 350,
    minimal: 150,
  } as Record<string, number>,

  electronicsPerDevice: { co2Kg: 200, energyKwh: 300 }, // avg smartphone + laptop lifecycle
  clothingPerItem: { co2Kg: 15, energyKwh: 20 },        // DEFRA
  onlineOrderCo2Kg: 3, // packaging + last-mile delivery

  // ── Waste ──
  baseWasteCo2Kg: 300, // Greek average annual waste emissions per capita
  recyclingReduction: {
    always: 0.4,
    sometimes: 0.7,
    rarely: 0.9,
    never: 1.0,
  } as Record<string, number>,
  compostReduction: 50, // kg CO₂ saved/year
};

// ─── Helper: safe number ──────────────────────────────────────
function num(v: string | number | undefined, fallback: number): number {
  if (v === undefined || v === '') return fallback;
  const n = Number(v);
  return isNaN(n) ? fallback : n;
}

function str(v: string | number | undefined, fallback: string): string {
  if (v === undefined || v === '') return fallback;
  return String(v);
}

// ─── Main Calculation ─────────────────────────────────────────
export function calculateFootprint(answers: Answers): FootprintResult {
  const transport = calcTransport(answers);
  const home = calcHome(answers);
  const diet = calcDiet(answers);
  const consumption = calcConsumption(answers);
  const waste = calcWaste(answers);

  const categories: CategoryResult[] = [
    { id: 'transport', label: { el: 'Μεταφορές', en: 'Transport' }, icon: '🚗', ...transport },
    { id: 'home', label: { el: 'Σπίτι & Ενέργεια', en: 'Home & Energy' }, icon: '🏠', ...home },
    { id: 'diet', label: { el: 'Διατροφή', en: 'Diet' }, icon: '🍽️', ...diet },
    { id: 'consumption', label: { el: 'Κατανάλωση', en: 'Consumption' }, icon: '🛍️', ...consumption },
    { id: 'waste', label: { el: 'Απόβλητα', en: 'Waste' }, icon: '♻️', ...waste },
  ];

  const totalCo2eKg = categories.reduce((s, c) => s + c.co2eKg, 0);
  const totalEnergyKwh = categories.reduce((s, c) => s + c.energyKwh, 0);

  return {
    categories,
    totalCo2eKg,
    totalEnergyKwh,
    perCapitaComparison: {
      greece: CONSTANTS.GREEK_ANNUAL_CO2E_KG,
      eu: CONSTANTS.EU_ANNUAL_CO2E_KG,
      global: CONSTANTS.GLOBAL_ANNUAL_CO2E_KG,
      parisBudget: CONSTANTS.PARIS_BUDGET_KG,
    },
    treesNeeded: Math.ceil(totalCo2eKg / CONSTANTS.TREE_ABSORBS_KG_YEAR),
  };
}

// ─── Transport Calculation ────────────────────────────────────
function calcTransport(a: Answers): { co2eKg: number; energyKwh: number } {
  let co2 = 0;
  let energy = 0;

  // Car
  const carType = str(a.car_type, 'none');
  const carKm = num(a.car_km_year, 12000);
  if (carType !== 'none' && FACTORS.car[carType]) {
    const f = FACTORS.car[carType];
    co2 += (f.co2GPerKm * carKm) / 1000;
    energy += (f.whPerKm * carKm) / 1000;
  }

  // Flights
  const dFlights = num(a.flights_domestic, 2);
  const seFlights = num(a.flights_short_europe, 1);
  const leFlights = num(a.flights_long_europe, 1);
  const icFlights = num(a.flights_intercontinental, 0);

  // Each "flight" count = round trip = 2 one-way
  co2 += dFlights * 2 * FACTORS.flights.domestic.co2Kg;
  co2 += seFlights * 2 * FACTORS.flights.short_europe.co2Kg;
  co2 += leFlights * 2 * FACTORS.flights.long_europe.co2Kg;
  co2 += icFlights * 2 * FACTORS.flights.intercontinental.co2Kg;

  energy += dFlights * 2 * FACTORS.flights.domestic.energyKwh;
  energy += seFlights * 2 * FACTORS.flights.short_europe.energyKwh;
  energy += leFlights * 2 * FACTORS.flights.long_europe.energyKwh;
  energy += icFlights * 2 * FACTORS.flights.intercontinental.energyKwh;

  // Ferry
  const ferryTrips = num(a.ferry_trips, 2);
  const ferryType = str(a.ferry_type, 'conventional');
  const ferryDist = num(a.ferry_avg_distance_km, 150);
  const ff = FACTORS.ferry[ferryType] || FACTORS.ferry.conventional;
  co2 += (ferryTrips * ferryDist * ff.co2GPerPaxKm) / 1000;
  energy += (ferryTrips * ferryDist * ff.whPerPaxKm) / 1000;

  return { co2eKg: Math.round(co2), energyKwh: Math.round(energy) };
}

// ─── Home Calculation ─────────────────────────────────────────
function calcHome(a: Answers): { co2eKg: number; energyKwh: number } {
  let co2 = 0;
  let energy = 0;

  // Heating
  const heatingType = str(a.heating_type, 'oil');
  const heatingMonths = num(a.heating_months, 4);
  const insulation = str(a.insulation, 'partial');
  const homeSize = str(a.home_size, 'medium');
  const members = Math.max(1, num(a.household_members, 3));

  const m2 = FACTORS.homeSizeM2[homeSize] || 85;
  const demandPerM2 = FACTORS.heatingDemandKwhPerM2PerMonth[insulation] || 12;
  const heatingSys = FACTORS.heatingSystem[heatingType] || FACTORS.heatingSystem.oil;

  // Annual thermal demand (kWh)
  const annualThermalDemand = m2 * demandPerM2 * heatingMonths;
  // Per-person share
  const perPersonThermal = annualThermalDemand / members;

  co2 += (perPersonThermal * heatingSys.co2GPerKwhThermal) / 1000;
  energy += perPersonThermal * heatingSys.energyFactorKwhPerKwhThermal;

  // AC cooling
  const acMonths = num(a.ac_months, 3);
  const acHours = num(a.ac_hours_day, 6);
  const acAnnualKwh = (FACTORS.acTypicalKw / FACTORS.acCOP) * acHours * acMonths * 30 / members;
  co2 += (acAnnualKwh * CONSTANTS.GRID_FACTOR_G_PER_KWH) / 1000;
  energy += acAnnualKwh;

  // Water heater
  const waterType = str(a.water_heater, 'solar');
  const wh = FACTORS.waterHeater[waterType] || FACTORS.waterHeater.solar;
  co2 += wh.co2KgPerYear;
  energy += wh.kwhPerYear;

  // Remaining electricity (lighting, appliances, etc.)
  const elecKwhMonth = num(a.electricity_kwh_month, 290);
  const annualElec = elecKwhMonth * 12 / members;
  co2 += (annualElec * CONSTANTS.GRID_FACTOR_G_PER_KWH) / 1000;
  energy += annualElec;

  return { co2eKg: Math.round(co2), energyKwh: Math.round(energy) };
}

// ─── Diet Calculation ─────────────────────────────────────────
function calcDiet(a: Answers): { co2eKg: number; energyKwh: number } {
  const dietType = str(a.diet_type, 'medium_meat');
  const base = FACTORS.dietAnnual[dietType] || FACTORS.dietAnnual.medium_meat;

  let co2 = base.co2Kg;
  let energy = base.energyKwh;

  // Beef/lamb modifier
  const beefFreq = str(a.beef_frequency, '1_week');
  co2 += FACTORS.beefModifier[beefFreq] || 0;

  // Dairy modifier
  const dairy = str(a.dairy_frequency, 'moderate');
  co2 += FACTORS.dairyModifier[dairy] || 0;

  // Coffee
  const coffeeCups = num(a.coffee_cups_day, 2);
  co2 += coffeeCups * 365 * FACTORS.coffeeCo2KgPerCup;

  // Bottled water
  const bottled = str(a.bottled_water, 'sometimes');
  co2 += FACTORS.bottledWater[bottled] || 20;

  // Food waste multiplier
  const waste = str(a.food_waste, 'some');
  const multiplier = FACTORS.foodWasteMultiplier[waste] || 1.1;
  co2 *= multiplier;
  energy *= multiplier;

  return { co2eKg: Math.round(co2), energyKwh: Math.round(energy) };
}

// ─── Consumption Calculation ──────────────────────────────────
function calcConsumption(a: Answers): { co2eKg: number; energyKwh: number } {
  let co2 = 0;
  let energy = 0;

  // Shopping habits
  const shopping = str(a.shopping_habits, 'medium');
  co2 += FACTORS.shoppingAnnualCo2[shopping] || 800;
  energy += (FACTORS.shoppingAnnualCo2[shopping] || 800) * 1.2; // rough energy estimate

  // Electronics
  const electronics = num(a.new_electronics_year, 1);
  co2 += electronics * FACTORS.electronicsPerDevice.co2Kg;
  energy += electronics * FACTORS.electronicsPerDevice.energyKwh;

  // Clothing
  const clothing = num(a.clothing_items_year, 20);
  co2 += clothing * FACTORS.clothingPerItem.co2Kg;
  energy += clothing * FACTORS.clothingPerItem.energyKwh;

  // Online orders
  const orders = num(a.online_orders_month, 3);
  co2 += orders * 12 * FACTORS.onlineOrderCo2Kg;
  energy += orders * 12 * 4; // ~4 kWh per delivery lifecycle

  return { co2eKg: Math.round(co2), energyKwh: Math.round(energy) };
}

// ─── Waste Calculation ────────────────────────────────────────
function calcWaste(a: Answers): { co2eKg: number; energyKwh: number } {
  const recycling = str(a.recycling, 'sometimes');
  const composting = str(a.composting, 'no');

  let co2 = FACTORS.baseWasteCo2Kg * (FACTORS.recyclingReduction[recycling] || 0.7);
  if (composting === 'yes') {
    co2 -= FACTORS.compostReduction;
  }
  co2 = Math.max(0, co2);

  // Waste energy is mostly embedded — rough estimate
  const energy = co2 * 0.8;

  return { co2eKg: Math.round(co2), energyKwh: Math.round(energy) };
}

// ─── Scenarios / Projections ──────────────────────────────────
export function calculateScenarios(answers: Answers, _baseline: FootprintResult): Scenario[] {
  const scenarios: Scenario[] = [];

  // 1. Switch to EV
  const carType = str(answers.car_type, 'none');
  if (carType !== 'none' && carType !== 'ev') {
    const carKm = num(answers.car_km_year, 12000);
    const current = FACTORS.car[carType] || FACTORS.car.petrol_small;
    const ev = FACTORS.car.ev;
    const co2Saved = ((current.co2GPerKm - ev.co2GPerKm) * carKm) / 1000;
    const energySaved = ((current.whPerKm - ev.whPerKm) * carKm) / 1000;
    scenarios.push({
      id: 'switch_ev',
      label: { el: 'Αλλαγή σε ηλεκτρικό αυτοκίνητο', en: 'Switch to electric car' },
      description: {
        el: `Εξοικονόμηση ~${Math.round(co2Saved)} kg CO₂/χρόνο αν αντικαταστήσεις το αυτοκίνητό σου με EV`,
        en: `Save ~${Math.round(co2Saved)} kg CO₂/year by replacing your car with an EV`,
      },
      co2eSavedKg: Math.round(co2Saved),
      energySavedKwh: Math.round(energySaved),
      applicable: true,
    });
  }

  // 2. Insulation upgrade
  const insulation = str(answers.insulation, 'partial');
  if (insulation === 'none' || insulation === 'partial') {
    const homeSize = str(answers.home_size, 'medium');
    const heatingMonths = num(answers.heating_months, 4);
    const heatingType = str(answers.heating_type, 'oil');
    const members = Math.max(1, num(answers.household_members, 3));
    const m2 = FACTORS.homeSizeM2[homeSize] || 85;
    const currentDemand = FACTORS.heatingDemandKwhPerM2PerMonth[insulation] || 12;
    const upgradedDemand = FACTORS.heatingDemandKwhPerM2PerMonth.good;
    const heatingSys = FACTORS.heatingSystem[heatingType] || FACTORS.heatingSystem.oil;

    const savedThermal = (currentDemand - upgradedDemand) * m2 * heatingMonths / members;
    const co2Saved = (savedThermal * heatingSys.co2GPerKwhThermal) / 1000;
    const energySaved = savedThermal * heatingSys.energyFactorKwhPerKwhThermal;

    scenarios.push({
      id: 'insulation',
      label: { el: 'Θερμομόνωση σπιτιού', en: 'Home insulation upgrade' },
      description: {
        el: `Αναβάθμιση μόνωσης → εξοικονόμηση ~${Math.round(co2Saved)} kg CO₂/χρόνο`,
        en: `Insulation upgrade → save ~${Math.round(co2Saved)} kg CO₂/year`,
      },
      co2eSavedKg: Math.round(co2Saved),
      energySavedKwh: Math.round(energySaved),
      applicable: true,
    });
  }

  // 3. Switch heating to heat pump
  const heatingType = str(answers.heating_type, 'oil');
  if (heatingType === 'oil' || heatingType === 'gas' || heatingType === 'electric_heater') {
    const homeSize = str(answers.home_size, 'medium');
    const heatingMonths = num(answers.heating_months, 4);
    const insul = str(answers.insulation, 'partial');
    const members = Math.max(1, num(answers.household_members, 3));
    const m2 = FACTORS.homeSizeM2[homeSize] || 85;
    const demand = FACTORS.heatingDemandKwhPerM2PerMonth[insul] || 12;
    const annualDemand = m2 * demand * heatingMonths / members;

    const currentSys = FACTORS.heatingSystem[heatingType];
    const hpSys = FACTORS.heatingSystem.heat_pump;
    const co2Saved = (annualDemand * (currentSys.co2GPerKwhThermal - hpSys.co2GPerKwhThermal)) / 1000;
    const energySaved = annualDemand * (currentSys.energyFactorKwhPerKwhThermal - hpSys.energyFactorKwhPerKwhThermal);

    scenarios.push({
      id: 'heat_pump',
      label: { el: 'Αντλία θερμότητας', en: 'Switch to heat pump' },
      description: {
        el: `Αντικατάσταση ${heatingType === 'oil' ? 'πετρελαίου' : heatingType === 'gas' ? 'αερίου' : 'ηλεκτρικού σώματος'} → εξοικονόμηση ~${Math.round(co2Saved)} kg CO₂/χρόνο`,
        en: `Replace ${heatingType === 'oil' ? 'oil' : heatingType === 'gas' ? 'gas' : 'electric heater'} → save ~${Math.round(co2Saved)} kg CO₂/year`,
      },
      co2eSavedKg: Math.round(co2Saved),
      energySavedKwh: Math.round(energySaved),
      applicable: true,
    });
  }

  // 4. Reduce flights — smart: suggest halving only if >=4 total, else eliminate 1 flight
  const dFlightsN = num(answers.flights_domestic, 2);
  const seFlightsN = num(answers.flights_short_europe, 1);
  const leFlightsN = num(answers.flights_long_europe, 1);
  const icFlightsN = num(answers.flights_intercontinental, 0);
  const totalFlightsCount = dFlightsN + seFlightsN + leFlightsN + icFlightsN;
  const totalFlightsCo2 =
    dFlightsN * 2 * FACTORS.flights.domestic.co2Kg +
    seFlightsN * 2 * FACTORS.flights.short_europe.co2Kg +
    leFlightsN * 2 * FACTORS.flights.long_europe.co2Kg +
    icFlightsN * 2 * FACTORS.flights.intercontinental.co2Kg;

  if (totalFlightsCo2 > 100) {
    if (totalFlightsCount >= 4) {
      // Enough flights to meaningfully halve
      const halfSaved = totalFlightsCo2 * 0.5;
      scenarios.push({
        id: 'reduce_flights',
        label: { el: 'Μείωση πτήσεων κατά 50%', en: 'Reduce flights by 50%' },
        description: {
          el: `Μισές πτήσεις = εξοικονόμηση ~${Math.round(halfSaved)} kg CO₂/χρόνο`,
          en: `Half flights = save ~${Math.round(halfSaved)} kg CO₂/year`,
        },
        co2eSavedKg: Math.round(halfSaved),
        energySavedKwh: Math.round(halfSaved * 3.2),
        applicable: true,
      });
    } else {
      // 1-3 flights: suggest reducing by 1 flight (eliminate the highest-emitting one)
      // Find the highest-emitting single flight type
      const flightTypes = [
        { count: icFlightsN, co2Per: FACTORS.flights.intercontinental.co2Kg * 2, label: { el: 'διηπειρωτική', en: 'intercontinental' } },
        { count: leFlightsN, co2Per: FACTORS.flights.long_europe.co2Kg * 2, label: { el: 'ευρωπαϊκή (μακρινή)', en: 'long European' } },
        { count: seFlightsN, co2Per: FACTORS.flights.short_europe.co2Kg * 2, label: { el: 'ευρωπαϊκή (κοντινή)', en: 'short European' } },
        { count: dFlightsN, co2Per: FACTORS.flights.domestic.co2Kg * 2, label: { el: 'εσωτερική', en: 'domestic' } },
      ].filter(f => f.count > 0);

      if (flightTypes.length > 0) {
        // Suggest eliminating one of the highest-impact type
        const highest = flightTypes[0]; // already sorted by co2Per descending
        scenarios.push({
          id: 'reduce_flights',
          label: {
            el: `Μείωση κατά 1 ${highest.label.el} πτήση`,
            en: `Eliminate 1 ${highest.label.en} flight`,
          },
          description: {
            el: `1 λιγότερη ${highest.label.el} πτήση = εξοικονόμηση ~${Math.round(highest.co2Per)} kg CO₂/χρόνο`,
            en: `1 fewer ${highest.label.en} flight = save ~${Math.round(highest.co2Per)} kg CO₂/year`,
          },
          co2eSavedKg: Math.round(highest.co2Per),
          energySavedKwh: Math.round(highest.co2Per * 3.2),
          applicable: true,
        });
      }
    }
  }

  // 5. Diet shift
  const dietType = str(answers.diet_type, 'medium_meat');
  if (dietType === 'heavy_meat' || dietType === 'medium_meat') {
    const current = FACTORS.dietAnnual[dietType];
    const target = FACTORS.dietAnnual.low_meat;
    const co2Saved = current.co2Kg - target.co2Kg;
    scenarios.push({
      id: 'reduce_meat',
      label: { el: 'Μείωση κρέατος (1-2x/εβδ.)', en: 'Reduce meat (1-2x/week)' },
      description: {
        el: `Λιγότερο κρέας → εξοικονόμηση ~${co2Saved} kg CO₂/χρόνο`,
        en: `Less meat → save ~${co2Saved} kg CO₂/year`,
      },
      co2eSavedKg: co2Saved,
      energySavedKwh: Math.round(co2Saved * 1.4),
      applicable: true,
    });
  }

  // 6. Solar water heater
  const waterType = str(answers.water_heater, 'solar');
  if (waterType === 'electric' || waterType === 'gas') {
    const current = FACTORS.waterHeater[waterType];
    const solar = FACTORS.waterHeater.solar;
    const co2Saved = current.co2KgPerYear - solar.co2KgPerYear;
    scenarios.push({
      id: 'solar_water',
      label: { el: 'Ηλιακός θερμοσίφωνας', en: 'Solar water heater' },
      description: {
        el: `Εγκατάσταση ηλιακού → εξοικονόμηση ~${co2Saved} kg CO₂/χρόνο`,
        en: `Install solar heater → save ~${co2Saved} kg CO₂/year`,
      },
      co2eSavedKg: co2Saved,
      energySavedKwh: current.kwhPerYear - solar.kwhPerYear,
      applicable: true,
    });
  }

  // Sort by impact (highest savings first)
  scenarios.sort((a, b) => b.co2eSavedKg - a.co2eSavedKg);

  return scenarios;
}

// ─── Recommendations ──────────────────────────────────────────
export function getRecommendations(answers: Answers, result: FootprintResult): Recommendation[] {
  const recs: Recommendation[] = [];
  const scenarios = calculateScenarios(answers, result);

  for (const s of scenarios) {
    recs.push({
      id: s.id,
      icon: s.id === 'switch_ev' ? '🚗' : s.id === 'insulation' ? '🏠' : s.id === 'heat_pump' ? '🔥' : s.id === 'reduce_flights' ? '✈️' : s.id === 'reduce_meat' ? '🥗' : '☀️',
      title: s.label,
      description: s.description,
      savingKg: s.co2eSavedKg,
      category: s.id.includes('ev') || s.id.includes('flight') ? 'transport' : s.id.includes('meat') ? 'diet' : 'home',
    });
  }

  // Always add a recycling tip if not always recycling
  const recycling = str(answers.recycling, 'sometimes');
  if (recycling !== 'always') {
    recs.push({
      id: 'recycle_more',
      icon: '♻️',
      title: { el: 'Ανακύκλωση πάντα', en: 'Always recycle' },
      description: {
        el: 'Χαρτί, πλαστικό, γυαλί, μέταλλο → μικρή αλλά σημαντική μείωση',
        en: 'Paper, plastic, glass, metal → small but meaningful reduction',
      },
      savingKg: Math.round(FACTORS.baseWasteCo2Kg * (1 - FACTORS.recyclingReduction.always)),
      category: 'waste',
    });
  }

  return recs;
}
