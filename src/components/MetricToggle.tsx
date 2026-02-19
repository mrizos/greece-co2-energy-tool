import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import type { MetricView } from '../hooks/useMetricView';

interface MetricToggleProps {
  lang: Language;
  metricView: MetricView;
  setMetricView: (v: MetricView) => void;
}

export default function MetricToggle({
  lang,
  metricView,
  setMetricView,
}: MetricToggleProps) {
  const options: { key: MetricView; label: string; icon: string }[] = [
    { key: 'energy', label: translations.energy[lang], icon: '⚡' },
    { key: 'emissions', label: translations.emissions[lang], icon: '🌍' },
    { key: 'both', label: translations.both[lang], icon: '⚡🌍' },
  ];

  return (
    <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-0.5" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.key}
          role="radio"
          aria-checked={metricView === opt.key}
          onClick={() => setMetricView(opt.key)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
            ${
              metricView === opt.key
                ? 'bg-white dark:bg-slate-700 text-navy dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }
          `}
        >
          <span className="mr-1">{opt.icon}</span>
          <span className="hidden sm:inline">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
