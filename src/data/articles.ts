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
    id: 'beyond-co2-greece',
    slug: 'beyond-co2-unpacking-greece-ghg-emissions',
    title: {
      el: 'Πέρα από το CO2: Αποκωδικοποιώντας τις Εκπομπές Αερίων του Θερμοκηπίου της Ελλάδας',
      en: "Beyond CO2: Unpacking Greece's Greenhouse Gas Emissions",
    },
    excerpt: {
      el: 'Όταν συζητάμε για το κλιματικό αποτύπωμα της Ελλάδας —το οποίο σήμερα κυμαίνεται περίπου στους 61 μεγατόνους ισοδύναμου CO2 (CO2e) ετησίως— η συζήτηση συνήθως περιστρέφεται γύρω από τους σταθμούς παραγωγής ενέργειας, τα αυτοκίνητα και τα φουγάρα. Αν και τα ορυκτά καύσιμα αποτελούν πράγματι τον κύριο παράγοντα, το να εξετάζουμε το αποτύπωμα της χώρας αυστηρά μέσα από το πρίσμα του διοξειδίου του άνθρακα μας κρύβει ένα κρίσιμο μέρος της συνολικής εικόνας.',
      en: "When we talk about Greece's climate footprint—currently hovering around 61 megatonnes of CO2-equivalent (CO2e) per year—the conversation usually steers toward power plants, cars, and smokestacks. While fossil fuels are indeed the primary driver, viewing the country's footprint strictly through the lens of carbon dioxide misses a crucial part of the picture.",
    },
    category: 'analysis',
    categoryLabel: { el: 'Ανάλυση', en: 'Analysis' },
    date: '2026-02-25',
    icon: '🇬🇷',
    sections: [
      {
        heading: {
          el: '',
          en: '',
        },
        body: {
          el: 'Επειδή τα διαφορετικά αέρια παγιδεύουν τη θερμότητα με πολύ διαφορετικούς ρυθμούς (μια μέτρηση γνωστή ως Δυναμικό Υπερθέρμανσης του Πλανήτη, ή GWP100), μια σχετικά μικρή φυσική ποσότητα μεθανίου από μια κτηνοτροφική μονάδα μπορεί να συγκριθεί σε κλιματικό αντίκτυπο με έναν πολύ μεγαλύτερο όγκο CO2 από ένα εργοστάσιο.\n\nΑκολουθεί η πραγματική ανάλυση του προφίλ εκπομπών της Ελλάδας και από πού προέρχεται ουσιαστικά η ζημιά στο κλίμα.',
          en: 'Because different gases trap heat at vastly different rates (a metric known as Global Warming Potential, or GWP100), a relatively small physical amount of methane from a farm can rival the climate impact of a much larger volume of CO2 from a factory.\n\nHere is the real breakdown of Greece\'s emissions profile and where the damage is actually coming from.',
        },
      },
      {
        heading: {
          el: 'Ο "Γίγαντας": Ορυκτό CO2 (Ενέργεια & Μεταφορές)',
          en: 'The Heavyweight: Fossil CO2 (Energy & Transport)',
        },
        body: {
          el: 'Το διοξείδιο του άνθρακα είναι το αέριο βάσης (GWP = 1), αλλά ο τεράστιος όγκος του το καθιστά τον αδιαμφισβήτητο κυρίαρχο στο προφίλ εκπομπών της Ελλάδας.\n\n• Η Πτώση του Λιγνίτη: Ιστορικά, η Ελλάδα βασιζόταν σε μεγάλο βαθμό στον εγχώριο λιγνίτη για την παραγωγή ηλεκτρικής ενέργειας. Την τελευταία δεκαετία, ο τομέας αυτός έχει γνωρίσει μια ραγδαία, επιτυχημένη πτώση, ωθώντας τις συνολικές εκπομπές της χώρας προς τα κάτω.\n\n• Η Άνοδος του Αερίου & η Επιμονή του Πετρελαίου: Η μείωση του άνθρακα έχει δυστυχώς αντισταθμιστεί εν μέρει από την αυξημένη εξάρτηση από το φυσικό αέριο για την παραγωγή ενέργειας και τη θέρμανση. Εν τω μεταξύ, το πετρέλαιο παραμένει η κυρίαρχη πηγή εκπομπών, οδηγούμενο σε μεγάλο βαθμό από τις μεταφορές (αυτοκίνητα, ναυτιλία) και τις ενεργειακές ανάγκες των μη διασυνδεδεμένων νησιών.',
          en: 'Carbon dioxide is the baseline gas (GWP = 1), but its sheer volume makes it the undisputed giant in Greece\'s emissions profile.\n\n• The Fall of Coal: Historically, Greece relied heavily on domestically mined lignite (brown coal) for electricity. Over the last decade, this sector has seen a rapid, successful decline, driving the country\'s overall emissions downward.\n\n• The Rise of Gas & Persistence of Oil: The reduction in coal has unfortunately been partially offset by an increased reliance on natural gas for power generation and heating. Meanwhile, oil remains the dominant emissions source, driven heavily by transportation (cars, shipping) and the energy needs of non-interconnected islands.',
        },
      },
      {
        heading: {
          el: 'Οι "Κρυφοί" Πολλαπλασιαστές: Μεθάνιο (CH4) & Υποξείδιο του Αζώτου (N2O)',
          en: 'The Stealth Multipliers: Methane (CH4) & Nitrous Oxide (N2O)',
        },
        body: {
          el: 'Εδώ είναι που τα μαθηματικά του GWP αλλάζουν ριζικά την εικόνα. Το μεθάνιο είναι περίπου 28 φορές πιο ισχυρό από το CO2 σε διάστημα 100 ετών και το υποξείδιο του αζώτου είναι περίπου 265 φορές πιο ισχυρό.\n\n• Γεωργία και Κτηνοτροφία: Η Ελλάδα διαθέτει έναν τεράστιο αγροτικό τομέα, ιδιαίτερα πλούσιο σε αιγοπροβατοτροφία. Οι πεπτικές διαδικασίες αυτών των ζώων (εντερική ζύμωση), σε συνδυασμό με τη διαχείριση της κοπριάς, απελευθερώνουν σταθερές ροές μεθανίου. Όταν εφαρμόζετε τον πολλαπλασιαστή x28, αυτό το "αόρατο" αγροτικό αέριο καταλαμβάνει ξαφνικά ένα εξαιρετικά σημαντικό κομμάτι της εθνικής πίτας του CO2e. Επιπλέον, η χρήση συνθετικών αζωτούχων λιπασμάτων στη γεωργία απελευθερώνει Υποξείδιο του Αζώτου, προσθέτοντας ένα τεράστιο κλιματικό "χτύπημα" της τάξης του x265 ανά τόνο.\n\n• Διαχείριση Αποβλήτων: Οι ΧΥΤΑ (Χώροι Υγειονομικής Ταφής Απορριμμάτων) αποτελούν τη δεύτερη σημαντικότερη πηγή μεθανίου στην Ελλάδα. Καθώς τα οργανικά απόβλητα αποσυντίθενται χωρίς οξυγόνο κάτω από σωρούς σκουπιδιών, παράγουν βιοαέριο.',
          en: 'This is where the GWP math radically shifts the picture. Methane is about 28 times more potent than CO2 over a 100-year period, and Nitrous Oxide is roughly 265 times more potent.\n\n• Agriculture and Livestock: Greece has a massive agricultural sector, particularly rich in sheep and goat farming. The digestive processes of these animals (enteric fermentation), along with manure management, release steady streams of methane. When you apply the x28 multiplier, this "invisible" agricultural gas suddenly accounts for a highly significant slice of the national CO2e pie. Additionally, the use of synthetic nitrogen fertilizers in farming releases Nitrous Oxide, packing a massive x265 climate punch per tonne.\n\n• Waste Management: Landfills are the second major source of Greek methane. As organic waste decomposes without oxygen under piles of trash, it generates landfill gas.',
        },
      },
      {
        heading: {
          el: 'Τα Συνθετικά Αέρια: F-Gases',
          en: 'The Synthetic Heaters: F-Gases',
        },
        body: {
          el: 'Τα φθοριούχα αέρια, που χρησιμοποιούνται κυρίως στην ψύξη και τον κλιματισμό, υπάρχουν σε ελάχιστες φυσικές ποσότητες. Ωστόσο, με τιμές GWP που φτάνουν τις χιλιάδες, ακόμη και μικρές διαρροές από βιομηχανικά συστήματα ψύξης ή απορριφθέντα οικιακά κλιματιστικά προσθέτουν ένα σημαντικό κομμάτι στο σύνολο των 61 μεγατόνων.',
          en: 'Fluorinated gases, used primarily in refrigeration and air conditioning, exist in tiny physical quantities. However, with GWP values in the thousands, even small leaks from industrial cooling systems or discarded household AC units add a meaningful chunk to the 61-megatonne total.',
        },
      },
      {
        heading: {
          el: 'Το Συμπέρασμα για την Ελλάδα',
          en: 'The Bottom Line for Greece',
        },
        body: {
          el: 'Η αποτελεσματική παρακολούθηση των εκπομπών σημαίνει παρακολούθηση όλων των αερίων, όχι μόνο αυτών που βγαίνουν από τις εξατμίσεις. Ενώ η απαλλαγή του ενεργειακού δικτύου από τον άνθρακα και ο εξηλεκτρισμός των μεταφορών (με στόχο το CO2) παραμένει η νούμερο ένα προτεραιότητα, η επίτευξη πραγματικών καθαρών μηδενικών εκπομπών θα απαιτήσει τον εκσυγχρονισμό της διαχείρισης αποβλήτων (για τη δέσμευση του βιοαερίου) και την υιοθέτηση πιο έξυπνων γεωργικών πρακτικών με χαμηλότερες εκπομπές.',
          en: 'Tracking emissions effectively means tracking all gases, not just the ones coming out of an exhaust pipe. While decarbonizing the energy grid and electrifying transport (targeting CO2) remains priority number one, achieving true net-zero will require modernizing waste management to capture landfill gas and adopting smarter, lower-emission agricultural practices.',
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
