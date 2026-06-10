import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Utensils,
  Flame,
  Fish,
  Leaf,
  Cake,
  Wine,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { Reveal } from "@/components/laplaya/PageTransition";
import { CartDrawer } from "@/components/laplaya/CartDrawer";
import { MENU, MENU_CATEGORIES } from "@/lib/laplaya/data";
import { useCart } from "@/lib/laplaya/stores";
import { formatFCFA, BRAND } from "@/lib/laplaya/constants";

const ICONS = { Utensils, Flame, Fish, Leaf, Cake, Wine } as const;

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant & Bar — La Playa" },
      {
        name: "description",
        content:
          "Carte gastronomique en bord de mer : entrées, poissons, viandes, cocktails signature, desserts.",
      },
      { property: "og:title", content: "Restaurant & Bar — La Playa" },
      {
        property: "og:description",
        content: "Gastronomie en bord de mer, cocktails d'exception, couchers de soleil.",
      },
      { property: "og:url", content: "/restaurant" },
    ],
    links: [{ rel: "canonical", href: "/restaurant" }],
  }),
  component: RestaurantPage,
});

function RestaurantPage() {
  const [cat, setCat] = useState<(typeof MENU_CATEGORIES)[number]["id"]>("entrees");
  const [cartOpen, setCartOpen] = useState(false);
  const { add, items } = useCart();
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const filtered = MENU.filter((m) => m.category === cat);

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
        label="Carte"
        title="Restaurant & Bar"
        subtitle="Gastronomie en bord de mer · Cocktails d'exception · Couchers de soleil"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-widest text-[var(--cream)]/80">
          <span><span className="text-[var(--gold)]">Déjeuner</span> · {BRAND.hours.dejeuner}</span>
          <span><span className="text-[var(--gold)]">Dîner</span> · {BRAND.hours.diner}</span>
          <span><span className="text-[var(--gold)]">Bar</span> · {BRAND.hours.bar}</span>
        </div>
      </Hero>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {MENU_CATEGORIES.map((c) => {
              const Ico = ICONS[c.icon];
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-3 text-xs uppercase tracking-widest transition-all ${
                    active
                      ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--charcoal)]"
                      : "border-[var(--gold)]/25 text-[var(--cream)]/80 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  }`}
                >
                  <Ico size={14} />
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.04}>
                <article className="group flex gap-5 overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-4 transition-all hover:border-[var(--gold)]/40">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="h-28 w-28 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif-brand text-lg text-[var(--cream)]">
                        {m.name}
                      </h3>
                      <span className="font-serif-brand text-lg text-[var(--gold)]">
                        {formatFCFA(m.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--cream)]/65">{m.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex gap-1.5">
                        {m.tags?.includes("signature") && (
                          <span className="rounded-full border border-[var(--gold)]/40 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[var(--gold)]">
                            Signature
                          </span>
                        )}
                        {m.tags?.includes("vegan") && (
                          <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-emerald-300">
                            <Leaf size={10} /> Végé
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => add(m)}
                        className="flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--charcoal)] transition-all hover:bg-[var(--gold-light)]"
                      >
                        <Plus size={12} /> Ajouter
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cart FAB */}
      {totalQty > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium uppercase tracking-widest text-[var(--charcoal)] shadow-[0_10px_40px_rgba(200,165,87,0.4)] transition-all hover:bg-[var(--gold-light)]"
        >
          <ShoppingBag size={16} />
          Panier ({totalQty})
        </button>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </PublicLayout>
  );
}