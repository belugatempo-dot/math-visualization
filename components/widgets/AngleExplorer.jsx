"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function AngleExplorer({ chapterId = 1 }) {
  const [angle, setAngle] = usePersistedState(chapterId, "angle", 45);
  const svgSize = 240;
  const cx = svgSize / 2, cy = svgSize / 2, r = 90;
  const arcRad = 40;
  const largeArc = angle > 180 ? 1 : 0;

  const rayEndX = cx + r * Math.cos(angle * Math.PI / 180);
  const rayEndY = cy - r * Math.sin(angle * Math.PI / 180);
  const arcEndX = cx + arcRad * Math.cos(angle * Math.PI / 180);
  const arcEndY = cy - arcRad * Math.sin(angle * Math.PI / 180);

  const getAngleType = (a) => {
    if (a === 0) return { en: "Zero", zh: "零角" };
    if (a < 90) return { en: "Acute", zh: "锐角" };
    if (a === 90) return { en: "Right", zh: "直角" };
    if (a < 180) return { en: "Obtuse", zh: "钝角" };
    if (a === 180) return { en: "Straight", zh: "平角" };
    return { en: "Reflex", zh: "优角" };
  };
  const aType = getAngleType(angle);

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-text-primary">🔭 Angle Explorer 角度探索器</h3>
      <svg width={svgSize} height={svgSize} className="svg-canvas">
        {/* Grid */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
          const gx = cx + (r + 10) * Math.cos(a * Math.PI / 180);
          const gy = cy - (r + 10) * Math.sin(a * Math.PI / 180);
          return <line key={a} x1={cx} y1={cy} x2={gx} y2={gy} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />;
        })}
        {/* Arc */}
        {angle > 0 && (
          <path
            d={`M ${cx + arcRad} ${cy} A ${arcRad} ${arcRad} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`}
            fill={angle <= 90 ? "rgba(59,130,246,0.15)" : angle <= 180 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"}
            stroke={angle <= 90 ? "#3B82F6" : angle <= 180 ? "#F59E0B" : "#EF4444"}
            strokeWidth="2"
          />
        )}
        {/* Base ray */}
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
        {/* Angle ray */}
        <line x1={cx} y1={cy} x2={rayEndX} y2={rayEndY} stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        {/* Vertex */}
        <circle cx={cx} cy={cy} r={4} fill="#1E40AF" />
        {/* Right angle marker */}
        {angle === 90 && (
          <rect x={cx + 8} y={cy - 16} width={8} height={8} fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        )}
        {/* Angle label */}
        <text x={cx + 50} y={cy - 8} fill="#94a3b8" fontSize="16" fontWeight="bold">{angle}°</text>
      </svg>
      <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)}
        className="w-64" />
      <div className="flex gap-2 flex-wrap justify-center">
        {[30, 45, 60, 90, 120, 180, 270, 360].map(a => (
          <button key={a} onClick={() => setAngle(a)}
            className={`px-3 py-1 rounded-full text-base font-medium transition-all ${angle === a ? 'bg-blue-500 text-white scale-105' : 'bg-white/10 text-text-secondary hover:bg-white/20'}`}>
            {a}°
          </button>
        ))}
      </div>
      <div className="text-center bg-white/10 px-4 py-2 rounded-lg">
        <span className="font-bold text-blue-400">{aType.en}</span>
        <span className="text-slate-500 mx-2">·</span>
        <span className="font-medium text-text-primary">{aType.zh}</span>
      </div>
    </div>
  );
}
