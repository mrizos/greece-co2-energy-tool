/**
 * WIZARD STEP — renders all questions for a given step.
 * Handles select, number, slider, multi-select types.
 */

import { motion } from 'framer-motion';
import type { Language } from '../../data/translations';
import type { Question, StepId } from '../../data/footprintQuestions';
import type { Answers } from '../../data/footprintEngine';

interface StepData {
  id: StepId;
  icon: string;
  label: { el: string; en: string };
  questions: Question[];
}

interface WizardStepProps {
  step: StepData;
  answers: Answers;
  setAnswer: (id: string, value: string | number) => void;
  lang: Language;
}

export default function WizardStep({ step, answers, setAnswer, lang }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-navy dark:text-white font-outfit">
        {step.icon} {step.label[lang]}
      </h2>

      {step.questions.map((q, i) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4"
        >
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            {q.label[lang]}
          </label>
          {q.helpText && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              {q.helpText[lang]}
            </p>
          )}

          {q.type === 'select' && (
            <SelectInput question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} lang={lang} />
          )}

          {q.type === 'number' && (
            <NumberInput question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} lang={lang} />
          )}

          {q.type === 'slider' && (
            <SliderInput question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} lang={lang} />
          )}

          {q.type === 'multi-select' && (
            <MultiSelectInput question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} lang={lang} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Select Input ─────────────────────────────────────────────
function SelectInput({
  question,
  value,
  onChange,
  lang,
}: {
  question: Question;
  value: string | number;
  onChange: (v: string) => void;
  lang: Language;
}) {
  const currentValue = String(value);
  return (
    <div className="flex flex-wrap gap-2">
      {question.options?.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
            currentValue === opt.value
              ? 'bg-terracotta text-white border-terracotta'
              : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-terracotta/50'
          }`}
        >
          {opt.label[lang]}
        </button>
      ))}
    </div>
  );
}

// ─── Number Input ─────────────────────────────────────────────
function NumberInput({
  question,
  value,
  onChange,
  lang,
}: {
  question: Question;
  value: string | number;
  onChange: (v: number) => void;
  lang: Language;
}) {
  const numVal = Number(value) || 0;
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(question.min ?? 0, numVal - 1))}
        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
      >
        −
      </button>
      <input
        type="number"
        value={numVal}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!isNaN(n)) onChange(Math.min(question.max ?? 999, Math.max(question.min ?? 0, n)));
        }}
        min={question.min}
        max={question.max}
        className="w-20 text-center border border-gray-200 dark:border-slate-600 rounded-lg py-1.5 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
      />
      <button
        onClick={() => onChange(Math.min(question.max ?? 999, numVal + 1))}
        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
      >
        +
      </button>
      {question.unit && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{question.unit[lang]}</span>
      )}
    </div>
  );
}

// ─── Slider Input ─────────────────────────────────────────────
function SliderInput({
  question,
  value,
  onChange,
  lang,
}: {
  question: Question;
  value: string | number;
  onChange: (v: number) => void;
  lang: Language;
}) {
  const numVal = Number(value) || question.min || 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-navy dark:text-white">
          {numVal.toLocaleString()}
        </span>
        {question.unit && (
          <span className="text-xs text-gray-500 dark:text-gray-400">{question.unit[lang]}</span>
        )}
      </div>
      <input
        type="range"
        min={question.min ?? 0}
        max={question.max ?? 100}
        step={question.step_size ?? 1}
        value={numVal}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-600">
        <span>{question.min ?? 0}</span>
        <span>{question.max ?? 100}</span>
      </div>
    </div>
  );
}

// ─── Multi-Select Input ───────────────────────────────────────
function MultiSelectInput({
  question,
  value,
  onChange,
  lang,
}: {
  question: Question;
  value: string | number;
  onChange: (v: string) => void;
  lang: Language;
}) {
  const selectedSet = new Set(String(value).split(',').filter(Boolean));
  const toggle = (val: string) => {
    const next = new Set(selectedSet);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    onChange(Array.from(next).join(','));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {question.options?.map((opt) => (
        <button
          key={opt.value}
          onClick={() => toggle(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
            selectedSet.has(opt.value)
              ? 'bg-olive text-white border-olive'
              : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-olive/50'
          }`}
        >
          {opt.label[lang]}
        </button>
      ))}
    </div>
  );
}
