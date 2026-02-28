"use client";
import { useState } from "react";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function TreeDiagram({ chapterId = 4 }) {
  const [choices] = useState([
    { name: "Bread 面包", options: ["White 白", "Wheat 全麦"] },
    { name: "Meat 肉", options: ["Ham 火腿", "Turkey 火鸡", "Salami"] },
  ]);
  const [selected, setSelected] = usePersistedState(chapterId, "treeSelected", [null, null]);
  const total = choices.reduce((p, c) => p * c.options.length, 1);

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🌳 Counting Possibilities 计数</h3>
      <div className="flex gap-4 justify-center flex-wrap">
        {choices.map((c, ci) => (
          <div key={ci} className="flex flex-col items-center gap-1">
            <span className="text-sm text-slate-500 font-medium">{c.name}</span>
            <div className="flex flex-col gap-1">
              {c.options.map((opt, oi) => (
                <button key={oi} onClick={() => {
                  const ns = [...selected];
                  ns[ci] = ns[ci] === oi ? null : oi;
                  setSelected(ns);
                }}
                  className={`px-3 py-1 rounded-lg text-base transition-all ${selected[ci] === oi ? 'bg-amber-400 text-white font-bold' : 'bg-white/10 text-text-secondary hover:bg-white/20'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selected.every(s => s !== null) && (
        <div className="bg-white/10 text-text-primary px-4 py-2 rounded-lg text-base">
          🥪 {choices[0].options[selected[0]]} + {choices[1].options[selected[1]]}
        </div>
      )}
      <div className="text-base text-text-secondary">
        {choices.map(c => c.options.length).join(" × ")} = <strong className="text-amber-400">{total} combinations 种组合</strong>
      </div>
    </div>
  );
}
