"use client";
import { usePersistedState } from "@/lib/progress/use-persisted-state";

export default function SymmetryExplorer({ chapterId = 1 }) {
  const [shape, setShape] = usePersistedState(chapterId, "symmetryShape", "square");
  const [showLines, setShowLines] = usePersistedState(chapterId, "showLines", true);
  const shapes = {
    square: { name: "Square 正方形", lines: 4, points: [[60,20],[140,20],[140,100],[60,100]] },
    triangle: { name: "Equil. Triangle 等边三角形", lines: 3, points: [[100,20],[40,120],[160,120]] },
    rectangle: { name: "Rectangle 长方形", lines: 2, points: [[40,30],[160,30],[160,110],[40,110]] },
    circle: { name: "Circle 圆", lines: "∞", isCircle: true },
  };
  const s = shapes[shape];
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-bold text-text-primary">🪞 Symmetry 对称</h3>
      <div className="flex gap-2 flex-wrap justify-center">
        {Object.entries(shapes).map(([k, v]) => (
          <button key={k} onClick={() => setShape(k)}
            className={`px-3 py-1 rounded-full text-base ${shape === k ? 'bg-blue-500 text-white' : 'bg-white/10 text-text-secondary hover:bg-white/20'}`}>
            {v.name}
          </button>
        ))}
      </div>
      <svg width={200} height={140} className="svg-canvas">
        {s.isCircle ? (
          <>
            <circle cx={100} cy={70} r={50} fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="2" />
            {showLines && [0, 45, 90, 135].map(a => {
              const dx = 60 * Math.cos(a * Math.PI / 180);
              const dy = 60 * Math.sin(a * Math.PI / 180);
              return <line key={a} x1={100 - dx} y1={70 - dy} x2={100 + dx} y2={70 + dy} stroke="#EF4444" strokeWidth="1" strokeDasharray="4,4" />;
            })}
          </>
        ) : (
          <>
            <polygon points={s.points.map(p => p.join(",")).join(" ")} fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="2" />
            {showLines && shape === "square" && (
              <>
                <line x1={100} y1={10} x2={100} y2={110} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={50} y1={60} x2={150} y2={60} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={50} y1={10} x2={150} y2={110} stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={150} y1={10} x2={50} y2={110} stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,4" />
              </>
            )}
            {showLines && shape === "triangle" && (
              <>
                <line x1={100} y1={10} x2={100} y2={130} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={70} y1={70} x2={150} y2={70} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.6} />
                <line x1={40} y1={40} x2={160} y2={100} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.6} />
              </>
            )}
            {showLines && shape === "rectangle" && (
              <>
                <line x1={100} y1={20} x2={100} y2={120} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={30} y1={70} x2={170} y2={70} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
              </>
            )}
          </>
        )}
      </svg>
      <label className="flex items-center gap-2 text-base">
        <input type="checkbox" checked={showLines} onChange={e => setShowLines(e.target.checked)} />
        Show symmetry lines 显示对称轴
      </label>
      <div className="text-base bg-white/10 px-3 py-1 rounded-lg text-text-secondary">Lines of symmetry 对称轴: <strong className="text-text-primary">{s.lines}</strong></div>
    </div>
  );
}
