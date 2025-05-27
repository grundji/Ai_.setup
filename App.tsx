
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { GenerateButton } from './components/GenerateButton';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generatePixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [promptDetails, setPromptDetails] = useState<string>("a brave knight character, standing pose");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!promptDetails.trim()) {
      setError("Please enter a description for your pixel art.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generatePixelArt(promptDetails);
      setGeneratedImage(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [promptDetails]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-8 selection:bg-sky-500 selection:text-white">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">Pixel Art & Sprite Generator</h1>
        <p className="mt-3 text-slate-400 text-lg">
          Describe any pixel art you want to create: characters, items, tilemaps, or even animation sprite sheets.
          The AI will generate a crisp pixel art image based on your description.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-lg p-6 sm:p-8">
        <div className="space-y-6">
          <PromptInput
            value={promptDetails}
            onChange={setPromptDetails}
            disabled={isLoading}
          />
          <GenerateButton
            onClick={handleGenerateClick}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8 min-h-[64px]"> {/* min-h to prevent layout jumps */}
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorDisplay message={error} />}
          {generatedImage && !isLoading && !error && (
            <ImageDisplay src={generatedImage} alt="Generated Pixel Art" />
          )}
           {!isLoading && !error && !generatedImage && (
            <div className="text-center text-slate-500 py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-lg">Your generated pixel art will appear here.</p>
              <p className="text-sm">Enter a description above and click "Generate".</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full max-w-3xl mt-12 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini API.</p>
         <p>&copy; {new Date().getFullYear()} AI Image Generator</p>
      </footer>
    </div>
  );
};

export default App;
