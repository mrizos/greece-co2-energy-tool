import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Language } from '../../data/translations';

const ghgTrendData = [
  { year: 1990, emissions: 103.2 },
  { year: 1992, emissions: 104.5 },
  { year: 1994, emissions: 106.8 },
  { year: 1996, emissions: 110.2 },
  { year: 1998, emissions: 118.5 },
  { year: 2000, emissions: 122.8 },
  { year: 2002, emissions: 125.6 },
  { year: 2004, emissions: 130.1 },
  { year: 2005, emissions: 131.9 },
  { year: 2006, emissions: 128.7 },
  { year: 2007, emissions: 130.5 },
  { year: 2008, emissions: 127.4 },
  { year: 2009, emissions: 118.2 },
  { year: 2010, emissions: 114.1 },
  { year: 2011, emissions: 110.8 },
  { year: 2012, emissions: 103.2 },
  { year: 2013, emissions: 99.1 },
  { year: 2014, emissions: 95.5 },
  { year: 2015, emissions: 92.8 },
  { year: 2016, emissions: 88.3 },
  { year: 2017, emissions: 89.5 },
  { year: 2018, emissions: 86.1 },
  { year: 2019, emissions: 79.4 },
  { year: 2020, emissions: 69.8 },
  { year: 2021, emissions: 70.4 },
  { year: 2022, emissions: 65.3 },
];

interface Props {
  lang: Language;
}

export default function GreeceGhgTrendChart({ lang }: Props) {
  return (
    <div className="my-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">
        {lang === 'el'
          ? '🇬🇷 Ετήσιες εκπομπές ΑΘΠ Ελλάδας σε ισοδύναμο CO₂ (Mt CO₂e)'
          : "🇬🇷 Greece's Yearly GHG Emissions in CO₂ Equivalent (Mt CO₂e)"}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={ghgTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            domain={[0, 150]}
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            width={40}
            tickFormatter={(v: number) => `${v}`}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            formatter={(value) => [`${value} Mt CO₂e`, lang === 'el' ? 'Εκπομπές' : 'Emissions']}
            labelFormatter={(label) => `${label}`}
          />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="#1B2A4A"
            fill="#1B2A4A"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#1B2A4A' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 italic">
        {lang === 'el'
          ? 'Πηγή: PRIMAP-hist / Climate Change Tracker / Our World in Data'
          : 'Source: PRIMAP-hist / Climate Change Tracker / Our World in Data'}
      </p>
    </div>
  );
}
