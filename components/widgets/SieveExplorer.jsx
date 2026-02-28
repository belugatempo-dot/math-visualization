"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function SieveExplorer({ chapterId = 7 }) {
  const [step, setStep] = usePersistedState(chapterId, "sieveStep", 0);
  const primeOrder = [2, 3, 5, 7];
  const maxNum = 100;

  const getState = () => {
    const states = new Array(maxNum + 1).fill("unmarked");
    states[0] = "crossed";
    states[1] = "crossed";
    for (let s = 0; s < step && s < primeOrder.length; s++) {
      const p = primeOrder[s];
      states[p] = "prime";
      for (let m = p * 2; m <= maxNum; m += p) {
        if (states[m] !== "prime") states[m] = "crossed";
      }
    }
    return states;
  };

  const states = getState();
  const currentPrime = step > 0 && step <= primeOrder.length ? primeOrder[step - 1] : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🔍 Sieve of Eratosthenes 埃氏筛</h3>
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 99 }, (_, i) => i + 2).map(n => {
          const st = states[n];
          let bg = "bg-white/10";
          let textColor = "text-text-primary";
          if (st === "prime") { bg = "bg-red-500"; textColor = "text-white"; }
          else if (st === "crossed") { bg = "bg-white/10"; textColor = "text-slate-500 line-through"; }
          return (
            <div key={n} className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium ${bg} ${textColor} transition-all`}>
              {n}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-3 py-1 bg-white/10 text-text-secondary rounded disabled:opacity-30">← Back</button>
        <span className="text-base min-w-[120px] text-center">
          {step === 0 ? "Press Next to start" : `Crossed out multiples of ${currentPrime}`}
        </span>
        <button onClick={() => setStep(Math.min(primeOrder.length, step + 1))} disabled={step >= primeOrder.length}
          className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-30">Next →</button>
      </div>
      <button onClick={() => setStep(0)} className="text-sm text-slate-500 underline">Reset 重置</button>
    </div>
  );
}
