import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, X, LogOut, Clock } from "lucide-react";
import { PinPad } from "@/components/laplaya/PinModal";
import {
  loadOrders,
  updateOrderStatus,
  removeOrder,
  type Order,
  type OrderStatus,
  useAdmin,
} from "@/lib/laplaya/stores";
import { formatFCFA } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/reception")({
  head: () => ({
    meta: [
      { title: "Réception — La Playa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReceptionPage,
});

const COLUMNS: { id: OrderStatus; label: string; dot: string }[] = [
  { id: "En attente", label: "En attente", dot: "bg-amber-400" },
  { id: "En préparation", label: "En préparation", dot: "bg-sky-400" },
  { id: "Livré", label: "Livré", dot: "bg-emerald-400" },
];

function ReceptionPage() {
  const [unlocked, setUnlocked] = useState(false);
  const pin = useAdmin((s) => s.receptionPin);

  if (!unlocked) {
    return <PinPad expected={pin} onSuccess={() => setUnlocked(true)} title="Réception" />;
  }
  return <ReceptionDashboard onLogout={() => setUnlocked(false)} />;
}

function ReceptionDashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [now, setNow] = useState(new Date());
  const lastCount = useRef(0);

  useEffect(() => {
    const tick = () => {
      const o = loadOrders();
      if (o.filter((x) => x.status === "En attente").length > lastCount.current) {
        playChime();
      }
      lastCount.current = o.filter((x) => x.status === "En attente").length;
      setOrders(o);
      setNow(new Date());
    };
    tick();
    const id = setInterval(tick, 5000);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearInterval(id);
      clearInterval(t);
    };
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter((o) => o.time >= today.getTime());
  const revenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const activeSpots = new Set(orders.filter((o) => o.status !== "Livré").map((o) => o.spotId)).size;

  const advance = (o: Order) => {
    const next: OrderStatus =
      o.status === "En attente" ? "En préparation" : o.status === "En préparation" ? "Livré" : "Livré";
    updateOrderStatus(o.id, next);
    setOrders(loadOrders());
  };
  const setStatus = (id: string, s: OrderStatus) => {
    updateOrderStatus(id, s);
    setOrders(loadOrders());
  };

  return (
    <div className="min-h-screen bg-[var(--charcoal)] text-[var(--cream)]">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--gold)]/15 bg-[var(--charcoal)]/95 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <p className="font-serif-brand text-2xl text-[var(--gold)]">La Playa</p>
          <span className="hidden text-sm uppercase tracking-widest text-[var(--cream)]/60 md:inline">
            Réception
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-[var(--cream)]/70">
            <Clock size={14} className="text-[var(--gold)]" />
            {now.toLocaleTimeString("fr-FR")}
          </span>
          <button
            onClick={onLogout}
            className="rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)] hover:bg-[var(--gold)]/10"
            aria-label="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Commandes aujourd'hui" value={String(todayOrders.length)} />
          <Stat label="Recettes du jour" value={formatFCFA(revenue)} />
          <Stat label="Spots actifs" value={String(activeSpots)} />
          <Stat label="En attente" value={String(orders.filter((o) => o.status === "En attente").length)} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {COLUMNS.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.id);
            return (
              <div key={col.id} className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${col.dot}`} />
                    <h3 className="font-serif-brand text-lg text-[var(--cream)]">{col.label}</h3>
                  </div>
                  <span className="rounded-full bg-[var(--charcoal)] px-2.5 py-0.5 text-xs text-[var(--cream)]/70">
                    {colOrders.length}
                  </span>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {colOrders.map((o) => (
                      <motion.article
                        key={o.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="rounded-xl border border-[var(--gold)]/10 bg-[var(--charcoal)] p-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[var(--charcoal)]">
                            {o.spotId}
                          </span>
                          <span className="text-xs text-[var(--cream)]/50">{relTime(o.time)}</span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--cream)]">{o.name}</p>
                        <ul className="mt-2 space-y-0.5 text-xs text-[var(--cream)]/70">
                          {o.items.map((it, i) => (
                            <li key={i}>{it.qty} × {it.name}</li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center justify-between border-t border-[var(--gold)]/10 pt-3">
                          <span className="text-sm text-[var(--gold)]">{formatFCFA(o.total)}</span>
                          <div className="flex gap-1.5">
                            {col.id !== "Livré" && (
                              <button
                                onClick={() => advance(o)}
                                className="rounded-full border border-emerald-500/40 p-1.5 text-emerald-300 hover:bg-emerald-500/10"
                                aria-label="Avancer"
                              >
                                {col.id === "En attente" ? <Check size={14} /> : <Truck size={14} />}
                              </button>
                            )}
                            <button
                              onClick={() => {
                                removeOrder(o.id);
                                setOrders(loadOrders());
                              }}
                              className="rounded-full border border-[var(--coral)]/40 p-1.5 text-[var(--coral)] hover:bg-[var(--coral)]/10"
                              aria-label="Annuler"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                  {colOrders.length === 0 && (
                    <p className="py-6 text-center text-xs text-[var(--cream)]/40">Aucune commande</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-5">
      <p className="text-xs uppercase tracking-widest text-[var(--cream)]/60">{label}</p>
      <p className="font-serif-brand mt-2 text-2xl text-[var(--gold)]">{value}</p>
    </div>
  );
}

function relTime(t: number) {
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h} h`;
}

function playChime() {
  try {
    type WindowWithWebkit = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const w = window as WindowWithWebkit;
    const Ctx = window.AudioContext ?? w.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 660;
    o.type = "sine";
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  } catch {
    /* noop */
  }
}