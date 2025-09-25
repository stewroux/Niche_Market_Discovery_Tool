import React from 'react';
import type { WebAnalysisResult } from '../types';
import { SearchVolume, CompetitionLevel } from '../types';
import { exportToCsv } from '../utils/csvExporter';
import { DownloadIcon, PotentialIcon, BarChartIcon, ShieldIcon } from './Icons';

interface ResultsTableProps {
  results: WebAnalysisResult[];
}

const getWebScaleColor = (scale: SearchVolume | CompetitionLevel, type: 'volume' | 'competition') => {
    const isVolume = type === 'volume';
    switch (scale) {
        case SearchVolume.High:
            return isVolume ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300';
        case SearchVolume.Medium:
            return 'bg-yellow-500/20 text-yellow-300';
        case SearchVolume.Low:
            return isVolume ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300';
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
    return `linear-gradient(to right, #4ade80 ${score * 10}%, #3f3f46 ${score * 10}%)`;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    
  const handleExport = () => {
    const filename = 'web-niche-market-analysis.csv';
    const dataToExport = results.map(({ keyword, searchVolume, competitionLevel, nichePotential, justification }) => ({
      'キーワード': keyword,
      '月間検索ボリューム': searchVolume,
      '競合サイトの強さ': competitionLevel,
      'ニッチ潜在性スコア': nichePotential,
      '分析': justification
    }));
    exportToCsv(dataToExport, filename);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
       <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200">市場規模調査結果</h3>
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
                  <div className="flex items-center gap-2"><BarChartIcon className="w-5 h-5"/>月間検索ボリューム</div>
              </th>
              <th className="p-4 text-sm font-semibold text-gray-400 tracking-wider">
                  <div className="flex items-center gap-2"><ShieldIcon className="w-5 h-5"/>競合サイトの強さ</div>
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
                <td className="p-4"><span className={`px-3 py-1 text-sm font-semibold rounded-full ${getWebScaleColor(result.searchVolume, 'volume')}`}>{result.searchVolume}</span></td>
                <td className="p-4"><span className={`px-3 py-1 text-sm font-semibold rounded-full ${getWebScaleColor(result.competitionLevel, 'competition')}`}>{result.competitionLevel}</span></td>
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