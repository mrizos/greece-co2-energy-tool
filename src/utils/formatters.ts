export function formatEnergy(wh: number): string {
  if (wh === 0) return '0 Wh';
  if (Math.abs(wh) < 1000) return `${Math.round(wh)} Wh`;
  if (Math.abs(wh) < 1_000_000) return `${(wh / 1000).toFixed(1)} kWh`;
  return `${(wh / 1_000_000).toFixed(1)} MWh`;
}

export function formatEmissions(grams: number): string {
  if (grams === 0) return '0 g CO₂e';
  if (Math.abs(grams) < 1000) return `${Math.round(grams)} g CO₂e`;
  if (Math.abs(grams) < 1_000_000) return `${(grams / 1000).toFixed(1)} kg CO₂e`;
  return `${(grams / 1_000_000).toFixed(2)} t CO₂e`;
}

export function formatNumber(n: number): string {
  if (n < 0.01) return '< 0.01';
  if (n < 1) return n.toFixed(2);
  if (n < 10) return n.toFixed(1);
  if (n < 1000) return Math.round(n).toLocaleString();
  return n.toLocaleString('en', { maximumFractionDigits: 0 });
}

export function formatEnergyRaw(wh: number): number {
  if (wh < 1000) return wh;
  if (wh < 1_000_000) return wh / 1000;
  return wh / 1_000_000;
}

export function getEnergyUnit(wh: number): string {
  if (wh < 1000) return 'Wh';
  if (wh < 1_000_000) return 'kWh';
  return 'MWh';
}

export function formatEmissionsRaw(grams: number): number {
  if (grams < 1000) return grams;
  if (grams < 1_000_000) return grams / 1000;
  return grams / 1_000_000;
}

export function getEmissionsUnit(grams: number): string {
  if (grams < 1000) return 'g CO₂e';
  if (grams < 1_000_000) return 'kg CO₂e';
  return 't CO₂e';
}
