import { PageShell } from '../components/PageShell';
import { QuestionSelector } from '../components/QuestionSelector';
import { LOVE_QUESTIONS } from '../data/questions';
import type { LoveQuestionId } from '../types/tarot';

interface QuestionPageProps {
  selectedQuestionId: LoveQuestionId | null;
  onSelectQuestion: (questionId: LoveQuestionId) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const QuestionPage = ({
  selectedQuestionId,
  onSelectQuestion,
  onContinue,
  onBack,
}: QuestionPageProps) => (
  <PageShell
    eyebrow="Question"
    title="지금 가장 궁금한 질문 하나만 고르세요"
    description="한 번의 리딩에는 하나의 질문만 담는 편이 정확합니다. 마음이 가장 오래 머무는 질문을 선택하고, 그 질문에 맞춰 세 장의 카드를 펼치세요."
  >
    <QuestionSelector
      questions={LOVE_QUESTIONS}
      selectedQuestionId={selectedQuestionId}
      onSelect={onSelectQuestion}
    />

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-ivory/70 transition hover:bg-white/[0.06]"
      >
        랜딩으로 돌아가기
      </button>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedQuestionId}
        className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
          selectedQuestionId
            ? 'bg-gold text-midnight hover:scale-[1.01] hover:bg-[#e2bf56]'
            : 'cursor-not-allowed bg-white/10 text-ivory/35'
        }`}
      >
        카드 뽑으러 가기
      </button>
    </div>
  </PageShell>
);

