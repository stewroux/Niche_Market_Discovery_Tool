import React from 'react';
import type { AnalysisResult } from '../types';
import { MarketScale, CompetitionLevel, SocialSentiment } from '../types';
import { exportToCsv } from '../utils/csvExporter';
import { DownloadIcon, MarketIcon, CompetitionIcon, PotentialIcon, SocialIcon } from './Icons';

interface ResultsTableProps {
  results: AnalysisResult[];
}

const getScaleColor = (scale: MarketScale | CompetitionLevel, type: 'market' | 'competition') => {
    const isMarket = type === 'market';
    switch (scale) {
        case MarketScale.High:
            return isMarket ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300';
        case MarketScale.Medium:
            return 'bg-yellow-500/20 text-yellow-300';
        case MarketScale.Low:
            return isMarket ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300';
        default:
            return 'bg-gray-700 text-gray-300';
    }
};

const getSentimentColor = (sentiment: SocialSentiment) => {
    switch (sentiment) {
        case SocialSentiment.Positive:
            return 'bg-sky-500/20 text-sky-300';
        case SocialSentiment.Negative:
            return 'bg-rose-500/20 text-rose-300';
        case SocialSentiment.Mixed:
            return 'bg-purple-500/20 text-purple-300';
        case SocialSentiment.Neutral:
            return 'bg-gray-500/20 text-gray-300';
        default:
            return 'bg-gray-700 text-gray-300';
    }
};

const getPotentialColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
};

const getPotentialGradient = (score: number) => {
    const percentage = (score - 1) / 9 * 100;
    return `linear-gradient(to right, #4ade80 ${percentage}%, #3f3f46 ${percentage}%)`;
};

const ScaleBadge: React.FC<{ scale: MarketScale | CompetitionLevel, type: 'market' | 'competition' }> = ({ scale, type }) => (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getScaleColor(scale, type)}`}>
        {scale}
    </span>
);

const SentimentBadge: React.FC<{ sentiment: SocialSentiment }> = ({ sentiment }) => (
  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getSentimentColor(sentiment)}`}>
      {sentiment}
  </span>
);


export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    
  const handleExport = () => {
    const dataToExport = results.map(({ keyword, marketSize, competition, socialSentiment, nichePotential, justification }) => ({
      'キーワード': keyword,
      '市場規模': marketSize,
      '競合度': competition,
      'SNSセンチメント': socialSentiment,
      'ニッチ潜在性スコア': nichePotential,
      '分析': justification
    }));
    exportToCsv(dataToExport, 'niche-market-analysis.csv');
  };

  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
       <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200">分析結果</h3>
           <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            CSVダウンロード
          </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">キーワード</th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <MarketIcon className="w-5 h-5"/>市場規模
                </div>
              </th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <CompetitionIcon className="w-5 h-5"/>競合度
                </div>
              </th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <SocialIcon className="w-5 h-5"/>SNSセンチメント
                </div>
              </th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <PotentialIcon className="w-5 h-5"/>ニッチ潜在性
                </div>
              </th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">分析</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {results.map((result, index) => (
              <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                <td className="p-4 font-medium text-white">{result.keyword}</td>
                <td className="p-4"><ScaleBadge scale={result.marketSize} type="market" /></td>
                <td className="p-4"><ScaleBadge scale={result.competition} type="competition" /></td>
                <td className="p-4"><SentimentBadge sentiment={result.socialSentiment} /></td>
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${getPotentialColor(result.nichePotential)}`}>{result.nichePotential}/10</span>
                        <div className="w-24 h-2 rounded-full bg-gray-600">
                           <div className="h-2 rounded-full bg-green-500" style={{ width: `${result.nichePotential * 10}%`, background: getPotentialGradient(result.nichePotential) }}></div>
                        </div>
                    </div>
                </td>
                <td className="p-4 text-sm text-gray-400 max-w-xs">{result.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};