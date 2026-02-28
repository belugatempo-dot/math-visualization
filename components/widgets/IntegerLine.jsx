"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function IntegerLine({ chapterId = 9 }) {
  const [a, setA] = usePersistedState(chapterId, "intA", -3);
  const [b, setB] = usePersistedState(chapterId, "intB", 5);
  const sum = a + b;
  const min = -15, max = 15;
  const width = 340, margin = 20, lineY = 60;
  const usable = width - margin * 2;
  const toX = (n) => margin + ((n - min) / (max - min)) * usable;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🌡 Integers 整数</h3>
      <div className="flex gap-2 items-center text-xl">
        <span className="font-bold" style={{ color: a < 0 ? "#7C3AED" : "#059669" }}>({a})</span>
        <span>+</span>
        <span className="font-bold" style={{ color: b < 0 ? "#7C3AED" : "#059669" }}>({b})</span>
        <span>=</span>
        <span className="font-bold text-2xl" style={{ color: sum < 0 ? "#DC2626" : sum > 0 ? "#059669" : "#64748b" }}>{sum}</span>
      </div>
      <svg width={width} height={110} className="svg-canvas">
        <line x1={margin} y1={lineY} x2={width - margin} y2={lineY} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => {
          const x = toX(n);
          const isMajor = n % 5 === 0;
          return (
            <g key={n}>
              <line x1={x} y1={lineY - (isMajor ? 8 : 4)} x2={x} y2={lineY + (isMajor ? 8 : 4)} stroke="rgba(255,255,255,0.2)" strokeWidth={n === 0 ? 2 : 1} />
              {isMajor && <text x={x} y={lineY + 22} textAnchor="middle" fontSize="12" fill={n === 0 ? "#e2e8f0" : "#64748b"}>{n}</text>}
            </g>
          );
        })}
        {/* Arrow for movement */}
        {b !== 0 && (
          <line x1={toX(a)} y1={lineY - 20} x2={toX(a + b)} y2={lineY - 20}
            stroke={b > 0 ? "#059669" : "#DC2626"} strokeWidth="2" markerEnd="url(#arrow)" />
        )}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
          </marker>
        </defs>
        <circle cx={toX(a)} cy={lineY} r={6} fill="#7C3AED" />
        <circle cx={toX(sum)} cy={lineY} r={6} fill="#DC2626" stroke="#0f172a" strokeWidth="2" />
        <text x={toX(a)} y={lineY + 36} textAnchor="middle" fontSize="12" fill="#7C3AED">start</text>
        <text x={toX(sum)} y={lineY + 36} textAnchor="middle" fontSize="12" fill="#DC2626">result</text>
      </svg>
      <div className="flex gap-4 text-base">
        <label>a: <input type="range" min={-10} max={10} value={a} onChange={e => setA(+e.target.value)} className="w-24" /></label>
        <label>b: <input type="range" min={-10} max={10} value={b} onChange={e => setB(+e.target.value)} className="w-24" /></label>
      </div>
    </div>
  );
}
