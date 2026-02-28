const brightStars = Array.from({ length: 40 }, (_, i) => ({
  left: ((i * 97 + 13) % 100),
  top: ((i * 61 + 37) % 100),
  dur: 2 + (i % 5),
  delay: (i * 0.7) % 5,
}));
const dimStars = Array.from({ length: 60 }, (_, i) => ({
  left: ((i * 83 + 29) % 100),
  top: ((i * 47 + 53) % 100),
  dur: 3 + (i % 4),
  delay: (i * 0.5) % 6,
}));

export default function StarField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebula blobs */}
      <div className="absolute" style={{ left: '15%', top: '20%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(79, 70, 229, 0.15)', filter: 'blur(80px)' }} />
      <div className="absolute" style={{ right: '10%', bottom: '15%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(30, 58, 95, 0.18)', filter: 'blur(80px)' }} />
      <div className="absolute" style={{ left: '50%', top: '50%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(49, 46, 129, 0.12)', filter: 'blur(80px)', transform: 'translate(-50%, -50%)' }} />
      {/* Bright gold stars */}
      {brightStars.map((s, i) => (
        <div key={`b${i}`} className="absolute rounded-full" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: 2, height: 2,
          background: '#ffd700',
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
      {/* Dim white stars */}
      {dimStars.map((s, i) => (
        <div key={`d${i}`} className="absolute rounded-full" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: 1, height: 1,
          background: 'rgba(255, 255, 255, 0.5)',
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}
