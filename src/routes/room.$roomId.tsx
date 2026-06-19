import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Minus,
  ShoppingBag,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Map,
  Star,
  Utensils,
  ArrowLeft,
} from "lucide-react";
import { MENU, MENU_CATEGORIES } from "@/lib/laplaya/data";
import { addOrder, type Order, useAdmin } from "@/lib/laplaya/stores";
import { formatFCFA } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/room/$roomId")({
  head: () => ({
    meta: [
      { title: "Conciergerie — La Playa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  const { roomId } = Route.useParams();
  const isTable = /^T\d+$/i.test(roomId);
  const placeLabel = isTable
    ? `Table ${roomId.replace(/^T/i, "")}`
    : `Chambre ${roomId}`;

  const [view, setView] = useState<"home" | "menu" | "review" | "success">(
    "home",
  );
  const { whatsappNumber } = useAdmin();

  const handleWhatsApp = (action: string) => {
    const text = `Bonjour, je suis à la ${placeLabel}. Je souhaite : ${action}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  if (view === "home") {
    return (
      <div className="relative min-h-screen bg-[var(--charcoal)] pb-32 text-[var(--cream)] px-5 pt-8 flex flex-col">
        <header className="text-center mb-10">
          <p className="font-serif-brand text-2xl tracking-wider text-[var(--gold)]">
            La Playa
          </p>
          <div className="mt-3 inline-block rounded-full border border-[var(--gold)]/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--gold)]">
            {placeLabel}
          </div>
          <h1 className="font-serif-brand mt-6 text-3xl text-[var(--cream)]">
            Conciergerie{" "}
            <span className="italic text-gold-gradient">Digitale</span>
          </h1>
        </header>

        <div className="space-y-4 max-w-sm mx-auto w-full">
          <button
            onClick={() => setView("menu")}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-5 hover:bg-[var(--gold)]/5 transition-all text-left"
          >
            <div className="rounded-full bg-[var(--gold)]/10 p-3 text-[var(--gold)]">
              <Utensils size={24} />
            </div>
            <div>
              <p className="font-serif-brand text-lg text-[var(--gold)]">
                Commander au restaurant
              </p>
              <p className="text-xs text-[var(--cream)]/60">
                Menu, boissons et service en chambre
              </p>
            </div>
          </button>

          {!isTable && (
            <button
              onClick={() => handleWhatsApp("Demander le ménage")}
              className="flex w-full items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-5 hover:bg-[var(--gold)]/5 transition-all text-left"
            >
              <div className="rounded-full bg-[var(--gold)]/10 p-3 text-[var(--gold)]">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="font-serif-brand text-lg text-[var(--gold)]">
                  Demander le ménage
                </p>
                <p className="text-xs text-[var(--cream)]/60">
                  Service de nettoyage en chambre
                </p>
              </div>
            </button>
          )}

          <button
            onClick={() => handleWhatsApp("Signaler un problème")}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-5 hover:bg-[var(--gold)]/5 transition-all text-left"
          >
            <div className="rounded-full bg-[var(--gold)]/10 p-3 text-[var(--gold)]">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="font-serif-brand text-lg text-[var(--gold)]">
                Signaler un problème
              </p>
              <p className="text-xs text-[var(--cream)]/60">
                Une assistance immédiate
              </p>
            </div>
          </button>

          <button
            onClick={() =>
              handleWhatsApp("Avoir des recommandations (Guide & Reco)")
            }
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-5 hover:bg-[var(--gold)]/5 transition-all text-left"
          >
            <div className="rounded-full bg-[var(--gold)]/10 p-3 text-[var(--gold)]">
              <Map size={24} />
            </div>
            <div>
              <p className="font-serif-brand text-lg text-[var(--gold)]">
                Guide & Reco
              </p>
              <p className="text-xs text-[var(--cream)]/60">
                Activités et lieux à visiter
              </p>
            </div>
          </button>

          <button
            onClick={() => setView("review")}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-5 hover:bg-[var(--gold)]/5 transition-all text-left"
          >
            <div className="rounded-full bg-[var(--gold)]/10 p-3 text-[var(--gold)]">
              <Star size={24} />
            </div>
            <div>
              <p className="font-serif-brand text-lg text-[var(--gold)]">
                Laisser un avis
              </p>
              <p className="text-xs text-[var(--cream)]/60">
                Partagez votre expérience
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (view === "review") {
    return (
      <ReviewView
        onBack={() => setView("home")}
        placeLabel={placeLabel}
        onSuccess={() => setView("success")}
      />
    );
  }

  if (view === "success") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--charcoal)] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <CheckCircle2 size={80} className="mx-auto text-[var(--gold)]" />
          <h2 className="font-serif-brand mt-6 text-3xl text-[var(--cream)]">
            Merci !
          </h2>
          <p className="mt-3 max-w-sm text-[var(--cream)]/70">
            Votre demande a été traitée avec succès.
          </p>
          <button
            onClick={() => setView("home")}
            className="mt-8 rounded-full border border-[var(--gold)] px-6 py-3 text-xs uppercase tracking-widest text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <MenuView
      onBack={() => setView("home")}
      roomId={roomId}
      placeLabel={placeLabel}
      whatsappNumber={whatsappNumber}
      onSuccess={() => setView("success")}
    />
  );
}

function ReviewView({
  onBack,
  placeLabel,
  onSuccess,
}: {
  onBack: () => void;
  placeLabel: string;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    // Dans une vraie app, on envoie sur Supabase
    console.log("Review submitted", { placeLabel, rating, comment });
    onSuccess();
  };

  return (
    <div className="relative min-h-screen bg-[var(--charcoal)] px-5 pt-8 text-[var(--cream)]">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-[var(--gold)]"
      >
        <ArrowLeft size={16} /> Retour
      </button>
      <h2 className="font-serif-brand text-2xl text-[var(--gold)] mb-6">
        Laisser un avis
      </h2>

      <div className="space-y-6 max-w-sm mx-auto">
        <div>
          <label className="mb-2 block text-sm text-[var(--cream)]/80">
            Note
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 transition-colors ${rating >= star ? "text-[var(--gold)]" : "text-[var(--cream)]/20"}`}
              >
                <Star
                  size={32}
                  fill={rating >= star ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[var(--cream)]/80">
            Commentaire
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 rounded-lg border border-[var(--gold)]/20 bg-[var(--card)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
            placeholder="Racontez-nous votre expérience..."
          />
        </div>

        <button
          onClick={submitReview}
          className="w-full rounded-full bg-[var(--gold)] py-3.5 text-sm font-medium uppercase tracking-widest text-[var(--charcoal)] hover:bg-[var(--gold)]/80 transition-colors"
        >
          Envoyer mon avis
        </button>
      </div>
    </div>
  );
}

function MenuView({
  onBack,
  roomId,
  placeLabel,
  whatsappNumber,
  onSuccess,
}: {
  onBack: () => void;
  roomId: string;
  placeLabel: string;
  whatsappNumber: string;
  onSuccess: () => void;
}) {
  const [cat, setCat] =
    useState<(typeof MENU_CATEGORIES)[number]["id"]>("cocktails");
  const [items, setItems] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

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
      spotId: roomId,
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

    // WhatsApp
    const orderDetails = cartItems
      .map((c) => `- ${c.qty}x ${c.item.name}`)
      .join("\n");
    const text = `Nouvelle commande depuis ${placeLabel}\nClient: ${name || "Invité"}\n\nDétails:\n${orderDetails}\n\nTotal: ${formatFCFA(total)}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    onSuccess();
  };

  return (
    <div className="relative min-h-screen bg-[var(--charcoal)] pb-32 text-[var(--cream)]">
      <header className="relative z-10 px-5 pt-8 text-center">
        <button
          onClick={onBack}
          className="absolute left-5 top-8 flex items-center gap-2 text-sm text-[var(--gold)]"
        >
          <ArrowLeft size={16} /> Retour
        </button>
        <p className="font-serif-brand text-2xl tracking-wider text-[var(--gold)] mt-10 sm:mt-0">
          La Playa
        </p>
        <div className="mt-3 inline-block rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--charcoal)]">
          {placeLabel}
        </div>
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

      <div className="relative z-10 mt-4 space-y-3 px-5 max-w-lg mx-auto">
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
                >
                  <Minus size={14} />
                </button>
                <span className="w-5 text-center text-sm">{items[m.id]}</span>
                <button
                  onClick={() => add(m.id)}
                  className="rounded-full bg-[var(--gold)] p-1.5 text-[var(--charcoal)]"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => add(m.id)}
                className="rounded-full bg-[var(--gold)] p-2 text-[var(--charcoal)]"
              >
                <Plus size={16} />
              </button>
            )}
          </article>
        ))}
      </div>

      {totalQty > 0 && (
        <motion.button
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-lg z-30 flex items-center justify-between rounded-full bg-[var(--gold)] px-6 py-4 text-[var(--charcoal)] shadow-[0_10px_40px_rgba(200,165,87,0.4)]"
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
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-[var(--gold)]/30 bg-[var(--card)] p-6 max-w-lg mx-auto"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[var(--gold)]/40" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif-brand text-xl text-[var(--gold)]">
                  Votre commande
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)]"
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
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-3.5 text-sm font-medium uppercase tracking-widest text-[var(--charcoal)] hover:bg-[var(--gold)]/80 transition-colors"
              >
                <Send size={14} /> Envoyer via WhatsApp
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
