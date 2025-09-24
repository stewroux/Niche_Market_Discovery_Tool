export enum MarketScale {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum CompetitionLevel {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum SocialSentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
  Mixed = 'Mixed',
}

export interface Reference {
  title: string;
  url: string;
}

export interface AnalysisResult {
  keyword: string;
  marketSize: MarketScale;
  competition: CompetitionLevel;
  socialSentiment: SocialSentiment;
  nichePotential: number;
  justification: string;
}

export interface FullAnalysis {
  results: AnalysisResult[];
  references: Reference[];
  thinkingProcess: {
    ja: string;
    en: string;
  };
}