"use client";
import { useState } from "react";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function AreaModel({ chapterId = 2 }) {
  const [a, setA] = usePersistedState(chapterId, "areaA", 23);
  const [b, setB] = usePersistedState(chapterId, "areaB", 16);
  const a1 = Math.floor(a / 10) * 10, a2 = a % 10;
  const b1 = Math.floor(b / 10) * 10, b2 = b % 10;
  const parts = [
    { r: 0, c: 0, val: a1 * b1, label: `${a1}×${b1}`, color: "rgba(59,130,246,0.2)" },
    { r: 0, c: 1, val: a2 * b1, label: `${a2}×${b1}`, color: "rgba(99,102,241,0.2)" },
    { r: 1, c: 0, val: a1 * b2, label: `${a1}×${b2}`, color: "rgba(236,72,153,0.2)" },
    { r: 1, c: 1, val: a2 * b2, label: `${a2}×${b2}`, color: "rgba(245,158,11,0.2)" },
  ];
  const total = a * b;
  const [highlight, setHighlight] = useState(null);

  const w1 = 140, w2 = a2 > 0 ? 70 : 0, h1 = 100, h2 = b2 > 0 ? 60 : 0;
  const ox = 60, oy = 40;

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-text-primary">📐 Area Model 面积模型</h3>
      <div className="flex gap-4 items-center flex-wrap justify-center">
        <label className="text-base">
          A: <input type="number" min={10} max={99} value={a} onChange={e => setA(Math.min(99, Math.max(10, +e.target.value)))}
            className="w-16 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center" />
        </label>
        <span className="text-2xl font-bold text-purple-400">×</span>
        <label className="text-base">
          B: <input type="number" min={10} max={99} value={b} onChange={e => setB(Math.min(99, Math.max(10, +e.target.value)))}
            className="w-16 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center" />
        </label>
      </div>
      <svg width={300} height={240} className="svg-canvas">
        {/* Labels */}
        <text x={ox + w1 / 2} y={oy - 8} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#94a3b8">{a1}</text>
        {a2 > 0 && <text x={ox + w1 + w2 / 2} y={oy - 8} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#94a3b8">{a2}</text>}
        <text x={ox - 12} y={oy + h1 / 2 + 4} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#94a3b8">{b1}</text>
        {b2 > 0 && <text x={ox - 12} y={oy + h1 + h2 / 2 + 4} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#94a3b8">{b2}</text>}
        {/* Boxes */}
        {parts.map((p, i) => {
          if ((p.c === 1 && a2 === 0) || (p.r === 1 && b2 === 0)) return null;
          const x = ox + (p.c === 0 ? 0 : w1);
          const y = oy + (p.r === 0 ? 0 : h1);
          const w = p.c === 0 ? w1 : w2;
          const h = p.r === 0 ? h1 : h2;
          return (
            <g key={i} onMouseEnter={() => setHighlight(i)} onMouseLeave={() => setHighlight(null)} style={{ cursor: "pointer" }}>
              <rect x={x} y={y} width={w} height={h} fill={highlight === i ? "rgba(255,212,59,0.25)" : p.color}
                stroke="#8B5CF6" strokeWidth={highlight === i ? 3 : 1.5} rx={4}
                style={{ transition: "all 0.2s" }} />
              <text x={x + w / 2} y={y + h / 2 - 6} textAnchor="middle" fontSize="13" fill="#64748b">{p.label}</text>
              <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#e2e8f0">{p.val}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-2 flex-wrap justify-center text-base">
        {parts.filter(p => !((p.c === 1 && a2 === 0) || (p.r === 1 && b2 === 0))).map((p, i) => (
          <span key={i} className="px-2 py-1 rounded text-text-primary" style={{ background: highlight === i ? "rgba(255,212,59,0.25)" : p.color }}>
            {p.val}
          </span>
        )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`p${i}`} className="text-slate-500">+</span>, el], [])}
        <span className="text-slate-500">=</span>
        <span className="px-3 py-1 bg-white/10 rounded font-bold text-purple-400 text-lg">{total}</span>
      </div>
    </div>
  );
}
