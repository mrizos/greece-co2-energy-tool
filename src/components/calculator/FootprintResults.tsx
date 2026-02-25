/**
 * FOOTPRINT RESULTS — shows the calculated footprint with:
 *   - Donut chart by category
 *   - Comparison bars (vs Greece, EU, Global, Paris)
 *   - Recommendations ranked by impact with total savings
 *   - Email report option
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import type { Language } from '../../data/translations';
import { ftT } from '../../data/footprintTranslations';
import type { FootprintResult, Scenario, Recommendation } from '../../data/footprintEngine';
import NewsletterSignup from '../NewsletterSignup';

const CATEGORY_COLORS = ['#0D5C63', '#C2714F', '#6B8F3C', '#8B5CF6', '#6B7280'];

interface FootprintResultsProps {
  result: FootprintResult;
  scenarios: Scenario[];
  recommendations: Recommendation[];
  lang: Language;
  onStartOver: () => void;
  onBackToQuiz: () => void;
}

export default function FootprintResults({
  result,
  scenarios: _scenarios,
  recommendations,
  lang,
  onStartOver,
  onBackToQuiz,
}: FootprintResultsProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const totalTonnes = (result.totalCo2eKg / 1000).toFixed(1);

  // Pie data
  const pieData = result.categories.map((c, i) => ({
    name: c.label[lang],
    value: c.co2eKg,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    icon: c.icon,
  }));

  // Comparison bar data
  const comparisonData = useMemo(() => [
    {
      label: lang === 'el' ? 'Εσύ' : 'You',
      value: result.totalCo2eKg,
      fill: '#C2714F',
    },
    {
      label: ftT.greekAvg[lang],
      value: result.perCapitaComparison.greece,
      fill: '#0D5C63',
    },
    {
      label: ftT.euAvg[lang],
      value: result.perCapitaComparison.eu,
      fill: '#6366F1',
    },
    {
      label: ftT.globalAvg[lang],
      value: result.perCapitaComparison.global,
      fill: '#94A3B8',
    },
    {
      label: ftT.parisBudget[lang],
      value: result.perCapitaComparison.parisBudget,
      fill: '#6B8F3C',
    },
  ], [result, lang]);

  // Total savings from recommendations
  const totalSavings = recommendations.reduce((s, r) => s + r.savingKg, 0);
  const projectedTotal = Math.max(0, result.totalCo2eKg - totalSavings);

  // Build email body
  const buildEmailBody = () => {
    const lines = [
      `${ftT.yourFootprint[lang]} — CarbonTrace.gr`,
      '',
      `${ftT.annualCo2[lang]}: ${totalTonnes} ${ftT.tonnesCo2Year[lang]}`,
      `${ftT.annualEnergy[lang]}: ${Math.round(result.totalEnergyKwh).toLocaleString()} ${ftT.kwhYear[lang]}`,
      `🌳 ${ftT.treesNeeded[lang](result.treesNeeded)}`,
      '',
      `--- ${ftT.breakdown[lang]} ---`,
      ...result.categories.map(c => `${c.icon} ${c.label[lang]}: ${Math.round(c.co2eKg).toLocaleString()} kg CO₂e`),
      '',
    ];

    if (recommendations.length > 0) {
      lines.push(`--- ${ftT.recsTitle[lang]} ---`);
      for (const rec of recommendations) {
        lines.push(`${rec.icon} ${rec.title[lang]}: -${rec.savingKg} kg CO₂e/${lang === 'el' ? 'χρόνο' : 'year'}`);
        lines.push(`   ${rec.description[lang]}`);
      }
      lines.push('');
      lines.push(`${lang === 'el' ? 'Συνολική εξοικονόμηση' : 'Total savings'}: -${totalSavings.toLocaleString()} kg CO₂e/${lang === 'el' ? 'χρόνο' : 'year'}`);
      lines.push(`${lang === 'el' ? 'Νέο αποτύπωμα' : 'New footprint'}: ${(projectedTotal / 1000).toFixed(1)} t CO₂e/${lang === 'el' ? 'χρόνο' : 'year'}`);
    }

    lines.push('');
    lines.push(`${lang === 'el' ? 'Υπολογίστηκε στο' : 'Calculated at'} CarbonTrace.gr`);

    return lines.join('\n');
  };

  const handleSendEmail = () => {
    if (!email) return;
    const subject = encodeURIComponent(`${ftT.yourFootprint[lang]} — CarbonTrace.gr — ${totalTonnes}t CO₂e`);
    const body = encodeURIComponent(buildEmailBody());
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
    setEmailSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header + totals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white">
          {ftT.yourFootprint[lang]}
        </h1>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div>
            <p className="text-5xl font-bold text-terracotta">{totalTonnes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ftT.tonnesCo2Year[lang]}</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200 dark:bg-slate-700" />
          <div>
            <p className="text-3xl font-bold text-navy dark:text-white">
              {Math.round(result.totalEnergyKwh).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ftT.kwhYear[lang]}</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200 dark:bg-slate-700" />
          <div>
            <p className="text-3xl font-bold text-olive">{result.treesNeeded}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              🌳 {ftT.treesNeeded[lang](result.treesNeeded)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Donut + Category breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4">
          {ftT.breakdown[lang]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) => [`${Math.round(value ?? 0).toLocaleString()} kg CO₂e`, '']}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {result.categories.map((c, i) => {
              const pct = result.totalCo2eKg > 0
                ? Math.round((c.co2eKg / result.totalCo2eKg) * 100)
                : 0;
              return (
                <div key={c.id} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {c.icon} {c.label[lang]}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.round(c.co2eKg).toLocaleString()} kg
                  </span>
                  <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Comparison with averages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4">
          {ftT.comparedTo[lang]}
        </h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} layout="vertical" margin={{ left: 5, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 'auto']} />
              <YAxis type="category" dataKey="label" width={110} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number | undefined) => [`${((value ?? 0) / 1000).toFixed(1)} t CO₂e`, '']}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {comparisonData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recommendations (replaces scenarios) */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
        >
          <h2 className="text-lg font-bold text-navy dark:text-white mb-1">
            {ftT.recsTitle[lang]}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {ftT.recsSubtitle[lang]}
          </p>

          <div className="space-y-2">
            {recommendations.map((rec, i) => {
              const impact =
                rec.savingKg > 500
                  ? { label: ftT.highImpact[lang], color: 'text-red-500 bg-red-50 dark:bg-red-900/20' }
                  : rec.savingKg > 100
                  ? { label: ftT.mediumImpact[lang], color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' }
                  : { label: ftT.lowImpact[lang], color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' };

              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-slate-700"
                >
                  <span className="text-xl flex-shrink-0">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {rec.title[lang]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {rec.description[lang]}
                    </p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-sm font-bold text-olive">
                      -{rec.savingKg} kg
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full mt-1 font-medium ${impact.color}`}>
                      {impact.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Total savings summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {lang === 'el' ? 'Συνολική δυνατή εξοικονόμηση' : 'Total potential savings'}:
              </span>
              <span className="text-lg font-bold text-olive">
                -{totalSavings.toLocaleString()} kg CO₂e/{lang === 'el' ? 'χρόνο' : 'year'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {ftT.withAllChanges[lang]}:
              </span>
              <div className="text-right">
                <span className="text-lg font-bold text-navy dark:text-white">
                  {(projectedTotal / 1000).toFixed(1)} t
                </span>
                <span className="text-xs text-gray-400 ml-1">CO₂e/{lang === 'el' ? 'χρόνο' : 'year'}</span>
                {projectedTotal <= result.perCapitaComparison.parisBudget && (
                  <span className="ml-2 text-xs text-olive font-medium">
                    ✓ {ftT.parisBudget[lang]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Newsletter signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <NewsletterSignup lang={lang} variant="card" />
      </motion.div>

      {/* Email report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-bold text-navy dark:text-white mb-2">
          📧 {lang === 'el' ? 'Λάβε τα αποτελέσματα με email' : 'Get results by email'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {lang === 'el'
            ? 'Στείλε την αναφορά στο email σου.'
            : 'Send the report to your email for future reference.'}
        </p>
        {emailSent ? (
          <div className="flex items-center gap-2 text-olive font-medium text-sm">
            <span>✓</span>
            <span>{lang === 'el' ? 'Το email client σου θα ανοίξει με τα αποτελέσματα!' : 'Your email client will open with the results!'}</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'el' ? 'Το email σου...' : 'Your email...'}
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
            />
            <button
              onClick={handleSendEmail}
              disabled={!email || !email.includes('@')}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-terracotta text-white hover:bg-terracotta/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {lang === 'el' ? 'Αποστολή' : 'Send'} →
            </button>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <button
          onClick={onBackToQuiz}
          className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← {ftT.backToQuiz[lang]}
        </button>
        <button
          onClick={onStartOver}
          className="px-5 py-2.5 rounded-lg text-sm font-medium bg-terracotta text-white hover:bg-terracotta/90 transition-colors"
        >
          {ftT.startOver[lang]}
        </button>
      </div>
    </div>
  );
}
