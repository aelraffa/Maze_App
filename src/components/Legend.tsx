import React from 'react';

export default function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 my-6 bg-slate-800/50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-700 border border-slate-400 rounded-sm"></div>
        <span>Start</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500 border border-slate-400 rounded-sm"></div>
        <span>Finish</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-500 border border-slate-400 rounded-sm"></div>
        <span>Player (You)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-400 border border-slate-400 rounded-sm opacity-60"></div>
        <span>BFS Shortest Path</span>
      </div>
    </div>
  );
}
