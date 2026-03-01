import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Language } from '../../data/translations';

const breakdownData = [
  { name: { el: 'CO₂', en: 'CO₂' }, value: 75.1, color: '#1B2A4A' },
  { name: { el: 'CH₄ (Μεθάνιο)', en: 'CH₄ (Methane)' }, value: 13.1, color: '#C75B39' },
  { name: { el: 'N₂O (Υποξείδιο Αζώτου)', en: 'N₂O (Nitrous Oxide)' }, value: 6.1, color: '#6B8F3C' },
  { name: { el: 'F-gases', en: 'F-gases' }, value: 5.7, color: '#8B5CF6' },
];

interface Props {
  lang: Language;
}

export default function GhgBreakdownChart({ lang }: Props) {
  const pieData = breakdownData.map((d) => ({
    name: d.name[lang],
    value: d.value,
    color: d.color,
  }));

  return (
    <div className="my-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">
        {lang === 'el'
          ? '🇬🇷 Ανάλυση εκπομπών ΑΘΠ κατά αέριο (2021)'
          : '🇬🇷 GHG Emissions Breakdown by Gas (2021)'}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2" style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2.5 w-full sm:w-1/2">
          {breakdownData.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {d.name[lang]}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white ml-auto">
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">
        {lang === 'el'
          ? 'Πηγή: Emission-Index.com, στοιχεία 2021'
          : 'Source: Emission-Index.com, 2021 data'}
      </p>
    </div>
  );
}
