import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
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
import type {
  DrawData,
  DrawResponse,
  LoveQuestionId,
  QuestionOption,
} from './types/tarot';

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
        아르카나가 당신의 사랑 이야기를 읽어드립니다.
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
    <div className="flex w-full flex-col items-center justify-center pb-20">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mb-16 text-center font-display text-3xl text-purple-100 drop-shadow-md sm:text-4xl"
      >
        어떤 이야기가 궁금하세요?
      </motion.h2>

      <div className="relative flex h-[450px] w-full max-w-6xl items-end justify-center pb-16">
        {LOVE_QUESTIONS.map((q, index) => {
          const offsetIndex = index - 2;
          const rotation = offsetIndex * 22;
          const xOffset = offsetIndex * 130;
          const yOffset = Math.abs(offsetIndex) * 35;

          return (
            <motion.button
              key={q.id}
              onClick={() => onSelect(q.id)}
              initial={{ opacity: 0, y: 50, x: -300, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, y: yOffset, x: xOffset, rotate: rotation, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15 + 0.3,
                ease: [0.16, 1, 0.3, 1], // easeOutQuint 느낌으로 부드럽게
              }}
              whileHover={{
                y: yOffset - 30,
                scale: 1.05,
                zIndex: 50,
                boxShadow: '0px 0px 20px 5px rgba(251, 191, 36, 0.4)',
              }}
              style={{
                transformOrigin: 'bottom center',
                zIndex: 10 - Math.abs(offsetIndex),
              }}
              className="group absolute flex h-80 w-64 cursor-pointer flex-col items-center justify-start rounded-2xl border border-purple-500/40 bg-[#1e1136]/90 p-6 text-left backdrop-blur-md"
            >
              <div className="mb-4 text-3xl transition-transform group-hover:scale-110">
                {CATEGORY_EMOJI[q.id]}
              </div>
              <h3 className="mb-3 break-keep text-center text-lg font-medium text-purple-100">
                {CATEGORY_QUESTION[q.id]}
              </h3>
              <p className="break-keep text-center text-sm font-light text-purple-300/80">
                {q.subtitle}
              </p>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl text-amber-500/20">
                ✧
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  </PageWrap>
);

/* ────────────────────────────────────────────
   Step 3 — Situation Input & Spread Option
   ──────────────────────────────────────────── */

const SPREAD_OPTIONS: Record<
  LoveQuestionId,
  { id: string; label: string; cards: number; desc: string }[]
> = {
  situationship: [
    { id: 'some_basic', cards: 3, label: '관계의 나침반 (3장)', desc: '현재 나의 위치, 상대의 속마음, 그리고 이 관계의 향방' },
    { id: 'some_deep', cards: 5, label: '숨겨진 진심과 미래 (5장)', desc: '엇갈린 진심, 다가올 계기, 장애물과 카드의 조언' },
  ],
  mutualThoughts: [
    { id: 'crush_basic', cards: 3, label: '그 사람의 시선 (3장)', desc: '상대가 보는 나의 모습, 무의식적 호감, 다가갈 타이밍' },
    { id: 'crush_deep', cards: 5, label: '관계 발전의 열쇠 (5장)', desc: '두 사람 사이의 벽, 내가 취해야 할 행동, 그리고 맞이할 변화' },
  ],
  textNow: [
    { id: 'contact_basic', cards: 3, label: '연락의 타이밍 (3장)', desc: '닿았을 때의 반응, 침묵했을 때의 흐름, 당장을 위한 조언' },
    { id: 'contact_deep', cards: 5, label: '엇갈린 마음과 주파수 (5장)', desc: '지난 오해, 상대의 현재 감정, 최적의 연락 방식과 그 결과' },
  ],
  reconciliation: [
    { id: 'reunion_basic', cards: 3, label: '남겨진 미련의 조각 (3장)', desc: '끊어진 인연의 이유, 상대의 그리움, 재회의 불씨' },
    { id: 'reunion_deep', cards: 7, label: '운명의 재회선 (7장)', desc: '서로의 미련, 극복할 장벽, 다시 닿을 방법과 미래' },
  ],
  loveLuck: [
    { id: 'luck_3months', cards: 3, label: '계절의 연애 흐름 (3장)', desc: '한 달, 두 달, 세 달 뒤… 내게 다가올 인연의 모습' },
    { id: 'luck_soulmate', cards: 5, label: '운명의 붉은 실 (5장)', desc: '나의 연애 성향, 운명의 짝의 특징, 피해야 할 인연과 기회' },
  ],
};

const SituationStep = ({
  question,
  onSubmit,
}: {
  question: QuestionOption;
  onSubmit: (text: string, spreadId: string) => void;
}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSpreadId, setSelectedSpreadId] = useState<string | null>(null);
  const maxLen = 1000;

  const currentOptions = SPREAD_OPTIONS[question.id] || SPREAD_OPTIONS['situationship'];

  // 기본으로 첫 번째 옵션 선택
  useEffect(() => {
    if (currentOptions.length > 0 && selectedSpreadId === null) {
      setSelectedSpreadId(currentOptions[0].id);
    }
  }, [currentOptions, selectedSpreadId]);

  const handleSubmit = () => {
    if (text.trim().length < 5 || selectedSpreadId === null) return;
    setLoading(true);
    setTimeout(() => onSubmit(text.trim(), selectedSpreadId), 800);
  };

  return (
    <PageWrap k="situation">
      <div className="flex w-full min-h-[80vh] flex-col items-center justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-4 flex flex-col items-center space-y-2 text-center"
        >
          <span className="mb-2 text-3xl">{CATEGORY_EMOJI[question.id]}</span>
          <h2 className="font-display text-3xl text-purple-100 drop-shadow-md sm:text-4xl">
            {CATEGORY_QUESTION[question.id]}
          </h2>
          <p className="text-center text-sm font-light text-purple-300/80">
            당신의 이야기를 어떤 깊이로 비춰주길 원하시나요?
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
            className="flex w-full max-w-2xl flex-col items-center"
          >
            <div className="relative w-full max-w-2xl">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, maxLen))}
                maxLength={maxLen}
                placeholder={`마음속 깊은 곳에 담아두었던 이야기를\n이곳에 조용히 털어놓아 보세요.\n\n당신의 진심이 담긴 문장들이 별빛이 되어\n운명의 카드를 정확한 곳으로 이끌어 줄 거예요.\n두서없는 사소한 감정들까지 모두 적어주셔도 좋습니다...`}
                className="h-56 w-full resize-none rounded-2xl border border-purple-500/30 bg-[#1e1136]/60 p-6 leading-relaxed text-purple-100 placeholder-purple-400/40 backdrop-blur-md transition-all focus:border-amber-400/70 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
              <div className="absolute bottom-4 right-6 text-sm font-light transition-colors duration-300">
                <span
                  className={
                    text.length >= maxLen
                      ? 'text-amber-400'
                      : 'text-purple-400/60'
                  }
                >
                  {text.length}
                </span>
                <span className="text-purple-400/40"> / {maxLen}</span>
              </div>
            </div>

            {/* Spread Options */}
            <div className="mt-8 flex w-full flex-col gap-5 sm:flex-row">
              {currentOptions.map((opt) => {
                const isSelected = selectedSpreadId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedSpreadId(opt.id)}
                    className={`flex flex-1 flex-col items-start justify-center rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? 'border-amber-400/70 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                        : 'border-purple-500/30 bg-[#1e1136]/40 hover:border-amber-400/40 hover:bg-purple-500/20'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <h4 className={`text-lg font-medium ${isSelected ? 'text-amber-300' : 'text-purple-200'}`}>
                        {opt.label}
                      </h4>
                      {isSelected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs text-night">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className={`mt-3 text-sm font-light leading-relaxed ${isSelected ? 'text-amber-400/80' : 'text-purple-300/60'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              disabled={text.trim().length < 5 || selectedSpreadId === null}
              className="mt-8 rounded-full border border-purple-500/50 bg-purple-600/40 px-10 py-4 text-lg tracking-wide text-purple-100 transition-all duration-300 hover:border-amber-400/60 hover:bg-purple-500/40 hover:text-amber-200 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:cursor-not-allowed disabled:opacity-30"
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

const ShuffleStep = ({ onDone, isReady, hasError, onRetry }: { onDone: () => void; isReady: boolean; hasError: boolean; onRetry: () => void }) => {
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (animDone && isReady) onDone();
  }, [animDone, isReady, onDone]);

  // 카드를 두 그룹으로 나누어 섞는 듯한(Riffle Shuffle) 연출을 위한 배열
  const cards = Array.from({ length: 14 });

  return (
    <PageWrap k="shuffle">
      <div className="flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-3xl text-lavender sm:text-4xl"
        >
          운명의 카드를 섞고 있습니다...
        </motion.h2>

        <div className="relative flex h-64 w-full max-w-[320px] items-center justify-center">
          {cards.map((_, i) => {
            const isLeft = i % 2 === 0;
            // 초기 위치: 양쪽으로 갈라져 있는 상태
            const startX = isLeft ? -120 : 120;
            const startY = isLeft ? 10 : -10;
            const startRotate = isLeft ? -15 : 15;

            return (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  x: [0, startX, 0, (i % 3 - 1) * 10],
                  y: [0, startY, 0, (i % 3 - 1) * 5],
                  rotate: [0, startRotate, 0, (i % 3 - 1) * 3],
                  scale: [1, 1, 1, 1],
                  opacity: 1,
                  zIndex: [1, isLeft ? i : 20 - i, i, i],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 2, // 3번 반복 후 (총 4.5초) 넘어감
                  ease: 'easeInOut',
                  times: [0, 0.4, 0.8, 1],
                  delay: i * 0.05,
                }}
                className="absolute h-48 w-32 rounded-2xl border border-amber-400/30 bg-gradient-to-b from-night-deep to-night p-3 shadow-gold"
              >
                <div className="flex h-full items-center justify-center rounded-xl border border-lavender/10 bg-[url('/love-tarot-mark.svg')] bg-center bg-no-repeat opacity-50 bg-blend-overlay">
                  <Star className="text-amber-400/20" size={32} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="h-5 w-5 rounded-full border border-amber-400/30 border-t-amber-400"
          />
          <span className="text-sm text-lavender/60">
            {hasError ? '서버 연결에 실패했습니다' : '당신의 이야기를 카드에 담는 중'}
          </span>
        </motion.div>

        {animDone && hasError && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <p className="text-sm text-rose-300/80">서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.</p>
            <button
              onClick={onRetry}
              className="rounded-full border border-amber-400/40 bg-amber-400/10 px-6 py-2.5 text-sm text-amber-400 transition hover:bg-amber-400/20"
            >
              다시 시도
            </button>
          </motion.div>
        )}
      </div>
    </PageWrap>
  );
};

/* ────────────────────────────────────────────
   Step 5 — Card Selection (78-card Fan)
   ──────────────────────────────────────────── */

const SelectionStep = ({
  drawData,
  onComplete,
  onFirstSelect,
}: {
  drawData: DrawData;
  onComplete: () => void;
  onFirstSelect: () => void;
}) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedFanIndices, setSelectedFanIndices] = useState<Set<number>>(new Set());
  const totalFanCards = 78;
  const targetCount = drawData.drawnCards.length;
  const allRevealed = revealedCount >= targetCount;

  const handleFanCardClick = (fanIndex: number) => {
    if (selectedFanIndices.has(fanIndex) || allRevealed) return;
    if (revealedCount === 0) onFirstSelect();
    setSelectedFanIndices(prev => {
      const next = new Set(prev);
      next.add(fanIndex);
      return next;
    });
    setRevealedCount(prev => prev + 1);
  };

  return (
    <PageWrap k="selection">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-6 flex flex-col items-center space-y-3 text-center"
        >
          <h2 className="font-display text-3xl text-purple-100 drop-shadow-md sm:text-4xl">
            마음이 이끄는 카드를 골라주세요
          </h2>
          <p className="text-sm font-light text-purple-300/80">
            78장의 덱에서 직감이 이끄는 {targetCount}장을 터치하세요 ({revealedCount}/{targetCount})
          </p>
          <p className="text-xs text-amber-400/70">{drawData.spreadName}</p>
          <AnimatePresence>
            {revealedCount === 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 animate-pulse text-center text-xs font-light tracking-wide text-amber-500/90"
              >
                * 한 번 카드를 선택하면 이전 단계로 돌아가지 못합니다.
                <br />
                진심을 다해 마음으로 카드를 골라주세요.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Spread positions — revealed cards */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {drawData.drawnCards.map((dp, i) => {
            const isRevealed = i < revealedCount;
            return (
              <motion.div
                key={dp.position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`flex w-32 flex-col items-center rounded-2xl border p-3 text-center transition-all sm:w-40 ${
                  isRevealed
                    ? 'border-amber-400/50 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.12)]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-lavender/50">
                  {dp.position}번 자리
                </span>
                <p className="mt-1 text-[11px] leading-snug text-lavender/60">{dp.positionDesc}</p>
                {isRevealed ? (
                  <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="mt-2"
                  >
                    <p className="font-display text-base text-lavender sm:text-lg">
                      {dp.card.nameKor}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-amber-400/60">
                      {dp.card.nameEng}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1">
                      <span className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                        dp.card.arcanaType === 'major'
                          ? 'bg-violet/20 text-violet/90'
                          : 'bg-emerald-400/15 text-emerald-300/90'
                      }`}>
                        {dp.card.arcanaType === 'major' ? 'Major' : 'Minor'}
                      </span>
                      {dp.card.isReversed && (
                        <span className="rounded-full bg-rose-400/15 px-1.5 py-0.5 text-[8px] text-rose-300/90">
                          역방향
                        </span>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="mt-2 flex h-14 items-center justify-center">
                    <span className="text-xl text-lavender/15">?</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 78-card fan */}
        {!allRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mx-auto h-[260px] w-full max-w-3xl sm:h-[300px]"
          >
            {Array.from({ length: totalFanCards }).map((_, i) => {
              const isSelected = selectedFanIndices.has(i);
              const angle = ((i - (totalFanCards - 1) / 2) / ((totalFanCards - 1) / 2)) * 70;
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => handleFanCardClick(i)}
                  disabled={isSelected}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: isSelected ? 0.12 : 1,
                    scale: isSelected ? 0.85 : 1,
                  }}
                  whileHover={!isSelected ? { y: -18, scale: 1.15, zIndex: 100 } : undefined}
                  whileTap={!isSelected ? { scale: 0.95 } : undefined}
                  transition={{ delay: i * 0.006, duration: 0.25 }}
                  className="absolute bottom-0 left-1/2 origin-bottom"
                  style={{
                    width: 40,
                    height: 60,
                    marginLeft: -20,
                    transform: `rotate(${angle}deg) translateY(-220px)`,
                    zIndex: isSelected ? 0 : 50 - Math.abs(i - 39),
                  }}
                >
                  <div className={`h-full w-full rounded-md border transition-colors ${
                    isSelected
                      ? 'border-lavender/5 bg-lavender/5'
                      : 'border-amber-400/30 bg-gradient-to-b from-[#1e1136] to-night shadow-[0_1px_6px_rgba(0,0,0,0.4)] hover:border-amber-400/70'
                  }`}>
                    {!isSelected && (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-[7px] text-amber-400/25">✦</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* All revealed — proceed */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 flex flex-col items-center gap-4"
            >
              <p className="text-sm text-lavender/60">
                {targetCount}장의 카드가 모두 열렸습니다
              </p>
              <button
                type="button"
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
  drawData,
  onRestart,
  onHome,
}: {
  question: QuestionOption;
  situation: string;
  drawData: DrawData | null;
  onRestart: () => void;
  onHome: () => void;
}) => {
  const [toneStyle, setToneStyle] = useState<'warm' | 'cool' | 'mystic'>('mystic');

  if (!drawData) return null;

  // Love possibility score (visual only)
  const scorePercent = Math.max(20, 80 - drawData.drawnCards.filter(dp => dp.card.isReversed).length * 12);

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
            {`${drawData.spreadName} 스프레드로 ${drawData.drawnCards.length}장의 카드가 펼쳐졌습니다.`}
          </p>
        </motion.section>

        {/* Cards display */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: easeOut }}
          className="flex flex-wrap justify-center gap-4"
        >
          {drawData.drawnCards.map((dp) => (
            <div
              key={`${dp.position}-${dp.card.id}`}
              className="glass w-44 rounded-2xl p-5 sm:w-52"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60">
                {dp.positionDesc}
              </span>
              <h3 className="mt-2 font-display text-2xl text-lavender">
                {dp.card.nameKor}
              </h3>
              <p className="mt-1 text-xs text-amber-400/60">{dp.card.nameEng}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[9px] ${
                  dp.card.arcanaType === 'major' ? 'bg-violet/20 text-violet' : 'bg-emerald-400/20 text-emerald-300'
                }`}>
                  {dp.card.arcanaType === 'major' ? 'Major' : 'Minor'}
                </span>
                {dp.card.isReversed && (
                  <span className="rounded-full bg-rose-400/20 px-2 py-0.5 text-[9px] text-rose-300">역방향</span>
                )}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Reading summary */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <h3 className="font-display text-2xl text-lavender">종합 해석</h3>
          <p className={`mt-4 text-base leading-8 ${toneColors[toneStyle]}`}>
            카드가 펼쳐졌습니다. 각 자리의 의미를 되새기며 스스로의 마음을 들여다보세요.
          </p>

          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <span className="text-xs uppercase tracking-widest text-amber-400/60">오늘의 한 줄 조언</span>
            <p className="mt-2 font-display text-xl text-lavender">
              카드의 메시지를 가볍게 마음에 담아 두세요.
            </p>
          </div>
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
                  text: `${CATEGORY_QUESTION[question.id]} — 카드의 메시지를 가볍게 마음에 담아 두세요.`,
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
   Main App
   ──────────────────────────────────────────── */

const App = () => {
  const [step, setStep] = useState<Step>(0);
  const [questionId, setQuestionId] = useState<LoveQuestionId | null>(null);
  const [situation, setSituation] = useState('');
  const [drawData, setDrawData] = useState<DrawData | null>(null);
  const [drawError, setDrawError] = useState(false);

  // ── 뒤로 가기 핸들러 ──
  const handleGoBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 2) return 1; // Category -> Intro
      if (prev === 3) return 2; // Situation -> Category
      if (prev === 4) return 3; // Shuffle -> Situation
      if (prev === 5) return 3; // Selection -> Situation (카드 선택 전이라면)
      return prev;
    });
  }, []);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const fetchDrawCards = useCallback(async (sid: string) => {
    setDrawData(null);
    setDrawError(false);
    try {
      const res = await fetch(`${BACKEND_URL}/api/tarot/draw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadId: sid }),
      });
      if (res.ok) {
        const json: DrawResponse = await res.json();
        if (json.success) {
          setDrawData(json.data);
          return;
        }
      }
      setDrawError(true);
    } catch {
      setDrawError(true);
    }
  }, []);

  const handleSelectCategory = (id: LoveQuestionId) => {
    setQuestionId(id);
    setStep(3);
  };

  const handleSubmitSituation = (text: string, sid: string) => {
    setSituation(text);
    fetchDrawCards(sid);
    setStep(4);
  };

  const handleShuffleDone = useCallback(() => setStep(5), []);

  const handleDrawComplete = useCallback(() => setStep(7), []);

  const handleRestart = () => {
    setQuestionId(null);
    setSituation('');
    setDrawData(null);
    setDrawError(false);
    setStep(2);
  };

  const handleHome = () => {
    setQuestionId(null);
    setSituation('');
    setDrawData(null);
    setDrawError(false);
    setStep(0);
  };

  const [hasSelectedCard, setHasSelectedCard] = useState(false);
  const handleFirstSelect = useCallback(() => setHasSelectedCard(true), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-starfield text-lavender">
      <Background />

      {/* 뒤로 가기 버튼 */}
      {step > 1 && step < 6 && !(step === 5 && hasSelectedCard) && (
        <button
          onClick={handleGoBack}
          className="absolute left-6 top-8 z-50 flex items-center space-x-2 text-sm font-light text-lavender/60 transition-colors hover:text-amber-400 md:left-12 md:text-base"
        >
          <span>← 이전 단계로</span>
        </button>
      )}

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
        {step === 4 && <ShuffleStep onDone={handleShuffleDone} isReady={!!drawData} hasError={drawError} onRetry={() => { setStep(3); setDrawError(false); }} />}
        {step === 5 && drawData && (
          <SelectionStep
            drawData={drawData}
            onComplete={handleDrawComplete}
            onFirstSelect={handleFirstSelect}
          />
        )}
        {step === 7 && question && (
          <ResultStep
            question={question}
            situation={situation}
            drawData={drawData}
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

