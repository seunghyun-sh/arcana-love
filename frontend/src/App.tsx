import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import {
  ChevronRight,
  Eye,
  Home,
  MessageCircleHeart,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LOVE_QUESTIONS } from './data/questions';
import { MAJOR_ARCANA_CARDS } from './data/tarotCards';
import type {
  DrawnCard,
  LoveQuestionId,
  LoveReading,
  QuestionOption,
  TarotCard,
} from './types/tarot';
import { createLoveReading } from './utils/reading';
import { SPREAD_POSITIONS, shuffleCards } from './utils/tarot';

/* ────────────────────────────────────────────
   Constants & Types
   ──────────────────────────────────────────── */

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const BACKEND_URL = 'http://localhost:8000';

const CATEGORY_EMOJI: Record<LoveQuestionId, string> = {
  situationship: '💫',
  mutualThoughts: '❤️',
  textNow: '💬',
  reconciliation: '🌙',
  loveLuck: '✨',
};

const CATEGORY_QUESTION: Record<LoveQuestionId, string> = {
  situationship: '이 썸은 이어질까?',
  mutualThoughts: '그 사람도 나를 의식할까?',
  textNow: '지금 연락해도 될까?',
  reconciliation: '다시 이어질 수 있을까?',
  loveLuck: '올해 연애운은 어떨까?',
};

const POSITION_LABELS = ['나의 현재', '상대의 속마음', '관계의 흐름'];

const easeOut = [0.22, 1, 0.36, 1] as const;

/* ────────────────────────────────────────────
   Background (Mist + Stars)
   ──────────────────────────────────────────── */

