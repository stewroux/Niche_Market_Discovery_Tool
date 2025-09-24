import React, { useState } from 'react';
import { BrainIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

interface ThinkingProcessProps {
  thinkingProcess: {
    ja: string;
    en: string;
  };
}

export const ThinkingProcess: React.FC<ThinkingProcessProps> = ({ thinkingProcess }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const content = language === 'ja' ? thinkingProcess.ja : thinkingProcess.en;
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      <div className="p-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <BrainIcon className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-semibold text-gray-200">思考過程</h3>
        </div>
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center bg-gray-900/50 p-1 rounded-lg border border-gray-600">
            <button
              onClick={() => setLanguage('ja')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'ja' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              JA
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              EN
            </button>
          </div>
          {/* Expansion Toggle */}
          <button
            onClick={toggleExpansion}
            className="p-2 rounded-md hover:bg-gray-700/30 transition-colors focus:outline-none"
            aria-expanded={isExpanded}
            aria-controls="thinking-process-content"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div id="thinking-process-content" className="p-6 border-t border-gray-700 animate-fade-in">
          <div className="prose prose-invert prose-sm text-gray-300 max-w-none space-y-3">
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};