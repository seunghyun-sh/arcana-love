import { motion } from 'framer-motion';
import { CardDeck } from '../components/CardDeck';
import { PageShell } from '../components/PageShell';
import { TarotCard } from '../components/TarotCard';
import type { DrawnCard, QuestionOption } from '../types/tarot';
import { SPREAD_POSITIONS } from '../utils/tarot';

interface ReadingPageProps {
  question: QuestionOption;
  drawnCards: DrawnCard[];
  remainingCards: number;
  isRevealed: boolean;
  onDrawCard: () => void;
  onReveal: () => void;
  onBack: () => void;
}

export const ReadingPage = ({
  question,
  drawnCards,
  remainingCards,
  isRevealed,
  onDrawCard,
  onReveal,
  onBack,
}: ReadingPageProps) => {
  const canDraw = drawnCards.length < 3 && !isRevealed;
  const canReveal = drawnCards.length === 3 && !isRevealed;

  return (
    <PageShell
      eyebrow="Reading"
      title="세 장의 카드가 관계의 흐름을 완성합니다"
      description={`선택한 질문: ${question.label}. 카드를 한 장씩 뽑아 내 마음, 상대의 마음, 관계의 흐름 자리에 놓아주세요.`}
    >
      <div className="grid gap-8 xl:grid-cols-[320px,1fr]">
        <CardDeck
          remainingCards={remainingCards}
          drawnCount={drawnCards.length}
          canDraw={canDraw}
          onDraw={onDrawCard}
        />

        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-aura backdrop-blur sm:p-6">
          <div className="grid gap-5 lg:grid-cols-3">
            {SPREAD_POSITIONS.map((position, index) => {
              const drawnCard = drawnCards[index];

              return (
                <div key={position.id} className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.32em] text-gold/70">
                      {position.label}
                    </p>
                    <p className="mt-2 text-sm text-ivory/60">{position.subtitle}</p>
                  </div>

                  {drawnCard ? (
                    <TarotCard
                      card={drawnCard.card}
                      positionLabel={`Card ${index + 1}`}
                      positionTitle={position.subtitle}
                      isFlipped={isRevealed}
                      delay={index * 0.14}
                      size="compact"
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="flex h-[19rem] w-full max-w-[16rem] items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-midnight/40 px-6 text-center text-sm leading-7 text-ivory/45 sm:h-[20rem]"
                    >
                      덱에서 카드를 뽑으면 이 자리에 놓입니다.
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-midnight/70 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-violet/80">Spread status</p>
                <p className="mt-3 text-sm leading-7 text-ivory/72">
                  {drawnCards.length < 3
                    ? `${3 - drawnCards.length}장의 카드를 더 뽑으면 리딩을 시작할 수 있습니다.`
                    : isRevealed
                      ? '카드가 뒤집히고 있습니다. 잠시 후 결과 페이지로 이동합니다.'
                      : '세 장의 카드가 모두 놓였습니다. 이제 카드의 얼굴을 열어 관계의 메세지를 확인하세요.'}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-ivory/70 transition hover:bg-white/[0.06]"
                >
                  질문 다시 고르기
                </button>

                <button
                  type="button"
                  onClick={onReveal}
                  disabled={!canReveal}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    canReveal
                      ? 'bg-gold text-midnight hover:scale-[1.01] hover:bg-[#e2bf56]'
                      : 'cursor-not-allowed bg-white/10 text-ivory/35'
                  }`}
                >
                  카드 뒤집고 결과 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

