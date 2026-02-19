import type { Language } from '../data/translations';
import type { ComputedActivity } from '../utils/calculations';
import { CATEGORY_COLORS } from '../data/constants';
import { formatEmissions } from '../utils/formatters';

interface InsightPanelProps {
  computed: ComputedActivity[];
  lang: Language;
}

export default function InsightPanel({ computed, lang }: InsightPanelProps) {
  if (computed.length < 2) return null;

  // Sort by total CO₂ emissions — more meaningful than carbon intensity
  // (carbon intensity g/kWh is misleading across fuel types vs electric)
  const byCo2 = [...computed].sort((a, b) => a.totalCo2eGrams - b.totalCo2eGrams);
  const byEnergy = [...computed].sort((a, b) => a.totalEnergyWh - b.totalEnergyWh);

  const lowestCo2 = byCo2[0];
  const highestCo2 = byCo2[byCo2.length - 1];

  // Check if rankings differ between energy and emissions
  const rankingsDiffer =
    byEnergy.length > 1 &&
    byEnergy[0].activityId !== byCo2[0].activityId;

  return (
    <div className="bg-gradient-to-br from-navy/5 to-terracotta/5 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        💡 {lang === 'el' ? 'Συγκριτικά στοιχεία' : 'Comparison insights'}
      </h3>

      <div className="space-y-3">
        {/* CO₂ ranking bars */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {lang === 'el' ? 'Εκπομπές CO₂e (για την ίδια ποσότητα)' : 'CO₂e emissions (for same quantity)'}
          </p>
          <div className="space-y-2">
            {byCo2.slice(0, 5).map((c) => {
              const maxCo2 = highestCo2.totalCo2eGrams || 1;
              const pct = (c.totalCo2eGrams / maxCo2) * 100;
              const color = CATEGORY_COLORS[c.activity.category];
              return (
                <div key={c.activityId} className="flex items-center gap-2">
                  <span className="text-xs w-32 truncate text-gray-700 dark:text-gray-300">
                    {c.activity.icon} {c.activity.name[lang]}
                  </span>
                  <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: `${Math.max(3, pct)}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-16 text-right font-medium">
                    {formatEmissions(c.totalCo2eGrams)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cleanest vs dirtiest */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>
            🌿{' '}
            {lang === 'el'
              ? `Λιγότερες εκπομπές: ${lowestCo2.activity.name.el} (${formatEmissions(lowestCo2.totalCo2eGrams)})`
              : `Lowest emissions: ${lowestCo2.activity.name.en} (${formatEmissions(lowestCo2.totalCo2eGrams)})`}
          </p>
          <p>
            🏭{' '}
            {lang === 'el'
              ? `Περισσότερες εκπομπές: ${highestCo2.activity.name.el} (${formatEmissions(highestCo2.totalCo2eGrams)})`
              : `Highest emissions: ${highestCo2.activity.name.en} (${formatEmissions(highestCo2.totalCo2eGrams)})`}
          </p>
        </div>

        {/* Ranking divergence insight */}
        {rankingsDiffer && (
          <div className="text-sm bg-white dark:bg-slate-900 rounded-lg p-3 border border-gray-100 dark:border-slate-700">
            <p className="text-terracotta dark:text-orange-400 font-medium">
              {lang === 'el'
                ? '📊 Η κατάταξη αλλάζει μεταξύ ενέργειας και εκπομπών!'
                : '📊 Rankings differ between energy and emissions!'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {lang === 'el'
                ? `Στην ενέργεια πρώτο είναι «${byEnergy[0].activity.name.el}», αλλά στις εκπομπές «${byCo2[0].activity.name.el}». Αυτό δείχνει ότι η πηγή ενέργειας μετράει όσο και η ποσότητα.`
                : `By energy "${byEnergy[0].activity.name.en}" uses least, but by emissions "${byCo2[0].activity.name.en}" is lowest. This shows the energy source matters as much as the amount.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
