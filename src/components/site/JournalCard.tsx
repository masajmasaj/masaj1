import { Link } from "@tanstack/react-router";
import type { JournalArticle } from "@/lib/journal";

export function JournalCard({
  article,
  variant = "default",
}: {
  article: JournalArticle;
  variant?: "default" | "compact";
}) {
  const compact = variant === "compact";
  return (
    <article className="group flex flex-col h-full">
      <Link
        to="/journal/$slug"
        params={{ slug: article.slug }}
        className="relative overflow-hidden rounded-2xl mb-6 ring-1 ring-black/5 bg-stone-100 block aspect-[4/3]"
      >
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <p className="eyebrow text-gold mb-2">{article.categoryLabel}</p>
      <h3
        className={`font-serif font-medium text-stone-900 mb-3 leading-snug ${
          compact ? "text-lg" : "text-xl"
        }`}
      >
        <Link
          to="/journal/$slug"
          params={{ slug: article.slug }}
          className="hover:text-forest transition-colors"
        >
          {article.title}
        </Link>
      </h3>
      {!compact && (
        <p className="text-sm text-stone-700 leading-relaxed mb-4 text-pretty">
          {article.excerpt}
        </p>
      )}
      <div className="mt-auto pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-stone-500">
        <span>{article.author}</span>
        <span>{article.readingMinutes} min read</span>
      </div>
    </article>
  );
}
