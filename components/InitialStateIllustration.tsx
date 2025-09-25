import React from 'react';
import { LightbulbIcon } from './Icons';

export const InitialStateIllustration: React.FC = () => {
  return (
    <div className="text-center my-12 p-8 bg-gray-800/30 rounded-xl border border-dashed border-gray-700 animate-fade-in">
      <div className="flex justify-center items-center mb-4">
        <LightbulbIcon className="w-16 h-16 text-yellow-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-200">新しいビジネスチャンスを発見しましょう</h2>
      <p className="mt-2 text-gray-400 max-w-md mx-auto">
        顧客の悩みや課題を入力して「分析を開始」ボタンを押してください。
        AIがWeb検索データを分析し、レポートを生成します。
      </p>
    </div>
  );
};