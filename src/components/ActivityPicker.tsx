import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { activities, categoriesOrder, type Category } from '../data/activities';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import type { MetricView } from '../hooks/useMetricView';
import { CATEGORY_COLORS } from '../data/constants';
import ActivityCard from './ActivityCard';
import type { ComputedActivity } from '../utils/calculations';

interface ActivityPickerProps {
  lang: Language;
  metricView: MetricView;
  computed: ComputedActivity[];
  isSelected: (id: string) => boolean;
  toggleActivity: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeActivity: (id: string) => void;
  addQuickCompare: (ids: string[]) => void;
  clearAll: () => void;
}

export default function ActivityPicker({
  lang,
  metricView,
  computed,
  isSelected,
  toggleActivity,
  updateQuantity,
  removeActivity,
  addQuickCompare,
  clearAll,
}: ActivityPickerProps) {
  const [openCategory, setOpenCategory] = useState<Category | null>('transport');

  const quickCompares = [
    {
      label: translations.commuteCompare[lang],
      ids: ['petrol_car', 'city_bus', 'athens_metro'],
    },
    {
      label: translations.dinnerCompare[lang],
      ids: ['beef', 'legumes'],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Quick compare buttons */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          {translations.quickCompare[lang]}
        </p>
        <div className="flex flex-wrap gap-2">
          {quickCompares.map((qc) => (
            <button
              key={qc.label}
              onClick={() => addQuickCompare(qc.ids)}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-600 hover:bg-terracotta/10 hover:border-terracotta transition-colors text-gray-700 dark:text-gray-300"
            >
              {qc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected activities + clear all */}
      {computed.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {computed.length} {lang === 'el' ? 'επιλεγμένα' : 'selected'}
            </span>
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-medium"
            >
              {lang === 'el' ? 'Καθαρισμός όλων' : 'Clear all'} ✕
            </button>
          </div>
          <AnimatePresence mode="popLayout">
            {computed.map((c) => (
              <ActivityCard
                key={c.activityId}
                activity={c.activity}
                quantity={c.quantity}
                lang={lang}
                metricView={metricView}
                onQuantityChange={(qty) => updateQuantity(c.activityId, qty)}
                onRemove={() => removeActivity(c.activityId)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Category accordion */}
      <div className="space-y-1">
        {categoriesOrder.map((cat) => {
          const catActivities = activities.filter((a) => a.category === cat);
          const isOpen = openCategory === cat;
          const catColor = CATEGORY_COLORS[cat];
          const catIcon =
            translations.categoryIcons[cat as keyof typeof translations.categoryIcons];
          const catName =
            translations.categories[cat as keyof typeof translations.categories][lang];

          return (
            <div key={cat}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: catColor }}
                />
                <span className="text-base">{catIcon}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">
                  {catName}
                </span>
                <span className="text-xs text-gray-400">
                  {catActivities.filter((a) => isSelected(a.id)).length}/
                  {catActivities.length}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 pr-2 py-1 space-y-0.5">
                      {catActivities.map((activity) => {
                        const sel = isSelected(activity.id);
                        return (
                          <button
                            key={activity.id}
                            onClick={() => toggleActivity(activity.id)}
                            className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-left transition-colors text-sm ${
                              sel
                                ? 'bg-terracotta/10 text-terracotta dark:text-orange-300'
                                : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                              {sel ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <span className="w-3.5 h-3.5 border border-gray-300 dark:border-slate-600 rounded" />
                              )}
                            </span>
                            <span>{activity.icon}</span>
                            <span className="truncate">{activity.name[lang]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
