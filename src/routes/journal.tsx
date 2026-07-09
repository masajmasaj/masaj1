import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { JournalCard } from "@/components/site/JournalCard";
import {
  JOURNAL_ARTICLES,
  JOURNAL_CATEGORIES,
  FEATURED_ARTICLES,
  type JournalCategorySlug,
} from "@/lib/journal";
import { TREATMENTS } from "@/lib/treatments";

const TITLE =
  "The Journal — Massage, Recovery & Wellness Guides | Lythe";
const DESCRIPTION =
  "Editorial guides from our London therapists. Massage, sports recovery, sleep, pregnancy, corporate wellness and aftercare — thoughtfully written, clinically sound.";

const searchSchema = z.object({
  category: z
    .enum([
      "massage-guides",
      "sports-recovery",
      "stress-sleep",
      "senior-wellness",
      "pregnancy-wellness",
      "corporate-wellness",
      "home-wellness",
      "aftercare-advice",
      "product-guides",
    ] as [JournalCategorySlug, ...JournalCategorySlug[]])
    .optional(),
});

export const Route = createFileRoute("/journal")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/journal" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Lythe Journal",
          description: DESCRIPTION,
          publisher: { "@type": "Organization", name: "Lythe Wellness" },
        }),
      },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { category } = Route.useSearch();
  const lead = FEATURED_ARTICLES[0] ?? JOURNAL_ARTICLES[0];
  const rest = JOURNAL_ARTICLES.filter((a) => a.slug !== lead.slug);
  const list = category ? rest.filter((a) => a.category === category) : rest;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-stone-100 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-end">
          <div>
            <p className="eyebrow text-gold mb-6">The Journal</p>
            <h1 className="serif-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-stone-900 text-balance">
              Thoughtful writing on massage, recovery and rest.
            </h1>
            <p className="mt-8 text-lg text-stone-700 leading-relaxed max-w-[54ch]">
              Editorial guides from our London therapists — the same practitioners
              you meet in your home, hotel or office. Written with care, grounded in
              practice.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex items-center bg-stone-50 rounded-full ring-1 ring-stone-200 shadow-soft p-1 max-w-lg"
            >
              <input
                type="search"
                placeholder="Search articles, treatments, wellbeing topics…"
                className="flex-1 min-w-0 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="bg-forest text-stone-50 text-xs uppercase tracking-[0.16em] font-medium px-5 py-3 rounded-full hover:brightness-110 transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Featured lead */}
          <Link
            to="/journal/$slug"
            params={{ slug: lead.slug }}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-black/5">
              <img
                src={lead.image}
                alt={lead.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-stone-50">
                <p className="eyebrow text-gold-soft mb-2">
                  Featured · {lead.categoryLabel}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl leading-snug">
                  {lead.title}
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category filters */}
      <div className="bg-stone-50 border-y border-stone-200/70 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          <Link
            to="/journal"
            search={{}}
            className={`shrink-0 text-xs font-medium uppercase tracking-[0.16em] rounded-full px-4 py-2 border transition ${
              !category
                ? "bg-forest text-stone-50 border-forest"
                : "border-stone-300 text-stone-700 hover:border-forest hover:text-forest"
            }`}
          >
            All
          </Link>
          {JOURNAL_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/journal"
              search={{ category: c.slug }}
              className={`shrink-0 text-xs font-medium uppercase tracking-[0.16em] rounded-full px-4 py-2 border transition ${
                category === c.slug
                  ? "bg-forest text-stone-50 border-forest"
                  : "border-stone-300 text-stone-700 hover:border-forest hover:text-forest"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Article grid */}
      <Section
        eyebrow={category ? "Filtered" : "The Library"}
        title={
          category
            ? JOURNAL_CATEGORIES.find((c) => c.slug === category)?.label
            : "Latest writing."
        }
        intro={
          category
            ? JOURNAL_CATEGORIES.find((c) => c.slug === category)?.intro
            : "Guides, essays and clinical notes from the Lythe practice."
        }
      >
        {list.length === 0 ? (
          <p className="text-stone-700">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {list.map((a) => (
              <JournalCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </Section>

      {/* Related treatments */}
      <Section
        tone="warm"
        eyebrow="From reading to ritual"
        title="Explore the treatments behind the writing."
        intro="Every article is grounded in a treatment we deliver in London. Book the one that fits how your body feels today."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {TREATMENTS.filter((t) => t.featured).map((t) => (
            <Link
              key={t.slug}
              to="/treatments"
              hash={t.slug}
              className="rounded-full border border-stone-300 bg-stone-50 px-5 py-3 text-sm text-stone-800 hover:border-forest hover:text-forest transition text-center"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <section className="bg-forest text-stone-100 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="eyebrow text-gold-soft mb-4">The Monthly Ritual</p>
          <h2 className="serif-display text-4xl md:text-5xl text-balance">
            Quiet insights, delivered once a month.
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            Seasonal rituals, therapist notes and small ideas to help you rest more
            deeply. No noise, no promotions.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex items-center bg-stone-50/5 ring-1 ring-stone-50/20 rounded-full p-1 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 bg-transparent px-5 py-3 text-sm outline-none text-stone-50 placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="bg-stone-50 text-forest text-xs uppercase tracking-[0.16em] font-medium px-5 py-3 rounded-full hover:bg-gold hover:text-stone-50 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
