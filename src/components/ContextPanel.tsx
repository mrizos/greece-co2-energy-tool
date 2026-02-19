import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import type { MetricView } from '../hooks/useMetricView';
import { formatEnergy, formatEmissions } from '../utils/formatters';
import { getEnergyEquivalences, getEmissionsEquivalences } from '../utils/equivalences';

interface ContextPanelProps {
  totalEnergyWh: number;
  totalCo2eGrams: number;
  metricView: MetricView;
  lang: Language;
}

export default function ContextPanel({
  totalEnergyWh,
  totalCo2eGrams,
  metricView,
  lang,
}: ContextPanelProps) {
  const showEnergy = metricView === 'energy' || metricView === 'both';
  const showEmissions = metricView === 'emissions' || metricView === 'both';

  const energyEquiv = showEnergy ? getEnergyEquivalences(totalEnergyWh, lang) : [];
  const emissionsEquiv = showEmissions
    ? getEmissionsEquivalences(totalCo2eGrams, lang)
    : [];

  if (totalEnergyWh === 0 && totalCo2eGrams === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        {translations.yourTotal[lang]}
      </h3>

      <div className="flex flex-wrap gap-3 mb-4">
        {showEnergy && (
          <div className="bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
            <p className="text-xs text-amber-600 dark:text-amber-400">⚡ {translations.energy[lang]}</p>
            <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
              {formatEnergy(totalEnergyWh)}
            </p>
          </div>
        )}
        {showEmissions && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg">
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              🌍 {translations.emissions[lang]}
            </p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {formatEmissions(totalCo2eGrams)}
            </p>
          </div>
        )}
      </div>

      {(energyEquiv.length > 0 || emissionsEquiv.length > 0) && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            {translations.equivalences[lang]}
          </h4>
          <ul className="space-y-1">
            {energyEquiv.map((eq, i) => (
              <li key={`e-${i}`} className="text-sm text-amber-700 dark:text-amber-300">
                {eq}
              </li>
            ))}
            {emissionsEquiv.map((eq, i) => (
              <li key={`c-${i}`} className="text-sm text-emerald-700 dark:text-emerald-300">
                {eq}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
