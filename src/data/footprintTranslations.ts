/**
 * FOOTPRINT CALCULATOR — TRANSLATIONS
 * ====================================
 * All bilingual strings for the Calculator section.
 * Separate from main translations.ts for maintainability.
 */

export const ftT = {
  // ── Page Title / Header ──
  calcTitle: {
    el: 'Υπολόγισε το Αποτύπωμά σου',
    en: 'Calculate Your Footprint',
  },
  calcSubtitle: {
    el: 'Μάθε πόσο CO₂ και ενέργεια καταναλώνεις ετησίως — και τι μπορείς να αλλάξεις',
    en: 'Learn your annual CO₂ and energy consumption — and what you can change',
  },

  // ── Mode selection ──
  quickMode: { el: 'Γρήγορος Υπολογισμός', en: 'Quick Estimate' },
  detailedMode: { el: 'Λεπτομερής Υπολογισμός', en: 'Detailed Calculation' },
  quickModeDesc: {
    el: '5 βασικές ερωτήσεις, ~1 λεπτό',
    en: '5 key questions, ~1 minute',
  },
  detailedModeDesc: {
    el: '30+ ερωτήσεις, πιο ακριβές αποτέλεσμα',
    en: '30+ questions, more accurate result',
  },

  // ── Navigation ──
  next: { el: 'Επόμενο', en: 'Next' },
  prev: { el: 'Προηγούμενο', en: 'Previous' },
  seeResults: { el: 'Δες τα Αποτελέσματα', en: 'See Results' },
  startOver: { el: 'Ξεκίνα από την αρχή', en: 'Start Over' },
  backToQuiz: { el: 'Πίσω στις ερωτήσεις', en: 'Back to questions' },

  // ── Step labels ──
  stepOf: {
    el: (current: number, total: number) => `Βήμα ${current} από ${total}`,
    en: (current: number, total: number) => `Step ${current} of ${total}`,
  },

  // ── Results ──
  yourFootprint: { el: 'Το αποτύπωμά σου', en: 'Your footprint' },
  annualCo2: { el: 'Ετήσιες εκπομπές CO₂', en: 'Annual CO₂ emissions' },
  annualEnergy: { el: 'Ετήσια ενέργεια', en: 'Annual energy' },
  kgCo2Year: { el: 'kg CO₂e/χρόνο', en: 'kg CO₂e/year' },
  kwhYear: { el: 'kWh/χρόνο', en: 'kWh/year' },
  tonnesCo2Year: { el: 't CO₂e/χρόνο', en: 't CO₂e/year' },
  breakdown: { el: 'Ανάλυση ανά κατηγορία', en: 'Breakdown by category' },

  // ── Comparisons ──
  comparedTo: { el: 'Σύγκριση με', en: 'Compared to' },
  greekAvg: { el: 'Μ.Ο. Ελλάδα', en: 'Greece avg' },
  euAvg: { el: 'Μ.Ο. Ε.Ε.', en: 'EU avg' },
  globalAvg: { el: 'Παγκόσμιος Μ.Ο.', en: 'Global avg' },
  parisBudget: { el: 'Στόχος Παρισιού', en: 'Paris target' },
  treesNeeded: {
    el: (n: number) => `Χρειάζονται ${n} δέντρα για απορρόφηση`,
    en: (n: number) => `${n} trees needed for absorption`,
  },

  // ── Scenarios / Projections ──
  whatIf: { el: 'Τι αν...', en: 'What if...' },
  scenariosTitle: {
    el: 'Σενάρια μείωσης',
    en: 'Reduction scenarios',
  },
  scenariosSubtitle: {
    el: 'Δες πόσο θα μειωνόταν το αποτύπωμά σου',
    en: 'See how much you could reduce your footprint',
  },
  savingsKg: {
    el: (n: number) => `-${n} kg CO₂/χρόνο`,
    en: (n: number) => `-${n} kg CO₂/year`,
  },
  projectedTotal: {
    el: 'Προβλεπόμενο σύνολο',
    en: 'Projected total',
  },
  withAllChanges: {
    el: 'Με όλες τις αλλαγές',
    en: 'With all changes',
  },

  // ── Recommendations ──
  recsTitle: {
    el: 'Προτάσεις για μείωση',
    en: 'Recommendations',
  },
  recsSubtitle: {
    el: 'Ταξινομημένες κατά μέγεθος αντίκτυπου',
    en: 'Ranked by impact size',
  },
  highImpact: { el: 'Υψηλός αντίκτυπος', en: 'High impact' },
  mediumImpact: { el: 'Μέτριος αντίκτυπος', en: 'Medium impact' },
  lowImpact: { el: 'Χαμηλός αντίκτυπος', en: 'Low impact' },

  // ── Landing page ──
  heroTitle: {
    el: 'Πόσο πράσινη είναι η ζωή σου;',
    en: 'How green is your life?',
  },
  heroSubtitle: {
    el: 'Δύο εργαλεία για να κατανοήσεις τις εκπομπές και την κατανάλωση ενέργειας στην Ελλάδα',
    en: 'Two tools to understand emissions and energy consumption in Greece',
  },
  ctaCompare: {
    el: 'Σύγκρινε Δραστηριότητες',
    en: 'Compare Activities',
  },
  ctaCompareDesc: {
    el: 'Πόσο ενέργεια & CO₂ κοστίζει κάθε δραστηριότητα; Σύγκρινε οτιδήποτε.',
    en: 'How much energy & CO₂ does each activity cost? Compare anything.',
  },
  ctaCalculator: {
    el: 'Υπολόγισε το Αποτύπωμά σου',
    en: 'Calculate Your Footprint',
  },
  ctaCalculatorDesc: {
    el: 'Μάθε το ετήσιο αποτύπωμά σου σε CO₂ και ενέργεια με εξατομικευμένες προτάσεις.',
    en: 'Learn your annual CO₂ and energy footprint with personalised recommendations.',
  },

  // ── Key facts (Landing) ──
  keyFacts: {
    el: 'Βασικά στοιχεία',
    en: 'Key facts',
  },
  factGridTitle: {
    el: 'Ενεργειακό μείγμα Ελλάδας',
    en: 'Greece energy mix',
  },
  factGrid: {
    el: '256 g CO₂/kWh — 52% ΑΠΕ (2024)',
    en: '256 g CO₂/kWh — 52% renewables (2024)',
  },
  factPerCapita: {
    el: '~7 τόνοι CO₂/κάτοικο/χρόνο',
    en: '~7 tonnes CO₂/capita/year',
  },
  factParis: {
    el: 'Στόχος Παρισιού: <2.3 t CO₂/κάτοικο',
    en: 'Paris target: <2.3 t CO₂/capita',
  },

  // ── Shared ──
  appName: { el: 'CarbonTrace.gr', en: 'CarbonTrace.gr' },
  appTagline: {
    el: 'Κατανόησε τον ενεργειακό αντίκτυπο της ζωής σου στην Ελλάδα',
    en: 'Understand the energy impact of your life in Greece',
  },
} as const;
