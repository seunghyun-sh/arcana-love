import type { QuestionOption } from '../types/tarot';

// 화면 배치 순서: 왼쪽→오른쪽, 정중앙(index 3)이 '썸'
export const LOVE_QUESTIONS: QuestionOption[] = [
  {
    id: 'mutualThoughts',
    label: 'Does this person think about me too?',
    subtitle: '상대의 시선과 감정의 잔상을 읽습니다.',
    promptLead: '상대가 당신을 얼마나 자주, 얼마나 깊이 떠올리는지에 대한 질문에 카드는 감정의 밀도와 표현 방식을 드러냅니다.',
  },
  {
    id: 'chemistry',
    label: 'How compatible are we?',
    subtitle: '내가 생각하는 그 사람과 나의 타고난 성향, 그리고 운명적인 궁합을 맞춰봅니다.',
    promptLead: '두 사람의 본질적인 궁합을 묻는 질문에 카드는 끌림의 이유, 갈등의 씨앗, 함께할 때의 시너지를 밝혀 줍니다.',
  },
  {
    id: 'textNow',
    label: 'Should I text them now?',
    subtitle: '지금 연락하는 타이밍이 맞는지 봅니다.',
    promptLead: '지금 메시지를 보내도 될지에 대한 질문에 카드는 행동의 타이밍과 감정의 수용도를 중심으로 답합니다.',
  },
  {
    id: 'situationship',
    label: 'Will this situationship continue?',
    subtitle: '이 애매한 관계가 이어질 가능성을 읽습니다.',
    promptLead: '이 situationship의 다음 장면을 묻는 질문에 대해 카드는 관계의 지속 가능성과 온도차를 함께 보여 줍니다.',
  },
  {
    id: 'couple',
    label: 'Will we stay together?',
    subtitle: '현재 만나고 있는 연인과 앞으로 그려갈 미래와 관계의 방향을 짚어봅니다.',
    promptLead: '현재 교제 중인 연인과의 미래를 묻는 질문에 카드는 관계의 온도, 잠재된 위기, 함께 성장할 가능성을 조명합니다.',
  },
  {
    id: 'reconciliation',
    label: 'Is reconciliation possible?',
    subtitle: '다시 이어질 수 있는 흐름이 있는지 살핍니다.',
    promptLead: '재회를 바라는 마음에 대해 카드는 남아 있는 감정, 미해결된 과제, 다시 만날 가능성의 결을 읽어 줍니다.',
  },
  {
    id: 'loveLuck',
    label: 'How is my love luck this year?',
    subtitle: '올해의 연애 운과 흐름을 넓게 살핍니다.',
    promptLead: '올해 연애 운의 방향을 묻는 질문에 카드는 당신의 감정 습관, 끌어당기는 인연, 관계의 흐름을 입체적으로 보여 줍니다.',
  },
];

