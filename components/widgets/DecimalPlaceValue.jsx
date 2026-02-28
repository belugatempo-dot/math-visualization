"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function DecimalPlaceValue({ chapterId = 11 }) {
  const [val, setVal] = usePersistedState(chapterId, "decimalVal", "23.456");

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🔢 Decimal Place Value 小数位值</h3>
      <input type="text" value={val} onChange={e => {
        const v = e.target.value;
        if (/^\d*\.?\d{0,3}$/.test(v)) setVal(v);
      }} className="w-40 px-3 py-2 border-2 border-cyan-400/30 bg-white/10 rounded-lg text-center text-3xl font-mono font-bold text-text-primary" placeholder="23.456" />
      <div className="flex gap-1 items-end">
        {val.split("").map((ch, i) => {
          const dotIdx = val.indexOf(".");
          if (ch === ".") return (
            <div key={i} className="flex flex-col items-center mx-1">
              <span className="text-4xl font-bold text-slate-500">.</span>
              <span className="text-[11px] text-slate-500 mt-1">decimal</span>
            </div>
          );
          const isBeforeDot = dotIdx === -1 || i < dotIdx;
          return (
            <div key={i} className="flex flex-col items-center px-2 py-1 rounded-lg"
              style={{ background: isBeforeDot ? 'rgba(6,182,212,0.15)' : 'rgba(245,158,11,0.15)' }}>
              <span className="text-3xl font-bold font-mono text-text-primary">{ch}</span>
              <span className="text-[11px] text-slate-500">
                {dotIdx === -1 ? (i === val.length - 1 ? "1s" : i === val.length - 2 ? "10s" : "100s") :
                  isBeforeDot ? (dotIdx - i === 1 ? "1s 个" : dotIdx - i === 2 ? "10s 十" : "100s 百") :
                    (i - dotIdx === 1 ? "1/10" : i - dotIdx === 2 ? "1/100" : "1/1000")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
