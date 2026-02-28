"use client";
import { use, useEffect } from "react";
import Link from "next/link";
import { chapters } from "@/lib/chapters";
import { externalLinks } from "@/lib/external-links";
import { chapterContentMap } from "@/lib/chapter-content-map";
import { useProgress } from "@/lib/progress/progress-context";

export default function ChapterPage({ params }) {
  const { id } = use(params);
  const chapterId = Number(id);
  const ch = chapters.find(c => c.id === chapterId);
  const { markVisited } = useProgress();

  useEffect(() => {
    if (ch) markVisited(chapterId);
  }, [ch, chapterId, markVisited]);

  if (!ch) {
    return (
      <div className="min-h-screen bg-night-deep flex items-center justify-center">
        <div className="text-center text-text-secondary">
          <p className="text-2xl mb-2">Chapter not found</p>
          <Link href="/ba4" className="text-accent underline">Back to chapters</Link>
        </div>
      </div>
    );
  }

  const links = externalLinks[chapterId] || [];
  const content = chapterContentMap[chapterId];

  return (
    <div className="min-h-screen bg-night-deep">
      {/* Top bar */}
      <div className="sticky top-0 bg-nav-bg backdrop-blur-sm border-b border-white/15 z-10 px-4 py-2 flex items-center justify-between">
        <Link href="/ba4"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <span className="text-xl">←</span>
          <span className="text-base font-medium">All Chapters</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-base" style={{ background: ch.color }}>
            {ch.icon}
          </span>
          <div>
            <div className="text-base font-bold" style={{ color: ch.color }}>Ch {ch.id}: {ch.title}</div>
            <div className="text-sm text-slate-500">{ch.subtitle}</div>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="relative z-[1] max-w-lg mx-auto px-4 py-6">
        {content ? (
          <div className="flex flex-col gap-6 items-center">
            {content.components.map((Component, i) => (
              <div key={i} className={i > 0 && content.hasDivider ? "w-full border-t border-white/15 pt-4" : undefined}>
                <Component chapterId={chapterId} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 p-8">Coming soon...</div>
        )}

        {/* External links */}
        {links.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-slate-500 mb-2">🔗 More resources 更多资源:</p>
            <div className="flex gap-2 flex-wrap">
              {links.map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noopener"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-text-secondary transition-colors">
                  {l.name} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {chapterId > 1 ? (
            <Link href={`/ba4/chapter/${chapterId - 1}`}
              className="px-4 py-2 bg-white/10 text-text-secondary rounded-lg text-base hover:bg-white/20">
              ← Ch {chapterId - 1}
            </Link>
          ) : (
            <div />
          )}
          {chapterId < 12 ? (
            <Link href={`/ba4/chapter/${chapterId + 1}`}
              className="px-4 py-2 bg-white/10 text-text-secondary rounded-lg text-base hover:bg-white/20">
              Ch {chapterId + 1} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
