import type { Language } from '../../data/translations';

interface Props {
  lang: Language;
}

export default function GreeceGhgTrendChart({ lang }: Props) {
  return (
    <div className="my-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">
        {lang === 'el'
          ? '🇬🇷 Ετήσιες εκπομπές ΑΘΠ Ελλάδας σε ισοδύναμο CO₂'
          : "🇬🇷 Greece's Yearly GHG Emissions in CO₂ Equivalent"}
      </p>
      <div className="w-full overflow-hidden rounded-lg" style={{ height: 420 }}>
        <iframe
          src="https://climatechangetracker.org/embedding/nations/greenhouse-gas-emissions/greece/yearly-greenhouse-gas-emissions-CO2-equivalent"
          scrolling="no"
          frameBorder={0}
          title={
            lang === 'el'
              ? 'Ετήσιες εκπομπές ΑΘΠ Ελλάδας'
              : "Greece's Yearly GHG Emissions"
          }
          className="w-full h-full border-0"
        />
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">
        {lang === 'el'
          ? 'Πηγή: Climate Change Tracker'
          : 'Source: Climate Change Tracker'}
      </p>
    </div>
  );
}
