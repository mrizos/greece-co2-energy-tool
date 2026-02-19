import { useState, useCallback, useMemo } from 'react';
import { activities, type Activity } from '../data/activities';
import { computeActivity, computeTotals, type ComputedActivity } from '../utils/calculations';

interface SelectedItem {
  activityId: string;
  quantity: number;
}

export function useActivities() {
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  const addActivity = useCallback((activityId: string) => {
    setSelected((prev) => {
      if (prev.some((s) => s.activityId === activityId)) return prev;
      const activity = activities.find((a) => a.id === activityId);
      if (!activity) return prev;
      return [...prev, { activityId, quantity: activity.defaultQuantity }];
    });
  }, []);

  const removeActivity = useCallback((activityId: string) => {
    setSelected((prev) => prev.filter((s) => s.activityId !== activityId));
  }, []);

  const updateQuantity = useCallback((activityId: string, quantity: number) => {
    setSelected((prev) =>
      prev.map((s) =>
        s.activityId === activityId ? { ...s, quantity: Math.max(0, quantity) } : s
      )
    );
  }, []);

  const isSelected = useCallback(
    (activityId: string) => selected.some((s) => s.activityId === activityId),
    [selected]
  );

  const toggleActivity = useCallback(
    (activityId: string) => {
      if (isSelected(activityId)) {
        removeActivity(activityId);
      } else {
        addActivity(activityId);
      }
    },
    [isSelected, addActivity, removeActivity]
  );

  const computed: ComputedActivity[] = useMemo(() => {
    return selected
      .map((s) => {
        const activity = activities.find((a) => a.id === s.activityId);
        if (!activity) return null;
        return computeActivity(activity, s.quantity);
      })
      .filter((c): c is ComputedActivity => c !== null);
  }, [selected]);

  const totals = useMemo(() => computeTotals(computed), [computed]);

  const clearAll = useCallback(() => {
    setSelected([]);
  }, []);

  const addQuickCompare = useCallback(
    (ids: string[]) => {
      setSelected((prev) => {
        const newItems = ids
          .filter((id) => !prev.some((s) => s.activityId === id))
          .map((id) => {
            const activity = activities.find((a) => a.id === id) as Activity;
            return { activityId: id, quantity: activity.defaultQuantity };
          });
        return [...prev, ...newItems];
      });
    },
    []
  );

  return {
    selected,
    computed,
    totals,
    addActivity,
    removeActivity,
    updateQuantity,
    isSelected,
    toggleActivity,
    addQuickCompare,
    clearAll,
  };
}
