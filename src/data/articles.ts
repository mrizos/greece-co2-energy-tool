export interface ArticleSection {
  heading: { el: string; en: string };
  body: { el: string; en: string };
  chartId?: string;
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
      el: 'Πέρα από το CO₂: Αποκωδικοποιώντας τις Εκπομπές Αερίων του Θερμοκηπίου της Ελλάδας',
      en: "Beyond CO₂: Unpacking Greece's Greenhouse Gas Emissions",
    },
    excerpt: {
      el: 'Όταν συζητάμε για το κλιματικό αποτύπωμα της Ελλάδας \u2014το οποίο σήμερα εκτιμάται σε ~57 μεγατόνους ισοδύναμου CO₂ (CO₂e) ετησίως [2]\u2014 η συζήτηση συνήθως περιστρέφεται γύρω από τους σταθμούς παραγωγής ενέργειας, τα αυτοκίνητα και τις βιομηχανικές μονάδες. Αν και τα ορυκτά καύσιμα αποτελούν πράγματι τον κύριο παράγοντα, το να εξετάζουμε το αποτύπωμα της χώρας αυστηρά μέσα από το πρίσμα του διοξειδίου του άνθρακα μας κρύβει ένα κρίσιμο μέρος της συνολικής εικόνας.',
      en: "When we talk about Greece's climate footprint\u2014currently estimated at ~57 megatonnes of CO\u2082-equivalent (CO\u2082e) per year [2]\u2014the conversation usually steers toward power plants, cars, and industrial facilities. While fossil fuels are indeed the primary driver, viewing the country's footprint strictly through the lens of carbon dioxide misses a crucial part of the picture.",
    },
    category: 'analysis',
    categoryLabel: { el: 'Ανάλυση', en: 'Analysis' },
    date: '2026-02-25',
    icon: '🇬🇷',
    sections: [
      {
        heading: { el: '', en: '' },
        body: {
          el: 'Οι εκπομπές αερίων θερμοκηπίου της Ελλάδας έχουν μειωθεί σημαντικά τα τελευταία χρόνια, από ~132 Mt CO₂e στο peak (2005) σε ~57 Mt CO₂e (εκτίμηση 2024) [2][3]. Το CO₂ αντιπροσωπεύει περίπου 75% των εκπομπών, το CH₄ ~13%, το N₂O ~6% και τα F-gases ~6% [1].\n\nΕπειδή τα διαφορετικά αέρια παγιδεύουν τη θερμότητα με πολύ διαφορετικούς ρυθμούς (μια μέτρηση γνωστή ως Δυναμικό Υπερθέρμανσης του Πλανήτη, ή GWP₁₀₀), μια σχετικά μικρή φυσική ποσότητα μεθανίου από μια κτηνοτροφική μονάδα μπορεί να συγκριθεί σε κλιματικό αντίκτυπο με έναν πολύ μεγαλύτερο όγκο CO₂ από ένα εργοστάσιο.\n\nΑκολουθεί η πραγματική ανάλυση του προφίλ εκπομπών της Ελλάδας και από πού προέρχεται ουσιαστικά η ζημιά στο κλίμα.',
          en: 'Greece\'s greenhouse gas emissions have decreased significantly in recent years, from ~132 Mt CO₂e at their peak (2005) to ~57 Mt CO₂e (2024 estimate) [2][3]. CO₂ accounts for approximately 75% of emissions, CH₄ ~13%, N₂O ~6%, and F-gases ~6% [1].\n\nBecause different gases trap heat at vastly different rates (a metric known as Global Warming Potential, or GWP₁₀₀), a relatively small physical amount of methane from a farm can rival the climate impact of a much larger volume of CO₂ from a factory.\n\nHere is the real breakdown of Greece\'s emissions profile and where the damage is actually coming from.',
        },
        chartId: 'greece-ghg-trend',
      },
      {
        heading: {
          el: 'Ανάλυση εκπομπών κατά αέριο',
          en: 'GHG Breakdown by Gas',
        },
        body: {
          el: 'Το παρακάτω γράφημα δείχνει τη σύνθεση των εκπομπών αερίων θερμοκηπίου της Ελλάδας ανά τύπο αερίου [1]. Παρότι το CO₂ κυριαρχεί σε όγκο, τα υπόλοιπα αέρια \u2014ιδίως το μεθάνιο\u2014 επιβαρύνουν δυσανάλογα το κλιματικό ισοζύγιο λόγω του πολύ υψηλότερου δυναμικού υπερθέρμανσής τους.',
          en: 'The chart below shows the composition of Greece\'s greenhouse gas emissions by gas type [1]. Although CO₂ dominates by volume, the remaining gases\u2014particularly methane\u2014burden the climate balance disproportionately due to their much higher warming potential.',
        },
        chartId: 'ghg-breakdown-pie',
      },
      {
        heading: {
          el: 'Ο "Γίγαντας": Ορυκτό CO₂ (Ενέργεια & Μεταφορές)',
          en: 'The Heavyweight: Fossil CO₂ (Energy & Transport)',
        },
        body: {
          el: 'Το διοξείδιο του άνθρακα είναι το αέριο βάσης (GWP = 1), αλλά ο τεράστιος όγκος του το καθιστά τον αδιαμφισβήτητο κυρίαρχο στο προφίλ εκπομπών της Ελλάδας. Το CO₂ αποτελεί ~75% των εκπομπών, με τις μεταφορές (~24%), τη βιομηχανία (~21%) και την ενεργειακή παραγωγή (~20%) να αποτελούν τους βασικούς τομείς [1][6].\n\n\u2022 Η Πτώση του Λιγνίτη: Ιστορικά, η Ελλάδα βασιζόταν σε μεγάλο βαθμό στον εγχώριο λιγνίτη για την παραγωγή ηλεκτρικής ενέργειας. Την τελευταία δεκαετία, ο τομέας αυτός έχει γνωρίσει μια ραγδαία πτώση, ωθώντας τις συνολικές εκπομπές προς τα κάτω [5].\n\n\u2022 Η Άνοδος του Αερίου & η Επιμονή του Πετρελαίου: Η μείωση του λιγνίτη έχει δυστυχώς αντισταθμιστεί εν μέρει από την αυξημένη εξάρτηση από το φυσικό αέριο για την παραγωγή ενέργειας και τη θέρμανση. Εν τω μεταξύ, το πετρέλαιο παραμένει η κυρίαρχη πηγή εκπομπών, οδηγούμενο σε μεγάλο βαθμό από τις μεταφορές (αυτοκίνητα, ναυτιλία) και τις ενεργειακές ανάγκες των μη διασυνδεδεμένων νησιών [3].',
          en: 'Carbon dioxide is the baseline gas (GWP = 1), but its sheer volume makes it the undisputed giant in Greece\'s emissions profile. CO₂ accounts for ~75% of emissions, with transport (~24%), industry (~21%), and energy production (~20%) being the key sectors [1][6].\n\n\u2022 The Fall of Lignite: Historically, Greece relied heavily on domestically mined lignite (brown coal) for electricity. Over the last decade, this sector has seen a rapid decline, driving the country\'s overall emissions downward [5].\n\n\u2022 The Rise of Gas & Persistence of Oil: The reduction in coal has unfortunately been partially offset by an increased reliance on natural gas for power generation and heating. Meanwhile, oil remains the dominant emissions source, driven heavily by transportation (cars, shipping) and the energy needs of non-interconnected islands [3].',
        },
      },
      {
        heading: {
          el: 'Οι "Κρυφοί" Πολλαπλασιαστές: Μεθάνιο (CH₄) & Υποξείδιο του Αζώτου (N₂O)',
          en: 'The Stealth Multipliers: Methane (CH₄) & Nitrous Oxide (N₂O)',
        },
        body: {
          el: 'Εδώ είναι που τα μαθηματικά του GWP αλλάζουν ριζικά την εικόνα. Το μεθάνιο είναι περίπου 28 φορές πιο ισχυρό από το CO₂ σε διάστημα 100 ετών και το υποξείδιο του αζώτου είναι περίπου 265 φορές πιο ισχυρό [4]. Αυτό σημαίνει ότι ακόμη και μικρές ποσότητες αυτών των αερίων από τη γεωργία και τα απόβλητα μπορούν να επιβαρύνουν δυσανάλογα το κλιματικό ισοζύγιο.\n\n\u2022 Γεωργία και Κτηνοτροφία: Η Ελλάδα διαθέτει έναν τεράστιο αγροτικό τομέα, ιδιαίτερα πλούσιο σε αιγοπροβατοτροφία. Οι πεπτικές διαδικασίες αυτών των ζώων (εντερική ζύμωση), σε συνδυασμό με τη διαχείριση της κοπριάς, απελευθερώνουν σταθερές ροές μεθανίου. Με τον πολλαπλασιαστή x28, αυτό το "αόρατο" αγροτικό αέριο καταλαμβάνει ξαφνικά σημαντικό μερίδιο \u2014περίπου 13%\u2014 της εθνικής πίτας εκπομπών σε CO₂e [1]. Επιπλέον, η χρήση συνθετικών αζωτούχων λιπασμάτων στη γεωργία απελευθερώνει Υποξείδιο του Αζώτου, προσθέτοντας ένα κλιματικό "χτύπημα" της τάξης του x265 ανά τόνο [4].\n\n\u2022 Διαχείριση Αποβλήτων: Οι ΧΥΤΑ (Χώροι Υγειονομικής Ταφής Απορριμμάτων) αποτελούν τη δεύτερη σημαντικότερη πηγή μεθανίου στην Ελλάδα. Καθώς τα οργανικά απόβλητα αποσυντίθενται χωρίς οξυγόνο κάτω από σωρούς σκουπιδιών, παράγουν βιοαέριο πλούσιο σε μεθάνιο [1].',
          en: 'This is where the GWP math radically shifts the picture. Methane is about 28 times more potent than CO₂ over a 100-year period, and Nitrous Oxide is roughly 265 times more potent [4]. This means that even small quantities of these gases from agriculture and waste can burden the climate balance disproportionately.\n\n\u2022 Agriculture and Livestock: Greece has a massive agricultural sector, particularly rich in sheep and goat farming. The digestive processes of these animals (enteric fermentation), along with manure management, release steady streams of methane. With the x28 multiplier, this "invisible" agricultural gas suddenly claims a significant share\u2014about 13%\u2014of the national CO₂e emissions pie [1]. Additionally, the use of synthetic nitrogen fertilizers in farming releases Nitrous Oxide, packing a massive x265 climate punch per tonne [4].\n\n\u2022 Waste Management: Landfills are the second major source of Greek methane. As organic waste decomposes without oxygen under piles of trash, it generates biogas rich in methane [1].',
        },
      },
      {
        heading: {
          el: 'Τα Συνθετικά Αέρια: F-Gases',
          en: 'The Synthetic Heaters: F-Gases',
        },
        body: {
          el: 'Τα φθοριούχα αέρια, που χρησιμοποιούνται κυρίως στην ψύξη και τον κλιματισμό, υπάρχουν σε ελάχιστες φυσικές ποσότητες. Ωστόσο, με τιμές GWP που φτάνουν τις χιλιάδες, ακόμη και μικρές διαρροές από βιομηχανικά συστήματα ψύξης ή απορριφθέντα οικιακά κλιματιστικά προσθέτουν ένα σημαντικό ~6% στο σύνολο των εκπομπών [1].',
          en: 'Fluorinated gases, used primarily in refrigeration and air conditioning, exist in tiny physical quantities. However, with GWP values in the thousands, even small leaks from industrial cooling systems or discarded household AC units add a significant ~6% to total emissions [1].',
        },
      },
      {
        heading: {
          el: 'Το Συμπέρασμα για την Ελλάδα',
          en: 'The Bottom Line for Greece',
        },
        body: {
          el: 'Η αποτελεσματική παρακολούθηση των εκπομπών σημαίνει παρακολούθηση όλων των αερίων, όχι μόνο αυτών που σχετίζονται με τα ορυκτά καύσιμα. Ενώ η απεξάρτηση του ενεργειακού δικτύου από τα ορυκτά καύσιμα και ο εξηλεκτρισμός των μεταφορών (με στόχο το CO₂) παραμένει η νούμερο ένα προτεραιότητα, η επίτευξη πραγματικών καθαρών μηδενικών εκπομπών θα απαιτήσει τον εκσυγχρονισμό της διαχείρισης αποβλήτων (για τη δέσμευση του βιοαερίου) και την υιοθέτηση πιο έξυπνων γεωργικών πρακτικών με χαμηλότερες εκπομπές [3].',
          en: 'Tracking emissions effectively means tracking all gases, not just those associated with fossil fuels. While decoupling the energy grid from fossil fuels and electrifying transport (targeting CO₂) remains priority number one, achieving true net-zero will require modernizing waste management to capture landfill gas and adopting smarter, lower-emission agricultural practices [3].',
        },
      },
    ],
    sources: [
      { name: '[1] Emission-Index.com \u2014 Greece GHG Profile', url: 'https://www.emission-index.com/countries/greece' },
      { name: '[2] Climate Change Tracker \u2014 Greece GHG Emissions', url: 'https://climatechangetracker.org/nations/greenhouse-gas-emissions/greece' },
      { name: '[3] Our World in Data \u2014 Greece: CO₂ & GHG Emissions', url: 'https://ourworldindata.org/co2/country/greece' },
      { name: '[4] PRIMAP-hist Dataset v2.5 (IPCC AR6 GWP values)', url: 'https://zenodo.org/records/10006301' },
      { name: '[5] Ember Climate \u2014 Greece', url: 'https://ember-climate.org/countries-and-regions/countries/greece/' },
      { name: '[6] EU Climate Action \u2014 Greece Factsheet', url: 'https://climate.ec.europa.eu/eu-action/european-green-deal_en' },
    ],
  },
];
