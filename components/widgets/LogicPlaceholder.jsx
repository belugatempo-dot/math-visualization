export default function LogicPlaceholder() {
  return (
    <div className="text-center p-6">
      <p className="text-4xl mb-3">🧩</p>
      <p className="text-text-secondary text-base">Logic puzzles work best as custom-generated activities.</p>
      <p className="text-slate-500 text-sm mt-2">Try asking Claude: &quot;Generate a Minesweeper puzzle for a 9-year-old&quot;</p>
      <a href="https://www.mathplayground.com/logic_games.html" target="_blank" rel="noopener"
        className="inline-block mt-3 px-4 py-2 bg-white/10 text-indigo-400 rounded-lg text-base hover:bg-white/20">
        → Math Playground Logic Lab
      </a>
    </div>
  );
}
