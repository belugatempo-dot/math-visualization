"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function ExponentExplorer({ chapterId = 3 }) {
  const [base, setBase] = usePersistedState(chapterId, "expBase", 2);
  const [exp, setExp] = usePersistedState(chapterId, "expPower", 5);
  const result = Math.pow(base, exp);
  const expansion = Array(exp).fill(base).join(" × ");
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🚀 Exponents 指数</h3>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <input type="number" min={1} max={12} value={base} onChange={e => setBase(Math.min(12, Math.max(1, +e.target.value)))}
            className="w-14 px-2 py-1 border border-white/15 bg-white/10 text-text-primary rounded text-center text-3xl font-bold" />
          <div className="flex flex-col ml-1">
            <input type="number" min={0} max={10} value={exp} onChange={e => setExp(Math.min(10, Math.max(0, +e.target.value)))}
              className="w-10 px-1 py-0 border border-white/15 bg-white/10 text-text-primary rounded text-center text-base font-bold -mb-1" />
          </div>
        </div>
        <span className="text-3xl">=</span>
        <span className="text-3xl font-bold text-pink-400">{result > 999999999 ? "too big!" : result.toLocaleString()}</span>
      </div>
      {exp > 0 && exp <= 8 && (
        <div className="text-base text-text-secondary bg-white/10 px-3 py-1 rounded-lg max-w-xs text-center font-mono">{expansion}</div>
      )}
      <div className="flex gap-3 mt-1">
        <div className="flex flex-col items-center">
          <span className="text-sm text-slate-500">base 底数</span>
          <input type="range" min={1} max={12} value={base} onChange={e => setBase(+e.target.value)} className="w-24" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-slate-500">exponent 指数</span>
          <input type="range" min={0} max={10} value={exp} onChange={e => setExp(+e.target.value)} className="w-24" />
        </div>
      </div>
    </div>
  );
}
