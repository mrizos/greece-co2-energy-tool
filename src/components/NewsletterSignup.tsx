import { useState } from 'react';
import type { Language } from '../data/translations';

interface NewsletterSignupProps {
  lang: Language;
  variant: 'card' | 'inline';
}

// Brevo embedded form URL — public, safe to commit (not a secret key).
// To update: Marketing → Forms → Sign-up forms → Edit → copy iframe src URL.
const BREVO_FORM_URL = 'https://4f23432e.sibforms.com/serve/MUIFABHd6HKhx_yO2sgiQPxxPmDEUJzcHDJvPaW-Odjbjc9tbjbuPNGhwyABtvWnHjV7bPGm-hbrSypqV78qCqMD6wWuOkziTN66WtSLPkpwIAdNxiHAB2Emm8UxVDqFJg3WQzPLCTDmQR7Vld3_rcXLd3KVS_8juAiji4yeAy3mHfJo5geJ7B2dyTiioxtNOQrv0WNvvsqA5UU6lQ==';

const T = {
  title:           { el: 'Μείνε ενημερωμένος', en: 'Stay up-to-date!' },
  desc:            { el: 'Κάθε μήνα ένα ελληνικό περιβαλλοντικό fact στο inbox σου.', en: 'Get crucial updates on our climate change insights and data.' },
  namePlaceholder: { el: 'Όνομά σου', en: 'Your name' },
  placeholder:     { el: 'Email σου', en: 'Your email address' },
  button:          { el: 'Εγγραφή', en: 'Subscribe' },
  loading:         { el: 'Παρακαλώ περίμενε...', en: 'Please wait...' },
  success:         { el: '✅ Ωραία! Θα σου στείλω το επόμενο newsletter σύντομα.', en: '✅ Great! I\'ll send you the next newsletter soon.' },
  error:           { el: '❌ Κάτι πήγε στραβά. Δοκίμασε ξανά ή επικοινώνησε μαζί μου.', en: '❌ Something went wrong. Please try again or contact me.' },
  gdpr:            { el: 'Συμφωνώ να λαμβάνω το μηνιαίο newsletter. Μπορώ να διαγραφώ οποτεδήποτε.', en: 'I agree to receive the monthly newsletter. I can unsubscribe at any time.' },
  noSpam:          { el: 'Χωρίς spam, χωρίς διαφημίσεις.', en: 'No spam, no ads.' },
};

export default function NewsletterSignup({ lang, variant }: NewsletterSignupProps) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [gdpr, setGdpr]       = useState(false);
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !gdpr) return;

    setStatus('loading');
    try {
      const body = new URLSearchParams({
        EMAIL: email,
        FIRSTNAME: name,
        email_address_check: '',  // honeypot — must be empty
        locale: lang,
      });
      // Brevo sibforms accepts cross-origin POST — no CORS issues
      await fetch(BREVO_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors', // sibforms doesn't return CORS headers, so we use no-cors
      });
      // With no-cors we can't read the response status, so we optimistically show success
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl p-5 bg-blue-500/10 border border-blue-500/30 text-sm text-blue-300 text-center ${variant === 'card' ? 'mt-6' : 'mt-2'}`}>
        {T.success[lang]}
      </div>
    );
  }

  // ── CARD variant (calculator results) ──────────────────────────────────────
  if (variant === 'card') {
    return (
      <div className="mt-6 rounded-2xl border border-blue-500/40 bg-slate-900 p-6 shadow-[0_0_24px_rgba(59,130,246,0.12)]">
        {/* Envelope icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>

        {/* Title & description */}
        <h3 className="text-center text-lg font-bold text-white mb-1">
          {T.title[lang]}
        </h3>
        <p className="text-center text-sm text-slate-400 mb-5">
          {T.desc[lang]}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={T.namePlaceholder[lang]}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={T.placeholder[lang]}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-0.5 accent-blue-500 flex-shrink-0"
            />
            <span className="text-xs text-slate-400 leading-relaxed">
              {T.gdpr[lang]}
            </span>
          </label>

          <button
            type="submit"
            disabled={status === 'loading' || !gdpr}
            className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {status === 'loading' ? T.loading[lang] : T.button[lang]}
          </button>

          {status === 'error' && (
            <p className="text-xs text-red-400 text-center">{T.error[lang]}</p>
          )}
        </form>
      </div>
    );
  }

  // ── INLINE variant (footer) — unchanged ────────────────────────────────────
  return (
    <div className="py-5 border-t border-gray-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-shrink-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            📬 {T.title[lang]}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {T.desc[lang]} {T.noSpam[lang]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={T.placeholder[lang]}
              className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-olive/50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !gdpr}
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-olive text-white hover:bg-olive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '...' : T.button[lang]}
            </button>
          </div>

          <label className="flex items-start gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-0.5 accent-olive flex-shrink-0"
            />
            <span className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
              {T.gdpr[lang]}
            </span>
          </label>

          {status === 'error' && (
            <p className="text-xs text-red-500">{T.error[lang]}</p>
          )}
        </form>
      </div>
    </div>
  );
}
