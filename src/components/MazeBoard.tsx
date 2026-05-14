import React from 'react';
import { Cell, Position, GameState } from '../lib/types';

interface MazeBoardProps {
  grid: Cell[][];
  playerPos: Position;
  finishPos: Position;
  optimalPath: Position[];
  gameState: GameState;
}

export default function MazeBoard({
  grid,
  playerPos,
  finishPos,
  optimalPath,
  gameState,
}: MazeBoardProps) {
  if (!grid || grid.length === 0) return null;

  const rows = grid.length;
  const cols = grid[0].length;

  // Helper to check if a cell is in the optimal path (used when game is SOLVED)
  const isOptimalPathCell = (x: number, y: number) => {
    if (gameState !== 'SOLVED') return false;
    return optimalPath.some((pos) => pos.x === x && pos.y === y);
  };

  return (
    <div
      className="inline-block border-4 border-slate-700 bg-slate-800 rounded mx-auto overflow-hidden shadow-2xl"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const isPlayer = playerPos.x === x && playerPos.y === y;
          const isFinish = finishPos.x === x && finishPos.y === y;
          const isStart = cell.isStart;
          const isOptimal = isOptimalPathCell(x, y);

          // Tentukan warna cell
          let bgColor = 'bg-slate-900'; // Default background (path)
          if (isPlayer) bgColor = 'bg-blue-500 z-10 scale-95 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]';
          else if (isFinish) bgColor = 'bg-green-500 animate-pulse';
          else if (isStart) bgColor = 'bg-slate-700';
          else if (isOptimal) bgColor = 'bg-yellow-400 opacity-50'; // Path BFS ketika solved
          else if (cell.visited && gameState !== 'SOLVED') bgColor = 'bg-slate-800'; // Jejak player (opsional)

          // Susun class untuk border dinding
          const borderClasses = [
            'box-border w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300 relative',
            cell.walls.top ? 'border-t-2 border-t-slate-300' : 'border-t-2 border-t-transparent',
            cell.walls.right ? 'border-r-2 border-r-slate-300' : 'border-r-2 border-r-transparent',
            cell.walls.bottom ? 'border-b-2 border-b-slate-300' : 'border-b-2 border-b-transparent',
            cell.walls.left ? 'border-l-2 border-l-slate-300' : 'border-l-2 border-l-transparent',
            bgColor,
          ].join(' ');

          return <div key={`${x}-${y}`} className={borderClasses}></div>;
        })
      )}
    </div>
  );
}
