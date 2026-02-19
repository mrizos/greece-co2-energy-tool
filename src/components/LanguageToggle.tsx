import type { Language } from '../data/translations';

interface LanguageToggleProps {
  lang: Language;
  toggleLang: () => void;
}

export default function LanguageToggle({ lang, toggleLang }: LanguageToggleProps) {
  return (
    <button
      onClick={toggleLang}
      className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={`Switch to ${lang === 'el' ? 'English' : 'Greek'}`}
    >
      {lang === 'el' ? 'EN' : 'EL'}
    </button>
  );
}
