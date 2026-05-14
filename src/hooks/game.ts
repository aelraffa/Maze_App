import { useState, useEffect, useCallback } from 'react';
import { Cell, Position, Difficulty, GameState } from '../lib/types';
import { generateMaze } from '../lib/dfs';
import { solveMazeBFS } from '../lib/bfs';

const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number }> = {
  Easy: { rows: 10, cols: 10 },
  Medium: { rows: 15, cols: 15 },
  Hard: { rows: 20, cols: 25 },
};

export function game() {
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [grid, setGrid] = useState<Cell[][]>([]);
  
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [finishPos, setFinishPos] = useState<Position>({ x: 0, y: 0 });
  
  const [steps, setSteps] = useState(0);
  const [optimalPath, setOptimalPath] = useState<Position[]>([]);
  const [optimalSteps, setOptimalSteps] = useState(0);
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [score, setScore] = useState(0);
  const [efficiency, setEfficiency] = useState(0);

  const startNewGame = useCallback((selectedDifficulty: Difficulty = difficulty) => {
    const config = DIFFICULTY_CONFIG[selectedDifficulty];
    setDifficulty(selectedDifficulty);
    
    const newGrid = generateMaze(config.rows, config.cols);
    setGrid(newGrid);
    
    const start = { x: 0, y: 0 };
    const finish = { x: config.cols - 1, y: config.rows - 1 };
    
    setPlayerPos(start);
    setFinishPos(finish);
    
    const bfsResult = solveMazeBFS(newGrid, start, finish);
    setOptimalPath(bfsResult.path);
    setOptimalSteps(bfsResult.steps);
    
    setSteps(0);
    setElapsedTime(0);
    setScore(0);
    setEfficiency(0);
    setGameState('PLAYING');
  }, [difficulty]);


  const calculateFinalStats = useCallback(() => {
    const finalSteps = steps;
    const penaltyPerExtraStep = 100 / optimalSteps; 
    const calculatedScore = Math.max(0, Math.floor(100 - ((finalSteps - optimalSteps) * (penaltyPerExtraStep * 0.5))));
    
    const eff = Math.min(100, Math.round((optimalSteps / (finalSteps === 0 ? 1 : finalSteps)) * 100));

    setScore(calculatedScore);
    setEfficiency(eff);
    setGameState('SOLVED');
  }, [steps, optimalSteps]);

  useEffect(() => {
    if (gameState === 'PLAYING' && playerPos.x === finishPos.x && playerPos.y === finishPos.y && optimalSteps > 0) {
      calculateFinalStats();
    }
  }, [playerPos, finishPos, gameState, calculateFinalStats, optimalSteps]);

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameState !== 'PLAYING') return;

    const { x, y } = playerPos;
    const currentCell = grid[y][x];

    if (dx === 1 && currentCell.walls.right) return;
    if (dx === -1 && currentCell.walls.left) return;
    if (dy === 1 && currentCell.walls.bottom) return;
    if (dy === -1 && currentCell.walls.top) return;

    const newPos = { x: x + dx, y: y + dy };
    
    setPlayerPos(newPos);
    setSteps((s) => s + 1);

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[y] = [...newGrid[y]];
      newGrid[y][x] = { ...newGrid[y][x], visited: true };
      return newGrid;
    });
  }, [gameState, grid, playerPos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer(0, -1);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer(1, 0);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer(-1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'PLAYING') {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  return {
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
  };
}
