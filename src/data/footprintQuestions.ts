/**
 * FOOTPRINT CALCULATOR — QUESTIONS DATA
 * ======================================
 * Each question has:
 *   - id: unique key used in the answers object
 *   - step: which wizard step it belongs to
 *   - type: 'select' | 'number' | 'slider' | 'multi-select'
 *   - label: bilingual display text
 *   - options: for select/multi-select types
 *   - default: default value
 *   - unit: optional unit label
 *   - quickMode: if true, shown in the quick (5-question) version
 *
 * TO EDIT: just change the numbers, labels, or add/remove questions.
 * The calculation engine (footprintEngine.ts) uses the question IDs.
 */

export type QuestionType = 'select' | 'number' | 'slider' | 'multi-select';
export type StepId = 'transport' | 'home' | 'diet' | 'consumption' | 'waste';

export interface QuestionOption {
  value: string;
  label: { el: string; en: string };
}

export interface Question {
  id: string;
  step: StepId;
  type: QuestionType;
  label: { el: string; en: string };
  helpText?: { el: string; en: string };
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step_size?: number;
  default: string | number;
  unit?: { el: string; en: string };
  quickMode: boolean;
}

export const steps: { id: StepId; icon: string; label: { el: string; en: string } }[] = [
  { id: 'transport', icon: '🚗', label: { el: 'Μεταφορές', en: 'Transport' } },
  { id: 'home', icon: '🏠', label: { el: 'Σπίτι', en: 'Home' } },
  { id: 'diet', icon: '🍽️', label: { el: 'Διατροφή', en: 'Diet' } },
  { id: 'consumption', icon: '🛍️', label: { el: 'Κατανάλωση', en: 'Consumption' } },
  { id: 'waste', icon: '♻️', label: { el: 'Απόβλητα', en: 'Waste' } },
];

