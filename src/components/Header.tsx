import { Link, useLocation } from 'react-router-dom';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { ftT } from '../data/footprintTranslations';
import MetricToggle from './MetricToggle';
import LanguageToggle from './LanguageToggle';
import type { MetricView } from '../hooks/useMetricView';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  dark: boolean;
  toggleTheme: () => void;
  metricView: MetricView;
  setMetricView: (v: MetricView) => void;
  showMetricToggle?: boolean;
}

export default function Header({
  lang,
  toggleLang,
  dark,
  toggleTheme,
  metricView,
  setMetricView,
  showMetricToggle = true,
}: HeaderProps) {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: { el: 'Αρχική', en: 'Home' } },
    { to: '/compare', label: { el: 'Σύγκριση', en: 'Compare' } },
    { to: '/calculator', label: { el: 'Αποτύπωμα', en: 'Footprint' } },
    { to: '/analyses', label: { el: 'Αναλύσεις', en: 'Analyses' } },
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo + title */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <span className="text-xl">🌱</span>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-navy dark:text-white font-outfit truncate">
                {ftT.appName[lang]}
              </h1>
            </div>
          </Link>

          {/* Nav links (hidden on very small screens) */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-terracotta/10 text-terracotta dark:text-terracotta'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label[lang]}
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {showMetricToggle && (
              <MetricToggle
                lang={lang}
                metricView={metricView}
                setMetricView={setMetricView}
              />
            )}
            <LanguageToggle lang={lang} toggleLang={toggleLang} />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={dark ? translations.lightMode[lang] : translations.darkMode[lang]}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex sm:hidden items-center gap-1 mt-2 -mx-1 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-terracotta/10 text-terracotta'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label[lang]}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
