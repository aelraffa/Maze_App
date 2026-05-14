import React from 'react';
import { Difficulty } from '../lib/types';

interface ControlPanelProps {
  difficulty: Difficulty;
  setDifficulty: (level: Difficulty) => void;
  startNewGame: (level?: Difficulty) => void;
}

export default function ControlPanel({
  difficulty,
  setDifficulty,
  startNewGame,
}: ControlPanelProps) {
  const diffs: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center my-4 p-4 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
      
      {/* Selector Kesulitan */}
      <div className="flex gap-2">
        {diffs.map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              difficulty === level
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="w-px h-8 bg-slate-600 hidden sm:block"></div>

      {/* Tombol Aksi */}
      <div className="flex gap-3">
        <button
          onClick={() => startNewGame(difficulty)}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md transition-colors shadow-lg active:scale-95"
        >
          Generate New Maze
        </button>
        
        <button
          onClick={() => startNewGame(difficulty)} // Restart logic sama dengan generate ulang di state saat ini
          className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-md transition-colors shadow-lg active:scale-95"
        >
          Restart
        </button>
      </div>
      
    </div>
  );
}
