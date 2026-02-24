export interface Benchmark {
  id: string;
  name: { el: string; en: string };
  energyKwh: number | null;
  co2eKg: number;
}

export const benchmarks: Benchmark[] = [
  {
    id: 'greek_annual',
    name: { el: 'Μέσος Έλληνας/χρόνο', en: 'Avg Greek person/year' },
    energyKwh: 19200,
    co2eKg: 6100,
  },
  {
    id: 'eu_annual',
    name: { el: 'Μέσος ΕΕ/χρόνο', en: 'EU average/year' },
    energyKwh: 27000,
    co2eKg: 8000,
  },
  {
    id: 'global_annual',
    name: { el: 'Παγκόσμιος μέσος/χρόνο', en: 'Global average/year' },
    energyKwh: 15000,
    co2eKg: 4700,
  },
  {
    id: 'paris_budget',
    name: { el: 'Στόχος Παρισιού/χρόνο', en: 'Paris-compatible budget/year' },
    energyKwh: 8000,
    co2eKg: 2300,
  },
  {
    id: 'greek_household_elec',
    name: { el: 'Ελληνικό νοικοκυριό ηλεκτρικό/χρόνο', en: 'Greek household electricity/year' },
    energyKwh: 3500,
    co2eKg: 896,
  },
  {
    id: 'greek_daily',
    name: { el: 'Ελληνικός ημερήσιος μ.ο.', en: 'Greek daily avg per person' },
    energyKwh: 53,
    co2eKg: 16.7,
  },
];

export const gridHistoryData = [
  { year: 2015, factor: 620 },
  { year: 2016, factor: 590 },
  { year: 2017, factor: 560 },
  { year: 2018, factor: 520 },
  { year: 2019, factor: 470 },
  { year: 2020, factor: 410 },
  { year: 2021, factor: 380 },
  { year: 2022, factor: 340 },
  { year: 2023, factor: 290 },
  { year: 2024, factor: 256 },
];

export const countryGridFactors = [
  { country: { el: 'Γαλλία', en: 'France' }, factor: 55 },
  { country: { el: 'Ελλάδα', en: 'Greece' }, factor: 256 },
  { country: { el: 'ΕΕ μέσος', en: 'EU avg' }, factor: 225 },
  { country: { el: 'Γερμανία', en: 'Germany' }, factor: 350 },
  { country: { el: 'Πολωνία', en: 'Poland' }, factor: 700 },
];
