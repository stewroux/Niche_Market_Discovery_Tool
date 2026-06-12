import React, { useState } from 'react';
import type { Reference } from '../types';
import { LinkIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

interface ReferencesListProps {
  references: Reference[];
}

const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url;
    }
  } catch {
    // ignore invalid URLs
  }
  return '#';
};

export const ReferencesList: React.FC<ReferencesListProps> = ({ references }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedReferences = isExpanded ? references : references.slice(0, 10);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-200">参考文献</h3>
      </div>
      <ul className="divide-y divide-gray-700">
        {displayedReferences.map((ref, index) => (
          <li key={index} className="p-4 hover:bg-gray-700/50 transition-colors">
            <a 
              href={sanitizeUrl(ref.url)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-start gap-4"
            >
              <div className="flex-shrink-0 pt-1">
                <LinkIcon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div>
                <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">{ref.title}</p>
                <p className="text-sm text-gray-400 break-all">{ref.url}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {references.length > 10 && (
        <div className="p-2 bg-gray-900/60 text-center border-t border-gray-700">
          <button
            onClick={toggleExpansion}
            className="flex items-center justify-center gap-2 w-full text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors py-2 rounded-md"
          >
            {isExpanded ? (
              <>
                一部の参考文献を隠す
                <ChevronUpIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                その他 {references.length - 10} 件の参考文献を表示
                <ChevronDownIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
