"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function BinaryConverter({ chapterId = 3 }) {
  const [decimal, setDecimal] = usePersistedState(chapterId, "binaryDecimal", 13);
  const binary = decimal >= 0 ? decimal.toString(2) : "0";
  const bits = binary.padStart(8, "0").split("").map(Number);
  const powers = [128, 64, 32, 16, 8, 4, 2, 1];

  const toggleBit = (idx) => {
    const newBits = [...bits];
    newBits[idx] = newBits[idx] === 1 ? 0 : 1;
    const newDec = newBits.reduce((sum, b, i) => sum + b * powers[i], 0);
    setDecimal(newDec);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-text-primary">💡 Binary 二进制</h3>
      <div className="flex items-center gap-2">
        <span className="text-base text-slate-500">Decimal 十进制:</span>
        <input type="number" min={0} max={255} value={decimal}
          onChange={e => setDecimal(Math.min(255, Math.max(0, +e.target.value)))}
          className="w-20 px-2 py-1 border-2 border-pink-400/30 bg-white/10 rounded-lg text-center text-2xl font-bold font-mono text-pink-400" />
      </div>
      <div className="flex gap-1">
        {bits.map((b, i) => (
          <button key={i} onClick={() => toggleBit(i)}
            className={`w-12 h-16 rounded-lg flex flex-col items-center justify-center transition-all font-mono
              ${b === 1 ? "bg-pink-500 text-white shadow-lg scale-105" : "bg-white/10 text-slate-500 hover:bg-white/20"}`}>
            <span className="text-xl font-bold">{b}</span>
            <span className="text-[11px] opacity-70">{powers[i]}</span>
          </button>
        ))}
      </div>
      <div className="text-base text-text-secondary bg-white/10 px-4 py-2 rounded-lg font-mono">
        {bits.map((b, i) => b === 1 ? powers[i] : null).filter(Boolean).join(" + ") || "0"}
        {" = "}
        <strong className="text-pink-400 text-lg">{decimal}</strong>
      </div>
    </div>
  );
}
