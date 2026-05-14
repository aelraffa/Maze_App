'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useGameEngine } from '../hooks/game';

import MazeBoard from '../components/MazeBoard';
import GameHUD from '../components/GameHUD';
import ControlPanel from '../components/ControlPanel';
import Legend from '../components/Legend';

export default function Home() {
  const {
    difficulty,
    gameState,
    grid,
    playerPos,
    finishPos,
    steps,
    optimalPath,
    optimalSteps,
    elapsedTime,
    score,
    efficiency,
    startNewGame,
    setDifficulty,
  } = useGameEngine();

  // Inisialisasi awal client-side saja
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    startNewGame();
  }, [startNewGame]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 pb-20">
      <Head>
        <title>Maze DAA - DFS & BFS Visualization</title>
        <meta name="description" content="Maze Game for Design and Analysis of Algorithms" />
      </Head>

      <main className="max-w-5xl mx-auto px-4 pt-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 tracking-tight">
            Algorithmic Maze Game
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tugas Desain dan Analisis Algoritma (DAA). Menggunakan <strong>DFS</strong> untuk membangun rute labirin dan <strong>BFS</strong> untuk menghitung rute terpendek secara optimal.
          </p>
        </header>

        <ControlPanel
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startNewGame={startNewGame}
        />

        <GameHUD
          steps={steps}
          optimalSteps={optimalSteps}
          elapsedTime={elapsedTime}
          score={score}
          efficiency={efficiency}
          gameState={gameState}
        />

        {gameState === 'SOLVED' && (
          <div className="text-center mb-6 animate-bounce">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              🎉 MAZE SOLVED! 🎉
            </span>
          </div>
        )}

        <div className="flex justify-center w-full overflow-x-auto p-4">
          {grid && grid.length > 0 && (
            <MazeBoard
              grid={grid}
              playerPos={playerPos}
              finishPos={finishPos}
              optimalPath={optimalPath}
              gameState={gameState}
            />
          )}
        </div>

        <Legend />

      </main>
    </div>
  );
}
