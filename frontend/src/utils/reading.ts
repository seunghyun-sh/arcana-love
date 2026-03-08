import type { CardTone, DrawnCard, LoveReading, LoveQuestionId, QuestionOption } from '../types/tarot';
import { SPREAD_POSITIONS } from './tarot';

const QUESTION_ADVICE: Record<LoveQuestionId, Record<CardTone, string>> = {
  situationship: {
    positive: '애매함을 오래 끌기보다, 관계의 방향을 가볍지만 분명하게 확인해 보세요.',
    neutral: '지금은 기대를 키우기보다 상대의 행동 패턴이 꾸준한지 먼저 살피는 편이 좋습니다.',
    challenging: '불확실함 자체에 매달리지 말고, 당신의 기준이 지켜지는 관계인지부터 점검하세요.',
  },
  mutualThoughts: {
    positive: '상대도 당신을 의식할 가능성이 큽니다. 다만 확신은 상상보다 행동에서 찾으세요.',
    neutral: '마음은 있을 수 있지만 표현은 느릴 수 있습니다. 반응보다 흐름을 길게 보세요.',
    challenging: '상대의 생각을 추측으로 채우기보다, 당신이 실제로 받는 신호를 기준으로 삼아야 합니다.',
  },
  textNow: {
    positive: '지금 연락해도 좋습니다. 짧고 가벼운 톤이 가장 자연스럽게 문을 엽니다.',
    neutral: '보내더라도 답을 재촉하지 않는 메시지가 좋고, 여유 있는 타이밍을 남겨 두세요.',
    challenging: '지금은 바로 반응을 얻으려 하기보다 감정이 가라앉은 뒤 한 번 더 생각해 보는 편이 좋습니다.',
  },
  reconciliation: {
    positive: '재회의 문은 열려 있습니다. 다만 같은 패턴으로 돌아가기보다 새로운 방식이 필요합니다.',
    neutral: '가능성은 남아 있지만 속도를 내기보다 관계를 다시 설계할 준비가 되었는지 확인해야 합니다.',
    challenging: '지금은 다시 만나는 것보다 왜 멀어졌는지의 구조를 정확히 보는 일이 먼저입니다.',
  },
  loveLuck: {
    positive: '올해의 연애운은 열려 있습니다. 마음을 숨기지 않는 태도가 좋은 인연을 더 빨리 끌어옵니다.',
    neutral: '기회는 오지만 선택의 기준이 중요합니다. 설렘과 안정감이 함께 있는지 꼭 확인하세요.',
    challenging: '올해는 사랑을 서두르기보다 감정 패턴을 정리할수록 더 좋은 흐름으로 넘어갈 수 있습니다.',
  },
};

const ENERGY_LABELS = {
  radiant: 'Radiant Pull',
  twilight: 'Twilight Pull',
  shadow: 'Shadow Pull',
} as const;

const getToneScore = (cards: DrawnCard[]) =>
  cards.reduce((score, drawnCard) => {
    if (drawnCard.card.tone === 'positive') {
      return score + 1;
    }

    if (drawnCard.card.tone === 'challenging') {
      return score - 1;
    }

    return score;
  }, 0);

const getOverallToneSentence = (score: number): { energyLabel: string; line: string } => {
  if (score >= 2) {
    return {
      energyLabel: ENERGY_LABELS.radiant,
      line: '세 장의 카드가 전반적으로 따뜻한 호응을 보여 주며, 관계는 감정만 확인되면 현실적인 진전으로 이어질 가능성이 큽니다.',
    };
  }

  if (score >= 0) {
    return {
      energyLabel: ENERGY_LABELS.twilight,
      line: '마음은 분명 존재하지만 속도와 표현 방식이 엇갈려, 지금은 결론보다 타이밍과 분위기를 읽는 태도가 중요합니다.',
    };
  }

  return {
    energyLabel: ENERGY_LABELS.shadow,
    line: '끌림과 불안이 동시에 작동하는 흐름입니다. 감정을 밀어붙이기보다 패턴을 정리할 때 더 정확한 답이 보입니다.',
  };
};

const getFlowToneSentence = (tone: CardTone): string => {
  if (tone === 'positive') {
    return '특히 관계의 흐름 자리에 놓인 카드는 다음 장면이 비교적 밝게 열릴 수 있음을 암시합니다.';
  }

  if (tone === 'neutral') {
    return '흐름 카드는 아직 결론을 서두르기보다 서로의 리듬을 맞추는 과정이 더 중요하다고 말합니다.';
  }

  return '흐름 카드는 지금의 긴장을 그냥 두면 같은 패턴이 반복될 수 있음을 경고합니다.';
};

export const createLoveReading = (
  question: QuestionOption,
  cards: DrawnCard[],
): LoveReading => {
  if (cards.length !== 3) {
    throw new Error('A 3-card spread is required to build a reading.');
  }

  const [selfCard, otherCard, flowCard] = cards;
  const toneScore = getToneScore(cards);
  const { energyLabel, line } = getOverallToneSentence(toneScore);

  const positionInterpretations = cards.map((drawnCard) => {
    const spread = SPREAD_POSITIONS.find((position) => position.id === drawnCard.position);

    return {
      position: drawnCard.position,
      label: spread?.subtitle ?? drawnCard.position,
      title: spread?.label ?? drawnCard.position,
      meaning: drawnCard.card.loveMeanings[drawnCard.position],
      card: drawnCard.card,
      isReversed: drawnCard.isReversed,
    };
  });

  const intro = `${question.promptLead} 이번 스프레드는 ${selfCard.card.koreanName}, ${otherCard.card.koreanName}, ${flowCard.card.koreanName} 카드로 응답했습니다.`;
  const summary = [
    selfCard.card.loveMeanings.self,
    otherCard.card.loveMeanings.other,
    flowCard.card.loveMeanings.flow,
    line,
    getFlowToneSentence(flowCard.card.tone),
  ].join(' ');

  return {
    energyLabel,
    intro,
    summary,
    advice: QUESTION_ADVICE[question.id][flowCard.card.tone],
    positionInterpretations,
  };
};

