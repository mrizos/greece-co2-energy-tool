export type Language = 'el' | 'en';

export const translations = {
  appTitle: {
    el: 'Πόσο ενέργεια & CO₂ είναι αυτό;',
    en: 'How much energy & CO₂ is that?',
  },
  appSubtitle: {
    el: 'Σύγκρινε την ενεργειακή κατανάλωση και τις εκπομπές αερίων θερμοκηπίου από καθημερινές δραστηριότητες στην Ελλάδα',
    en: 'Compare the energy consumption and greenhouse gas emissions of everyday activities in Greece',
  },
  energy: { el: 'Ενέργεια', en: 'Energy' },
  emissions: { el: 'Εκπομπές', en: 'Emissions' },
  both: { el: 'Και τα δύο', en: 'Both' },
  categories: {
    transport: { el: 'Μεταφορές', en: 'Transport' },
    home_energy: { el: 'Ενέργεια Σπιτιού', en: 'Home Energy' },
    food: { el: 'Διατροφή', en: 'Food & Diet' },
    consumption: { el: 'Κατανάλωση', en: 'Consumption' },
    digital: { el: 'Ψηφιακή Ζωή', en: 'Digital Life' },
    waste: { el: 'Απόβλητα', en: 'Waste & Lifestyle' },
  },
  categoryIcons: {
    transport: '🚗',
    home_energy: '🏠',
    food: '🍽️',
    consumption: '🛍️',
    digital: '💻',
    waste: '♻️',
  },
  yourTotal: { el: 'Το σύνολό σου', en: 'Your total' },
  equivalences: { el: 'Ισοδυναμίες', en: 'Equivalences' },
  addActivity: { el: 'Προσθήκη δραστηριότητας', en: 'Add activity' },
  removeActivity: { el: 'Αφαίρεση', en: 'Remove' },
  comparison: { el: 'Σύγκριση', en: 'Comparison' },
  methodology: { el: 'Μεθοδολογία', en: 'Methodology' },
  sources: { el: 'Πηγές', en: 'Sources' },
  formula: { el: 'Τύπος', en: 'Formula' },
  lastUpdated: { el: 'Τελευταία ενημέρωση', en: 'Last updated' },
  gridInfoTitle: {
    el: 'Ελληνικό ηλεκτρικό δίκτυο',
    en: 'Greek electricity grid',
  },
  gridInfoDescription: {
    el: 'Κάθε χρόνο που η Ελλάδα προσθέτει ΑΠΕ, οι ηλεκτρικές δραστηριότητες γίνονται πιο καθαρές',
    en: 'Every year Greece adds renewables, electric activities become cleaner',
  },
  gridFactor: {
    el: 'Συντελεστής εκπομπών δικτύου',
    en: 'Grid emission factor',
  },
  renewableShare: {
    el: '52% ανανεώσιμες πηγές (2024)',
    en: '52% renewable sources (2024)',
  },
  carbonIntensity: {
    el: 'Ένταση άνθρακα',
    en: 'Carbon intensity',
  },
  insightTitle: {
    el: 'Γιατί μετράει η εξηλεκτρισμός',
    en: 'Why electrification matters',
  },
  disclaimer: {
    el: 'Τα δεδομένα είναι προσεγγιστικά και έχουν σκοπό την κατανόηση τάξεων μεγέθους.',
    en: 'Data is approximate and intended for order-of-magnitude understanding.',
  },
  footerBuilt: {
    el: 'Φτιαγμένο με αγάπη για μια πιο πράσινη Ελλάδα',
    en: 'Built with love for a greener Greece',
  },
  darkMode: { el: 'Σκοτεινό θέμα', en: 'Dark mode' },
  lightMode: { el: 'Φωτεινό θέμα', en: 'Light mode' },
  noActivities: {
    el: 'Πρόσθεσε δραστηριότητες για να ξεκινήσεις τη σύγκριση',
    en: 'Add activities to start comparing',
  },
  quickCompare: { el: 'Γρήγορη σύγκριση', en: 'Quick compare' },
  commuteCompare: {
    el: '🚗 vs 🚌 vs 🚇 μετακίνηση',
    en: '🚗 vs 🚌 vs 🚇 commute',
  },
  dinnerCompare: {
    el: '🥩 vs 🌿 δείπνο',
    en: '🥩 vs 🌿 dinner',
  },
  // Equivalence templates
  fridgeDays: {
    el: (n: string) => `≈ ${n} ημέρες λειτουργίας ψυγείου`,
    en: (n: string) => `≈ ${n} days of running a fridge`,
  },
  phoneCharges: {
    el: (n: string) => `≈ ${n} φορτίσεις κινητού`,
    en: (n: string) => `≈ ${n} phone charges`,
  },
  householdPercent: {
    el: (n: string) => `≈ ${n}% της ετήσιας κατανάλωσης ηλεκτρικού σπιτιού`,
    en: (n: string) => `≈ ${n}% of annual household electricity`,
  },
  drivingKm: {
    el: (n: string) => `≈ ${n} km οδήγησης βενζινοκίνητου`,
    en: (n: string) => `≈ ${n} km of petrol car driving`,
  },
  flightsAthSkg: {
    el: (n: string) => `≈ ${n} πτήσεις Αθήνα-Θεσσαλονίκη`,
    en: (n: string) => `≈ ${n} flights Athens-Thessaloniki`,
  },
  annualFootprint: {
    el: (n: string) => `≈ ${n}% του ετήσιου ανθρακικού αποτυπώματος`,
    en: (n: string) => `≈ ${n}% of annual carbon footprint`,
  },
  treesNeeded: {
    el: (n: string) => `≈ Χρειάζεται ${n} δέντρα για 1 χρόνο απορρόφησης`,
    en: (n: string) => `≈ Needs ${n} trees for 1 year of absorption`,
  },
} as const;
