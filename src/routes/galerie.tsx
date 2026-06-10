import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { Lightbox } from "@/components/laplaya/Lightbox";
import { GALLERY } from "@/lib/laplaya/data";

const FILTERS = ["Tous", "Resort", "Restaurant", "Bar", "Événements", "Plage", "Nuit"];

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — La Playa" },
      { name: "description", content: "Découvrez La Playa en images : resort, restaurant, bar, événements." },
      { property: "og:title", content: "Galerie — La Playa" },
      { property: "og:description", content: "Instants suspendus en bord de mer." },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  const [filter, setFilter] = useState("Tous");
  const [idx, setIdx] = useState<number | null>(null);

  const photos = useMemo(
    () => (filter === "Tous" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  );
  const urls = photos.map((p) => p.src);

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1920&q=80"
        label="En images"
        title="Galerie"
        subtitle="Instants suspendus, lumière dorée, ambiance tropicale."
        height="min-h-[55vh]"
      />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-all ${
                  filter === f
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--charcoal)]"
                    : "border-[var(--gold)]/25 text-[var(--cream)]/70 hover:border-[var(--gold)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onClick={() => setIdx(i)}
                className="group relative mb-4 block w-full overflow-hidden rounded-xl"
              >
                <img
                  src={p.src}
                  alt=""
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--charcoal)]/0 opacity-0 transition-all group-hover:bg-[var(--charcoal)]/50 group-hover:opacity-100">
                  <ZoomIn size={28} className="text-[var(--gold)]" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={urls} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </PublicLayout>
  );
}