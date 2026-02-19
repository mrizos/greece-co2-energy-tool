import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { gridHistoryData, countryGridFactors } from '../data/benchmarks';
import { CONSTANTS } from '../data/constants';

interface GridInfoCardProps {
  lang: Language;
}

export default function GridInfoCard({ lang }: GridInfoCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            🇬🇷 {translations.gridInfoTitle[lang]}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {CONSTANTS.GRID_FACTOR_G_PER_KWH} g CO₂/kWh &middot;{' '}
            {translations.renewableShare[lang]}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Sparkline: grid factor over time */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {translations.gridFactor[lang]} (g CO₂/kWh) 2015–2024
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={gridHistoryData}>
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis
                      domain={[0, 700]}
                      tick={{ fontSize: 10 }}
                      width={35}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="factor"
                      stroke="#C75B39"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Country comparison */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {lang === 'el' ? 'Σύγκριση χωρών' : 'Country comparison'} (g CO₂/kWh)
                </p>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart
                    data={countryGridFactors.map((c) => ({
                      country: c.country[lang],
                      factor: c.factor,
                    }))}
                    layout="vertical"
                    margin={{ left: 5, right: 10 }}
                  >
                    <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="country" width={95} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar dataKey="factor" radius={[0, 4, 4, 0]} barSize={14}>
                      {countryGridFactors.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            countryGridFactors[i].country.en === 'Greece'
                              ? '#C75B39'
                              : '#94A3B8'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {translations.gridInfoDescription[lang]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
