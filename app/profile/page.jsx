"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { chapters } from "@/lib/chapters";
import { useProgress } from "@/lib/progress/progress-context";
import { exportProgress, importProgress } from "@/lib/progress/export-import";

export default function ProfilePage() {
  const { progress, isVisited, setFullProgress } = useProgress();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const visitedCount = chapters.filter(ch => isVisited(ch.id)).length;

  const handleExport = () => {
    setError(null);
    exportProgress(progress);
    setSuccess("Progress exported!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setSuccess(null);
    try {
      const data = await importProgress(file);
      setFullProgress(data);
      setSuccess("Progress imported successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-night-deep">
      {/* Top bar */}
      <div className="sticky top-0 bg-nav-bg backdrop-blur-sm border-b border-white/15 z-10 px-4 py-2 flex items-center">
        <Link href="/ba4"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <span className="text-xl">←</span>
          <span className="text-base font-medium">Dashboard</span>
        </Link>
      </div>

      <div className="relative z-[1] max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Profile 个人资料</h1>

        {/* Progress overview */}
        <div className="glass-card p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3">Progress 进度</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl font-bold text-accent">{visitedCount}</div>
            <div className="text-text-secondary text-sm">of {chapters.length} chapters visited</div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {chapters.map(ch => (
              <div key={ch.id}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isVisited(ch.id) ? 'text-white' : 'bg-white/10 text-slate-500'}`}
                style={isVisited(ch.id) ? { background: ch.color } : undefined}
                title={`Ch ${ch.id}: ${ch.title}`}>
                {ch.id}
              </div>
            ))}
          </div>
        </div>

        {/* Export/Import */}
        <div className="glass-card p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">Backup 备份</h2>
          <p className="text-sm text-text-secondary mb-4">
            Export your progress as a JSON file or import a previously saved backup.
          </p>
          <div className="flex gap-3">
            <button onClick={handleExport}
              className="px-4 py-2 bg-accent text-night-deep font-bold rounded-lg hover:opacity-90 transition-opacity">
              Export 导出
            </button>
            <label className="px-4 py-2 bg-white/10 text-text-secondary rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              Import 导入
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
          {error && (
            <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-3 p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-sm text-emerald-400">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
