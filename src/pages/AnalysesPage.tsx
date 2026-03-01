import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../data/translations';
import { articles, type Article } from '../data/articles';
import GreeceGhgTrendChart from '../components/charts/GreeceGhgTrendChart';
import GhgBreakdownChart from '../components/charts/GhgBreakdownChart';
import PageMeta from '../components/PageMeta';

const ARTICLE_CHARTS: Record<string, React.FC<{ lang: Language }>> = {
  'greece-ghg-trend': GreeceGhgTrendChart,
  'ghg-breakdown-pie': GhgBreakdownChart,
};

interface AnalysesPageProps {
  lang: Language;
}

export default function AnalysesPage({ lang }: AnalysesPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageMeta
        title={lang === 'el' ? 'Αναλύσεις & Insights | CarbonTrace.gr' : 'Analyses & Insights | CarbonTrace.gr'}
        description={lang === 'el' ? 'Εμβαθύνσεις στα κλιματικά και ενεργειακά δεδομένα της Ελλάδας' : "Deep dives into Greece's climate and energy data"}
        path="/analyses"
      />
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white font-outfit">
          {lang === 'el' ? 'Αναλύσεις & Insights' : 'Analyses & Insights'}
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {lang === 'el'
            ? 'Εμβαθύνσεις στα κλιματικά και ενεργειακά δεδομένα της Ελλάδας'
            : "Deep dives into Greece's climate and energy data"}
        </p>
      </motion.div>

      {/* Article cards */}
      <div className="space-y-6">
        {articles.map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            lang={lang}
            index={i}
            expanded={expandedId === article.id}
            onToggle={() =>
              setExpandedId(expandedId === article.id ? null : article.id)
            }
          />
        ))}
      </div>

      {/* Empty state if no articles */}
      {articles.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 mt-12">
          {lang === 'el' ? 'Σύντομα κοντά σας...' : 'Coming soon...'}
        </p>
      )}
    </div>
  );
}

function ArticleCard({
  article,
  lang,
  index,
  expanded,
  onToggle,
}: {
  article: Article;
  lang: Language;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{article.icon}</span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta">
            {article.categoryLabel[lang]}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
            {new Date(article.date).toLocaleDateString(
              lang === 'el' ? 'el-GR' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </span>
        </div>
        <h2 className="text-xl font-bold text-navy dark:text-white font-outfit">
          {article.title[lang]}
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {article.excerpt[lang]}
        </p>
        <button
          onClick={onToggle}
          className="mt-4 inline-flex items-center text-sm font-medium text-terracotta hover:underline transition-colors"
        >
          {expanded
            ? lang === 'el'
              ? 'Κλείσιμο ↑'
              : 'Close ↑'
            : lang === 'el'
              ? 'Διάβασε περισσότερα →'
              : 'Read more →'}
        </button>
      </div>

      {/* Expanded article content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 dark:border-slate-700 p-6 space-y-6">
              {article.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="text-lg font-semibold text-navy dark:text-white font-outfit mb-2">
                    {section.heading[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.body[lang]}
                  </p>
                  {section.chartId && ARTICLE_CHARTS[section.chartId] && (() => {
                    const ChartComponent = ARTICLE_CHARTS[section.chartId!];
                    return <ChartComponent lang={lang} />;
                  })()}
                </motion.div>
              ))}

              {/* Sources */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'el' ? 'Πηγές' : 'Sources'}
                </p>
                <ul className="text-xs text-gray-400 dark:text-gray-500 space-y-1 list-none">
                  {article.sources.map((s, i) => (
                    <li key={i}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terracotta hover:underline"
                        >
                          {s.name}
                        </a>
                      ) : (
                        s.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
