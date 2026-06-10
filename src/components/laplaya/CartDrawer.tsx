import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, MessageCircle, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/laplaya/stores";
import { formatFCFA, sendWhatsApp } from "@/lib/laplaya/constants";
import { useState } from "react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, inc, dec, remove, clear, total } = useCart();
  const [note, setNote] = useState("");

  const submit = () => {
    if (items.length === 0) return;
    const lines = items
      .map((i) => `${i.qty} x ${i.item.name} — ${formatFCFA(i.item.price * i.qty)}`)
      .join("\n");
    const msg =
      `Commande Restaurant - La Playa Beach Resort\n\n${lines}\n--\nTotal: ${formatFCFA(
        total(),
      )}\nNom / Table: ${note || "Non précisé"}\nHeure de la commande: ${new Date().toLocaleTimeString("fr-FR")}`;
    sendWhatsApp(msg);
    clear();
    setNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-[var(--gold)]/20 bg-[var(--card)]"
          >
            <header className="flex items-center justify-between border-b border-[var(--gold)]/15 px-6 py-5">
              <h3 className="font-serif-brand text-xl text-[var(--gold)]">Votre Commande</h3>
              <button
                onClick={onClose}
                className="rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)]"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-12 text-center text-sm text-[var(--cream)]/60">
                  Votre panier est vide.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ item, qty }) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-[var(--gold)]/10 bg-[var(--charcoal)] p-3"
                    >
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-[var(--cream)]">{item.name}</p>
                        <p className="text-sm font-medium text-[var(--gold)]">
                          {formatFCFA(item.price * qty)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => dec(item.id)}
                            className="rounded-full border border-[var(--gold)]/30 p-1 text-[var(--gold)]"
                            aria-label="Diminuer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm text-[var(--cream)]">{qty}</span>
                          <button
                            onClick={() => inc(item.id)}
                            className="rounded-full border border-[var(--gold)]/30 p-1 text-[var(--gold)]"
                            aria-label="Augmenter"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => remove(item.id)}
                            className="ml-auto text-[var(--cream)]/40 hover:text-[var(--coral)]"
                            aria-label="Retirer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="space-y-3 border-t border-[var(--gold)]/15 p-6">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nom ou numéro de table"
                className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus:border-[var(--gold)] focus:outline-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-[var(--cream)]/60">
                  Total
                </span>
                <span className="font-serif-brand text-2xl text-[var(--gold)]">
                  {formatFCFA(total())}
                </span>
              </div>
              <button
                onClick={submit}
                disabled={items.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-3 text-sm font-medium uppercase tracking-widest text-[var(--charcoal)] transition-all hover:bg-[var(--gold-light)] disabled:opacity-40"
              >
                <MessageCircle size={16} />
                Commander via WhatsApp
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}