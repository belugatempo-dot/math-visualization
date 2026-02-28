"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress/progress-context";

export default function ChapterCard({ chapter }) {
  const { isVisited } = useProgress();
  const visited = isVisited(chapter.id);

  return (
    <Link href={`/ba4/chapter/${chapter.id}`}
      className="group relative glass-card p-3 text-left transition-all hover:scale-105 hover-glow hover:border-white/30 block">
      {visited && (
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent" title="Visited" />
      )}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-2 transition-transform group-hover:scale-110"
        style={{ background: chapter.color }}>
        {chapter.icon}
      </div>
      <div className="text-sm font-bold text-text-primary leading-tight">Ch {chapter.id}</div>
      <div className="text-xs font-medium text-text-secondary leading-tight">{chapter.title}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{chapter.subtitle}</div>
    </Link>
  );
}
