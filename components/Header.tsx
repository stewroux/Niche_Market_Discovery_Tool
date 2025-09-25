import React from 'react';
import { TargetIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-4 border-b border-gray-700">
      <div className="flex items-center justify-center gap-4">
        <TargetIcon className="w-12 h-12 text-cyan-400" />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            ニッチ市場発見ツール
          </h1>
          <p className="text-gray-400 mt-1">AIがWeb検索データから、有望な市場機会を発見します。</p>
        </div>
      </div>
    </header>
  );
};