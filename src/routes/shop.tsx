import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import shopImg from "@/assets/shop-preview.jpg";

const TITLE = "Wellness Shop — Coming Soon | Lythe";
const DESCRIPTION =
  "A curated edit of massage oils, recovery tools, self-care products and gift sets from our London therapists. Launching soon.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      <Section reveal={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal className="rounded-2xl overflow-hidden ring-1 ring-black/5 aspect-[4/5]">

            <img
              src={shopImg}
              alt="Massage oils and wellness products"
              loading="lazy"
              width={1200}
              height={1500}
              className="w-full h-full object-cover"
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-gold mb-4 flex items-center gap-3">
              Wellness Shop
              <span className="text-[10px] tracking-[0.22em] rounded-full bg-forest/10 text-forest px-3 py-1">
                Coming Soon
              </span>
            </p>
            <h1 className="text-5xl md:text-6xl serif-display mb-6 text-balance text-stone-900">
              The tools our therapists trust.
            </h1>
            <p className="text-stone-700 leading-relaxed mb-8 text-pretty max-w-[48ch]">
              A quiet collection of botanical massage oils, recovery tools, self-care essentials and
              elegant gift sets. Curated by our therapists, launching soon.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
            >
              Join the waitlist
            </Link>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
