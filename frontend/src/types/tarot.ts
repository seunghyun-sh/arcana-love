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

// ── Draw API (POST /api/tarot/draw) ──

export interface DrawCardInfo {
  id: string;
  nameKor: string;
  nameEng: string;
  arcanaType: 'major' | 'minor';
  isReversed: boolean;
}

export interface DrawPosition {
  position: number;
  positionDesc: string;
  card: DrawCardInfo;
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

