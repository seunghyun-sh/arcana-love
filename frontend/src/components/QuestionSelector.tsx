import { motion } from 'framer-motion';
import type { LoveQuestionId, QuestionOption } from '../types/tarot';

interface QuestionSelectorProps {
  questions: QuestionOption[];
  selectedQuestionId: LoveQuestionId | null;
  onSelect: (questionId: LoveQuestionId) => void;
}

export const QuestionSelector = ({
  questions,
  selectedQuestionId,
  onSelect,
}: QuestionSelectorProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {questions.map((question, index) => {
      const isSelected = question.id === selectedQuestionId;

      return (
        <motion.button
          key={question.id}
          type="button"
          onClick={() => onSelect(question.id)}
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`group rounded-[28px] border p-5 text-left transition-all duration-300 ${
            isSelected
              ? 'border-gold/70 bg-gold/10 shadow-gold'
              : 'border-white/10 bg-white/5 hover:border-violet/40 hover:bg-white/[0.07]'
          }`}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold/70">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ivory">
            {question.label}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ivory/70">{question.subtitle}</p>
          <div className="mt-6 text-xs uppercase tracking-[0.28em] text-violet/80">
            {isSelected ? 'Selected' : 'Choose this question'}
          </div>
        </motion.button>
      );
    })}
  </div>
);

