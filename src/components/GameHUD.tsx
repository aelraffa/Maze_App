import React from 'react';
import { GameState } from '../lib/types';

interface GameHUDProps {
  steps: number;
  optimalSteps: number;
  elapsedTime: number;
  score: number;
  efficiency: number;
  gameState: GameState;
}

export default function GameHUD({
  steps,
  optimalSteps,
  elapsedTime,
  score,
  efficiency,
  gameState
}: GameHUDProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center my-6 text-slate-200">
      
      {/* Parameter HUD yang selalu muncul saat bermain */}
      <div className="flex gap-4">
        <div className="bg-slate-800 px-6 py-3 rounded-lg shadow-lg border border-slate-700 text-center min-w-[120px]">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Steps</div>
          <div className="text-2xl font-bold font-mono text-white">{steps}</div>
        </div>
        
        <div className="bg-slate-800 px-6 py-3 rounded-lg shadow-lg border border-slate-700 text-center min-w-[120px]">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Time</div>
          <div className="text-2xl font-bold font-mono text-white">{elapsedTime}s</div>
        </div>
      </div>

      {/* Informasi tambahan muncul HANYA ketika game sudah SOLVED (selesai) */}
      {gameState === 'SOLVED' && (
        <div className="flex gap-4 animate-fade-in-up">
          <div className="bg-blue-900/50 px-6 py-3 rounded-lg shadow-lg border border-blue-500/30 text-center min-w-[120px]">
            <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Shortest Path</div>
            <div className="text-2xl font-bold font-mono text-blue-100">{optimalSteps}</div>
          </div>
          
          <div className="bg-green-900/50 px-6 py-3 rounded-lg shadow-lg border border-green-500/30 text-center min-w-[120px]">
            <div className="text-xs text-green-300 uppercase tracking-wider font-semibold">Efficiency</div>
            <div className="text-2xl font-bold font-mono text-green-100">{efficiency}%</div>
          </div>
          
          <div className="bg-yellow-900/50 px-6 py-3 rounded-lg shadow-lg border border-yellow-500/50 text-center min-w-[120px]">
            <div className="text-xs text-yellow-500 uppercase tracking-wider font-semibold">Final Score</div>
            <div className="text-2xl font-bold font-mono text-yellow-400">{score}</div>
          </div>
        </div>
      )}
      
    </div>
  );
}
