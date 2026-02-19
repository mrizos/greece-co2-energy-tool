import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../data/translations';
import { ftT } from '../data/footprintTranslations';
import { questions, steps } from '../data/footprintQuestions';
import type { StepId, Question } from '../data/footprintQuestions';
import { calculateFootprint, calculateScenarios, getRecommendations } from '../data/footprintEngine';
import type { Answers, FootprintResult } from '../data/footprintEngine';
import WizardStep from '../components/calculator/WizardStep';
import FootprintResults from '../components/calculator/FootprintResults';

interface CalculatorPageProps {
  lang: Language;
}

type Phase = 'mode-select' | 'wizard' | 'results';

export default function CalculatorPage({ lang }: CalculatorPageProps) {
  const [phase, setPhase] = useState<Phase>('mode-select');
  const [isQuickMode, setIsQuickMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    // Initialize with defaults
    const defaults: Answers = {};
    for (const q of questions) {
      defaults[q.id] = q.default;
    }
    return defaults;
  });

  // Filter questions by mode
  const activeQuestions = useMemo(() => {
    if (isQuickMode) return questions.filter((q) => q.quickMode);
    return questions;
  }, [isQuickMode]);

  // Group questions by step
  const stepQuestions = useMemo(() => {
    const map = new Map<StepId, Question[]>();
    for (const s of steps) map.set(s.id, []);
    for (const q of activeQuestions) {
      map.get(q.step)?.push(q);
    }
    // Only keep steps that have questions
    return steps.filter((s) => (map.get(s.id)?.length || 0) > 0).map((s) => ({
      ...s,
      questions: map.get(s.id)!,
    }));
  }, [activeQuestions]);

  const currentStep = stepQuestions[currentStepIndex];
  const totalSteps = stepQuestions.length;

  // Answer setter
  const setAnswer = useCallback((id: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Navigation
  const goNext = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      setPhase('results');
    }
  }, [currentStepIndex, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  const startWizard = useCallback((quick: boolean) => {
    setIsQuickMode(quick);
    setCurrentStepIndex(0);
    setPhase('wizard');
  }, []);

  const startOver = useCallback(() => {
    setPhase('mode-select');
    setCurrentStepIndex(0);
    const defaults: Answers = {};
    for (const q of questions) defaults[q.id] = q.default;
    setAnswers(defaults);
  }, []);

  // Results calculation
  const result: FootprintResult | null = useMemo(() => {
    if (phase !== 'results') return null;
    return calculateFootprint(answers);
  }, [phase, answers]);

  const scenarios = useMemo(() => {
    if (!result) return [];
    return calculateScenarios(answers, result);
  }, [result, answers]);

  const recommendations = useMemo(() => {
    if (!result) return [];
    return getRecommendations(answers, result);
  }, [result, answers]);

  // ── Mode Selection ──
  if (phase === 'mode-select') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white font-outfit">
            {ftT.calcTitle[lang]}
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {ftT.calcSubtitle[lang]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => startWizard(true)}
            className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 p-6 text-left hover:border-terracotta dark:hover:border-terracotta transition-all hover:shadow-md"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-navy dark:text-white font-outfit">
              {ftT.quickMode[lang]}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {ftT.quickModeDesc[lang]}
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => startWizard(false)}
            className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 p-6 text-left hover:border-olive dark:hover:border-olive transition-all hover:shadow-md"
          >
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-lg font-bold text-navy dark:text-white font-outfit">
              {ftT.detailedMode[lang]}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {ftT.detailedModeDesc[lang]}
            </p>
          </motion.button>
        </div>
      </div>
    );
  }

  // ── Wizard ──
  if (phase === 'wizard' && currentStep) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {ftT.stepOf[lang](currentStepIndex + 1, totalSteps)}
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {currentStep.icon} {currentStep.label[lang]}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-terracotta h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-2">
            {stepQuestions.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStepIndex(i)}
                className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                  i === currentStepIndex
                    ? 'text-terracotta font-semibold'
                    : i < currentStepIndex
                    ? 'text-olive'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <WizardStep
              step={currentStep}
              answers={answers}
              setAnswer={setAnswer}
              lang={lang}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goPrev}
            disabled={currentStepIndex === 0}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            ← {ftT.prev[lang]}
          </button>
          <button
            onClick={goNext}
            className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors bg-terracotta text-white hover:bg-terracotta/90"
          >
            {currentStepIndex === totalSteps - 1 ? ftT.seeResults[lang] : ftT.next[lang]} →
          </button>
        </div>
      </div>
    );
  }

  // ── Results ──
  if (phase === 'results' && result) {
    return (
      <FootprintResults
        result={result}
        scenarios={scenarios}
        recommendations={recommendations}
        lang={lang}
        onStartOver={startOver}
        onBackToQuiz={() => {
          setPhase('wizard');
          setCurrentStepIndex(totalSteps - 1);
        }}
      />
    );
  }

  return null;
}
