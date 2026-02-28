"use client";
import { useState } from "react";

export default function ProbabilitySpinner() {
  const [spins, setSpins] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const segments = [
    { label: "1", color: "#3B82F6", size: 90 },
    { label: "2", color: "#EF4444", size: 90 },
    { label: "3", color: "#10B981", size: 120 },
    { label: "4", color: "#F59E0B", size: 60 },
  ];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const newRot = rotation + 1080 + Math.random() * 360;
    setRotation(newRot);
    setTimeout(() => {
      const normalizedAngle = (360 - (newRot % 360)) % 360;
      let cumulative = 0;
      let result = "1";
      for (const seg of segments) {
        cumulative += seg.size;
        if (normalizedAngle < cumulative) { result = seg.label; break; }
      }
      setSpins(prev => [result, ...prev].slice(0, 30));
      setSpinning(false);
    }, 2000);
  };

  const counts = {};
  segments.forEach(s => { counts[s.label] = 0; });
  spins.forEach(s => { counts[s] = (counts[s] || 0) + 1; });

  let startAngle = 0;
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🎯 Probability Spinner 概率转盘</h3>
      <svg width={180} height={180}>
        <g transform={`rotate(${rotation} 90 90)`} style={{ transition: spinning ? "transform 2s cubic-bezier(0.2,0.8,0.3,1)" : "none" }}>
          {segments.map((seg, i) => {
            const start = startAngle;
            const end = start + seg.size;
            startAngle = end;
            const sr = start * Math.PI / 180, er = end * Math.PI / 180;
            const x1 = 90 + 80 * Math.cos(sr), y1 = 90 + 80 * Math.sin(sr);
            const x2 = 90 + 80 * Math.cos(er), y2 = 90 + 80 * Math.sin(er);
            const large = seg.size > 180 ? 1 : 0;
            const mid = (start + end) / 2 * Math.PI / 180;
            const tx = 90 + 50 * Math.cos(mid), ty = 90 + 50 * Math.sin(mid);
            return (
              <g key={i}>
                <path d={`M 90 90 L ${x1} ${y1} A 80 80 0 ${large} 1 ${x2} ${y2} Z`} fill={seg.color} stroke="#0f172a" strokeWidth="2" />
                <text x={tx} y={ty + 4} textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">{seg.label}</text>
              </g>
            );
          })}
        </g>
        {/* Pointer */}
        <polygon points="90,6 84,20 96,20" fill="#e2e8f0" />
      </svg>
      <button onClick={spin} disabled={spinning}
        className={`px-6 py-2 rounded-full font-bold text-white ${spinning ? 'bg-white/10 text-slate-500' : 'bg-lime-500 hover:bg-lime-600'} transition-all`}>
        {spinning ? "Spinning..." : "SPIN! 转!"}
      </button>
      {spins.length > 0 && (
        <div className="flex gap-3 text-base">
          {segments.map(seg => (
            <div key={seg.label} className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: seg.color }}>{seg.label}</div>
              <span className="font-bold text-text-primary">{counts[seg.label]}</span>
              <span className="text-slate-500 text-sm">{spins.length > 0 ? Math.round(counts[seg.label] / spins.length * 100) : 0}%</span>
            </div>
          ))}
        </div>
      )}
      {spins.length > 0 && <button onClick={() => { setSpins([]); }} className="text-sm text-slate-500 underline">Clear 清除</button>}
    </div>
  );
}
