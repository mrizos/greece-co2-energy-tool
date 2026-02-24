export interface ArticleSection {
  heading: { el: string; en: string };
  body: { el: string; en: string };
}

export interface Article {
  id: string;
  slug: string;
  title: { el: string; en: string };
  excerpt: { el: string; en: string };
  category: string;
  categoryLabel: { el: string; en: string };
  date: string;
  icon: string;
  sections: ArticleSection[];
  sources: { name: string; url?: string }[];
}

export const articles: Article[] = [
  {
    id: 'greece-progress-2023',
    slug: 'greece-progress-recent-impact',
    title: {
      el: 'Η Πρόοδος της Ελλάδας και ο Πρόσφατος Αντίκτυπος',
      en: "Greece's Progress and Recent Impact",
    },
    excerpt: {
      el: 'Ανάλυση των εκπομπών αερίων θερμοκηπίου της Ελλάδας: τρέχουσα εικόνα, τι οδηγεί τις εκπομπές, τάσεις δεκαετίας και προτεραιότητες δράσης.',
      en: "Analysis of Greece's greenhouse gas emissions: current snapshot, what drives the total, decade trends, and actionable priorities.",
    },
    category: 'analysis',
    categoryLabel: { el: 'Ανάλυση', en: 'Analysis' },
    date: '2026-02-24',
    icon: '🇬🇷',
    sections: [
      {
        heading: {
          el: 'Τελευταίο Στιγμιότυπο Εκπομπών',
          en: 'Latest Emissions Snapshot',
        },
        body: {
          el: 'Οι συνολικές ανθρωπογενείς εκπομπές αερίων θερμοκηπίου της Ελλάδας ανέρχονται σε ~61 εκατ. τόνους CO₂-ισοδύναμου (2023), αντιπροσωπεύοντας περίπου 0.11% του παγκόσμιου συνόλου. Σε κατά κεφαλήν βάση, οι εκπομπές είναι ~6.1 τόνοι/κάτοικο/χρόνο — κατηγορία "Υψηλή", πολύ πάνω από το σχεδόν μηδενικό επίπεδο που απαιτείται για τη διακοπή της θέρμανσης, αλλά κάτω από τον μέσο όρο της ΕΕ (~8 τόνοι) και τον στόχο του Παρισιού (~2.3 τόνοι).',
          en: "Greece's total anthropogenic greenhouse gas emissions are about 61 megatonnes of CO₂-equivalent (2023), representing roughly 0.11% of the global total. On a per-person basis, emissions are about 6.1 tonnes per capita per year — a \"High\" category, well above the near-zero level needed to stop adding warming, but below the EU average (~8 tonnes) and Paris target (~2.3 tonnes).",
        },
      },
      {
        heading: {
          el: 'Τι Οδηγεί τις Εκπομπές',
          en: 'What Drives The Total',
        },
        body: {
          el: 'Το ορυκτό CO₂ αντιπροσωπεύει τη μεγάλη πλειοψηφία, ενώ οι χρήσεις γης και η δασοκομία λειτουργούν ως καθαρή δεξαμενή απορρόφησης. Στο ορυκτό CO₂, το πετρέλαιο είναι η κυρίαρχη πηγή, το φυσικό αέριο η δεύτερη μεγαλύτερη (αυξανόμενη τη δεκαετία), και ο λιγνίτης/γαιάνθρακας πλέον μικρό και ταχέως μειούμενο μερίδιο. Μεθάνιο και F-αέρια αποτελούν σημαντική μειοψηφία — το μεθάνιο κυρίως από απόβλητα και κτηνοτροφία, το υποξείδιο του αζώτου κυρίως από γεωργία, αμφότερα με σταδιακή μείωση.',
          en: 'Fossil CO₂ accounts for the large majority of emissions, while land use and forestry act as a net carbon sink that partially offsets the total. Within fossil CO₂, oil is the dominant source, gas is the second-largest and has been rising over the decade, and coal is now a smaller share and shrinking quickly. Methane and F-gases together form a meaningful minority, with methane mainly from waste and livestock and nitrous oxide primarily from agriculture, both trending down gradually.',
        },
      },
      {
        heading: {
          el: 'Τάση Δεκαετίας & Ρυθμός Μείωσης',
          en: 'Decade Trend & Pace',
        },
        body: {
          el: 'Τη τελευταία δεκαετία, οι συνολικές εκπομπές μειώθηκαν κατά ~3.6 Mt/χρόνο, δηλαδή ~4-5% μείωση ετησίως. Αυτός ο ρυθμός είναι ελαφρώς ταχύτερος από το παγκόσμιο benchmark ~4% (συμβατό με net-zero μέχρι το 2050), αλλά πολύ μακριά από τη μείωση ~17% ετησίως που απαιτείται για ευθυγράμμιση με τραχτηρία 1.5°C. Η πτώση οδηγείται κυρίως από δραστικές μειώσεις στον λιγνίτη, ευρεία μείωση μεθανίου, N₂O και F-αερίων, εν μέρει αντισταθμιζόμενη από αύξηση φυσικού αερίου και μόνο μέτρια μείωση πετρελαίου.',
          en: 'Over the last decade, total emissions have declined by around 3.6 megatonnes per year, roughly a 4-5% drop per year relative to recent levels. This pace is slightly faster than the ~4% global benchmark consistent with a net-zero-by-2050 path, though far from the ~17% annual decline needed to align with a 1.5°C trajectory. The overall fall is driven by steep reductions in coal and broad declines in methane, nitrous oxide, and F-gases, partly offset by growth in gas and only modest declines in oil.',
        },
      },
      {
        heading: {
          el: 'Προτεραιότητες Δράσης',
          en: 'Actionable Priorities',
        },
        body: {
          el: 'Για γρήγορη μείωση εκπομπών από υψηλή κατά κεφαλήν βάση:\n\n1. Επιτάχυνση της μείωσης του λιγνίτη (σχεδόν ολοκληρωμένη)\n2. Αντιστροφή της αύξησης φυσικού αερίου — μετάβαση σε ΑΠΕ + αποθήκευση\n3. Μείωση εκπομπών πετρελαίου (μεταφορές + θέρμανση): EVs, αντλίες θερμότητας, θερμομόνωση\n4. Διατήρηση και ενίσχυση της δεξαμενής απορρόφησης (δάση, χρήσεις γης)\n5. Σταθερή μείωση μεθανίου (απόβλητα, κτηνοτροφία) και N₂O (γεωργία)\n6. Συνέχιση μείωσης F-αερίων\n\nΑυτά στοχεύουν τις μεγαλύτερες και πιο δυναμικές πηγές εκπομπών.',
          en: "To cut emissions rapidly from a High per-capita baseline:\n\n1. Accelerate coal decline (nearly complete)\n2. Reverse gas growth — transition to renewables + storage\n3. Drive down oil emissions (transport + heating): EVs, heat pumps, insulation\n4. Maintain and strengthen the land-use carbon sink (forests)\n5. Sustain steady decreases in methane (waste, livestock) and N₂O (agriculture)\n6. Continue reducing F-gases\n\nThese steps target the largest and most dynamic emission sources shown in the data.",
        },
      },
      {
        heading: {
          el: 'Γιατί Μετράει κάθε Χώρα — Ακόμα και οι Μικρές',
          en: 'Why Every Country Matters — Even Small Emitters',
        },
        body: {
          el: 'Το μερίδιο 0.11% της Ελλάδας μπορεί να φαίνεται μικρό, αλλά:\n\n• 24 χώρες με μερίδιο 0.5-1.5% η καθεμία = 20% του συνόλου\n• 162 χώρες κάτω από 0.5% = 15% του συνόλου\n• Μόνο 3 χώρες (Κίνα, ΗΠΑ, Ινδία) = 44% — αλλά Κίνα+Ινδία = 2.9 δισ. πληθυσμός\n\nΟι κατά κεφαλήν εκπομπές είναι ο πιο δίκαιος δείκτης αντικτύπου, ανεξαρτήτως μεγέθους χώρας.',
          en: "Greece's 0.11% share may seem small, but:\n\n• 24 nations at 0.5-1.5% each account for 20% of total emissions\n• 162 nations below 0.5% account for 15% of the total\n• Only 3 nations (China, US, India) make 44% — but China+India have 2.9 billion people\n\nPer capita emissions are therefore the most crucial indicator of impact regardless of nation size.",
        },
      },
      {
        heading: {
          el: 'Σχετικά με τα Δεδομένα',
          en: 'About the Data',
        },
        body: {
          el: 'Τα δεδομένα CO₂ προέρχονται από το Global Carbon Project (τελευταίο διαθέσιμο έτος: 2023). Οι εκπομπές CH₄, N₂O και F-αερίων από το σύνολο δεδομένων PRIMAP-Hist — ένα πλούσιο σύνολο που συνδυάζει πολλές δημοσιευμένες πηγές. Δημογραφικά στοιχεία από Global Carbon Project και Our World in Data.',
          en: 'CO₂ emissions data is from the Global Carbon Project (last available year: 2023). CH₄, N₂O, and F-gas emissions come from the PRIMAP-Hist dataset — a comprehensive dataset combining several published sources. Population data from Global Carbon Project and Our World in Data.',
        },
      },
    ],
    sources: [
      { name: 'Climate Change Tracker', url: 'https://climatechangetracker.org' },
      { name: 'Global Carbon Project', url: 'https://globalcarbonproject.org' },
      { name: 'PRIMAP-Hist Dataset' },
      { name: 'Our World in Data', url: 'https://ourworldindata.org' },
      { name: 'Ember Climate', url: 'https://ember-climate.org' },
    ],
  },
];
