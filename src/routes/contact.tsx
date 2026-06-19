import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Car,
  ParkingSquare,
} from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { Reveal } from "@/components/laplaya/PageTransition";
import { GoldButton } from "@/components/laplaya/buttons";
import { BRAND, sendWhatsApp } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Accès — La Playa" },
      {
        name: "description",
        content:
          "Contactez La Playa : téléphone, WhatsApp, email, adresse et horaires.",
      },
      { property: "og:title", content: "Contact — La Playa" },
      {
        property: "og:description",
        content: "Nous contacter et nous trouver.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Information",
    message: "",
  });

  const submit = () => {
    const msg = `Message Contact - La Playa Beach Resort\nNom: ${form.name} | Email: ${form.email}\nTéléphone: ${form.phone}\nSujet: ${form.subject}\nMessage: ${form.message}`;
    sendWhatsApp(msg);
  };

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1920&q=80"
        label="Restez en contact"
        title="Nous Contacter"
        subtitle="Notre équipe vous répond avec soin."
        height="min-h-[50vh]"
      />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-8">
              <h2 className="font-serif-brand text-2xl text-[var(--gold)]">
                Le Resort
              </h2>
              <ul className="mt-6 space-y-5 text-sm text-[var(--cream)]/85">
                <Info icon={MapPin} label="Adresse" value={BRAND.address} />
                <Info icon={Phone} label="Téléphone" value={BRAND.phone} />
                <Info
                  icon={MessageCircle}
                  label="WhatsApp"
                  value={`+${BRAND.whatsapp}`}
                />
                <Info icon={Mail} label="Email" value={BRAND.email} />
                <li className="flex gap-4">
                  <Clock size={18} className="mt-1 text-[var(--gold)]" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
                      Horaires
                    </p>
                    <p className="mt-1">Déjeuner — {BRAND.hours.dejeuner}</p>
                    <p>Dîner — {BRAND.hours.diner}</p>
                    <p>Bar — {BRAND.hours.bar}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-3 border-t border-[var(--gold)]/10 pt-6">
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--gold)]/40 p-3 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={BRAND.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--gold)]/40 p-3 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-8">
              <h2 className="font-serif-brand text-2xl text-[var(--gold)]">
                Écrivez-nous
              </h2>
              <div className="mt-6 space-y-4">
                <Input
                  label="Nom"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <Input
                    label="Téléphone"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
                    Sujet
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                  >
                    <option>Réservation</option>
                    <option>Événement</option>
                    <option>Information</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
                <GoldButton onClick={submit} className="w-full">
                  <MessageCircle size={16} /> Envoyer via WhatsApp
                </GoldButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--charcoal)] px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-[var(--gold)]/15">
            <iframe
              title="La Playa Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=1.18,6.13,1.24,6.16&layer=mapnik"
              className="h-[400px] w-full grayscale-[0.4]"
              loading="lazy"
            />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Car,
                title: "En voiture",
                text: "Parking sécurisé gratuit sur place.",
              },
              {
                icon: MapPin,
                title: "En taxi",
                text: "Demandez « La Playa Beach Resort ».",
              },
              {
                icon: ParkingSquare,
                title: "Stationnement",
                text: "Voiturier disponible le soir.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-6 text-center"
              >
                <c.icon className="mx-auto text-[var(--gold)]" size={26} />
                <h3 className="font-serif-brand mt-3 text-lg text-[var(--cream)]">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--cream)]/65">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <li className="flex gap-4">
      <Icon size={18} className="mt-1 text-[var(--gold)]" />
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
          {label}
        </p>
        <p className="mt-1">{value}</p>
      </div>
    </li>
  );
}

function Input({
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
