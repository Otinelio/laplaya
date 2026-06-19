import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, X, Send, CheckCircle2 } from "lucide-react";
import { MENU, MENU_CATEGORIES } from "@/lib/laplaya/data";
import { addOrder, type Order } from "@/lib/laplaya/stores";
import { formatFCFA } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/spot/$spotId")({
  head: () => ({
    meta: [
      { title: "La Playa — Commande" },
      {
        name: "description",
        content: "Commandez depuis votre cabane, transat ou table.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SpotPage,
});

function SpotPage() {
  const { spotId } = Route.useParams();
  const [cat, setCat] =
    useState<(typeof MENU_CATEGORIES)[number]["id"]>("cocktails");
  const [items, setItems] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const list = MENU.filter((m) => m.category === cat);
  const cartEntries = Object.entries(items).filter(([, q]) => q > 0);
  const cartItems = cartEntries.map(([id, qty]) => {
    const m = MENU.find((x) => x.id === id)!;
    return { item: m, qty };
  });
  const total = cartItems.reduce((s, c) => s + c.item.price * c.qty, 0);
  const totalQty = cartItems.reduce((s, c) => s + c.qty, 0);

  const add = (id: string) =>
    setItems((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setItems((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

  const submit = () => {
    if (cartItems.length === 0) return;
    const order: Order = {
      id: `o_${Date.now()}`,
      spotId,
      items: cartItems.map((c) => ({
        name: c.item.name,
        price: c.item.price,
        qty: c.qty,
      })),
      total,
      name: name || "Invité",
      time: Date.now(),
      status: "En attente",
    };
    addOrder(order);
    setSent(true);
    setItems({});
    setCartOpen(false);
  };

  if (sent) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--charcoal)] px-6 text-center">
        <WaveBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <CheckCircle2 size={80} className="mx-auto text-[var(--gold)]" />
          <h2 className="font-serif-brand mt-6 text-3xl text-[var(--cream)]">
            Commande reçue
          </h2>
          <p className="mt-3 max-w-sm text-[var(--cream)]/70">
            Notre équipe arrive dans quelques instants à votre spot.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-8 rounded-full border border-[var(--gold)] px-6 py-3 text-xs uppercase tracking-widest text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
          >
            Nouvelle commande
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--charcoal)] pb-32 text-[var(--cream)]">
      <WaveBackground />

      <header className="relative z-10 px-5 pt-8 text-center">
        <p className="font-serif-brand text-2xl tracking-wider text-[var(--gold)]">
          La Playa
        </p>
        <div className="mt-3 inline-block rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--charcoal)]">
          {spotId.replace("-", " ")}
        </div>
        <h1 className="font-serif-brand mt-6 text-2xl text-[var(--cream)]">
          Que souhaitez-vous{" "}
          <span className="italic text-gold-gradient">commander ?</span>
        </h1>
      </header>

      <div className="relative z-10 mt-8 overflow-x-auto px-5">
        <div className="flex gap-2 pb-2">
          {MENU_CATEGORIES.map((c) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                  active
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--charcoal)]"
                    : "border-[var(--gold)]/25 text-[var(--cream)]/80"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mt-4 space-y-3 px-5">
        {list.map((m) => (
          <article
            key={m.id}
            className="flex items-center gap-4 rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-3"
          >
            <img
              src={m.image}
              alt=""
              loading="lazy"
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-[var(--cream)]">{m.name}</p>
              <p className="text-sm font-medium text-[var(--gold)]">
                {formatFCFA(m.price)}
              </p>
            </div>
            {items[m.id] ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dec(m.id)}
                  className="rounded-full border border-[var(--gold)]/40 p-1.5 text-[var(--gold)]"
                  aria-label="Diminuer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-5 text-center text-sm">{items[m.id]}</span>
                <button
                  onClick={() => add(m.id)}
                  className="rounded-full bg-[var(--gold)] p-1.5 text-[var(--charcoal)]"
                  aria-label="Augmenter"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => add(m.id)}
                className="rounded-full bg-[var(--gold)] p-2 text-[var(--charcoal)]"
                aria-label="Ajouter"
              >
                <Plus size={16} />
              </button>
            )}
          </article>
        ))}
      </div>

      {/* Bottom bar */}
      {totalQty > 0 && (
        <motion.button
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-5 right-5 z-30 flex items-center justify-between rounded-full bg-[var(--gold)] px-6 py-4 text-[var(--charcoal)] shadow-[0_10px_40px_rgba(200,165,87,0.4)]"
        >
          <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
            <ShoppingBag size={16} /> Voir panier ({totalQty})
          </span>
          <span className="font-serif-brand text-lg">{formatFCFA(total)}</span>
        </motion.button>
      )}

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-[var(--gold)]/30 bg-[var(--card)] p-6"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[var(--gold)]/40" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif-brand text-xl text-[var(--gold)]">
                  Votre commande
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)]"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>

              <ul className="max-h-[40vh] space-y-2 overflow-y-auto">
                {cartItems.map((c) => (
                  <li
                    key={c.item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[var(--cream)]">
                      {c.qty} × {c.item.name}
                    </span>
                    <span className="text-[var(--gold)]">
                      {formatFCFA(c.item.price * c.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom (optionnel)"
                className="mt-4 w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus:border-[var(--gold)] focus:outline-none"
              />

              <div className="mt-4 flex items-center justify-between border-t border-[var(--gold)]/15 pt-4">
                <span className="text-xs uppercase tracking-widest text-[var(--cream)]/60">
                  Total
                </span>
                <span className="font-serif-brand text-2xl text-[var(--gold)]">
                  {formatFCFA(total)}
                </span>
              </div>

              <button
                onClick={submit}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-3.5 text-sm font-medium uppercase tracking-widest text-[var(--charcoal)]"
              >
                <Send size={14} /> Envoyer la commande
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden opacity-30">
      <svg
        viewBox="0 0 1440 320"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C240,260 480,40 720,160 C960,280 1200,40 1440,160 L1440,320 L0,320 Z"
          fill="rgba(200,165,87,0.15)"
        />
        <path
          d="M0,200 C240,300 480,80 720,200 C960,320 1200,80 1440,200 L1440,320 L0,320 Z"
          fill="rgba(10,46,74,0.5)"
        />
      </svg>
    </div>
  );
}
