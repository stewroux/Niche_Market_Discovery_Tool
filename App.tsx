import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsTable } from './components/ResultsTable';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeNicheMarket } from './services/geminiService';
import type { WebAnalysisResult, Reference, FullAnalysis } from './types';
import { InitialStateIllustration } from './components/InitialStateIllustration';
import { ReferencesList } from './components/ReferencesList';
import { ThinkingProcess } from './components/ThinkingProcess';

const App: React.FC = () => {
  const [results, setResults] = useState<WebAnalysisResult[] | null>(null);
  const [references, setReferences] = useState<Reference[] | null>(null);
  const [thinkingProcess, setThinkingProcess] = useState<FullAnalysis['thinkingProcess'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingThoughts, setStreamingThoughts] = useState<string>('');

  const handleAnalysis = useCallback(async (problem: string) => {
    if (!problem.trim()) {
      setError('顧客の悩み・課題を入力してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setReferences(null);
    setThinkingProcess(null);
    setStreamingThoughts('');

    try {
      const analysisData = await analyzeNicheMarket(problem, (thoughtChunk) => {
        setStreamingThoughts(prev => prev + thoughtChunk);
      });
      setResults(analysisData.results);
      setReferences(analysisData.references);
      setThinkingProcess(analysisData.thinkingProcess);
    } catch (err) {
      console.error(err);
      setError('分析中にエラーが発生しました。しばらくしてから再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8">
          <InputForm
            onAnalyze={handleAnalysis}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
              <strong className="font-bold">エラー: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && <LoadingSpinner thinkingProcessContent={streamingThoughts} />}

          {!isLoading && !results && !error && <InitialStateIllustration />}
          
          {results && (
            <div className="mt-8 animate-slide-up space-y-8">
              <ResultsTable results={results} />
              {thinkingProcess && <ThinkingProcess thinkingProcess={thinkingProcess} />}
              {references && references.length > 0 && (
                <ReferencesList references={references} />
              )}
            </div>
          )}
        </main>
      </div>
       <footer className="w-full max-w-5xl mx-auto text-center text-gray-500 text-sm mt-12 pb-4">
        <p>&copy; 2025 Niche Market Discovery Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;