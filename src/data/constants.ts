export const CONSTANTS = {
  // Greek electricity grid (2024 average)
  GRID_FACTOR_G_PER_WH: 0.256,
  GRID_FACTOR_G_PER_KWH: 256,

  // Fuel energy densities (Wh per liter)
  PETROL_WH_PER_L: 9500,
  DIESEL_WH_PER_L: 10000,
  HEATING_OIL_WH_PER_L: 10000,
  NATURAL_GAS_WH_PER_M3: 10500,
  LPG_WH_PER_L: 7100,

  // Fuel CO₂ factors (g CO₂ per liter)
  PETROL_CO2_G_PER_L: 2310,
  DIESEL_CO2_G_PER_L: 2680,
  NATURAL_GAS_CO2_G_PER_M3: 2020,
  LPG_CO2_G_PER_L: 1510,

  // Annual benchmarks
  GREEK_ANNUAL_CO2E_KG: 7000,
  EU_ANNUAL_CO2E_KG: 8000,
  GLOBAL_ANNUAL_CO2E_KG: 4700,
  PARIS_BUDGET_KG: 2300,
  TREE_ABSORBS_KG_YEAR: 22,

  // Greek annual household electricity: ~3,500 kWh
  GREEK_HOUSEHOLD_KWH_YEAR: 3500,
};

export const CATEGORY_COLORS: Record<string, string> = {
  transport: '#3B82F6',
  home_energy: '#F59E0B',
  food: '#10B981',
  consumption: '#8B5CF6',
  digital: '#EC4899',
  waste: '#6B7280',
  benchmark: '#C75B39',
};
