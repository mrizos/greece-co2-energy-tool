/**
 * COMPARE PAGE — wraps the existing comparison tool
 * Moved from App.tsx main content into its own route.
 */

import ActivityPicker from '../components/ActivityPicker';
import ComparisonChart from '../components/ComparisonChart';
import ContextPanel from '../components/ContextPanel';
import InsightPanel from '../components/InsightPanel';
import GridInfoCard from '../components/GridInfoCard';
import MethodologySection from '../components/MethodologySection';
import { useActivities } from '../hooks/useActivities';
import type { MetricView } from '../hooks/useMetricView';
import type { Language } from '../data/translations';

interface ComparePageProps {
  lang: Language;
  metricView: MetricView;
}

export default function ComparePage({ lang, metricView }: ComparePageProps) {
  const {
    computed,
    totals,
    isSelected,
    toggleActivity,
    updateQuantity,
    removeActivity,
    addQuickCompare,
    clearAll,
  } = useActivities();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Activity Picker */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
          <ActivityPicker
            lang={lang}
            metricView={metricView}
            computed={computed}
            isSelected={isSelected}
            toggleActivity={toggleActivity}
            updateQuantity={updateQuantity}
            removeActivity={removeActivity}
            addQuickCompare={addQuickCompare}
            clearAll={clearAll}
          />
        </aside>

        {/* Right: Chart + Panels */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Comparison Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
            <ComparisonChart
              computed={computed}
              metricView={metricView}
              lang={lang}
            />
          </div>

          {/* Info panels row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContextPanel
              totalEnergyWh={totals.totalEnergyWh}
              totalCo2eGrams={totals.totalCo2eGrams}
              metricView={metricView}
              lang={lang}
            />
            {metricView === 'both' && (
              <InsightPanel computed={computed} lang={lang} />
            )}
          </div>

          {/* Grid info */}
          <GridInfoCard lang={lang} />

          {/* Methodology */}
          <MethodologySection computed={computed} lang={lang} />
        </div>
      </div>
    </main>
  );
}
