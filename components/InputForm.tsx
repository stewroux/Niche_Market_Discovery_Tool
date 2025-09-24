
import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface InputFormProps {
  onAnalyze: (problem: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [problem, setProblem] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(problem);
  };

  return (
    <section className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="problem-input" className="block text-lg font-semibold mb-2 text-gray-300">
          顧客の悩み・課題
        </label>
        <p className="text-sm text-gray-500 mb-4">調査したい市場の起点となる、ターゲット顧客が抱える悩みや課題を入力してください。（例：「テレワークでの運動不足」「赤ちゃんの夜泣き」）</p>
        <textarea
          id="problem-input"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="例: テレワークによる孤独感とコミュニケーション不足"
          className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none text-white placeholder-gray-500"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !problem.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                分析中...
              </>
            ) : (
              <>
                <SearchIcon className="w-5 h-5" />
                分析を開始
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
