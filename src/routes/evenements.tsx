import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, X, MessageCircle, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { Reveal } from "@/components/laplaya/PageTransition";
import { GoldButton } from "@/components/laplaya/buttons";
import { GoldDivider, SectionLabel } from "@/components/laplaya/GoldDivider";
import { EVENTS, type EventItem } from "@/lib/laplaya/data";
import { sendWhatsApp } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements & Soirées — La Playa" },
      {
        name: "description",
        content: "DJ sets, soirées à thème, brunch dominical, privatisations.",
      },
      { property: "og:title", content: "Événements — La Playa" },
      {
        property: "og:description",
        content: "Soirées d'exception en bord de mer.",
      },
      { property: "og:url", content: "/evenements" },
    ],
    links: [{ rel: "canonical", href: "/evenements" }],
  }),
  component: EvenementsPage,
});

function EvenementsPage() {
  const [openEvent, setOpenEvent] = useState<EventItem | null>(null);

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
        label="Agenda"
        title="Événements & Soirées"
        subtitle="DJ sets, soirées à thème, privatisations, couchers de soleil."
      />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] transition-all hover:-translate-y-1 hover:border-[var(--gold)]/40">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--charcoal)]">
                    {ev.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--gold)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {ev.date}
                    </span>
                  </div>
                  <h3 className="font-serif-brand mt-3 text-xl text-[var(--cream)]">
                    {ev.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--cream)]/70">
                    {ev.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--gold)]/10 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-[var(--cream)]/70">
                      <Clock size={14} className="text-[var(--gold)]" />{" "}
                      {ev.time}
                    </span>
                    <span className="text-[var(--gold)]">{ev.price}</span>
                  </div>
                  <GoldButton
                    onClick={() => setOpenEvent(ev)}
                    className="mt-5 w-full"
                  >
                    S'inscrire
                  </GoldButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,var(--ocean),var(--charcoal))] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <SectionLabel>Privatisation</SectionLabel>
              <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
                Privatisez La Playa <br />
                <span className="text-gold-gradient italic">
                  pour votre événement
                </span>
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mx-auto mt-6 max-w-2xl text-[var(--cream)]/75">
                Anniversaires, mariages, séminaires d'entreprise, soirées
                privées — notre équipe conçoit avec vous un événement à votre
                image.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=900&q=80",
            ].map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-72 w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <GoldButton
              onClick={() =>
                sendWhatsApp(
                  "Demande de Privatisation - La Playa Beach Resort\nBonjour, je souhaiterais obtenir un devis pour la privatisation de La Playa.\nMerci de me recontacter.",
                )
              }
            >
              <MessageCircle size={16} /> Demander un devis
            </GoldButton>
          </div>
        </div>
      </section>

      <RSVPModal event={openEvent} onClose={() => setOpenEvent(null)} />
    </PublicLayout>
  );
}

function RSVPModal({
  event,
  onClose,
}: {
  event: EventItem | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
  });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!event) return;
    const msg = `Inscription Événement - La Playa Beach Resort\nÉvénement: ${event.title}\nDate: ${event.date}\nNom: ${form.name} | Téléphone: ${form.phone}\nEmail: ${form.email}\nNombre de personnes: ${form.guests}\nMerci de confirmer ma participation.`;
    sendWhatsApp(msg);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {event && (
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
            className="fixed inset-x-4 top-[10%] z-[90] mx-auto max-w-lg rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-8 shadow-2xl md:left-1/2 md:-translate-x-1/2"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)]"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 size={48} className="text-[var(--gold)]" />
                <h3 className="font-serif-brand mt-4 text-2xl text-[var(--cream)]">
                  Inscription envoyée
                </h3>
                <p className="mt-2 text-sm text-[var(--cream)]/70">
                  Nous reviendrons vers vous très vite.
                </p>
                <GoldButton onClick={onClose} className="mt-6">
                  Fermer
                </GoldButton>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
                  {event.category}
                </p>
                <h3 className="font-serif-brand mt-2 text-2xl text-[var(--cream)]">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--cream)]/70">
                  {event.date} · {event.time}
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { k: "name", l: "Nom complet" },
                    { k: "email", l: "Email", t: "email" },
                    { k: "phone", l: "Téléphone" },
                    { k: "guests", l: "Nombre de personnes", t: "number" },
                  ].map(({ k, l, t }) => (
                    <div key={k}>
                      <label className="mb-1 block text-xs uppercase tracking-widest text-[var(--gold)]">
                        {l}
                      </label>
                      <input
                        type={t ?? "text"}
                        value={form[k as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [k]: e.target.value })
                        }
                        className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                <GoldButton onClick={submit} className="mt-6 w-full">
                  <MessageCircle size={16} /> Confirmer via WhatsApp
                </GoldButton>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
