export type Position = {
  x: number;
  y: number;
};

export type Cell = {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean; 
  isStart: boolean;
  isFinish: boolean;
  isPath: boolean;  
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type GameState = 'IDLE' | 'PLAYING' | 'SOLVED' | 'ANIMATING';