const Background = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    {/* Star dots */}
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="star-dot"
        style={{
          left: `${(i * 37 + 13) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
          animationDelay: `${(i * 0.4) % 4}s`,
          animationDuration: `${2 + (i % 3)}s`,
        }}
      />
    ))}
    {/* Mist orbs */}
    <div className="mist-orb absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet/20 blur-[100px]" />
    <div className="mist-orb-delay absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-amber-400/10 blur-[80px]" />
    <div className="mist-orb absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
  </div>
);

/* ────────────────────────────────────────────
   Page transition wrapper
   ──────────────────────────────────────────── */

const pageVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const PageWrap = ({ children, k }: { children: React.ReactNode; k: string }) => (
  <motion.div
    key={k}
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5, ease: easeOut }}
    className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-8 sm:px-6"
  >
    {children}
  </motion.div>
);

/* ────────────────────────────────────────────
   Step 0 — Atmosphere
   ──────────────────────────────────────────── */

const AtmosphereStep = ({ onNext }: { onNext: () => void }) => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBtn(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageWrap k="atmosphere">
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="font-display text-2xl leading-relaxed text-lavender/90 sm:text-3xl lg:text-4xl"
        >
          잠시 눈을 감고
          <br />
          지금 떠오르는 사람을 생각해보세요...
        </motion.p>

        <AnimatePresence>
          {showBtn && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: easeOut }}
              onClick={onNext}
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 font-semibold text-night shadow-gold transition hover:scale-105 hover:shadow-gold-strong"
            >
              <Sparkles size={18} />
              운명의 카드 펼치기
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 1 — Intro
   ──────────────────────────────────────────── */

const IntroStep = ({ onNext }: { onNext: () => void }) => (
  <PageWrap k="intro">
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 glow-gold"
      >
        <Star size={32} className="text-amber-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: easeOut }}
        className="font-display text-5xl text-lavender sm:text-6xl lg:text-7xl"
      >
        별빛 타로방
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
        className="mt-6 max-w-md text-base leading-relaxed text-lavender/60"
      >
        세 장의 메이저 아르카나가 당신의 사랑 이야기를 읽어드립니다.
        <br />
        지금 마음속을 가장 크게 차지하는 질문을 떠올려보세요.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
        onClick={onNext}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 font-semibold text-night shadow-gold transition hover:scale-105 hover:shadow-gold-strong"
      >
        리딩 시작하기
        <ChevronRight size={18} />
      </motion.button>
    </div>
  </PageWrap>
);

/* ────────────────────────────────────────────
   Step 2 — Category
   ──────────────────────────────────────────── */

const CategoryStep = ({
  onSelect,
}: {
  onSelect: (id: LoveQuestionId) => void;
}) => (
  <PageWrap k="category">
    <div className="w-full max-w-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mb-8 text-center font-display text-4xl text-lavender sm:text-5xl"
      >
        어떤 이야기가 궁금하세요?
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {LOVE_QUESTIONS.map((q, i) => (
          <motion.button
            key={q.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(q.id)}
            className="glass group rounded-2xl p-5 text-left transition-shadow hover:glow-gold"
          >
            <span className="text-2xl">{CATEGORY_EMOJI[q.id]}</span>
            <h3 className="mt-3 font-display text-2xl text-lavender group-hover:text-amber-300">
              {CATEGORY_QUESTION[q.id]}
            </h3>
            <p className="mt-2 text-sm text-lavender/50">{q.subtitle}</p>
          </motion.button>
        ))}
      </div>
    </div>
  </PageWrap>
);

/* ────────────────────────────────────────────
   Step 3 — Situation Input
   ──────────────────────────────────────────── */

const SituationStep = ({
  question,
  onSubmit,
}: {
  question: QuestionOption;
  onSubmit: (text: string) => void;
}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const maxLen = 200;

  const handleSubmit = () => {
    if (text.trim().length < 2) return;
    setLoading(true);
    setTimeout(() => onSubmit(text.trim()), 800);
  };

  return (
    <PageWrap k="situation">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="text-center"
        >
          <span className="text-3xl">{CATEGORY_EMOJI[question.id]}</span>
          <h2 className="mt-4 font-display text-3xl text-lavender sm:text-4xl">
            {CATEGORY_QUESTION[question.id]}
          </h2>
          <p className="mt-3 text-sm text-lavender/50">
            지금 상황을 자유롭게 적어주세요
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-400"
            />
            <p className="cursor-blink text-sm text-lavender/70">
              당신의 이야기를 카드에 담는 중
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
            className="mt-8"
          >
            <div className="glass rounded-2xl p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, maxLen))}
                placeholder="최근에 연락이 뜸해졌어요..."
                rows={4}
                className="w-full resize-none bg-transparent text-base text-lavender placeholder:text-lavender/30 focus:outline-none"
              />
              <div className="mt-2 text-right text-xs text-lavender/40">
                {text.length}/{maxLen}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={text.trim().length < 2}
              className={`mt-6 w-full rounded-full py-4 text-center font-semibold transition ${
                text.trim().length >= 2
                  ? 'bg-amber-400 text-night shadow-gold hover:scale-[1.02] hover:shadow-gold-strong'
                  : 'cursor-not-allowed bg-lavender/10 text-lavender/30'
              }`}
            >
              카드 섞기
            </button>
          </motion.div>
        )}
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 4 — Card Shuffle
   ──────────────────────────────────────────── */

const ShuffleStep = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <PageWrap k="shuffle">
      <div className="flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 font-display text-3xl text-lavender sm:text-4xl"
        >
          카드를 섞고 있습니다...
        </motion.h2>

        <div className="relative h-64 w-80">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                x: [(i - 3) * 20, (i - 3) * 35, (i - 3) * 15, (i - 3) * 25],
                y: [0, -20 + i * 5, 10, 0],
                rotate: [(i - 3) * 3, (i - 3) * -5, (i - 3) * 4, (i - 3) * 2],
                opacity: 1,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
              className="absolute left-1/2 top-1/2 h-48 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-amber-400/30 bg-gradient-to-b from-night-deep to-night p-3 shadow-gold"
            >
              <div className="flex h-full items-center justify-center rounded-xl border border-lavender/10 bg-lavender/[0.03]">
                <span className="font-display text-3xl text-lavender/40">LT</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
          className="mt-8 text-sm text-lavender/50"
        >
          당신의 에너지를 카드에 담고 있어요
        </motion.p>
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 5 — Card Selection (Pick 3)
   ──────────────────────────────────────────── */

const SelectionStep = ({
  onComplete,
}: {
  onComplete: (cards: TarotCard[]) => void;
}) => {
  const [pool] = useState(() => shuffleCards(MAJOR_ARCANA_CARDS).slice(0, 7));
  const [selected, setSelected] = useState<number[]>([]);

  const toggleCard = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected((s) => s.filter((i) => i !== idx));
    } else if (selected.length < 3) {
      const next = [...selected, idx];
      setSelected(next);
      if (next.length === 3) {
        setTimeout(() => {
          onComplete(next.map((i) => pool[i]));
        }, 600);
      }
    }
  };

  return (
    <PageWrap k="selection">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-8 text-center"
        >
          <h2 className="font-display text-3xl text-lavender sm:text-4xl">
            세 장의 카드를 선택하세요
          </h2>
          <p className="mt-3 text-sm text-lavender/50">
            직감이 이끄는 대로, 마음이 가는 카드를 골라보세요 ({selected.length}/3)
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {pool.map((card, i) => {
            const isSelected = selected.includes(i);
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: isSelected ? -12 : 0,
                  scale: isSelected ? 1.05 : 1,
                }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: easeOut }}
                whileHover={!isSelected && selected.length < 3 ? { y: -8, scale: 1.03 } : undefined}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleCard(i)}
                disabled={selected.length >= 3 && !isSelected}
                className={`relative h-52 w-36 rounded-2xl border p-3 transition-all sm:h-56 sm:w-40 ${
                  isSelected
                    ? 'border-amber-400/70 glow-gold-strong'
                    : 'border-lavender/15 hover:border-amber-400/30'
                } ${selected.length >= 3 && !isSelected ? 'opacity-40' : ''}`}
                style={{
                  background: isSelected
                    ? 'linear-gradient(180deg, rgba(251,191,36,0.12) 0%, rgba(26,11,46,0.9) 100%)'
                    : 'linear-gradient(180deg, rgba(26,11,46,0.8) 0%, rgba(15,7,32,0.95) 100%)',
                }}
              >
                <div className="flex h-full flex-col items-center justify-center rounded-xl border border-lavender/10 bg-lavender/[0.03]">
                  <span className="font-display text-4xl text-lavender/50">LT</span>
                  <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-lavender/30">
                    Card {i + 1}
                  </span>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-night"
                  >
                    {selected.indexOf(i) + 1}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 6 — Card Reveal (3D Flip)
   ──────────────────────────────────────────── */

const CardFlip = ({
  card,
  positionLabel,
  index,
  isFlipped,
  onFlip,
}: {
  card: TarotCard;
  positionLabel: string;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: easeOut }}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-amber-400/70">
        {positionLabel}
      </span>

      <div
        className="tarot-perspective cursor-pointer"
        onClick={onFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="tarot-flip-inner relative h-64 w-44 sm:h-72 sm:w-48"
        >
          {/* Back */}
          <div className="tarot-face absolute inset-0 rounded-2xl border border-amber-400/40 bg-gradient-to-b from-night-deep to-night p-3 shadow-gold">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-lavender/10 bg-lavender/[0.03]">
              <Eye size={28} className="text-lavender/40" />
              <span className="mt-3 text-[10px] uppercase tracking-[0.3em] text-lavender/40">
                탭하여 열기
              </span>
            </div>
          </div>

          {/* Front */}
          <div className="tarot-face tarot-face-front absolute inset-0 rounded-2xl border border-amber-400/60 bg-gradient-to-b from-amber-400/10 to-night-deep p-3 glow-gold">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-amber-400/20 bg-night/60 p-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60">
                Major Arcana
              </span>
              <h3 className="mt-3 font-display text-3xl text-lavender">
                {card.koreanName}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-amber-400/70">
                {card.englishName}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {card.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-violet/20 bg-violet/10 px-2 py-0.5 text-[9px] uppercase text-violet/80"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const RevealStep = ({
  cards,
  onComplete,
}: {
  cards: TarotCard[];
  onComplete: () => void;
}) => {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const allFlipped = flipped.every(Boolean);

  const handleFlip = (idx: number) => {
    setFlipped((f) => {
      const next = [...f];
      next[idx] = true;
      return next;
    });
  };

  return (
    <PageWrap k="reveal">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-display text-3xl text-lavender sm:text-4xl"
        >
          카드를 하나씩 터치해 뒤집어보세요
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {cards.map((card, i) => (
            <CardFlip
              key={card.id}
              card={card}
              positionLabel={POSITION_LABELS[i]}
              index={i}
              isFlipped={flipped[i]}
              onFlip={() => handleFlip(i)}
            />
          ))}
        </div>

        <AnimatePresence>
          {allFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={onComplete}
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 font-semibold text-night shadow-gold transition hover:scale-105 hover:shadow-gold-strong"
              >
                <MessageCircleHeart size={18} />
                리딩 결과 보기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 7 — Reading Result
   ──────────────────────────────────────────── */

const ResultStep = ({
  question,
  situation,
  cards,
  drawnCards,
  reading,
  aiReading,
  onRestart,
  onHome,
}: {
  question: QuestionOption;
  situation: string;
  cards: TarotCard[];
  drawnCards: DrawnCard[];
  reading: LoveReading | null;
  aiReading: AIReading | null;
  onRestart: () => void;
  onHome: () => void;
}) => {
  const [toneStyle, setToneStyle] = useState<'warm' | 'cool' | 'mystic'>('mystic');

  // Use AI reading if available, otherwise fallback to local reading
  const displayReading = useMemo(() => {
    if (aiReading) {
      return {
        summary: aiReading.input_summary,
        combined: aiReading.combined_reading,
        advice: aiReading.advice,
        keyword: aiReading.keyword,
        cardInterpretations: aiReading.cards.map((c) => c.interpretation),
      };
    }
    if (reading) {
      return {
        summary: reading.intro,
        combined: reading.summary,
        advice: reading.advice,
        keyword: reading.energyLabel,
        cardInterpretations: reading.positionInterpretations.map((p) => p.meaning),
      };
    }
    return null;
  }, [aiReading, reading]);

  if (!displayReading) return null;

  // Love possibility score (visual only, based on card tones)
  const scorePercent = cards.reduce((acc, c) => {
    if (c.tone === 'positive') return acc + 25;
    if (c.tone === 'neutral') return acc + 15;
    return acc + 5;
  }, 15);

  const toneColors = {
    warm: 'text-rose-300',
    cool: 'text-sky-300',
    mystic: 'text-violet/90',
  };

  return (
    <PageWrap k="result">
      <div className="w-full max-w-4xl space-y-8">
        {/* Question & summary */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="glass rounded-3xl p-6 text-center sm:p-8"
        >
          <span className="text-3xl">{CATEGORY_EMOJI[question.id]}</span>
          <h2 className="mt-3 font-display text-3xl text-lavender sm:text-4xl">
            {CATEGORY_QUESTION[question.id]}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-lavender/60">
            &ldquo;{situation}&rdquo;
          </p>
          <p className="mt-4 text-base leading-relaxed text-lavender/80">
            {displayReading.summary}
          </p>
        </motion.section>

        {/* 3 Cards side by side */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: easeOut }}
          className="grid gap-5 sm:grid-cols-3"
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="glass rounded-2xl p-5"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60">
                {POSITION_LABELS[i]}
              </span>
              <h3 className="mt-2 font-display text-2xl text-lavender">
                {card.koreanName}
              </h3>
              <p className="mt-1 text-xs text-amber-400/60">{card.englishName}</p>
              <p className={`mt-3 text-sm leading-relaxed ${toneColors[toneStyle]}`}>
                {displayReading.cardInterpretations[i]}
              </p>
            </div>
          ))}
        </motion.section>

        {/* Detailed reading */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <h3 className="font-display text-2xl text-lavender">종합 해석</h3>
          <p className={`mt-4 text-base leading-8 ${toneColors[toneStyle]}`}>
            {displayReading.combined}
          </p>

          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <span className="text-xs uppercase tracking-widest text-amber-400/60">오늘의 한 줄 조언</span>
            <p className="mt-2 font-display text-xl text-lavender">
              {displayReading.advice}
            </p>
          </div>

          {displayReading.keyword && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-4 py-2">
              <Sparkles size={14} className="text-violet" />
              <span className="text-sm text-violet">{displayReading.keyword}</span>
            </div>
          )}
        </motion.section>

        {/* Love possibility bar */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-lavender/50">연애 가능성</span>
            <span className="font-display text-2xl text-amber-400">{scorePercent}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-lavender/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scorePercent}%` }}
              transition={{ delay: 0.5, duration: 1.2, ease: easeOut }}
              className="shimmer-bar h-full rounded-full"
            />
          </div>
        </motion.section>

        {/* Tone style toggle */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-xs text-lavender/40">결과 스타일:</span>
          {(['warm', 'cool', 'mystic'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setToneStyle(t)}
              className={`rounded-full px-4 py-1.5 text-xs transition ${
                toneStyle === t
                  ? 'bg-amber-400 text-night'
                  : 'border border-lavender/15 text-lavender/50 hover:border-lavender/30'
              }`}
            >
              {t === 'warm' ? '다정한' : t === 'cool' ? '냉정한' : '신비로운'}
            </button>
          ))}
        </motion.section>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pb-8"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-6 py-3 text-sm text-amber-400 transition hover:bg-amber-400/20"
          >
            <RefreshCw size={16} />
            다시 뽑기
          </button>
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 rounded-full border border-lavender/15 px-6 py-3 text-sm text-lavender/60 transition hover:border-lavender/30"
          >
            <Home size={16} />
            처음으로
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '별빛 타로방 리딩 결과',
                  text: `${CATEGORY_QUESTION[question.id]} — ${displayReading.advice}`,
                }).catch(() => {});
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-lavender/15 px-6 py-3 text-sm text-lavender/60 transition hover:border-lavender/30"
          >
            <Share2 size={16} />
            공유하기
          </button>
        </motion.div>
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   AI Reading type
   ──────────────────────────────────────────── */

