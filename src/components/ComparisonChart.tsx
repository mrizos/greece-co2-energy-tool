import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import type { MetricView } from '../hooks/useMetricView';
import type { ComputedActivity } from '../utils/calculations';
import { CATEGORY_COLORS } from '../data/constants';
import {
  formatEnergy,
  formatEmissions,
} from '../utils/formatters';

interface ComparisonChartProps {
  computed: ComputedActivity[];
  metricView: MetricView;
  lang: Language;
}

interface BarItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  energyWh: number;
  co2Grams: number;
  carbonIntensity: number;
  energyLabel: string;
  co2Label: string;
  energyPct: number;
  co2Pct: number;
}

export default function ComparisonChart({
  computed,
  metricView,
  lang,
}: ComparisonChartProps) {
  const items: BarItem[] = useMemo(() => {
    const raw = computed.map((c) => ({
      id: c.activityId,
      name: c.activity.name[lang],
      icon: c.activity.icon,
      category: c.activity.category,
      energyWh: c.totalEnergyWh,
      co2Grams: c.totalCo2eGrams,
      carbonIntensity: c.carbonIntensity,
      energyLabel: formatEnergy(c.totalEnergyWh),
      co2Label: formatEmissions(c.totalCo2eGrams),
      energyPct: 0,
      co2Pct: 0,
    }));

    // Sort descending by active metric (negatives go to the bottom)
    if (metricView === 'emissions') {
      raw.sort((a, b) => b.co2Grams - a.co2Grams);
    } else {
      raw.sort((a, b) => b.energyWh - a.energyWh);
    }

    // For diverging bar chart: scale relative to the max absolute value
    const maxAbsE = Math.max(...raw.map((d) => Math.abs(d.energyWh)), 1);
    const maxAbsC = Math.max(...raw.map((d) => Math.abs(d.co2Grams)), 1);

    raw.forEach((d) => {
      // Preserve sign: negative values get negative pct (handled in rendering)
      const ePct = (d.energyWh / maxAbsE) * 100;
      const cPct = (d.co2Grams / maxAbsC) * 100;
      // Apply 2% minimum floor only for non-zero values, preserve sign
      d.energyPct = d.energyWh === 0 ? 0 : Math.sign(ePct) * Math.max(2, Math.abs(ePct));
      d.co2Pct = d.co2Grams === 0 ? 0 : Math.sign(cPct) * Math.max(2, Math.abs(cPct));
    });

    return raw;
  }, [computed, metricView, lang]);

  if (computed.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-600">
        <p className="text-center">{translations.noActivities[lang]}</p>
      </div>
    );
  }

  const showEnergy = metricView === 'energy' || metricView === 'both';
  const showEmissions = metricView === 'emissions' || metricView === 'both';

  // Check if any items have negative values (for diverging chart mode)
  const hasNegativeEnergy = items.some((i) => i.energyWh < 0);
  const hasNegativeCo2 = items.some((i) => i.co2Grams < 0);

  const renderBars = (
    getPct: (item: BarItem) => number,
    getLabel: (item: BarItem) => string,
    getValue: (item: BarItem) => number,
    metricLabel: string,
    icon: string,
    colorClass: string,
    hasDivergence: boolean,
  ) => (
    <div>
      <h3 className={`text-xs font-medium ${colorClass} mb-3`}>
        {icon} {metricLabel}
        {hasDivergence && (
          <span className="ml-2 text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
            {lang === 'el' ? '(🌱 πράσινο = offset/εξοικονόμηση)' : '(🌱 green = offset/savings)'}
          </span>
        )}
      </h3>

      {hasDivergence ? (
        /* Diverging bar chart for mixed positive/negative */
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const pct = getPct(item);
              const label = getLabel(item);
              const value = getValue(item);
              const isNegative = value < 0;
              const absPct = Math.abs(pct);
              const color = isNegative ? '#6B8F3C' : CATEGORY_COLORS[item.category];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {/* Label */}
                  <div className="w-36 sm:w-44 flex-shrink-0 text-right pr-2">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate block">
                      {item.icon} {item.name}
                    </span>
                  </div>

                  {/* Diverging bar area */}
                  <div className="flex-1 flex items-center min-w-0">
                    {/* Left side (negatives grow leftward) */}
                    <div className="flex-1 flex justify-end items-center pr-1 min-w-0">
                      {isNegative && (
                        <motion.div
                          className="h-6 rounded-l-full flex items-center pl-2"
                          style={{ backgroundColor: color, width: `${absPct}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${absPct}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                          {absPct > 30 && (
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                              {label}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Center divider line */}
                    <div className="w-px h-6 bg-gray-300 dark:bg-slate-500 flex-shrink-0" />

                    {/* Right side (positives grow rightward) */}
                    <div className="flex-1 flex items-center pl-1 gap-2 min-w-0">
                      {!isNegative && (
                        <>
                          <motion.div
                            className="h-6 rounded-r-full flex items-center justify-end pr-2"
                            style={{ backgroundColor: color, minWidth: absPct > 0 ? '8px' : 0 }}
                            initial={{ width: 0 }}
                            animate={{ width: `${absPct}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          >
                            {absPct > 25 && (
                              <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                                {label}
                              </span>
                            )}
                          </motion.div>
                          {absPct <= 25 && (
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                              {label}
                            </span>
                          )}
                        </>
                      )}
                      {isNegative && (
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap flex-shrink-0">
                          {label}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* Standard bar chart (all positive) */
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const pct = getPct(item);
              const label = getLabel(item);
              const color = CATEGORY_COLORS[item.category];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {/* Label */}
                  <div className="w-36 sm:w-44 flex-shrink-0 text-right pr-2">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate block">
                      {item.icon} {item.name}
                    </span>
                  </div>
                  {/* Bar + value */}
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full flex items-center justify-end pr-2"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        {pct > 25 && (
                          <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                            {label}
                          </span>
                        )}
                      </motion.div>
                    </div>
                    {pct <= 25 && (
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        {label}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {showEnergy &&
        renderBars(
          (item) => item.energyPct,
          (item) => item.energyLabel,
          (item) => item.energyWh,
          translations.energy[lang],
          '⚡',
          'text-amber-600 dark:text-amber-400',
          hasNegativeEnergy,
        )}
      {showEmissions &&
        renderBars(
          (item) => item.co2Pct,
          (item) => item.co2Label,
          (item) => item.co2Grams,
          translations.emissions[lang],
          '🌍',
          'text-emerald-600 dark:text-emerald-400',
          hasNegativeCo2,
        )}
    </div>
  );
}
