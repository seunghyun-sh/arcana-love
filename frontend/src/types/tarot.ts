export type LoveQuestionId =
  | 'situationship'
  | 'mutualThoughts'
  | 'textNow'
  | 'reconciliation'
  | 'loveLuck'
  | 'couple'
  | 'chemistry';

export interface QuestionOption {
  id: LoveQuestionId;
  label: string;
  subtitle: string;
  promptLead: string;
}

// ── Draw API (POST /api/tarot/draw) ──

export interface DrawCardInfo {
  id: string;
  nameKor: string;
  nameEng: string;
  arcanaType: 'major' | 'minor';
  isReversed: boolean;
  tone: string;
  keywords: string[];
}

export interface DrawPosition {
  position: number;
  positionDesc: string;
  card: DrawCardInfo;
  interpretation: string;
}

export interface DrawData {
  drawId: string;
  spreadId: string;
  spreadName: string;
  drawnCards: DrawPosition[];
}

export interface DrawResponse {
  success: boolean;
  data: DrawData;
}

// ── Interpret API (POST /api/tarot/interpret) ──

export interface CardReading {
  position: number;
  reading: string;
}

export interface InterpretData {
  cardReadings: CardReading[];
  overallSummary: string;
  finalScore: number;
}

export interface InterpretResponse {
  success: boolean;
  data: InterpretData | null;
  error: string | null;
}

