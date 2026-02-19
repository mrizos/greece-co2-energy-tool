import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import type { ComputedActivity } from '../utils/calculations';

interface MethodologySectionProps {
  computed: ComputedActivity[];
  lang: Language;
}

export default function MethodologySection({ computed, lang }: MethodologySectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (computed.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
      <h3 className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-700">
        📋 {translations.methodology[lang]}
      </h3>
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {computed.map((c) => {
          const isOpen = openId === c.activityId;
          const meth = c.activity.methodology;
          return (
            <div key={c.activityId}>
              <button
                onClick={() => setOpenId(isOpen ? null : c.activityId)}
                className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {c.activity.icon} {c.activity.name[lang]}
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
                    <div className="px-4 pb-3 text-xs space-y-1.5 text-gray-500 dark:text-gray-400">
                      <p>{meth[lang]}</p>
                      {meth.formula && (
                        <p>
                          <span className="font-medium">{translations.formula[lang]}:</span>{' '}
                          <code className="bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">
                            {meth.formula}
                          </code>
                        </p>
                      )}
                      {meth.sources.length > 0 && (
                        <p>
                          <span className="font-medium">{translations.sources[lang]}:</span>{' '}
                          {meth.sources.join(', ')}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">{translations.lastUpdated[lang]}:</span>{' '}
                        {meth.lastUpdated}
                      </p>
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
