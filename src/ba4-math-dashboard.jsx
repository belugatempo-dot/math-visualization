import { useState, useRef, useEffect } from "react";

// ============ CHAPTER DATA ============
const chapters = [
  { id: 1, book: "4A", title: "Shapes", subtitle: "角度·对称·分类", icon: "△", color: "#3B82F6", ready: true },
  { id: 2, book: "4A", title: "Multiplication", subtitle: "面积模型·分配律", icon: "×", color: "#8B5CF6", ready: true },
  { id: 3, book: "4A", title: "Exponents", subtitle: "指数·二进制", icon: "²", color: "#EC4899", ready: true },
  { id: 4, book: "4B", title: "Counting", subtitle: "计数·排列·韦恩图", icon: "!", color: "#F59E0B", ready: true },
  { id: 5, book: "4B", title: "Division", subtitle: "长除法·整除", icon: "÷", color: "#10B981", ready: true },
  { id: 6, book: "4B", title: "Logic", subtitle: "逻辑推理·谜题", icon: "🧩", color: "#6366F1", ready: true },
  { id: 7, book: "4C", title: "Factors", subtitle: "因数·质数·筛法", icon: "P", color: "#EF4444", ready: true },
  { id: 8, book: "4C", title: "Fractions +−", subtitle: "分数加减·数轴", icon: "½", color: "#14B8A6", ready: true },
  { id: 9, book: "4C", title: "Integers", subtitle: "负数·加减", icon: "±", color: "#7C3AED", ready: true },
  { id: 10, book: "4D", title: "Fractions ×÷", subtitle: "分数乘除", icon: "⅔", color: "#F97316", ready: true },
  { id: 11, book: "4D", title: "Decimals", subtitle: "小数·位值", icon: ".", color: "#06B6D4", ready: true },
  { id: 12, book: "4D", title: "Probability", subtitle: "概率·实验", icon: "🎲", color: "#84CC16", ready: true },
];

// ============ CH1: ANGLE EXPLORER ============
function AngleExplorer() {
  const [angle, setAngle] = useState(45);
  const svgSize = 240;
  const cx = svgSize / 2, cy = svgSize / 2, r = 90;
  const rad = (angle * Math.PI) / 180;
  const ex = cx + r * Math.cos(-rad);
  const ey = cy - r * Math.sin(-rad + Math.PI);
  const arcRad = 40;
  const largeArc = angle > 180 ? 1 : 0;
  const arcEx = cx + arcRad * Math.cos(-rad);
  const arcEy = cy - arcRad * Math.sin(-rad + Math.PI);
  
  // Correct arc calculation: ray goes right, angle measured counterclockwise from right
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
      <h3 className="text-lg font-bold text-blue-700">🔭 Angle Explorer 角度探索器</h3>
      <svg width={svgSize} height={svgSize} className="bg-white rounded-xl shadow-inner">
        {/* Grid */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
          const gx = cx + (r + 10) * Math.cos(a * Math.PI / 180);
          const gy = cy - (r + 10) * Math.sin(a * Math.PI / 180);
          return <line key={a} x1={cx} y1={cy} x2={gx} y2={gy} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" />;
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
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        {/* Angle ray */}
        <line x1={cx} y1={cy} x2={rayEndX} y2={rayEndY} stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        {/* Vertex */}
        <circle cx={cx} cy={cy} r={4} fill="#1E40AF" />
        {/* Right angle marker */}
        {angle === 90 && (
          <rect x={cx + 8} y={cy - 16} width={8} height={8} fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        )}
        {/* Angle label */}
        <text x={cx + 50} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">{angle}°</text>
      </svg>
      <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)}
        className="w-64 accent-blue-500" />
      <div className="flex gap-2 flex-wrap justify-center">
        {[30, 45, 60, 90, 120, 180, 270, 360].map(a => (
          <button key={a} onClick={() => setAngle(a)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${angle === a ? 'bg-blue-500 text-white scale-105' : 'bg-gray-100 text-gray-600 hover:bg-blue-100'}`}>
            {a}°
          </button>
        ))}
      </div>
      <div className="text-center bg-blue-50 px-4 py-2 rounded-lg">
        <span className="font-bold text-blue-700">{aType.en}</span>
        <span className="text-gray-500 mx-2">·</span>
        <span className="font-medium text-gray-700">{aType.zh}</span>
      </div>
    </div>
  );
}

// ============ CH1: SYMMETRY EXPLORER ============
function SymmetryExplorer() {
  const [shape, setShape] = useState("square");
  const [showLines, setShowLines] = useState(true);
  const shapes = {
    square: { name: "Square 正方形", lines: 4, points: [[60,20],[140,20],[140,100],[60,100]] },
    triangle: { name: "Equil. Triangle 等边三角形", lines: 3, points: [[100,20],[40,120],[160,120]] },
    rectangle: { name: "Rectangle 长方形", lines: 2, points: [[40,30],[160,30],[160,110],[40,110]] },
    circle: { name: "Circle 圆", lines: "∞", isCircle: true },
  };
  const s = shapes[shape];
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-blue-700">🪞 Symmetry 对称</h3>
      <div className="flex gap-2 flex-wrap justify-center">
        {Object.entries(shapes).map(([k, v]) => (
          <button key={k} onClick={() => setShape(k)}
            className={`px-3 py-1 rounded-full text-sm ${shape === k ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}>
            {v.name}
          </button>
        ))}
      </div>
      <svg width={200} height={140} className="bg-white rounded-xl shadow-inner">
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
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={showLines} onChange={e => setShowLines(e.target.checked)} className="accent-blue-500" />
        Show symmetry lines 显示对称轴
      </label>
      <div className="text-sm bg-yellow-50 px-3 py-1 rounded-lg">Lines of symmetry 对称轴: <strong>{s.lines}</strong></div>
    </div>
  );
}

