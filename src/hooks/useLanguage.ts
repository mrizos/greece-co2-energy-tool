import { useState } from 'react';
import type { Language } from '../data/translations';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('el');
  const toggleLang = () => setLang((l) => (l === 'el' ? 'en' : 'el'));
  return { lang, toggleLang };
}
