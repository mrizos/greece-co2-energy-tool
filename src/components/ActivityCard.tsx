import { motion } from 'framer-motion';
import type { Language } from '../data/translations';
import type { Activity } from '../data/activities';
import type { MetricView } from '../hooks/useMetricView';
import { formatEnergy, formatEmissions } from '../utils/formatters';
import { CATEGORY_COLORS } from '../data/constants';

interface ActivityCardProps {
  activity: Activity;
  quantity: number;
  lang: Language;
  metricView: MetricView;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}

// Activities where emissions/energy are negative (offsets)
const OFFSET_ACTIVITY_IDS = new Set(['solar_pv']);

// Custom slider max values per activity (overrides defaultQuantity * 5)
const SLIDER_MAX: Record<string, number> = {
  solar_pv: 20,          // up to 20 kW installed (large rooftop/commercial)
  flight_ath_ny: 10,     // up to 10 intercontinental flights/year
  flight_ath_london: 20,
  flight_ath_skg: 30,
};

export default function ActivityCard({
  activity,
  quantity,
  lang,
  metricView,
  onQuantityChange,
  onRemove,
}: ActivityCardProps) {
  const totalEnergy = quantity * activity.energyWhPerUnit;
  const totalCo2 = quantity * activity.co2eGramsPerUnit;
  const color = CATEGORY_COLORS[activity.category];
  const isOffset = OFFSET_ACTIVITY_IDS.has(activity.id);

  // Slider max: use custom override if defined, else defaultQuantity * 5 (min 1)
  const sliderMax = SLIDER_MAX[activity.id] ?? Math.max(activity.defaultQuantity * 5, 1);
  // Step: 0.5 for small-range activities (≤2), 0.1 for sub-1 defaults, else 1
  const sliderStep = activity.defaultQuantity < 1 ? 0.1 : activity.defaultQuantity <= 2 ? 0.5 : 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-white dark:bg-slate-800 rounded-xl border p-3 shadow-sm ${
        isOffset
          ? 'border-olive/40 dark:border-olive/30 bg-emerald-50/30 dark:bg-emerald-900/10'
          : 'border-gray-200 dark:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: isOffset ? '#6B8F3C' : color }}
          />
          <span className="text-lg flex-shrink-0">{activity.icon}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {activity.name[lang]}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none flex-shrink-0"
          aria-label="Remove"
        >
          &times;
        </button>
      </div>

      {/* Offset info badge */}
      {isOffset && (
        <div className="mt-1.5 mb-1 flex items-center gap-1.5">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-olive/10 text-olive dark:text-emerald-400 dark:bg-emerald-900/30 font-medium">
            🌱 {lang === 'el'
              ? 'Ετήσιο offset — αντισταθμίζει εκπομπές'
              : 'Annual offset — reduces net emissions'}
          </span>
        </div>
      )}

      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min={0}
          max={sliderMax}
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="w-20 px-2 py-1 text-sm border border-gray-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
          {activity.unit[lang]}
        </span>
        <input
          type="range"
          min={0}
          max={sliderMax}
          step={sliderStep}
          value={Math.min(quantity, sliderMax)}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className={`flex-1 min-w-0 ${isOffset ? 'accent-olive' : 'accent-terracotta'}`}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {(metricView === 'energy' || metricView === 'both') && totalEnergy !== 0 && (
          <span className={`px-2 py-0.5 rounded-full ${
            isOffset
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          }`}>
            ⚡ {formatEnergy(totalEnergy)}
          </span>
        )}
        {(metricView === 'emissions' || metricView === 'both') && (
          <span className={`px-2 py-0.5 rounded-full ${
            isOffset
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
          }`}>
            🌍 {formatEmissions(totalCo2)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
