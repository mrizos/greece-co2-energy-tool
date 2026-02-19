import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { ftT } from '../data/footprintTranslations';

interface FooterProps {
  lang: Language;
}

type FooterTab = 'about' | 'methodology' | 'changelog';

export default function Footer({ lang }: FooterProps) {
  const [activeTab, setActiveTab] = useState<FooterTab>('about');

  const sources = [
    'Our World in Data',
    'The Green Tank (thegreentank.gr)',
    'Ember (ember-climate.org)',
    'Nowtricity',
    'IPCC AR6',
    'European Environment Agency',
    'IEA Emission Factors',
    'Greek NECP',
    'DEFRA',
    'Poore & Nemecek (2018)',
  ];

  const tabs: { id: FooterTab; label: { el: string; en: string } }[] = [
    { id: 'about', label: { el: 'Περιγραφή', en: 'About' } },
    { id: 'methodology', label: { el: 'Μεθοδολογία', en: 'Methodology' } },
    { id: 'changelog', label: { el: 'Changelog', en: 'Changelog' } },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Brand + nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="text-xl font-bold text-navy dark:text-white font-outfit">
              🌱 {ftT.appName[lang]}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {ftT.appTagline[lang]}
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/compare" className="text-sm text-terracotta hover:underline font-medium">
              {lang === 'el' ? 'Σύγκριση' : 'Compare'}
            </Link>
            <Link to="/calculator" className="text-sm text-olive hover:underline font-medium">
              {lang === 'el' ? 'Αποτύπωμα' : 'Footprint'}
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-terracotta text-terracotta'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="min-h-[180px]">
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>
                  {lang === 'el'
                    ? 'Το CarbonTrace.gr είναι ένα εργαλείο ανοικτού κώδικα που βοηθά τους Έλληνες πολίτες να κατανοήσουν το ενεργειακό τους αποτύπωμα. Σύγκρινε καθημερινές δραστηριότητες ή υπολόγισε το ετήσιο ανθρακικό σου αποτύπωμα με εξατομικευμένες προτάσεις μείωσης.'
                    : 'CarbonTrace.gr is an open-source tool that helps Greek citizens understand their energy footprint. Compare everyday activities or calculate your annual carbon footprint with personalised reduction recommendations.'}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                  {translations.disclaimer[lang]}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {translations.sources[lang]}
                </h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-0.5">
                  {sources.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
              <p className="font-medium text-gray-900 dark:text-white">
                {lang === 'el' ? 'Πώς υπολογίζουμε τις εκπομπές και την ενέργεια:' : 'How we calculate emissions and energy:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MethodologyCard
                  icon="🚗"
                  title={lang === 'el' ? 'Μεταφορές' : 'Transport'}
                  text={lang === 'el'
                    ? 'Βάση: κατανάλωση καυσίμου (L/100km) × ενεργειακή πυκνότητα (Wh/L) × συντελεστής εκπομπών (g CO₂/L). Για ηλεκτρικά: kWh/100km × ελληνικός συντελεστής δικτύου (256 g CO₂/kWh). Πτήσεις: ανά επιβάτη-km με RFI ×1.9 για μη-CO₂ επιδράσεις.'
                    : 'Base: fuel consumption (L/100km) × energy density (Wh/L) × emission factor (g CO₂/L). For EVs: kWh/100km × Greek grid factor (256 g CO₂/kWh). Flights: per passenger-km with RFI ×1.9 for non-CO₂ effects.'}
                />
                <MethodologyCard
                  icon="🏠"
                  title={lang === 'el' ? 'Σπίτι' : 'Home'}
                  text={lang === 'el'
                    ? 'Θέρμανση: θερμική ζήτηση (kWh/m²/μήνα) × m² × μήνες × βαθμός απόδοσης συστήματος. Κλιματισμός: kW ισχύος ÷ COP × ώρες × ημέρες. Ηλεκτρισμός: kWh/μήνα × 12 × ελληνικός συντελεστής δικτύου.'
                    : 'Heating: thermal demand (kWh/m²/month) × m² × months × system efficiency. AC: kW power ÷ COP × hours × days. Electricity: kWh/month × 12 × Greek grid factor.'}
                />
                <MethodologyCard
                  icon="🍽️"
                  title={lang === 'el' ? 'Διατροφή' : 'Diet'}
                  text={lang === 'el'
                    ? 'Βάση: ετήσια εκτίμηση ανά τύπο διατροφής (Poore & Nemecek 2018). Τροποποιητές για βοδινό/αρνί, γαλακτοκομικά, σπατάλη τροφίμων. Εμφιαλωμένο νερό: κύκλος ζωής πλαστικού + μεταφορά.'
                    : 'Base: annual estimate per diet type (Poore & Nemecek 2018). Modifiers for beef/lamb, dairy, food waste. Bottled water: plastic lifecycle + transport.'}
                />
                <MethodologyCard
                  icon="🛍️"
                  title={lang === 'el' ? 'Κατανάλωση & Απόβλητα' : 'Consumption & Waste'}
                  text={lang === 'el'
                    ? 'Αγορές: εκτίμηση ανά κατηγορία δαπανών. Ηλεκτρονικά: ~200 kg CO₂e/συσκευή (κύκλος ζωής). Ρούχα: ~15 kg CO₂e/τεμάχιο (DEFRA). Απόβλητα: βάση 300 kg CO₂e/έτος × συντελεστής ανακύκλωσης.'
                    : 'Shopping: estimate per spending category. Electronics: ~200 kg CO₂e/device (lifecycle). Clothing: ~15 kg CO₂e/item (DEFRA). Waste: base 300 kg CO₂e/year × recycling factor.'}
                />
              </div>
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
              <div className="border-l-2 border-terracotta pl-4 py-1">
                <p className="font-medium text-gray-900 dark:text-white">v2.0 — {lang === 'el' ? 'Φεβρουάριος 2025' : 'February 2025'}</p>
                <ul className="mt-1 space-y-0.5 text-gray-500 dark:text-gray-400">
                  <li>• {lang === 'el' ? 'Μετονομασία σε CarbonTrace.gr' : 'Renamed to CarbonTrace.gr'}</li>
                  <li>• {lang === 'el' ? 'Νέο design: Mediterranean palette, Bricolage Grotesque + Inter' : 'New design: Mediterranean palette, Bricolage Grotesque + Inter'}</li>
                  <li>• {lang === 'el' ? 'Προσωπικό ερωτηματολόγιο αποτυπώματος (γρήγορο + λεπτομερές)' : 'Personal footprint calculator (quick + detailed modes)'}</li>
                  <li>• {lang === 'el' ? 'Προσθήκη ηλεκτρικού λεωφορείου ΟΑΣΑ' : 'Added OASA electric bus'}</li>
                  <li>• {lang === 'el' ? 'Αποστολή αποτελεσμάτων με email' : 'Email results report'}</li>
                  <li>• {lang === 'el' ? 'Εξατομικευμένες προτάσεις μείωσης εκπομπών' : 'Personalised reduction recommendations'}</li>
                </ul>
              </div>
              <div className="border-l-2 border-olive pl-4 py-1">
                <p className="font-medium text-gray-900 dark:text-white">v1.0 — {lang === 'el' ? 'Φεβρουάριος 2025' : 'February 2025'}</p>
                <ul className="mt-1 space-y-0.5 text-gray-500 dark:text-gray-400">
                  <li>• {lang === 'el' ? 'Αρχική έκδοση εργαλείου σύγκρισης' : 'Initial comparison tool release'}</li>
                  <li>• {lang === 'el' ? '70+ δραστηριότητες σε 6 κατηγορίες' : '70+ activities in 6 categories'}</li>
                  <li>• {lang === 'el' ? 'Δίγλωσση υποστήριξη (EL/EN)' : 'Bilingual support (EL/EN)'}</li>
                  <li>• {lang === 'el' ? 'Ελληνικό ενεργειακό μείγμα 2024 (256 g CO₂/kWh)' : 'Greek energy mix 2024 (256 g CO₂/kWh)'}</li>
                  <li>• {lang === 'el' ? 'Διόρθωση δεδομένων μοσχαρίσιου (99.5 kg CO₂e/kg — Poore & Nemecek 2018)' : 'Beef data correction (99.5 kg CO₂e/kg — Poore & Nemecek 2018)'}</li>
                  <li>• {lang === 'el' ? 'Περιφερειακές εκδοχές κρέατος (Ελληνικό, Αργεντινής, Γαλλίας)' : 'Regional meat variants (Greek, Argentine, French)'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Credits */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {lang === 'el'
              ? 'Φτιαγμένο με ❤️ για μια πιο πράσινη Ελλάδα από τον '
              : 'Built with ❤️ for a greener Greece by '}
            <a
              href="https://www.linkedin.com/in/michail-rizos-9b153711/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy dark:text-white hover:text-terracotta transition-colors underline"
            >
              Michail Rizos
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {lang === 'el'
              ? 'Για απορίες/επισημάνσεις, στείλτε email στο '
              : 'For questions/feedback, email '}
            <a
              href="mailto:michail.rizos@gmail.com"
              className="text-terracotta hover:underline font-medium"
            >
              michail.rizos@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function MethodologyCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-slate-700">
      <p className="font-medium text-gray-900 dark:text-white mb-1">
        {icon} {title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}
