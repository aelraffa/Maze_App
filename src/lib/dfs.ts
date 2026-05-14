import { Cell } from './types';
/**
 * Menghasilkan labirin (maze) menggunakan Depth-First Search.
 * @param rows 
 * @param cols 
 * @returns grid 
 */

export function generateMaze(rows: number, cols: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x,
        y,
        walls: { top: true, right: true, bottom: true, left: true },
        visited: false, 
        isStart: false,
        isFinish: false,
        isPath: false,
      });
    }
    grid.push(row);
  }

  const stack: Cell[] = [];
  const startCell = grid[0][0]; 
  
  startCell.visited = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack.pop()!;
    const neighbors = getUnvisitedNeighbors(current, grid, rows, cols);

    if (neighbors.length > 0) {
      stack.push(current);
      
      const nextIndex = Math.floor(Math.random() * neighbors.length);
      const next = neighbors[nextIndex];
      
      removeWalls(current, next);
      
      next.visited = true;
      stack.push(next);
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].visited = false;
    }
  }


  grid[0][0].isStart = true;
  grid[rows - 1][cols - 1].isFinish = true;

  return grid;
}

function getUnvisitedNeighbors(cell: Cell, grid: Cell[][], rows: number, cols: number): Cell[] {
  const neighbors: Cell[] = [];
  const { x, y } = cell;

  // Atas
  if (y > 0 && !grid[y - 1][x].visited) neighbors.push(grid[y - 1][x]);
  // Kanan
  if (x < cols - 1 && !grid[y][x + 1].visited) neighbors.push(grid[y][x + 1]);
  // Bawah
  if (y < rows - 1 && !grid[y + 1][x].visited) neighbors.push(grid[y + 1][x]);
  // Kiri
  if (x > 0 && !grid[y][x - 1].visited) neighbors.push(grid[y][x - 1]);

  return neighbors;
}

function removeWalls(current: Cell, next: Cell) {
  const dx = current.x - next.x;
  const dy = current.y - next.y;

  if (dx === 1) {
    current.walls.left = false;
    next.walls.right = false;
  } else if (dx === -1) {
    current.walls.right = false;
    next.walls.left = false;
  }

  if (dy === 1) {
    current.walls.top = false;
    next.walls.bottom = false;
  } else if (dy === -1) {
    current.walls.bottom = false;
    next.walls.top = false;
  }
}
