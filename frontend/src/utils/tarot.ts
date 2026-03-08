import type { SpreadPosition, TarotCard } from '../types/tarot';

export const SPREAD_POSITIONS: Array<{
  id: SpreadPosition;
  label: string;
  subtitle: string;
}> = [
  { id: 'self', label: 'My feelings', subtitle: '내 마음' },
  { id: 'other', label: 'Their feelings', subtitle: '상대의 마음' },
  { id: 'flow', label: 'Relationship flow', subtitle: '관계의 흐름' },
];

export const shuffleCards = (cards: TarotCard[]): TarotCard[] => {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

