import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { ReadingSummary } from '../components/ReadingSummary';
import { RestartButton } from '../components/RestartButton';
import { TarotCard } from '../components/TarotCard';
import type { DrawnCard, LoveReading, QuestionOption } from '../types/tarot';

interface ResultPageProps {
  question: QuestionOption;
  reading: LoveReading;
  drawnCards: DrawnCard[];
  onRestart: () => void;
  onHome: () => void;
}

export const ResultPage = ({
  question,
  reading,
  drawnCards,
  onRestart,
  onHome,
}: ResultPageProps) => (
  <PageShell
    eyebrow="Result"
    title="세 장의 카드가 들려준 지금의 사랑"
    description="선택한 질문, 세 장의 카드, 자리별 해석, 관계 전체 리딩을 한 화면에서 정리했습니다. 모바일에서도 카드와 텍스트가 자연스럽게 이어지도록 구성했습니다."
  >
    <ReadingSummary question={question} reading={reading} />

    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {drawnCards.map((drawnCard, index) => (
        <div
          key={`${drawnCard.position}-${drawnCard.card.id}`}
          className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-aura backdrop-blur"
        >
          <TarotCard
            card={drawnCard.card}
            positionLabel={`Card ${index + 1}`}
            positionTitle={reading.positionInterpretations[index]?.label}
            isFlipped
            size="compact"
          />

          <div className="mt-5 rounded-[24px] border border-white/10 bg-midnight/70 p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-gold/70">
              {reading.positionInterpretations[index]?.title}
            </p>
            <h3 className="mt-3 font-display text-3xl text-ivory">
              {drawnCard.card.koreanName}
            </h3>
            <p className="mt-4 text-sm leading-7 text-ivory/72">
              {reading.positionInterpretations[index]?.meaning}
            </p>
          </div>
        </div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12 }}
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <RestartButton onClick={onRestart} />
      <button
        type="button"
        onClick={onHome}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-ivory/70 transition hover:bg-white/[0.06]"
      >
        처음 화면으로
      </button>
    </motion.div>
  </PageShell>
);

