import { useState } from 'react';

export type MetricView = 'energy' | 'emissions' | 'both';

export function useMetricView() {
  const [metricView, setMetricView] = useState<MetricView>('emissions');
  return { metricView, setMetricView };
}
