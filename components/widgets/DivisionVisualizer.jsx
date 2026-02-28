"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function DivisionVisualizer({ chapterId = 5 }) {
  const [dividend, setDividend] = usePersistedState(chapterId, "dividend", 156);
  const [divisor, setDivisor] = usePersistedState(chapterId, "divisor", 12);
  const q = divisor > 0 ? Math.floor(dividend / divisor) : 0;
  const r = divisor > 0 ? dividend % divisor : 0;
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🧮 Division 除法</h3>
      <div className="flex items-center gap-2">
        <input type="number" min={1} max={9999} value={dividend} onChange={e => setDividend(Math.max(1, +e.target.value))}
          className="w-20 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center font-bold" />
        <span className="text-2xl">÷</span>
        <input type="number" min={1} max={99} value={divisor} onChange={e => setDivisor(Math.max(1, +e.target.value))}
          className="w-16 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center font-bold" />
      </div>
      <div className="bg-white/10 p-4 rounded-xl text-center">
        <div className="text-base text-text-secondary mb-1">{divisor} × <strong className="text-emerald-400">{q}</strong> = {divisor * q}</div>
        <div className="text-base text-text-secondary">{dividend} − {divisor * q} = <strong className="text-orange-400">{r}</strong> remainder</div>
        <div className="mt-2 text-xl font-bold text-emerald-400">{dividend} ÷ {divisor} = {q} R {r}</div>
      </div>
      <div className="flex gap-1 flex-wrap max-w-xs justify-center">
        {Array.from({ length: Math.min(q, 30) }, (_, i) => (
          <div key={i} className="w-5 h-5 bg-emerald-400 rounded-sm" title={`Group ${i + 1}`} />
        ))}
        {q > 30 && <span className="text-sm text-slate-500">+{q - 30} more</span>}
        {r > 0 && Array.from({ length: Math.min(r, 11) }, (_, i) => (
          <div key={`r${i}`} className="w-5 h-5 bg-orange-300 rounded-sm" />
        ))}
      </div>
      <div className="text-sm text-slate-500 flex gap-3">
        <span>🟩 = groups of {divisor}</span>
        <span>🟧 = remainder</span>
      </div>
    </div>
  );
}
