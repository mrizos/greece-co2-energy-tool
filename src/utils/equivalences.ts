import { CONSTANTS } from '../data/constants';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { formatNumber } from './formatters';

export function getEnergyEquivalences(totalWh: number, lang: Language): string[] {
  if (totalWh === 0) return [];

  const results: string[] = [];
  const totalKwh = totalWh / 1000;

  // Fridge days (1000 Wh/day)
  const fridgeDays = totalWh / 1000;
  if (fridgeDays >= 0.1) {
    results.push(translations.fridgeDays[lang](formatNumber(fridgeDays)));
  }

  // Phone charges (12 Wh each)
  const phoneCharges = totalWh / 12;
  if (phoneCharges >= 1) {
    results.push(translations.phoneCharges[lang](formatNumber(phoneCharges)));
  }

  // % of household electricity (3500 kWh/year)
  const householdPct = (totalKwh / CONSTANTS.GREEK_HOUSEHOLD_KWH_YEAR) * 100;
  if (householdPct >= 0.01) {
    results.push(translations.householdPercent[lang](formatNumber(householdPct)));
  }

  return results;
}

export function getEmissionsEquivalences(totalGrams: number, lang: Language): string[] {
  if (totalGrams === 0) return [];

  const results: string[] = [];
  const totalKg = totalGrams / 1000;

  // km of petrol driving (170 g/km)
  const drivingKm = totalGrams / 170;
  if (drivingKm >= 0.1) {
    results.push(translations.drivingKm[lang](formatNumber(drivingKm)));
  }

  // ATH-SKG flights (110 kg each)
  const flights = totalKg / 110;
  if (flights >= 0.001) {
    results.push(translations.flightsAthSkg[lang](formatNumber(flights)));
  }

  // % of annual footprint (7000 kg)
  const footprintPct = (totalKg / CONSTANTS.GREEK_ANNUAL_CO2E_KG) * 100;
  if (footprintPct >= 0.001) {
    results.push(translations.annualFootprint[lang](formatNumber(footprintPct)));
  }

  // Trees needed (22 kg/year each)
  const trees = totalKg / CONSTANTS.TREE_ABSORBS_KG_YEAR;
  if (trees >= 0.01) {
    results.push(translations.treesNeeded[lang](formatNumber(trees)));
  }

  return results;
}
