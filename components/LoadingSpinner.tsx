import React, { useState, useEffect, useRef } from 'react';
import { BrainIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

interface LoadingSpinnerProps {
  thinkingProcessContent?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ thinkingProcessContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const hasContent = thinkingProcessContent && thinkingProcessContent.trim().length > 0;

  useEffect(() => {
    // Auto-scroll to the bottom of the thinking process content if it's expanded
    if (isExpanded && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [thinkingProcessContent, isExpanded]);

  return (
    <div className="text-center my-12 animate-fade-in">
      <div className="flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-300">AIが市場を分析しています...</p>
        <p className="text-sm text-gray-500">キーワードを抽出し、市場規模と競合度を評価しています。最大90秒ほどかかる場合があります。</p>
      </div>

      {hasContent && (
        <div className="mt-6 w-full max-w-2xl mx-auto bg-gray-800/50 rounded-lg border border-gray-700 text-left">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-3 flex justify-between items-center hover:bg-gray-700/30 transition-colors focus:outline-none"
            aria-expanded={isExpanded}
          >
            <div className="flex items-center gap-3">
              <BrainIcon className="w-5 h-5 text-cyan-400" />
              <h4 className="font-semibold text-gray-200">思考過程</h4>
            </div>
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {isExpanded && (
            <div 
              ref={contentRef}
              className="p-4 border-t border-gray-700 text-sm text-gray-300 bg-gray-900/50 max-h-48 overflow-y-auto"
            >
              <pre className="whitespace-pre-wrap font-mono">{thinkingProcessContent}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};