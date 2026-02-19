import type { Activity } from '../data/activities';

export interface ComputedActivity {
  activityId: string;
  activity: Activity;
  quantity: number;
  totalEnergyWh: number;
  totalCo2eGrams: number;
  carbonIntensity: number; // g CO₂ per kWh
}

export function computeActivity(
  activity: Activity,
  quantity: number
): ComputedActivity {
  const totalEnergyWh = quantity * activity.energyWhPerUnit;
  const totalCo2eGrams = quantity * activity.co2eGramsPerUnit;
  const carbonIntensity =
    totalEnergyWh > 0 ? (totalCo2eGrams / totalEnergyWh) * 1000 : 0;

  return {
    activityId: activity.id,
    activity,
    quantity,
    totalEnergyWh,
    totalCo2eGrams,
    carbonIntensity,
  };
}

export function computeTotals(items: ComputedActivity[]) {
  const totalEnergyWh = items.reduce((sum, i) => sum + i.totalEnergyWh, 0);
  const totalCo2eGrams = items.reduce((sum, i) => sum + i.totalCo2eGrams, 0);
  return { totalEnergyWh, totalCo2eGrams };
}
