import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  X,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { Reveal } from "@/components/laplaya/PageTransition";
import { GoldButton } from "@/components/laplaya/buttons";
import { ROOMS, type Room } from "@/lib/laplaya/data";
import { formatFCFA, sendWhatsApp } from "@/lib/laplaya/constants";

const AMENITY_ICONS = { Wifi, Wind, Tv, Coffee, Bath } as const;
const FILTERS = ["Tous", "Vue Mer", "Vue Jardin", "Suite", "Cabane", "Disponibles"] as const;

export const Route = createFileRoute("/sejours")({
  head: () => ({
    meta: [
      { title: "Séjours & Hébergements — La Playa" },
      {
        name: "description",
        content:
          "Suites vue mer, bungalows romantiques, cabanes premium plage — découvrez nos hébergements d'exception.",
      },
      { property: "og:title", content: "Séjours — La Playa Beach Resort" },
      {
        property: "og:description",
        content: "Du bungalow intime à la suite vue mer, trouvez votre havre de paix.",
      },
      { property: "og:url", content: "/sejours" },
    ],
    links: [{ rel: "canonical", href: "/sejours" }],
  }),
  component: SejoursPage,
});

function SejoursPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tous");
  const [openRoom, setOpenRoom] = useState<Room | null>(null);

  const rooms = useMemo(() => {
    return ROOMS.filter((r) => {
      if (filter === "Tous") return true;
      if (filter === "Vue Mer") return r.view === "mer";
      if (filter === "Vue Jardin") return r.view === "jardin";
      if (filter === "Suite") return r.type === "suite";
      if (filter === "Cabane") return r.type === "cabane" || r.type === "bungalow";
      if (filter === "Disponibles") return r.available;
      return true;
    });
  }, [filter]);

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
        label="Hébergements"
        title="Nos Séjours"
        subtitle="Du bungalow intime à la suite vue mer — trouvez votre havre de paix."
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
                    : "border-[var(--gold)]/30 text-[var(--cream)]/70 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <Reveal key={room.id} delay={i * 0.05}>
                <article className="group overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_20px_40px_rgba(200,165,87,0.15)]">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-[var(--charcoal)]/80 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          room.available ? "bg-emerald-400" : "bg-[var(--coral)]"
                        }`}
                      />
                      <span className="text-[var(--cream)]/85">
                        {room.available ? "Disponible" : "Complet"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif-brand text-2xl text-[var(--gold)]">{room.name}</h3>
                    <p className="mt-2 text-sm text-[var(--cream)]/70">{room.description}</p>
                    <div className="mt-4 flex gap-3 text-[var(--gold)]/70">
                      {room.amenities.map((a) => {
                        const Ico = AMENITY_ICONS[a as keyof typeof AMENITY_ICONS];
                        return Ico ? <Ico key={a} size={16} /> : null;
                      })}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--gold)]/10 pt-4">
                      <p className="font-serif-brand text-xl text-[var(--gold)]">
                        {formatFCFA(room.price)}
                        <span className="ml-1 text-xs uppercase tracking-widest text-[var(--cream)]/50">
                          / nuit
                        </span>
                      </p>
                      <GoldButton
                        disabled={!room.available}
                        onClick={() => setOpenRoom(room)}
                        className="!px-5 !py-2.5"
                      >
                        Réserver
                      </GoldButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RoomModal room={openRoom} onClose={() => setOpenRoom(null)} />
    </PublicLayout>
  );
}

function RoomModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!room) return;
    const msg = `Demande de Réservation - La Playa Beach Resort\nChambre: ${room.name}\nNom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nArrivée: ${form.checkIn} | Départ: ${form.checkOut}\nPersonnes: ${form.guests}\nDemandes spéciales: ${form.notes || "Aucune"}\nMerci de confirmer ma disponibilité.`;
    sendWhatsApp(msg);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {room && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="fixed inset-x-4 top-[5%] z-[90] mx-auto max-w-4xl rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 lg:top-[8%]"
            style={{ maxHeight: "90vh" }}
          >
            <div className="flex max-h-[90vh] flex-col overflow-y-auto">
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt=""
                  className="h-56 w-full object-cover md:h-72"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full bg-[var(--charcoal)]/80 p-2 text-[var(--gold)] backdrop-blur"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 lg:p-10">
                {sent ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <CheckCircle2 size={56} className="text-[var(--gold)]" />
                    <h3 className="font-serif-brand mt-4 text-2xl text-[var(--cream)]">
                      Demande envoyée
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-[var(--cream)]/70">
                      Votre demande a été transmise via WhatsApp. Notre équipe vous
                      répondra sous 24h.
                    </p>
                    <GoldButton onClick={onClose} className="mt-6">
                      Fermer
                    </GoldButton>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif-brand text-3xl text-[var(--gold)]">
                      {room.name}
                    </h3>
                    <p className="mt-2 text-[var(--cream)]/75">{room.description}</p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {room.images.map((img) => (
                        <img
                          key={img}
                          src={img}
                          alt=""
                          loading="lazy"
                          className="h-20 w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                      <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                      <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                      <Field label="Personnes" type="number" value={form.guests} onChange={(v) => setForm({ ...form, guests: v })} />
                      <Field label="Arrivée" type="date" value={form.checkIn} onChange={(v) => setForm({ ...form, checkIn: v })} />
                      <Field label="Départ" type="date" value={form.checkOut} onChange={(v) => setForm({ ...form, checkOut: v })} />
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
                          Demandes spéciales
                        </label>
                        <textarea
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          rows={3}
                          className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[var(--gold)]/10 pt-6">
                      <p className="font-serif-brand text-2xl text-[var(--gold)]">
                        {formatFCFA(room.price)}
                        <span className="ml-1 text-xs uppercase tracking-widest text-[var(--cream)]/50">
                          / nuit
                        </span>
                      </p>
                      <GoldButton onClick={submit}>
                        <MessageCircle size={16} /> Confirmer via WhatsApp
                      </GoldButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}