export type AppStep = 'landing' | 'question' | 'reading' | 'result';

export type SpreadPosition = 'self' | 'other' | 'flow';

export type CardTone = 'positive' | 'neutral' | 'challenging';

export type LoveQuestionId =
  | 'situationship'
  | 'mutualThoughts'
  | 'textNow'
  | 'reconciliation'
  | 'loveLuck';

export interface QuestionOption {
  id: LoveQuestionId;
  label: string;
  subtitle: string;
  promptLead: string;
}

export interface TarotCard {
  id: number;
  slug: string;
  englishName: string;
  koreanName: string;
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeanings: Record<SpreadPosition, string>;
  tone: CardTone;
  keywords: string[];
}

export interface DrawnCard {
  card: TarotCard;
  position: SpreadPosition;
  isReversed: boolean;
}

export interface PositionInterpretation {
  position: SpreadPosition;
  label: string;
  title: string;
  meaning: string;
  card: TarotCard;
  isReversed: boolean;
}

export interface LoveReading {
  energyLabel: string;
  intro: string;
  summary: string;
  advice: string;
  positionInterpretations: PositionInterpretation[];
}

