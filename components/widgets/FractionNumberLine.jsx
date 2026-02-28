"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function FractionNumberLine({ chapterId = 8 }) {
  const [denom, setDenom] = usePersistedState(chapterId, "fracDenom", 5);
  const [num1, setNum1] = usePersistedState(chapterId, "fracNum1", 2);
  const [num2, setNum2] = usePersistedState(chapterId, "fracNum2", 1);
  const sum = num1 + num2;
  const width = 320;
  const margin = 30;
  const lineY = 50;
  const usable = width - margin * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">📏 Fraction Number Line 分数数轴</h3>
      <div className="flex gap-3 items-center text-xl">
        <span className="font-bold text-teal-400">{num1}/{denom}</span>
        <span className="text-slate-500">+</span>
        <span className="font-bold text-orange-400">{num2}/{denom}</span>
        <span className="text-slate-500">=</span>
        <span className="font-bold text-purple-400">{sum}/{denom}{sum >= denom ? ` = ${Math.floor(sum/denom)}${sum%denom > 0 ? ` ${sum%denom}/${denom}` : ''}` : ''}</span>
      </div>
      <svg width={width} height={100} className="svg-canvas">
        {/* Number line */}
        <line x1={margin} y1={lineY} x2={width - margin} y2={lineY} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        {/* Tick marks */}
        {Array.from({ length: denom * 2 + 1 }, (_, i) => {
          const x = margin + (usable * i) / (denom * 2);
          const isMajor = i % denom === 0;
          return (
            <g key={i}>
              <line x1={x} y1={lineY - (isMajor ? 10 : 5)} x2={x} y2={lineY + (isMajor ? 10 : 5)} stroke="#64748b" strokeWidth={isMajor ? 2 : 1} />
              {isMajor && <text x={x} y={lineY + 24} textAnchor="middle" fontSize="14" fill="#94a3b8" fontWeight="bold">{i / denom}</text>}
            </g>
          );
        })}
        {/* First fraction */}
        <rect x={margin} y={lineY - 18} width={usable * num1 / (denom * 2)} height={8} rx={4} fill="#14B8A6" opacity={0.6} />
        {/* Second fraction */}
        <rect x={margin + usable * num1 / (denom * 2)} y={lineY - 18} width={usable * num2 / (denom * 2)} height={8} rx={4} fill="#F97316" opacity={0.6} />
        {/* Sum marker */}
        <circle cx={margin + usable * sum / (denom * 2)} cy={lineY} r={6} fill="#7C3AED" />
      </svg>
      <div className="flex gap-4 text-base">
        <label>
          /{denom}: <input type="range" min={1} max={denom * 2 - 1} value={num1} onChange={e => setNum1(+e.target.value)} className="w-20" />
        </label>
        <label>
          +/<sub>{denom}</sub>: <input type="range" min={0} max={denom} value={num2} onChange={e => setNum2(+e.target.value)} className="w-20" />
        </label>
      </div>
      <div className="flex gap-2">
        {[3, 4, 5, 7, 8].map(d => (
          <button key={d} onClick={() => { setDenom(d); setNum1(Math.min(num1, d * 2 - 1)); setNum2(Math.min(num2, d)); }}
            className={`px-2 py-1 rounded text-sm ${denom === d ? 'bg-teal-500 text-white' : 'bg-white/10 text-text-secondary'}`}>
            /{d}
          </button>
        ))}
      </div>
    </div>
  );
}