interface AIReading {
  category: { id: string; label: string; question: string };
  input_summary: string;
  cards: Array<{
    position: string;
    label: string;
    english_name: string;
    korean_name: string;
    interpretation: string;
  }>;
  combined_reading: string;
  advice: string;
  keyword: string;
}

/* ────────────────────────────────────────────
   Main App
   ──────────────────────────────────────────── */

const App = () => {
  const [step, setStep] = useState<Step>(0);
  const [questionId, setQuestionId] = useState<LoveQuestionId | null>(null);
  const [situation, setSituation] = useState('');
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [aiReading, setAiReading] = useState<AIReading | null>(null);
  const [localReading, setLocalReading] = useState<LoveReading | null>(null);

  // ── Background music ──
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = useCallback(() => {
    if (musicStarted) return;
    const audio = new Audio('./Celestial_Whispers.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setMusicStarted(true);
  }, [musicStarted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const question = useMemo(
    () => LOVE_QUESTIONS.find((q) => q.id === questionId) ?? null,
    [questionId],
  );

  const drawnCards: DrawnCard[] = useMemo(
    () =>
      selectedCards.map((card, i) => ({
        card,
        position: SPREAD_POSITIONS[i].id,
        isReversed: false,
      })),
    [selectedCards],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Fetch AI reading from backend
  const fetchAiReading = useCallback(
    async (category: LoveQuestionId, sit: string) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/tarot/readings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, situation: sit }),
        });
        if (res.ok) {
          const data: AIReading = await res.json();
          setAiReading(data);
        }
      } catch {
        // Silently fail — local reading is the fallback
      }
    },
    [],
  );

  const handleSelectCategory = (id: LoveQuestionId) => {
    setQuestionId(id);
    setStep(3);
  };

  const handleSubmitSituation = (text: string) => {
    setSituation(text);
    if (questionId) {
      fetchAiReading(questionId, text);
    }
    setStep(4);
  };

  const handleShuffleDone = useCallback(() => setStep(5), []);

  const handleSelectionComplete = (cards: TarotCard[]) => {
    setSelectedCards(cards);

    // Build local reading as fallback
    if (question) {
      const drawn: DrawnCard[] = cards.map((c, i) => ({
        card: c,
        position: SPREAD_POSITIONS[i].id,
        isReversed: false,
      }));
      setLocalReading(createLoveReading(question, drawn));
    }

    setStep(6);
  };

  const handleRevealComplete = () => setStep(7);

  const handleRestart = () => {
    setQuestionId(null);
    setSituation('');
    setSelectedCards([]);
    setAiReading(null);
    setLocalReading(null);
    setStep(2);
  };

  const handleHome = () => {
    setQuestionId(null);
    setSituation('');
    setSelectedCards([]);
    setAiReading(null);
    setLocalReading(null);
    setStep(0);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-starfield text-lavender">
      <Background />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <AtmosphereStep
            onNext={() => {
              startMusic();
              setStep(1);
            }}
          />
        )}
        {step === 1 && <IntroStep onNext={() => setStep(2)} />}
        {step === 2 && <CategoryStep onSelect={handleSelectCategory} />}
        {step === 3 && question && (
          <SituationStep question={question} onSubmit={handleSubmitSituation} />
        )}
        {step === 4 && <ShuffleStep onDone={handleShuffleDone} />}
        {step === 5 && <SelectionStep onComplete={handleSelectionComplete} />}
        {step === 6 && (
          <RevealStep cards={selectedCards} onComplete={handleRevealComplete} />
        )}
        {step === 7 && question && (
          <ResultStep
            question={question}
            situation={situation}
            cards={selectedCards}
            drawnCards={drawnCards}
            reading={localReading}
            aiReading={aiReading}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
      </AnimatePresence>

      {/* Music toggle */}
      {musicStarted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleMute}
          className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-lavender/15 bg-night/70 text-lavender/50 backdrop-blur transition hover:border-amber-400/40 hover:text-amber-400"
          aria-label={isMuted ? '음악 켜기' : '음악 끄기'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </div>
  );
};

export default App;

