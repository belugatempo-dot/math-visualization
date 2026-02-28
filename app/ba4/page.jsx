import Link from "next/link";
import { chapters } from "@/lib/chapters";
import ChapterCard from "@/components/ChapterCard";

const books = ["4A", "4B", "4C", "4D"];

export default function BA4Home() {
  return (
    <div className="min-h-screen bg-night-deep text-white">
      {/* Header */}
      <div className="relative z-[1] text-center pt-8 pb-4 px-4">
        <div className="text-4xl font-black tracking-tight font-display">
          <span className="text-accent star-glow">Beast</span> Academy 4
        </div>
        <div className="text-base text-text-secondary mt-1">Interactive Math Dashboard 交互数学仪表盘</div>
        <Link href="/profile" className="inline-block mt-2 px-3 py-1 bg-white/10 text-text-secondary text-sm rounded-full hover:bg-white/20 transition-colors">
          Profile 个人资料
        </Link>
      </div>

      {/* Chapter Grid */}
      <div className="relative z-[1] max-w-lg mx-auto px-4 pb-8">
        {books.map(book => (
          <div key={book} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold px-2 py-0.5 rounded bg-white/10 text-text-secondary">📘 Book {book}</span>
              <div className="flex-1 border-t border-white/15" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {chapters.filter(c => c.book === book).map(ch => (
                <ChapterCard key={ch.id} chapter={ch} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-[1] text-center pb-6 text-sm text-text-secondary">
        Built by Beluga with ❤️ for her son and other math beasts
      </div>
    </div>
  );
}
