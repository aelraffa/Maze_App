import { Cell, Position } from './types';

export type BFSResult = {
  path: Position[];
  steps: number;
};


/**
 * Mencari rute terpendek menggunakan algoritma Breadth-First Search.
 * @param grid 
 * @param startPos 
 * @param finishPos 
 * @returns Object 
 */

export function solveMazeBFS(grid: Cell[][], startPos: Position, finishPos: Position): BFSResult {
  const rows = grid.length;
  const cols = grid[0].length;
  
  const queue: { pos: Position; path: Position[] }[] = [];
  
  const visited = new Set<string>();
  const toKey = (p: Position) => `${p.x},${p.y}`;

  queue.push({ pos: startPos, path: [startPos] });
  visited.add(toKey(startPos));

  while (queue.length > 0) {
    const { pos, path } = queue.shift()!;
    const { x, y } = pos;

    if (x === finishPos.x && y === finishPos.y) {
      return {
        path,
        steps: path.length > 0 ? path.length - 1 : 0,
      };
    }

    const currentCell = grid[y][x];

    if (!currentCell.walls.top && y > 0) {
      const nextPos = { x, y: y - 1 };
      if (!visited.has(toKey(nextPos))) {
        visited.add(toKey(nextPos));
        queue.push({ pos: nextPos, path: [...path, nextPos] });
      }
    }

    if (!currentCell.walls.right && x < cols - 1) {
      const nextPos = { x: x + 1, y };
      if (!visited.has(toKey(nextPos))) {
        visited.add(toKey(nextPos));
        queue.push({ pos: nextPos, path: [...path, nextPos] });
      }
    }

    if (!currentCell.walls.bottom && y < rows - 1) {
      const nextPos = { x, y: y + 1 };
      if (!visited.has(toKey(nextPos))) {
        visited.add(toKey(nextPos));
        queue.push({ pos: nextPos, path: [...path, nextPos] });
      }
    }

    if (!currentCell.walls.left && x > 0) {
      const nextPos = { x: x - 1, y };
      if (!visited.has(toKey(nextPos))) {
        visited.add(toKey(nextPos));
        queue.push({ pos: nextPos, path: [...path, nextPos] });
      }
    }
  }

  return { path: [], steps: 0 };
}
