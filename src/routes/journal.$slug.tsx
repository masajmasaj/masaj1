import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { JournalCard } from "@/components/site/JournalCard";
import { articleBySlug, relatedArticles, type JournalArticle } from "@/lib/journal";
import { TREATMENTS } from "@/lib/treatments";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }): { article: JournalArticle } => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Lythe Journal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    const title = `${article.title} | Lythe Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/journal/${article.slug}` },
        { property: "og:image", content: article.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: article.excerpt },
        { name: "twitter:image", content: article.image },
        { name: "article:author", content: article.author },
        { name: "article:section", content: article.categoryLabel },
        { name: "article:published_time", content: article.publishedOn },
      ],
      links: [{ rel: "canonical", href: `/journal/${article.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            datePublished: article.publishedOn,
            author: { "@type": "Person", name: article.author },
            publisher: { "@type": "Organization", name: "Lythe Wellness" },
            articleSection: article.categoryLabel,
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFoundArticle,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-2xl">Something didn't load</h1>
        <p className="mt-4 text-stone-700 text-sm">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ArticlePage,
});

function NotFoundArticle() {
  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="eyebrow text-gold mb-4">Journal</p>
        <h1 className="serif-display text-4xl mb-4">Article not found.</h1>
        <p className="text-stone-700 mb-8">
          The piece you're looking for may have moved or been retired.
        </p>
        <Link
          to="/journal"
          className="inline-block bg-forest text-stone-50 rounded-full px-6 py-3 text-sm"
        >
          Return to the Journal
        </Link>
      </div>
    </SiteLayout>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = relatedArticles(article, 3);
  const treatments = (article.relatedTreatments ?? [])
    .map((s) => TREATMENTS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const publishedLabel = new Date(article.publishedOn).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <SiteLayout>
      {/* Editorial hero */}
      <section className="bg-stone-100 pt-20">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="eyebrow text-gold mb-6">
            <Link
              to="/journal"
              search={{ category: article.category }}
              className="hover:text-forest transition"
            >
              {article.categoryLabel}
            </Link>
          </p>
          <h1 className="serif-display text-4xl md:text-6xl leading-[1.05] text-stone-900 text-balance">
            {article.title}
          </h1>
          <p className="mt-8 text-lg text-stone-700 leading-relaxed max-w-[52ch] mx-auto text-pretty">
            {article.excerpt}
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.16em] text-stone-500">
            <span>{article.author} · {article.authorRole}</span>
            <span>{publishedLabel}</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-black/5">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body with TOC */}
      <section className="bg-stone-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[220px_1fr] gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="eyebrow text-stone-500 mb-4">Contents</p>
              <nav className="flex flex-col gap-3 text-sm">
                {article.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-stone-700 hover:text-forest transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-10 pt-8 border-t border-stone-200">
                <p className="eyebrow text-stone-500 mb-3">Ready?</p>
                <Link
                  to="/booking"
                  className="inline-block bg-forest text-stone-50 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] hover:brightness-110 transition"
                >
                  Book Treatment
                </Link>
              </div>
            </div>
          </aside>

          <article className="max-w-[68ch]">
            {article.body.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-14 scroll-mt-32"
              >
                <h2 className="serif-display text-3xl md:text-4xl text-stone-900 mb-6 text-balance">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-lg text-stone-800 leading-[1.75] mb-5 text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* Booking inline CTA */}
            <div className="mt-4 mb-14 rounded-2xl bg-stone-100 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="eyebrow text-gold mb-2">Move from reading to ritual</p>
                <h3 className="font-serif text-2xl text-stone-900">
                  Book a therapist trained for this.
                </h3>
              </div>
              <Link
                to="/booking"
                className="bg-forest text-stone-50 rounded-full px-6 py-3 text-sm font-medium hover:brightness-110 transition shrink-0"
              >
                Book Treatment
              </Link>
            </div>

            {article.disclaimer && (
              <aside className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-sm text-stone-700 leading-relaxed">
                <p className="eyebrow text-stone-500 mb-2">Wellness disclaimer</p>
                This article is for general wellbeing information only and does not
                constitute medical advice. If you are pregnant, managing a chronic
                condition or recovering from injury or surgery, please consult a
                qualified medical professional before booking treatment.
              </aside>
            )}
          </article>
        </div>
      </section>

      {/* Related treatments */}
      {treatments.length > 0 && (
        <section className="bg-stone-100 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <p className="eyebrow text-gold mb-4">Related treatments</p>
            <h2 className="serif-display text-3xl md:text-4xl mb-10 text-balance">
              Treatments referenced in this piece.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treatments.map((t) => (
                <Link
                  key={t.slug}
                  to="/treatments"
                  hash={t.slug}
                  className="rounded-2xl bg-stone-50 border border-stone-200 p-6 hover:border-forest transition block"
                >
                  <p className="eyebrow text-gold mb-2">{t.categoryLabel}</p>
                  <h3 className="font-serif text-lg text-stone-900 mb-2">{t.name}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {t.description}
                  </p>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-forest">
                    From £{t.priceFrom}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-stone-50 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <p className="eyebrow text-gold mb-4">Keep reading</p>
            <h2 className="serif-display text-3xl md:text-4xl mb-12 text-balance">
              More from the Journal.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
              {related.map((a) => (
                <JournalCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
