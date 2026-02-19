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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
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

      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="w-20 px-2 py-1 text-sm border border-gray-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {activity.unit[lang]}
        </span>
        <input
          type="range"
          min={0}
          max={activity.defaultQuantity * 5}
          step={activity.defaultQuantity <= 1 ? 0.1 : 1}
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="flex-1 accent-terracotta"
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {(metricView === 'energy' || metricView === 'both') && (
          <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
            ⚡ {formatEnergy(totalEnergy)}
          </span>
        )}
        {(metricView === 'emissions' || metricView === 'both') && (
          <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
            🌍 {formatEmissions(totalCo2)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
