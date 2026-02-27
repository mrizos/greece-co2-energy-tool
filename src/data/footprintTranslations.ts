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
    el: 'Μάθε πόση ενέργεια καταναλώνεις και πόσο CO₂e εκλύεται από αυτές τις δραστηριότητες ετησίως — και τι μπορείς να αλλάξεις',
    en: 'Find out how much energy you consume and the CO₂e emitted by these activities annually — and what you can change',
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
  annualCo2: { el: 'Ετήσιες εκπομπές CO₂e', en: 'Annual CO₂e emissions' },
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
    el: (n: number) => `-${n} kg CO₂e/χρόνο`,
    en: (n: number) => `-${n} kg CO₂e/year`,
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
    el: 'Ένα μόνο BBQ εκπέμπει τόσο CO₂ όσο 65 χλμ. οδήγησης ενός βενζινοκίνητου οχήματος. Δες τι άλλο δεν γνωρίζεις.',
    en: 'One BBQ session emits as much CO₂ as driving a petrol car for 65 km. See what else you’re missing.',
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
    el: 'Πόση ενέργεια απαιτείται & πόσο CO₂e εκλύεται από κάθε δραστηριότητα; Σύγκρινε δραστηριότητες.',
    en: 'How much energy & CO₂e does each activity cost? Compare activities.',
  },
  ctaCalculator: {
    el: 'Υπολόγισε το Αποτύπωμά σου',
    en: 'Calculate Your Footprint',
  },
  ctaCalculatorDesc: {
    el: 'Μάθε το ετήσιο αποτύπωμά σου σε CO₂e και σε ενέργεια με εξατομικευμένες προτάσεις.',
    en: 'Learn your annual CO₂e and energy footprint with personalised recommendations.',
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
    el: '265 g CO₂/kWh — ~57% ΑΠΕ (2025)',
    en: '265 g CO₂/kWh — ~57% renewables (2025)',
  },
  factGridFootnote: {
    el: 'Πηγή: Green Tank, 2025. Άμεσες εκπομπές CO₂ (EU ETS), μεικτή παραγωγή. Δεν περιλαμβάνει upstream εκπομπές (εξόρυξη/μεταφορά καυσίμων) ή κατασκευή σταθμών.',
    en: 'Source: Green Tank, 2025. Direct CO₂ emissions (EU ETS), gross generation. Excludes upstream emissions (fuel extraction/transport) and plant construction.',
  },
  factPerCapita: {
    el: '~6.1 τόνοι CO₂e/κάτοικο/χρόνο',
    en: '~6.1 tonnes CO₂e/capita/year',
  },
  factPerCapitaFootnote: {
    el: 'Πηγή: Climate Change Tracker, στοιχεία 2023.',
    en: 'Source: Climate Change Tracker, 2023 data.',
  },
  factParis: {
    el: 'Στόχος Παρισιού: <2.3 t CO₂e/κάτοικο',
    en: 'Paris target: <2.3 t CO₂e/capita',
  },
  factParisFootnote: {
    el: 'Βάσει παγκόσμιου carbon budget 1.5°C (IPCC AR6), κατανεμημένου κατά κεφαλήν.',
    en: 'Based on global 1.5°C carbon budget (IPCC AR6), per-capita allocation.',
  },

  // ── Shared ──
  appName: { el: 'CarbonTrace.gr', en: 'CarbonTrace.gr' },
  appTagline: {
    el: 'Κατανόησε τον ενεργειακό αντίκτυπο της ζωής σου στην Ελλάδα',
    en: 'Understand the energy impact of your life in Greece',
  },
} as const;