// ============ CH2: AREA MODEL ============
function AreaModel() {
  const [a, setA] = useState(23);
  const [b, setB] = useState(16);
  const a1 = Math.floor(a / 10) * 10, a2 = a % 10;
  const b1 = Math.floor(b / 10) * 10, b2 = b % 10;
  const parts = [
    { r: 0, c: 0, val: a1 * b1, label: `${a1}×${b1}`, color: "#DBEAFE" },
    { r: 0, c: 1, val: a2 * b1, label: `${a2}×${b1}`, color: "#E0E7FF" },
    { r: 1, c: 0, val: a1 * b2, label: `${a1}×${b2}`, color: "#FCE7F3" },
    { r: 1, c: 1, val: a2 * b2, label: `${a2}×${b2}`, color: "#FEF3C7" },
  ];
  const total = a * b;
  const [highlight, setHighlight] = useState(null);

  const w1 = 140, w2 = a2 > 0 ? 70 : 0, h1 = 100, h2 = b2 > 0 ? 60 : 0;
  const ox = 60, oy = 40;

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold text-purple-700">📐 Area Model 面积模型</h3>
      <div className="flex gap-4 items-center flex-wrap justify-center">
        <label className="text-sm">
          A: <input type="number" min={10} max={99} value={a} onChange={e => setA(Math.min(99, Math.max(10, +e.target.value)))}
            className="w-16 px-2 py-1 border rounded text-center" />
        </label>
        <span className="text-xl font-bold text-purple-500">×</span>
        <label className="text-sm">
          B: <input type="number" min={10} max={99} value={b} onChange={e => setB(Math.min(99, Math.max(10, +e.target.value)))}
            className="w-16 px-2 py-1 border rounded text-center" />
        </label>
      </div>
      <svg width={300} height={240} className="bg-white rounded-xl shadow-inner">
        {/* Labels */}
        <text x={ox + w1 / 2} y={oy - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6B21A8">{a1}</text>
        {a2 > 0 && <text x={ox + w1 + w2 / 2} y={oy - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6B21A8">{a2}</text>}
        <text x={ox - 12} y={oy + h1 / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6B21A8">{b1}</text>
        {b2 > 0 && <text x={ox - 12} y={oy + h1 + h2 / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6B21A8">{b2}</text>}
        {/* Boxes */}
        {parts.map((p, i) => {
          if ((p.c === 1 && a2 === 0) || (p.r === 1 && b2 === 0)) return null;
          const x = ox + (p.c === 0 ? 0 : w1);
          const y = oy + (p.r === 0 ? 0 : h1);
          const w = p.c === 0 ? w1 : w2;
          const h = p.r === 0 ? h1 : h2;
          return (
            <g key={i} onMouseEnter={() => setHighlight(i)} onMouseLeave={() => setHighlight(null)} style={{ cursor: "pointer" }}>
              <rect x={x} y={y} width={w} height={h} fill={highlight === i ? "#C4B5FD" : p.color}
                stroke="#8B5CF6" strokeWidth={highlight === i ? 3 : 1.5} rx={4}
                style={{ transition: "all 0.2s" }} />
              <text x={x + w / 2} y={y + h / 2 - 6} textAnchor="middle" fontSize="11" fill="#6B7280">{p.label}</text>
              <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#4C1D95">{p.val}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-2 flex-wrap justify-center text-sm">
        {parts.filter(p => !((p.c === 1 && a2 === 0) || (p.r === 1 && b2 === 0))).map((p, i) => (
          <span key={i} className="px-2 py-1 rounded" style={{ background: highlight === i ? "#C4B5FD" : p.color }}>
            {p.val}
          </span>
        )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`p${i}`} className="text-gray-400">+</span>, el], [])}
        <span className="text-gray-400">=</span>
        <span className="px-3 py-1 bg-purple-100 rounded font-bold text-purple-800 text-base">{total}</span>
      </div>
    </div>
  );
}

// ============ CH3: BINARY CONVERTER ============
function BinaryConverter() {
  const [decimal, setDecimal] = useState(13);
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
      <h3 className="text-lg font-bold text-pink-700">💡 Binary 二进制</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Decimal 十进制:</span>
        <input type="number" min={0} max={255} value={decimal}
          onChange={e => setDecimal(Math.min(255, Math.max(0, +e.target.value)))}
          className="w-20 px-2 py-1 border-2 border-pink-300 rounded-lg text-center text-xl font-bold text-pink-700" />
      </div>
      <div className="flex gap-1">
        {bits.map((b, i) => (
          <button key={i} onClick={() => toggleBit(i)}
            className={`w-10 h-14 rounded-lg flex flex-col items-center justify-center transition-all font-mono
              ${b === 1 ? "bg-pink-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-400 hover:bg-pink-100"}`}>
            <span className="text-lg font-bold">{b}</span>
            <span className="text-[9px] opacity-70">{powers[i]}</span>
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 bg-pink-50 px-4 py-2 rounded-lg">
        {bits.map((b, i) => b === 1 ? powers[i] : null).filter(Boolean).join(" + ") || "0"}
        {" = "}
        <strong className="text-pink-700 text-base">{decimal}</strong>
      </div>
    </div>
  );
}

// ============ CH3: EXPONENT EXPLORER ============
function ExponentExplorer() {
  const [base, setBase] = useState(2);
  const [exp, setExp] = useState(5);
  const result = Math.pow(base, exp);
  const expansion = Array(exp).fill(base).join(" × ");
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-pink-700">🚀 Exponents 指数</h3>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <input type="number" min={1} max={12} value={base} onChange={e => setBase(Math.min(12, Math.max(1, +e.target.value)))}
            className="w-14 px-2 py-1 border rounded text-center text-2xl font-bold" />
          <div className="flex flex-col ml-1">
            <input type="number" min={0} max={10} value={exp} onChange={e => setExp(Math.min(10, Math.max(0, +e.target.value)))}
              className="w-10 px-1 py-0 border rounded text-center text-sm font-bold -mb-1" />
          </div>
        </div>
        <span className="text-2xl">=</span>
        <span className="text-2xl font-bold text-pink-700">{result > 999999999 ? "too big!" : result.toLocaleString()}</span>
      </div>
      {exp > 0 && exp <= 8 && (
        <div className="text-sm text-gray-500 bg-pink-50 px-3 py-1 rounded-lg max-w-xs text-center">{expansion}</div>
      )}
      <div className="flex gap-3 mt-1">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">base 底数</span>
          <input type="range" min={1} max={12} value={base} onChange={e => setBase(+e.target.value)} className="w-24 accent-pink-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">exponent 指数</span>
          <input type="range" min={0} max={10} value={exp} onChange={e => setExp(+e.target.value)} className="w-24 accent-pink-500" />
        </div>
      </div>
    </div>
  );
}

// ============ CH4: TREE DIAGRAM ============
function TreeDiagram() {
  const [choices] = useState([
    { name: "Bread 面包", options: ["White 白", "Wheat 全麦"] },
    { name: "Meat 肉", options: ["Ham 火腿", "Turkey 火鸡", "Salami"] },
  ]);
  const [selected, setSelected] = useState([null, null]);
  const total = choices.reduce((p, c) => p * c.options.length, 1);

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-amber-700">🌳 Counting Possibilities 计数</h3>
      <div className="flex gap-4 justify-center flex-wrap">
        {choices.map((c, ci) => (
          <div key={ci} className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">{c.name}</span>
            <div className="flex flex-col gap-1">
              {c.options.map((opt, oi) => (
                <button key={oi} onClick={() => {
                  const ns = [...selected];
                  ns[ci] = ns[ci] === oi ? null : oi;
                  setSelected(ns);
                }}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${selected[ci] === oi ? 'bg-amber-400 text-white font-bold' : 'bg-amber-50 hover:bg-amber-100'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selected.every(s => s !== null) && (
        <div className="bg-amber-50 px-4 py-2 rounded-lg text-sm">
          🥪 {choices[0].options[selected[0]]} + {choices[1].options[selected[1]]}
        </div>
      )}
      <div className="text-sm text-gray-600">
        {choices.map(c => c.options.length).join(" × ")} = <strong className="text-amber-700">{total} combinations 种组合</strong>
      </div>
    </div>
  );
}

// ============ CH7: SIEVE OF ERATOSTHENES ============
function SieveExplorer() {
  const [step, setStep] = useState(0);
  const primeOrder = [2, 3, 5, 7];
  const maxNum = 100;

  const getState = () => {
    const states = new Array(maxNum + 1).fill("unmarked"); // "unmarked", "prime", "crossed"
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
      <h3 className="text-lg font-bold text-red-700">🔍 Sieve of Eratosthenes 埃氏筛</h3>
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 99 }, (_, i) => i + 2).map(n => {
          const st = states[n];
          let bg = "bg-white";
          let textColor = "text-gray-700";
          if (st === "prime") { bg = "bg-red-500"; textColor = "text-white"; }
          else if (st === "crossed") { bg = "bg-gray-200"; textColor = "text-gray-400 line-through"; }
          return (
            <div key={n} className={`w-7 h-7 flex items-center justify-center rounded text-[10px] font-medium ${bg} ${textColor} transition-all`}>
              {n}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-30">← Back</button>
        <span className="text-sm min-w-[120px] text-center">
          {step === 0 ? "Press Next to start" : `Crossed out multiples of ${currentPrime}`}
        </span>
        <button onClick={() => setStep(Math.min(primeOrder.length, step + 1))} disabled={step >= primeOrder.length}
          className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-30">Next →</button>
      </div>
      <button onClick={() => setStep(0)} className="text-xs text-gray-400 underline">Reset 重置</button>
    </div>
  );
}

// ============ CH8: FRACTION NUMBER LINE ============
function FractionNumberLine() {
  const [denom, setDenom] = useState(5);
  const [num1, setNum1] = useState(2);
  const [num2, setNum2] = useState(1);
  const sum = num1 + num2;
  const width = 320;
  const margin = 30;
  const lineY = 50;
  const usable = width - margin * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-teal-700">📏 Fraction Number Line 分数数轴</h3>
      <div className="flex gap-3 items-center text-lg">
        <span className="font-bold text-teal-600">{num1}/{denom}</span>
        <span className="text-gray-400">+</span>
        <span className="font-bold text-orange-500">{num2}/{denom}</span>
        <span className="text-gray-400">=</span>
        <span className="font-bold text-purple-600">{sum}/{denom}{sum >= denom ? ` = ${Math.floor(sum/denom)}${sum%denom > 0 ? ` ${sum%denom}/${denom}` : ''}` : ''}</span>
      </div>
      <svg width={width} height={100} className="bg-white rounded-xl shadow-inner">
        {/* Number line */}
        <line x1={margin} y1={lineY} x2={width - margin} y2={lineY} stroke="#94A3B8" strokeWidth="2" />
        {/* Tick marks */}
        {Array.from({ length: denom * 2 + 1 }, (_, i) => {
          const x = margin + (usable * i) / (denom * 2);
          const isMajor = i % denom === 0;
          return (
            <g key={i}>
              <line x1={x} y1={lineY - (isMajor ? 10 : 5)} x2={x} y2={lineY + (isMajor ? 10 : 5)} stroke="#64748B" strokeWidth={isMajor ? 2 : 1} />
              {isMajor && <text x={x} y={lineY + 24} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">{i / denom}</text>}
            </g>
          );
        })}
        {/* First fraction */}
        <rect x={margin} y={lineY - 18} width={usable * num1 / (denom * 2)} height={8} rx={4} fill="#14B8A6" opacity={0.6} />
        {/* Second fraction */}
        <rect x={margin + usable * num1 / (denom * 2)} y={lineY - 18} width={usable * num2 / (denom * 2)} height={8} rx={4} fill="#F97316" opacity={0.6} />
        {/* Sum marker */}
        <circle cx={margin + usable * sum / (denom * 2)} cy={lineY} r={6} fill="#7C3AED" />
      </svg>
      <div className="flex gap-4 text-sm">
        <label>
          /{denom}: <input type="range" min={1} max={denom * 2 - 1} value={num1} onChange={e => setNum1(+e.target.value)} className="w-20 accent-teal-500" />
        </label>
        <label>
          +/<sub>{denom}</sub>: <input type="range" min={0} max={denom} value={num2} onChange={e => setNum2(+e.target.value)} className="w-20 accent-orange-500" />
        </label>
      </div>
      <div className="flex gap-2">
        {[3, 4, 5, 7, 8].map(d => (
          <button key={d} onClick={() => { setDenom(d); setNum1(Math.min(num1, d * 2 - 1)); setNum2(Math.min(num2, d)); }}
            className={`px-2 py-1 rounded text-xs ${denom === d ? 'bg-teal-500 text-white' : 'bg-gray-100'}`}>
            /{d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ CH9: INTEGER NUMBER LINE ============
function IntegerLine() {
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);
  const sum = a + b;
  const min = -15, max = 15;
  const width = 340, margin = 20, lineY = 60;
  const usable = width - margin * 2;
  const toX = (n) => margin + ((n - min) / (max - min)) * usable;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-violet-700">🌡 Integers 整数</h3>
      <div className="flex gap-2 items-center text-lg">
        <span className="font-bold" style={{ color: a < 0 ? "#7C3AED" : "#059669" }}>({a})</span>
        <span>+</span>
        <span className="font-bold" style={{ color: b < 0 ? "#7C3AED" : "#059669" }}>({b})</span>
        <span>=</span>
        <span className="font-bold text-xl" style={{ color: sum < 0 ? "#DC2626" : sum > 0 ? "#059669" : "#6B7280" }}>{sum}</span>
      </div>
      <svg width={width} height={110} className="bg-white rounded-xl shadow-inner">
        <line x1={margin} y1={lineY} x2={width - margin} y2={lineY} stroke="#CBD5E1" strokeWidth="2" />
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => {
          const x = toX(n);
          const isMajor = n % 5 === 0;
          return (
            <g key={n}>
              <line x1={x} y1={lineY - (isMajor ? 8 : 4)} x2={x} y2={lineY + (isMajor ? 8 : 4)} stroke="#94A3B8" strokeWidth={n === 0 ? 2 : 1} />
              {isMajor && <text x={x} y={lineY + 22} textAnchor="middle" fontSize="10" fill={n === 0 ? "#111" : "#6B7280"}>{n}</text>}
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
            <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
          </marker>
        </defs>
        <circle cx={toX(a)} cy={lineY} r={6} fill="#7C3AED" />
        <circle cx={toX(sum)} cy={lineY} r={6} fill="#DC2626" stroke="#fff" strokeWidth="2" />
        <text x={toX(a)} y={lineY + 36} textAnchor="middle" fontSize="10" fill="#7C3AED">start</text>
        <text x={toX(sum)} y={lineY + 36} textAnchor="middle" fontSize="10" fill="#DC2626">result</text>
      </svg>
      <div className="flex gap-4 text-sm">
        <label>a: <input type="range" min={-10} max={10} value={a} onChange={e => setA(+e.target.value)} className="w-24 accent-violet-500" /></label>
        <label>b: <input type="range" min={-10} max={10} value={b} onChange={e => setB(+e.target.value)} className="w-24 accent-green-500" /></label>
      </div>
    </div>
  );
}

// ============ CH12: PROBABILITY SPINNER ============
function ProbabilitySpinner() {
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
      <h3 className="text-lg font-bold text-lime-700">🎯 Probability Spinner 概率转盘</h3>
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
                <path d={`M 90 90 L ${x1} ${y1} A 80 80 0 ${large} 1 ${x2} ${y2} Z`} fill={seg.color} stroke="white" strokeWidth="2" />
                <text x={tx} y={ty + 4} textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">{seg.label}</text>
              </g>
            );
          })}
        </g>
        {/* Pointer */}
        <polygon points="90,6 84,20 96,20" fill="#1F2937" />
      </svg>
      <button onClick={spin} disabled={spinning}
        className={`px-6 py-2 rounded-full font-bold text-white ${spinning ? 'bg-gray-400' : 'bg-lime-500 hover:bg-lime-600'} transition-all`}>
        {spinning ? "Spinning..." : "SPIN! 转!"}
      </button>
      {spins.length > 0 && (
        <div className="flex gap-3 text-sm">
          {segments.map(seg => (
            <div key={seg.label} className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: seg.color }}>{seg.label}</div>
              <span className="font-bold">{counts[seg.label]}</span>
              <span className="text-gray-400 text-xs">{spins.length > 0 ? Math.round(counts[seg.label] / spins.length * 100) : 0}%</span>
            </div>
          ))}
        </div>
      )}
      {spins.length > 0 && <button onClick={() => { setSpins([]); }} className="text-xs text-gray-400 underline">Clear 清除</button>}
    </div>
  );
}

// ============ CH5: DIVISION VISUALIZER ============
function DivisionVisualizer() {
  const [dividend, setDividend] = useState(156);
  const [divisor, setDivisor] = useState(12);
  const q = divisor > 0 ? Math.floor(dividend / divisor) : 0;
  const r = divisor > 0 ? dividend % divisor : 0;
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-emerald-700">🧮 Division 除法</h3>
      <div className="flex items-center gap-2">
        <input type="number" min={1} max={9999} value={dividend} onChange={e => setDividend(Math.max(1, +e.target.value))}
          className="w-20 px-2 py-1 border rounded text-center font-bold" />
        <span className="text-xl">÷</span>
        <input type="number" min={1} max={99} value={divisor} onChange={e => setDivisor(Math.max(1, +e.target.value))}
          className="w-16 px-2 py-1 border rounded text-center font-bold" />
      </div>
      <div className="bg-emerald-50 p-4 rounded-xl text-center">
        <div className="text-sm text-gray-600 mb-1">{divisor} × <strong className="text-emerald-700">{q}</strong> = {divisor * q}</div>
        <div className="text-sm text-gray-600">{dividend} − {divisor * q} = <strong className="text-orange-500">{r}</strong> remainder</div>
        <div className="mt-2 text-lg font-bold text-emerald-800">{dividend} ÷ {divisor} = {q} R {r}</div>
      </div>
      <div className="flex gap-1 flex-wrap max-w-xs justify-center">
        {Array.from({ length: Math.min(q, 30) }, (_, i) => (
          <div key={i} className="w-5 h-5 bg-emerald-400 rounded-sm" title={`Group ${i + 1}`} />
        ))}
        {q > 30 && <span className="text-xs text-gray-400">+{q - 30} more</span>}
        {r > 0 && Array.from({ length: Math.min(r, 11) }, (_, i) => (
          <div key={`r${i}`} className="w-5 h-5 bg-orange-300 rounded-sm" />
        ))}
      </div>
      <div className="text-xs text-gray-400 flex gap-3">
        <span>🟩 = groups of {divisor}</span>
        <span>🟧 = remainder</span>
      </div>
    </div>
  );
}

// ============ CH10: FRACTION MULTIPLICATION ============
function FractionMultiply() {
  const [whole, setWhole] = useState(24);
  const [num, setNum] = useState(5);
  const [den, setDen] = useState(6);
  const oneUnit = whole / den;
  const result = oneUnit * num;
  const barW = 280;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-orange-700">✖️ Fraction × Whole 分数乘整数</h3>
      <div className="flex items-center gap-2 text-lg">
        <span className="font-bold text-orange-600">{num}/{den}</span>
        <span>×</span>
        <input type="number" min={1} max={100} value={whole} onChange={e => setWhole(Math.max(1, +e.target.value))}
          className="w-16 px-2 py-1 border rounded text-center font-bold" />
        <span>=</span>
        <span className="font-bold text-orange-700 text-xl">{Number.isInteger(result) ? result : result.toFixed(2)}</span>
      </div>
      <svg width={barW + 20} height={60} className="bg-white rounded-lg">
        {Array.from({ length: den }, (_, i) => {
          const x = 10 + (barW / den) * i;
          const w = barW / den - 2;
          const active = i < num;
          return (
            <rect key={i} x={x} y={10} width={w} height={35} rx={4}
              fill={active ? "#F97316" : "#F3F4F6"} stroke={active ? "#EA580C" : "#D1D5DB"} strokeWidth="1.5" />
          );
        })}
        <text x={barW / 2 + 10} y={55} textAnchor="middle" fontSize="11" fill="#6B7280">
          {num} of {den} parts → {num}/{den} of {whole} = {Number.isInteger(result) ? result : result.toFixed(2)}
        </text>
      </svg>
      <div className="flex gap-2">
        {[[1, 2], [1, 3], [2, 3], [3, 4], [5, 6]].map(([n, d]) => (
          <button key={`${n}${d}`} onClick={() => { setNum(n); setDen(d); }}
            className={`px-2 py-1 rounded text-xs ${num === n && den === d ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            {n}/{d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ CH11: DECIMAL PLACE VALUE ============
function DecimalPlaceValue() {
  const [val, setVal] = useState("23.456");
  const digits = val.replace(".", "").split("").map(Number);
  const dotIdx = val.indexOf(".");
  const places = ["100s 百", "10s 十", "1s 个", ".", "0.1 十分", "0.01 百分", "0.001 千分"];

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg font-bold text-cyan-700">🔢 Decimal Place Value 小数位值</h3>
      <input type="text" value={val} onChange={e => {
        const v = e.target.value;
        if (/^\d*\.?\d{0,3}$/.test(v)) setVal(v);
      }} className="w-40 px-3 py-2 border-2 border-cyan-300 rounded-lg text-center text-2xl font-mono font-bold" placeholder="23.456" />
      <div className="flex gap-1 items-end">
        {val.split("").map((ch, i) => {
          if (ch === ".") return (
            <div key={i} className="flex flex-col items-center mx-1">
              <span className="text-3xl font-bold text-gray-400">.</span>
              <span className="text-[9px] text-gray-400 mt-1">decimal</span>
            </div>
          );
          const isBeforeDot = dotIdx === -1 || i < dotIdx;
          return (
            <div key={i} className={`flex flex-col items-center px-2 py-1 rounded-lg ${isBeforeDot ? 'bg-cyan-100' : 'bg-amber-100'}`}>
              <span className="text-2xl font-bold font-mono">{ch}</span>
              <span className="text-[9px] text-gray-500">
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

// ============ CHAPTER CONTENT ROUTER ============
function ChapterContent({ chapterId }) {
  const contentMap = {
    1: () => (
      <div className="flex flex-col gap-6 items-center">
        <AngleExplorer />
        <div className="w-full border-t border-gray-200 pt-4">
          <SymmetryExplorer />
        </div>
      </div>
    ),
    2: () => <AreaModel />,
    3: () => (
      <div className="flex flex-col gap-6 items-center">
        <ExponentExplorer />
        <div className="w-full border-t border-gray-200 pt-4">
          <BinaryConverter />
        </div>
      </div>
    ),
    4: () => <TreeDiagram />,
    5: () => <DivisionVisualizer />,
    6: () => (
      <div className="text-center p-6">
        <p className="text-4xl mb-3">🧩</p>
        <p className="text-gray-600 text-sm">Logic puzzles work best as custom-generated activities.</p>
        <p className="text-gray-500 text-xs mt-2">Try asking Claude: "Generate a Minesweeper puzzle for a 9-year-old"</p>
        <a href="https://www.mathplayground.com/logic_games.html" target="_blank" rel="noopener"
          className="inline-block mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200">
          → Math Playground Logic Lab
        </a>
      </div>
    ),
    7: () => <SieveExplorer />,
    8: () => <FractionNumberLine />,
    9: () => <IntegerLine />,
    10: () => <FractionMultiply />,
    11: () => <DecimalPlaceValue />,
    12: () => <ProbabilitySpinner />,
  };

  const Content = contentMap[chapterId];
  return Content ? <Content /> : <div className="text-center text-gray-400 p-8">Coming soon...</div>;
}

// ============ EXTERNAL LINKS ============
const externalLinks = {
  1: [
    { name: "GeoGebra Angles", url: "https://www.geogebra.org/m/mevz5zfp" },
    { name: "Polypad Geometry", url: "https://polypad.amplify.com/" },
  ],
  2: [
    { name: "PhET Area Model", url: "https://phet.colorado.edu/en/simulations/area-model-multiplication" },
    { name: "GeoGebra Area Model", url: "https://www.geogebra.org/m/vfffrx2z" },
  ],
  3: [
    { name: "Polypad Binary Lesson", url: "https://polypad.amplify.com/lesson/binary-numbers-with-playing-cards" },
  ],
  4: [
    { name: "Polypad Dice & Coins", url: "https://polypad.amplify.com/" },
  ],
  7: [
    { name: "GeoGebra Sieve", url: "https://www.geogebra.org/m/ZWDkYU4t" },
    { name: "Polypad Prime Circles", url: "https://polypad.amplify.com/" },
  ],
  8: [
    { name: "PhET Fractions", url: "https://phet.colorado.edu/en/simulations/fractions-intro" },
    { name: "Polypad Fraction Bars", url: "https://polypad.amplify.com/lesson/fraction-addition" },
  ],
  9: [
    { name: "PhET Number Line", url: "https://phet.colorado.edu/en/simulations/number-line-integers" },
  ],
  11: [
    { name: "PhET Area Model Decimals", url: "https://phet.colorado.edu/en/simulations/area-model-decimals" },
  ],
  12: [
    { name: "Polypad Spinners", url: "https://polypad.amplify.com/" },
    { name: "PhET Plinko", url: "https://phet.colorado.edu/en/simulations/plinko-probability" },
  ],
};

// ============ MAIN DASHBOARD ============
export default function BA4Dashboard() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [lang, setLang] = useState("en");

  if (selectedChapter) {
    const ch = chapters.find(c => c.id === selectedChapter);
    const links = externalLinks[selectedChapter] || [];
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Top bar */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b z-10 px-4 py-2 flex items-center justify-between">
          <button onClick={() => setSelectedChapter(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">All Chapters</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: ch.color }}>
              {ch.icon}
            </span>
            <div>
              <div className="text-sm font-bold" style={{ color: ch.color }}>Ch {ch.id}: {ch.title}</div>
              <div className="text-xs text-gray-400">{ch.subtitle}</div>
            </div>
          </div>
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto px-4 py-6">
          <ChapterContent chapterId={selectedChapter} />

          {/* External links */}
          {links.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <p className="text-xs text-gray-400 mb-2">🔗 More resources 更多资源:</p>
              <div className="flex gap-2 flex-wrap">
                {links.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener"
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 transition-colors">
                    {l.name} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <button onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
              disabled={selectedChapter === 1}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-200">
              ← Ch {selectedChapter - 1}
            </button>
            <button onClick={() => setSelectedChapter(Math.min(12, selectedChapter + 1))}
              disabled={selectedChapter === 12}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-200">
              Ch {selectedChapter + 1} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ HOME SCREEN ============
  const books = ["4A", "4B", "4C", "4D"];
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="text-center pt-8 pb-4 px-4">
        <div className="text-3xl font-black tracking-tight">
          <span className="text-amber-400">Beast</span> Academy 4
        </div>
        <div className="text-sm text-slate-400 mt-1">Interactive Math Dashboard 交互数学仪表盘</div>
      </div>

      {/* Chapter Grid */}
      <div className="max-w-lg mx-auto px-4 pb-8">
        {books.map(book => (
          <div key={book} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">📘 Book {book}</span>
              <div className="flex-1 border-t border-slate-700" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {chapters.filter(c => c.book === book).map(ch => (
                <button key={ch.id} onClick={() => setSelectedChapter(ch.id)}
                  className="group relative bg-slate-800 hover:bg-slate-700 rounded-xl p-3 text-left transition-all hover:scale-105 hover:shadow-lg border border-slate-700 hover:border-slate-500">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2 transition-transform group-hover:scale-110"
                    style={{ background: ch.color }}>
                    {ch.icon}
                  </div>
                  <div className="text-xs font-bold text-slate-200 leading-tight">Ch {ch.id}</div>
                  <div className="text-[11px] font-medium text-slate-300 leading-tight">{ch.title}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{ch.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pb-6 text-xs text-slate-600">
        Built with ❤️ for math beasts · Powered by Claude
      </div>
    </div>
  );
}
