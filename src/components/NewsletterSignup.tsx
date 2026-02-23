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
  title:       { el: '📬 Μείνε ενημερωμένος', en: '📬 Stay informed' },
  desc:        { el: 'Κάθε μήνα ένα ελληνικό περιβαλλοντικό fact στο inbox σου.', en: 'One Greek environmental fact in your inbox every month.' },
  placeholder: { el: 'email σου...', en: 'your email...' },
  button:      { el: 'Εγγραφή', en: 'Subscribe' },
  loading:     { el: 'Παρακαλώ περίμενε...', en: 'Please wait...' },
  success:     { el: '✅ Ωραία! Θα σου στείλω το επόμενο newsletter σύντομα.', en: '✅ Great! I\'ll send you the next newsletter soon.' },
  error:       { el: '❌ Κάτι πήγε στραβά. Δοκίμασε ξανά ή επικοινώνησε μαζί μου.', en: '❌ Something went wrong. Please try again or contact me.' },
  gdpr:        { el: 'Συμφωνώ να λαμβάνω το μηνιαίο newsletter. Μπορώ να διαγραφώ οποτεδήποτε.', en: 'I agree to receive the monthly newsletter. I can unsubscribe at any time.' },
  noSpam:      { el: 'Χωρίς spam, χωρίς διαφημίσεις.', en: 'No spam, no ads.' },
};

export default function NewsletterSignup({ lang, variant }: NewsletterSignupProps) {
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
      <div className={`rounded-xl p-4 bg-olive/10 dark:bg-olive/20 border border-olive/30 text-sm text-olive dark:text-emerald-400 ${variant === 'card' ? 'mt-4' : 'mt-2'}`}>
        {T.success[lang]}
      </div>
    );
  }

  // ── CARD variant (calculator results) ──────────────────────────────────────
  if (variant === 'card') {
    return (
      <div className="mt-4 rounded-xl border border-olive/30 dark:border-olive/20 bg-olive/5 dark:bg-olive/10 p-5">
        <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
          {T.title[lang]}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {T.desc[lang]}{' '}
          <span className="text-gray-400 dark:text-gray-500">{T.noSpam[lang]}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={T.placeholder[lang]}
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-olive/50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !gdpr}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-olive text-white hover:bg-olive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '...' : T.button[lang]}
            </button>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-0.5 accent-olive flex-shrink-0"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {T.gdpr[lang]}
            </span>
          </label>

          {status === 'error' && (
            <p className="text-xs text-red-500">{T.error[lang]}</p>
          )}
        </form>
      </div>
    );
  }

  // ── INLINE variant (footer) ─────────────────────────────────────────────────
  return (
    <div className="py-5 border-t border-gray-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-shrink-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {T.title[lang]}
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
