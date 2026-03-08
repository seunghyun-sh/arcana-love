import { motion } from 'framer-motion';
import type { LoveReading, QuestionOption } from '../types/tarot';

interface ReadingSummaryProps {
  question: QuestionOption;
  reading: LoveReading;
}

export const ReadingSummary = ({ question, reading }: ReadingSummaryProps) => (
  <div className="grid gap-5 lg:grid-cols-[1.35fr,0.95fr]">
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[32px] border border-gold/35 bg-[linear-gradient(180deg,rgba(21,27,47,0.96)_0%,rgba(10,14,27,0.98)_100%)] p-6 shadow-gold"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-gold/90">
          {reading.energyLabel}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-ivory/55">
          Selected Question
        </span>
      </div>

      <h2 className="mt-5 font-display text-4xl leading-tight text-ivory">{question.label}</h2>
      <p className="mt-5 text-sm leading-7 text-ivory/70">{reading.intro}</p>
      <p className="mt-5 text-base leading-8 text-ivory/88">{reading.summary}</p>
    </motion.section>

    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[32px] border border-violet/25 bg-white/[0.05] p-6 shadow-aura backdrop-blur"
    >
      <span className="text-xs uppercase tracking-[0.32em] text-violet/80">One-line advice</span>
      <p className="mt-5 font-display text-3xl leading-tight text-ivory">{reading.advice}</p>
      <div className="mt-8 rounded-[24px] border border-white/10 bg-midnight/70 p-5">
        <p className="text-[11px] uppercase tracking-[0.32em] text-ivory/45">Spread positions</p>
        <div className="mt-4 space-y-3 text-sm text-ivory/70">
          {reading.positionInterpretations.map((item) => (
            <div key={item.position} className="flex items-start justify-between gap-4">
              <span>{item.label}</span>
              <span className="text-right text-ivory">{item.card.koreanName}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  </div>
);

