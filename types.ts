export enum SearchVolume {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum CompetitionLevel {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface Reference {
  title: string;
  url: string;
}

export interface WebAnalysisResult {
  keyword: string;
  searchVolume: SearchVolume;
  competitionLevel: CompetitionLevel;
  nichePotential: number;
  justification: string;
}

export type AnyAnalysisResult = WebAnalysisResult;

export interface FullAnalysis {
  results: WebAnalysisResult[];
  references: Reference[];
  thinkingProcess: {
    ja: string;
    en: string;
  };
}