export const questions: Question[] = [
  // =====================================================
  // STEP 1: TRANSPORT
  // =====================================================
  {
    id: 'car_type',
    step: 'transport',
    type: 'select',
    label: { el: 'Τι αυτοκίνητο έχεις;', en: 'What car do you have?' },
    options: [
      { value: 'none', label: { el: 'Δεν έχω αυτοκίνητο', en: 'No car' } },
      { value: 'petrol_small', label: { el: 'Βενζίνη μικρό (<1.4L)', en: 'Petrol small (<1.4L)' } },
      { value: 'petrol_medium', label: { el: 'Βενζίνη μεσαίο (1.4-2.0L)', en: 'Petrol medium (1.4-2.0L)' } },
      { value: 'petrol_large', label: { el: 'Βενζίνη μεγάλο (>2.0L)', en: 'Petrol large (>2.0L)' } },
      { value: 'diesel_small', label: { el: 'Ντίζελ μικρό (<1.6L)', en: 'Diesel small (<1.6L)' } },
      { value: 'diesel_medium', label: { el: 'Ντίζελ μεσαίο (1.6-2.0L)', en: 'Diesel medium (1.6-2.0L)' } },
      { value: 'diesel_large', label: { el: 'Ντίζελ μεγάλο (>2.0L)', en: 'Diesel large (>2.0L)' } },
      { value: 'hybrid', label: { el: 'Υβριδικό', en: 'Hybrid' } },
      { value: 'plugin_hybrid', label: { el: 'Plug-in υβριδικό', en: 'Plug-in hybrid' } },
      { value: 'ev', label: { el: 'Ηλεκτρικό (EV)', en: 'Electric (EV)' } },
      { value: 'lpg', label: { el: 'Υγραέριο (LPG)', en: 'LPG' } },
    ],
    default: 'petrol_small',
    quickMode: true,
  },
  {
    id: 'car_km_year',
    step: 'transport',
    type: 'slider',
    label: { el: 'Πόσα χλμ οδηγείς τον χρόνο;', en: 'How many km do you drive per year?' },
    helpText: { el: 'Μ.Ο. Ελλάδα: ~12,000 km/χρόνο', en: 'Greek avg: ~12,000 km/year' },
    min: 0,
    max: 50000,
    step_size: 500,
    default: 12000,
    unit: { el: 'km/χρόνο', en: 'km/year' },
    quickMode: true,
  },
  {
    id: 'commute_mode',
    step: 'transport',
    type: 'select',
    label: { el: 'Πώς πηγαίνεις στη δουλειά;', en: 'How do you commute?' },
    options: [
      { value: 'car', label: { el: 'Αυτοκίνητο', en: 'Car' } },
      { value: 'public', label: { el: 'ΜΜΜ (μετρό/λεωφορείο)', en: 'Public transit (metro/bus)' } },
      { value: 'motorcycle', label: { el: 'Μηχανή/σκούτερ', en: 'Motorcycle/scooter' } },
      { value: 'bicycle', label: { el: 'Ποδήλατο', en: 'Bicycle' } },
      { value: 'walk', label: { el: 'Περπάτημα', en: 'Walking' } },
      { value: 'remote', label: { el: 'Τηλεργασία', en: 'Remote work' } },
      { value: 'mixed', label: { el: 'Μικτό (αυτ. + ΜΜΜ)', en: 'Mixed (car + transit)' } },
    ],
    default: 'car',
    quickMode: false,
  },
  {
    id: 'commute_distance_km',
    step: 'transport',
    type: 'slider',
    label: { el: 'Απόσταση μετακίνησης (μονό δρομολόγιο)', en: 'Commute distance (one way)' },
    min: 0,
    max: 80,
    step_size: 1,
    default: 15,
    unit: { el: 'km', en: 'km' },
    quickMode: false,
  },
  {
    id: 'flights_domestic',
    step: 'transport',
    type: 'number',
    label: { el: 'Εσωτερικές πτήσεις/χρόνο (π.χ. ΑΘΗ-ΘΕΣ)', en: 'Domestic flights/year (e.g. ATH-SKG)' },
    min: 0,
    max: 50,
    default: 2,
    unit: { el: 'πτήσεις', en: 'flights' },
    quickMode: true,
  },
  {
    id: 'flights_short_europe',
    step: 'transport',
    type: 'number',
    label: { el: 'Πτήσεις κοντινή Ευρώπη/χρόνο (<3h)', en: 'Short European flights/year (<3h)' },
    min: 0,
    max: 30,
    default: 1,
    unit: { el: 'πτήσεις', en: 'flights' },
    quickMode: false,
  },
  {
    id: 'flights_long_europe',
    step: 'transport',
    type: 'number',
    label: { el: 'Πτήσεις μακρινή Ευρώπη/χρόνο (3-5h)', en: 'Long European flights/year (3-5h)' },
    min: 0,
    max: 20,
    default: 1,
    unit: { el: 'πτήσεις', en: 'flights' },
    quickMode: true,
  },
  {
    id: 'flights_intercontinental',
    step: 'transport',
    type: 'number',
    label: { el: 'Διηπειρωτικές πτήσεις/χρόνο (>5h)', en: 'Intercontinental flights/year (>5h)' },
    min: 0,
    max: 10,
    default: 0,
    unit: { el: 'πτήσεις', en: 'flights' },
    quickMode: false,
  },
  {
    id: 'ferry_trips',
    step: 'transport',
    type: 'number',
    label: { el: 'Ταξίδια με φέρι/χρόνο (μ.ο. διάρκεια)', en: 'Ferry trips/year (avg duration)' },
    helpText: { el: 'Πχ 2 ταξίδια σε νησί = 4 διαδρομές', en: 'E.g. 2 island trips = 4 journeys' },
    min: 0,
    max: 30,
    default: 2,
    unit: { el: 'διαδρομές', en: 'journeys' },
    quickMode: false,
  },
  {
    id: 'ferry_type',
    step: 'transport',
    type: 'select',
    label: { el: 'Τύπος φέρι', en: 'Ferry type' },
    options: [
      { value: 'conventional', label: { el: 'Συμβατικό (αργό)', en: 'Conventional (slow)' } },
      { value: 'highspeed', label: { el: 'Ταχύπλοο', en: 'High-speed' } },
      { value: 'mixed', label: { el: 'Μικτό', en: 'Mixed' } },
    ],
    default: 'conventional',
    quickMode: false,
  },
  {
    id: 'ferry_avg_distance_km',
    step: 'transport',
    type: 'slider',
    label: { el: 'Μέση απόσταση φέρι ανά διαδρομή', en: 'Avg ferry distance per journey' },
    min: 20,
    max: 400,
    step_size: 10,
    default: 150,
    unit: { el: 'km', en: 'km' },
    quickMode: false,
  },

  // =====================================================
  // STEP 2: HOME
  // =====================================================
  {
    id: 'heating_type',
    step: 'home',
    type: 'select',
    label: { el: 'Πώς θερμαίνεις το σπίτι;', en: 'How do you heat your home?' },
    options: [
      { value: 'oil', label: { el: 'Πετρέλαιο θέρμανσης', en: 'Heating oil' } },
      { value: 'gas', label: { el: 'Φυσικό αέριο', en: 'Natural gas' } },
      { value: 'heat_pump', label: { el: 'Αντλία θερμότητας', en: 'Heat pump' } },
      { value: 'ac_heating', label: { el: 'Κλιματιστικό (θέρμανση)', en: 'AC (heating mode)' } },
      { value: 'wood', label: { el: 'Ξύλα/πέλετ', en: 'Wood/pellets' } },
      { value: 'electric_heater', label: { el: 'Ηλεκτρικό σώμα', en: 'Electric heater' } },
      { value: 'none', label: { el: 'Χωρίς θέρμανση', en: 'No heating' } },
    ],
    default: 'oil',
    quickMode: true,
  },
  {
    id: 'heating_months',
    step: 'home',
    type: 'slider',
    label: { el: 'Μήνες θέρμανσης/χρόνο', en: 'Heating months/year' },
    min: 0,
    max: 8,
    step_size: 0.5,
    default: 4,
    unit: { el: 'μήνες', en: 'months' },
    quickMode: false,
  },
  {
    id: 'heating_hours_day',
    step: 'home',
    type: 'slider',
    label: { el: 'Ώρες θέρμανσης/ημέρα', en: 'Heating hours/day' },
    min: 0,
    max: 16,
    step_size: 1,
    default: 6,
    unit: { el: 'ώρες', en: 'hours' },
    quickMode: false,
  },
  {
    id: 'home_size',
    step: 'home',
    type: 'select',
    label: { el: 'Μέγεθος σπιτιού', en: 'Home size' },
    options: [
      { value: 'studio', label: { el: 'Γκαρσονιέρα (<40m²)', en: 'Studio (<40m²)' } },
      { value: 'small', label: { el: 'Μικρό (40-70m²)', en: 'Small (40-70m²)' } },
      { value: 'medium', label: { el: 'Μεσαίο (70-100m²)', en: 'Medium (70-100m²)' } },
      { value: 'large', label: { el: 'Μεγάλο (100-150m²)', en: 'Large (100-150m²)' } },
      { value: 'xlarge', label: { el: 'Πολύ μεγάλο (>150m²)', en: 'Very large (>150m²)' } },
    ],
    default: 'medium',
    quickMode: false,
  },
  {
    id: 'insulation',
    step: 'home',
    type: 'select',
    label: { el: 'Μόνωση σπιτιού', en: 'Home insulation' },
    options: [
      { value: 'none', label: { el: 'Χωρίς μόνωση (πριν το 1980)', en: 'No insulation (pre-1980)' } },
      { value: 'partial', label: { el: 'Μερική μόνωση', en: 'Partial insulation' } },
      { value: 'good', label: { el: 'Καλή μόνωση (μετά 2010)', en: 'Good insulation (post-2010)' } },
      { value: 'excellent', label: { el: 'Άριστη / ανακαίνιση', en: 'Excellent / renovated' } },
    ],
    default: 'partial',
    quickMode: false,
  },
  {
    id: 'water_heater',
    step: 'home',
    type: 'select',
    label: { el: 'Ζεστό νερό', en: 'Hot water' },
    options: [
      { value: 'solar', label: { el: 'Ηλιακός θερμοσίφωνας', en: 'Solar heater' } },
      { value: 'electric', label: { el: 'Ηλεκτρικό μπόιλερ', en: 'Electric boiler' } },
      { value: 'gas', label: { el: 'Αέριο', en: 'Gas' } },
      { value: 'heat_pump_water', label: { el: 'Αντλία θερμότητας', en: 'Heat pump' } },
    ],
    default: 'solar',
    quickMode: false,
  },
  {
    id: 'ac_months',
    step: 'home',
    type: 'slider',
    label: { el: 'Μήνες χρήσης κλιματιστικού (ψύξη)', en: 'AC cooling months/year' },
    min: 0,
    max: 6,
    step_size: 0.5,
    default: 3,
    unit: { el: 'μήνες', en: 'months' },
    quickMode: false,
  },
  {
    id: 'ac_hours_day',
    step: 'home',
    type: 'slider',
    label: { el: 'Ώρες AC/ημέρα (καλοκαίρι)', en: 'AC hours/day (summer)' },
    min: 0,
    max: 16,
    step_size: 1,
    default: 6,
    unit: { el: 'ώρες', en: 'hours' },
    quickMode: false,
  },
  {
    id: 'household_members',
    step: 'home',
    type: 'number',
    label: { el: 'Μέλη νοικοκυριού', en: 'Household members' },
    min: 1,
    max: 10,
    default: 3,
    quickMode: false,
  },
  {
    id: 'electricity_kwh_month',
    step: 'home',
    type: 'slider',
    label: { el: 'Μηνιαία κατανάλωση ρεύματος', en: 'Monthly electricity consumption' },
    helpText: { el: 'Δες τον λογαριασμό ΔΕΗ/προμηθευτή. Μ.Ο.: ~290 kWh/μήνα', en: 'Check your electricity bill. Avg: ~290 kWh/month' },
    min: 50,
    max: 1000,
    step_size: 10,
    default: 290,
    unit: { el: 'kWh/μήνα', en: 'kWh/month' },
    quickMode: false,
  },

  // =====================================================
  // STEP 3: DIET
  // =====================================================
  {
    id: 'diet_type',
    step: 'diet',
    type: 'select',
    label: { el: 'Πώς θα περιέγραφες τη διατροφή σου;', en: 'How would you describe your diet?' },
    options: [
      { value: 'heavy_meat', label: { el: 'Πολύ κρέας (κάθε μέρα)', en: 'Heavy meat (every day)' } },
      { value: 'medium_meat', label: { el: 'Μέτριο κρέας (3-5x/εβδ.)', en: 'Medium meat (3-5x/week)' } },
      { value: 'low_meat', label: { el: 'Λίγο κρέας (1-2x/εβδ.)', en: 'Low meat (1-2x/week)' } },
      { value: 'pescatarian', label: { el: 'Ψαροφάγος', en: 'Pescatarian' } },
      { value: 'vegetarian', label: { el: 'Χορτοφάγος', en: 'Vegetarian' } },
      { value: 'vegan', label: { el: 'Vegan', en: 'Vegan' } },
    ],
    default: 'medium_meat',
    quickMode: true,
  },
  {
    id: 'beef_frequency',
    step: 'diet',
    type: 'select',
    label: { el: 'Πόσο συχνά τρως μοσχάρι/αρνί;', en: 'How often do you eat beef/lamb?' },
    options: [
      { value: 'daily', label: { el: 'Σχεδόν κάθε μέρα', en: 'Almost daily' } },
      { value: '3_week', label: { el: '3+ φορές/εβδ.', en: '3+ times/week' } },
      { value: '1_week', label: { el: '1-2 φορές/εβδ.', en: '1-2 times/week' } },
      { value: '2_month', label: { el: '2-3 φορές/μήνα', en: '2-3 times/month' } },
      { value: 'rarely', label: { el: 'Σπάνια/ποτέ', en: 'Rarely/never' } },
    ],
    default: '1_week',
    quickMode: false,
  },
  {
    id: 'dairy_frequency',
    step: 'diet',
    type: 'select',
    label: { el: 'Γαλακτοκομικά (γάλα, τυρί, γιαούρτι)', en: 'Dairy (milk, cheese, yogurt)' },
    options: [
      { value: 'heavy', label: { el: 'Πολύ (κάθε γεύμα)', en: 'Heavy (every meal)' } },
      { value: 'moderate', label: { el: 'Μέτρια (1x/ημέρα)', en: 'Moderate (1x/day)' } },
      { value: 'light', label: { el: 'Λίγα (μερικές φορές/εβδ.)', en: 'Light (few times/week)' } },
      { value: 'none', label: { el: 'Καθόλου', en: 'None' } },
    ],
    default: 'moderate',
    quickMode: false,
  },
  {
    id: 'coffee_cups_day',
    step: 'diet',
    type: 'number',
    label: { el: 'Καφέδες/ημέρα', en: 'Coffees/day' },
    min: 0,
    max: 10,
    default: 2,
    quickMode: false,
  },
  {
    id: 'food_waste',
    step: 'diet',
    type: 'select',
    label: { el: 'Πόσο φαγητό πετάς;', en: 'How much food do you waste?' },
    options: [
      { value: 'a_lot', label: { el: 'Πολύ (>25%)', en: 'A lot (>25%)' } },
      { value: 'some', label: { el: 'Κάτι (10-25%)', en: 'Some (10-25%)' } },
      { value: 'little', label: { el: 'Λίγο (<10%)', en: 'Little (<10%)' } },
      { value: 'almost_none', label: { el: 'Σχεδόν τίποτα', en: 'Almost nothing' } },
    ],
    default: 'some',
    quickMode: false,
  },
  {
    id: 'bottled_water',
    step: 'diet',
    type: 'select',
    label: { el: 'Εμφιαλωμένο νερό', en: 'Bottled water' },
    options: [
      { value: 'always', label: { el: 'Πάντα εμφιαλωμένο', en: 'Always bottled' } },
      { value: 'sometimes', label: { el: 'Μερικές φορές', en: 'Sometimes' } },
      { value: 'rarely', label: { el: 'Σπάνια (βρύση + φίλτρο)', en: 'Rarely (tap + filter)' } },
    ],
    default: 'sometimes',
    quickMode: false,
  },

  // =====================================================
  // STEP 4: CONSUMPTION
  // =====================================================
  {
    id: 'shopping_habits',
    step: 'consumption',
    type: 'select',
    label: { el: 'Αγοραστικές συνήθειες (ρούχα, gadgets)', en: 'Shopping habits (clothes, gadgets)' },
    options: [
      { value: 'high', label: { el: 'Πολλά (>€200/μήνα)', en: 'High (>€200/month)' } },
      { value: 'medium', label: { el: 'Μέτρια (€50-200/μήνα)', en: 'Medium (€50-200/month)' } },
      { value: 'low', label: { el: 'Λίγα (<€50/μήνα)', en: 'Low (<€50/month)' } },
      { value: 'minimal', label: { el: 'Ελάχιστα/second-hand', en: 'Minimal/second-hand' } },
    ],
    default: 'medium',
    quickMode: false,
  },
  {
    id: 'new_electronics_year',
    step: 'consumption',
    type: 'number',
    label: { el: 'Νέες ηλεκτρονικές συσκευές/χρόνο', en: 'New electronic devices/year' },
    helpText: { el: 'Κινητά, laptop, tablet, κλπ.', en: 'Phones, laptops, tablets, etc.' },
    min: 0,
    max: 10,
    default: 1,
    quickMode: false,
  },
  {
    id: 'clothing_items_year',
    step: 'consumption',
    type: 'slider',
    label: { el: 'Νέα ρούχα/χρόνο (τεμάχια)', en: 'New clothing items/year' },
    min: 0,
    max: 100,
    step_size: 5,
    default: 20,
    quickMode: false,
  },
  {
    id: 'online_orders_month',
    step: 'consumption',
    type: 'number',
    label: { el: 'Online παραγγελίες/μήνα', en: 'Online orders/month' },
    min: 0,
    max: 50,
    default: 3,
    quickMode: false,
  },

  // =====================================================
  // STEP 5: WASTE
  // =====================================================
  {
    id: 'recycling',
    step: 'waste',
    type: 'select',
    label: { el: 'Ανακυκλώνεις;', en: 'Do you recycle?' },
    options: [
      { value: 'always', label: { el: 'Πάντα (χαρτί, πλαστικό, γυαλί, μέταλλο)', en: 'Always (paper, plastic, glass, metal)' } },
      { value: 'sometimes', label: { el: 'Μερικές φορές', en: 'Sometimes' } },
      { value: 'rarely', label: { el: 'Σπάνια', en: 'Rarely' } },
      { value: 'never', label: { el: 'Ποτέ', en: 'Never' } },
    ],
    default: 'sometimes',
    quickMode: false,
  },
  {
    id: 'composting',
    step: 'waste',
    type: 'select',
    label: { el: 'Κομποστοποιείς;', en: 'Do you compost?' },
    options: [
      { value: 'yes', label: { el: 'Ναι', en: 'Yes' } },
      { value: 'no', label: { el: 'Όχι', en: 'No' } },
    ],
    default: 'no',
    quickMode: false,
  },
];
