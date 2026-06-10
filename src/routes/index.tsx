import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Anchor,
  Utensils,
  Calendar,
  ChevronDown,
  ZoomIn,
  Quote,
  Star,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Reveal } from "@/components/laplaya/PageTransition";
import { GoldDivider, SectionLabel } from "@/components/laplaya/GoldDivider";
import { LinkButton, GoldButton } from "@/components/laplaya/buttons";
import { Counter } from "@/components/laplaya/Counter";
import { TESTIMONIALS, EVENTS, GALLERY } from "@/lib/laplaya/data";
import { sendWhatsApp } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Playa Beach Resort & Lounge — L'art de vivre au bord de la mer" },
      {
        name: "description",
        content:
          "Resort, restaurant et lounge premium en bord de mer. Cabanes, suites, gastronomie raffinée et soirées d'exception.",
      },
      { property: "og:title", content: "La Playa Beach Resort & Lounge" },
      {
        property: "og:description",
        content: "Resort, restaurant et lounge premium en bord de mer.",
      },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

function HomePage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,46,74,0.45)_0%,rgba(26,26,26,0.85)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-xs uppercase tracking-[0.5em] text-[var(--gold)]"
            >
              Bienvenue à La Playa
            </motion.p>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
              className="font-serif-brand max-w-4xl text-5xl leading-[1.05] text-[var(--cream)] sm:text-6xl lg:text-8xl"
            >
              L'Art de Vivre <br />
              <span className="text-gold-gradient italic">au Bord de la Mer</span>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="mt-8 max-w-2xl text-base text-[var(--cream)]/80 lg:text-lg"
            >
              Resort · Restaurant · Lounge — Une expérience premium en bord de mer,
              entre élégance tropicale et art de vivre raffiné.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <LinkButton to="/reserver">Réserver un Séjour</LinkButton>
              <LinkButton to="/restaurant" variant="ghost">
                Voir le Menu
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave SVG */}
        <svg
          className="absolute bottom-0 left-0 right-0 z-10 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: 60 }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="rgba(200,165,87,0.18)"
          />
        </svg>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-[var(--gold)]"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Quick Access */}
      <section className="relative -mt-20 z-20 px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: Anchor, label: "Réserver une Cabane", to: "/reserver" },
            { icon: Utensils, label: "Voir la Carte", to: "/restaurant" },
            { icon: Calendar, label: "Événements à Venir", to: "/evenements" },
          ].map(({ icon: Icon, label, to }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <Link
                to={to}
                className="glass-card group flex items-center gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(200,165,87,0.2)]"
              >
                <div className="rounded-full border border-[var(--gold)]/40 p-3 text-[var(--gold)] transition-colors group-hover:bg-[var(--gold)] group-hover:text-[var(--charcoal)]">
                  <Icon size={20} />
                </div>
                <span className="font-serif-brand text-lg text-[var(--cream)] group-hover:text-[var(--gold)]">
                  {label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expérience */}
      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
                alt="Resort La Playa"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/20" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionLabel>L'Expérience La Playa</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
              Une escapade <br />
              <span className="text-gold-gradient italic">au paradis</span>
            </h2>
            <GoldDivider className="my-8 !mx-0" />
            <p className="text-[var(--cream)]/75 leading-relaxed">
              Niché entre océan et palmeraie, La Playa réinvente l'art de l'évasion
              tropicale. Nos suites et cabanes confidentielles vous invitent à un
              séjour rare, ponctué de couchers de soleil flamboyants, de cocktails
              signature et d'une gastronomie iodée.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--gold)]/15 pt-8">
              {[
                { n: 12, l: "Cabanes & Suites" },
                { n: 50, l: "Cocktails signature", suffix: "+" },
                { n: 5, l: "Années d'excellence" },
              ].map((s) => (
                <div key={s.l}>
                  <Counter to={s.n} suffix={s.suffix ?? ""} />
                  <p className="mt-2 text-xs uppercase tracking-widest text-[var(--cream)]/60">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <LinkButton to="/sejours" variant="ghost">
                Découvrir nos Séjours
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nos Univers */}
      <section className="bg-[var(--charcoal)] px-6 py-24 lg:px-10">
        <Reveal>
          <div className="text-center">
            <SectionLabel>Nos Univers</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
              Trois mondes, <span className="italic text-gold-gradient">une signature</span>
            </h2>
            <GoldDivider className="mt-6" />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Séjours & Hébergements",
              to: "/sejours",
              img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
            },
            {
              title: "Restaurant & Bar",
              to: "/restaurant",
              img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80",
            },
            {
              title: "Événements & Soirées",
              to: "/evenements",
              img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
            },
          ].map((u, i) => (
            <Reveal key={u.title} delay={i * 0.1}>
              <Link
                to={u.to}
                className="group relative block h-[460px] overflow-hidden rounded-2xl"
              >
                <img
                  src={u.img}
                  alt={u.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-serif-brand text-2xl text-[var(--cream)]">{u.title}</h3>
                  <div className="mt-3 h-0.5 w-10 bg-[var(--gold)] transition-all duration-500 group-hover:w-24" />
                  <p className="mt-3 text-sm uppercase tracking-widest text-[var(--gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Découvrir →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Réservation Rapide */}
      <QuickReservation />

      {/* Événements à Venir */}
      <section className="px-6 py-24 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>Agenda</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
              Événements à venir
            </h2>
            <GoldDivider className="mt-6" />
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
          {EVENTS.slice(0, 3).map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] transition-all hover:-translate-y-1 hover:border-[var(--gold)]/40">
                <div className="relative h-48 overflow-hidden">
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
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
                    {ev.date}
                  </p>
                  <h3 className="font-serif-brand mt-2 text-xl text-[var(--cream)]">
                    {ev.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--cream)]/70">{ev.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton to="/evenements" variant="ghost">
            Voir tous les événements
          </LinkButton>
        </div>
      </section>

      {/* Galerie Preview */}
      <section className="bg-[var(--charcoal)] px-6 py-24 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>Galerie</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
              Instants suspendus
            </h2>
            <GoldDivider className="mt-6" />
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {GALLERY.slice(0, 6).map((g, i) => (
            <Link
              key={g.id}
              to="/galerie"
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={g.src}
                alt=""
                loading="lazy"
                className="h-full min-h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--charcoal)]/0 opacity-0 transition-all group-hover:bg-[var(--charcoal)]/50 group-hover:opacity-100">
                <ZoomIn size={28} className="text-[var(--gold)]" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton to="/galerie" variant="ghost">
            Voir la galerie complète
          </LinkButton>
        </div>
      </section>

      {/* Témoignages */}
      <section className="px-6 py-24 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>Témoignages</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-4xl text-[var(--cream)] lg:text-5xl">
              Ils ont vécu La Playa
            </h2>
            <GoldDivider className="mt-6" />
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="relative rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-8">
                <Quote size={32} className="text-[var(--gold)]/30" />
                <p className="font-display-brand mt-4 text-lg italic text-[var(--cream)]/85">
                  « {t.quote} »
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--gold)]/10 pt-4">
                  <div>
                    <p className="text-sm text-[var(--cream)]">{t.name}</p>
                    <p className="text-xs uppercase tracking-widest text-[var(--cream)]/50">
                      {t.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={14} fill="currentColor" className="text-[var(--gold)]" />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

function QuickReservation() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [type, setType] = useState("Séjour");

  const submit = () => {
    if (!name || !date) return;
    const msg = `Nouvelle Réservation - La Playa Beach Resort\nNom: ${name}\nDate: ${date}\nNombre de personnes: ${guests}\nType: ${type}\nVeuillez confirmer ma réservation.`;
    sendWhatsApp(msg);
  };

  return (
    <section className="bg-[linear-gradient(135deg,var(--ocean),var(--charcoal))] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <SectionLabel>Réservation Express</SectionLabel>
            <h2 className="font-serif-brand mt-4 text-3xl text-[var(--cream)] lg:text-4xl">
              Réservez votre expérience
            </h2>
            <GoldDivider className="mt-6" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-[var(--gold)]/20 bg-[var(--charcoal)]/70 p-6 backdrop-blur lg:p-8">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_0.8fr_1fr_auto]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus:border-[var(--gold)] focus:outline-none"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
              />
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
              >
                <option>Séjour</option>
                <option>Restaurant</option>
                <option>Cabane</option>
              </select>
              <GoldButton onClick={submit}>
                <MessageCircle size={16} /> WhatsApp
              </GoldButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}