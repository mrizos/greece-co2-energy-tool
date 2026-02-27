import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Language } from '../data/translations';
import { ftT } from '../data/footprintTranslations';
import { CONSTANTS } from '../data/constants';
import NewsletterSignup from '../components/NewsletterSignup';

interface LandingPageProps {
  lang: Language;
}

export default function LandingPage({ lang }: LandingPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy dark:text-white font-outfit leading-tight">
          {ftT.heroTitle[lang]}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          {ftT.heroSubtitle[lang]}
        </p>
      </motion.div>

      {/* CTA Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/compare"
            className="block bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 p-8 hover:border-terracotta dark:hover:border-terracotta transition-all hover:shadow-lg group"
          >
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-xl font-bold text-navy dark:text-white font-outfit group-hover:text-terracotta transition-colors">
              {ftT.ctaCompare[lang]}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {ftT.ctaCompareDesc[lang]}
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-terracotta">
              {lang === 'el' ? 'Ξεκίνα →' : 'Start →'}
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/calculator"
            className="block bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 p-8 hover:border-olive dark:hover:border-olive transition-all hover:shadow-lg group"
          >
            <div className="text-4xl mb-4">🧮</div>
            <h2 className="text-xl font-bold text-navy dark:text-white font-outfit group-hover:text-olive transition-colors">
              {ftT.ctaCalculator[lang]}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {ftT.ctaCalculatorDesc[lang]}
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-olive">
              {lang === 'el' ? 'Ξεκίνα →' : 'Start →'}
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Key Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 max-w-4xl w-full"
      >
        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-6">
          {ftT.keyFacts[lang]}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FactCard
            icon="🇬🇷"
            title={ftT.factGridTitle[lang]}
            value={ftT.factGrid[lang]}
            footnote={ftT.factGridFootnote[lang]}
          />
          <FactCard
            icon="👤"
            title={lang === 'el' ? 'Κατά κεφαλήν εκπομπές' : 'Per capita emissions'}
            value={ftT.factPerCapita[lang]}
            footnote={ftT.factPerCapitaFootnote[lang]}
          />
          <FactCard
            icon="🌍"
            title={lang === 'el' ? 'Στόχος 2030' : '2030 target'}
            value={ftT.factParis[lang]}
            footnote={ftT.factParisFootnote[lang]}
          />
        </div>

        {/* Mini bar showing Greece vs Paris target */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {lang === 'el' ? 'Ελλάδα vs Στόχος Παρισιού (t CO₂e/κάτοικο)' : 'Greece vs Paris target (t CO₂e/capita)'}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs w-28 text-right text-gray-600 dark:text-gray-400">🇬🇷 {lang === 'el' ? 'Ελλάδα' : 'Greece'}</span>
              <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-terracotta flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(CONSTANTS.GREEK_ANNUAL_CO2E_KG / 10000) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <span className="text-[10px] font-semibold text-white">{CONSTANTS.GREEK_ANNUAL_CO2E_KG / 1000}t</span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs w-28 text-right text-gray-600 dark:text-gray-400">🌍 {ftT.parisBudget[lang]}</span>
              <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-olive flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(CONSTANTS.PARIS_BUDGET_KG / 10000) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <span className="text-[10px] font-semibold text-white">{CONSTANTS.PARIS_BUDGET_KG / 1000}t</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="max-w-sm mx-auto w-full"
        >
          <NewsletterSignup lang={lang} variant="card" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FactCard({ icon, title, value, footnote }: { icon: string; title: string; value: string; footnote?: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-base font-semibold text-gray-900 dark:text-white">{value}</p>
      {footnote && (
        <p className="mt-2 text-[11px] leading-tight text-gray-400 dark:text-gray-500">{footnote}</p>
      )}
    </div>
  );
}
