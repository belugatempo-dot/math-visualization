"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function FractionMultiply({ chapterId = 10 }) {
  const [whole, setWhole] = usePersistedState(chapterId, "fracMulWhole", 24);
  const [num, setNum] = usePersistedState(chapterId, "fracMulNum", 5);
  const [den, setDen] = usePersistedState(chapterId, "fracMulDen", 6);
  const oneUnit = whole / den;
  const result = oneUnit * num;
  const barW = 280;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">✖️ Fraction × Whole 分数乘整数</h3>
      <div className="flex items-center gap-2 text-xl">
        <span className="font-bold text-orange-400">{num}/{den}</span>
        <span>×</span>
        <input type="number" min={1} max={100} value={whole} onChange={e => setWhole(Math.max(1, +e.target.value))}
          className="w-16 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center font-bold" />
        <span>=</span>
        <span className="font-bold text-orange-400 text-2xl">{Number.isInteger(result) ? result : result.toFixed(2)}</span>
      </div>
      <svg width={barW + 20} height={60} className="svg-canvas">
        {Array.from({ length: den }, (_, i) => {
          const x = 10 + (barW / den) * i;
          const w = barW / den - 2;
          const active = i < num;
          return (
            <rect key={i} x={x} y={10} width={w} height={35} rx={4}
              fill={active ? "#F97316" : "rgba(255,255,255,0.1)"} stroke={active ? "#EA580C" : "rgba(255,255,255,0.15)"} strokeWidth="1.5" />
          );
        })}
        <text x={barW / 2 + 10} y={55} textAnchor="middle" fontSize="13" fill="#64748b">
          {num} of {den} parts → {num}/{den} of {whole} = {Number.isInteger(result) ? result : result.toFixed(2)}
        </text>
      </svg>
      <div className="flex gap-2">
        {[[1, 2], [1, 3], [2, 3], [3, 4], [5, 6]].map(([n, d]) => (
          <button key={`${n}${d}`} onClick={() => { setNum(n); setDen(d); }}
            className={`px-2 py-1 rounded text-sm ${num === n && den === d ? 'bg-orange-500 text-white' : 'bg-white/10 text-text-secondary'}`}>
            {n}/{d}
          </button>
        ))}
      </div>
    </div>
  );
}
