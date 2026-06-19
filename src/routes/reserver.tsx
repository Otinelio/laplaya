import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BedDouble,
  Utensils,
  Umbrella,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { PublicLayout } from "@/components/laplaya/Layout";
import { Hero } from "@/components/laplaya/Hero";
import { GoldButton } from "@/components/laplaya/buttons";
import { sendWhatsApp } from "@/lib/laplaya/constants";

type Tab = "sejour" | "restaurant" | "cabane";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réservation — La Playa" },
      {
        name: "description",
        content:
          "Réservez votre séjour, votre table ou votre cabane à La Playa.",
      },
      { property: "og:title", content: "Réservation — La Playa" },
      {
        property: "og:description",
        content: "Trois expériences, une signature.",
      },
      { property: "og:url", content: "/reserver" },
    ],
    links: [{ rel: "canonical", href: "/reserver" }],
  }),
  component: ReserverPage,
});

function ReserverPage() {
  const [tab, setTab] = useState<Tab>("sejour");
  const [sent, setSent] = useState(false);

  return (
    <PublicLayout>
      <Hero
        image="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80"
        label="Réservation"
        title="Réserver"
        subtitle="Choisissez votre expérience La Playa."
        height="min-h-[50vh]"
      />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-3xl">
          {sent ? (
            <div className="flex flex-col items-center rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-10 text-center">
              <CheckCircle2 size={64} className="text-[var(--gold)]" />
              <h2 className="font-serif-brand mt-4 text-3xl text-[var(--cream)]">
                Votre demande a été envoyée
              </h2>
              <p className="mt-3 max-w-md text-[var(--cream)]/70">
                Notre équipe vous contactera sous 24h pour finaliser votre
                réservation.
              </p>
              <GoldButton onClick={() => setSent(false)} className="mt-8">
                Nouvelle demande
              </GoldButton>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--card)] p-1.5">
                {[
                  { id: "sejour", label: "Séjour", icon: BedDouble },
                  { id: "restaurant", label: "Restaurant", icon: Utensils },
                  { id: "cabane", label: "Cabane / Plage", icon: Umbrella },
                ].map((t) => {
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id as Tab)}
                      className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs uppercase tracking-widest transition-all ${
                        active
                          ? "bg-[var(--gold)] text-[var(--charcoal)]"
                          : "text-[var(--cream)]/70 hover:text-[var(--gold)]"
                      }`}
                    >
                      <t.icon size={14} />
                      <span className="hidden sm:inline">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-8">
                {tab === "sejour" && (
                  <SejourForm onSent={() => setSent(true)} />
                )}
                {tab === "restaurant" && (
                  <RestaurantForm onSent={() => setSent(true)} />
                )}
                {tab === "cabane" && (
                  <CabaneForm onSent={() => setSent(true)} />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
        {label}
        {required && <span className="ml-1 text-[var(--coral)]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}

function SejourForm({ onSent }: { onSent: () => void }) {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "Suite Prestige Vue Mer",
    notes: "",
  });
  const ok = f.name && f.phone && f.checkIn && f.checkOut;
  const submit = () => {
    if (!ok) return;
    sendWhatsApp(
      `Demande de Séjour - La Playa Beach Resort\nNom: ${f.name}\nEmail: ${f.email}\nTéléphone: ${f.phone}\nType: ${f.roomType}\nArrivée: ${f.checkIn} | Départ: ${f.checkOut}\nPersonnes: ${f.guests}\nDemandes spéciales: ${f.notes || "Aucune"}\nMerci de confirmer ma disponibilité.`,
    );
    onSent();
  };
  return (
    <div className="space-y-4">
      <h3 className="font-serif-brand text-xl text-[var(--gold)]">
        Séjour & Hébergement
      </h3>
      <Field
        label="Nom"
        required
        value={f.name}
        onChange={(v) => setF({ ...f, name: v })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          value={f.email}
          onChange={(v) => setF({ ...f, email: v })}
        />
        <Field
          label="Téléphone"
          required
          value={f.phone}
          onChange={(v) => setF({ ...f, phone: v })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Arrivée"
          required
          type="date"
          value={f.checkIn}
          onChange={(v) => setF({ ...f, checkIn: v })}
        />
        <Field
          label="Départ"
          required
          type="date"
          value={f.checkOut}
          onChange={(v) => setF({ ...f, checkOut: v })}
        />
        <Field
          label="Personnes"
          type="number"
          value={f.guests}
          onChange={(v) => setF({ ...f, guests: v })}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
          Type de chambre
        </label>
        <select
          value={f.roomType}
          onChange={(e) => setF({ ...f, roomType: e.target.value })}
          className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
        >
          <option>Suite Prestige Vue Mer</option>
          <option>Chambre Deluxe Vue Jardin</option>
          <option>Bungalow Romantique</option>
          <option>Suite Familiale</option>
          <option>Cabane Premium Plage</option>
          <option>Chambre Standard</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
          Demandes spéciales
        </label>
        <textarea
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-3 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
        />
      </div>
      <GoldButton onClick={submit} disabled={!ok} className="w-full">
        <MessageCircle size={16} /> Envoyer via WhatsApp
      </GoldButton>
    </div>
  );
}

function RestaurantForm({ onSent }: { onSent: () => void }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    date: "",
    time: "20:00",
    guests: "2",
    occasion: "",
  });
  const ok = f.name && f.phone && f.date;
  const submit = () => {
    if (!ok) return;
    sendWhatsApp(
      `Réservation Restaurant - La Playa Beach Resort\nNom: ${f.name}\nTéléphone: ${f.phone}\nDate: ${f.date} à ${f.time}\nPersonnes: ${f.guests}\nOccasion: ${f.occasion || "—"}\nMerci de confirmer la table.`,
    );
    onSent();
  };
  return (
    <div className="space-y-4">
      <h3 className="font-serif-brand text-xl text-[var(--gold)]">
        Restaurant & Table
      </h3>
      <Field
        label="Nom"
        required
        value={f.name}
        onChange={(v) => setF({ ...f, name: v })}
      />
      <Field
        label="Téléphone"
        required
        value={f.phone}
        onChange={(v) => setF({ ...f, phone: v })}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Date"
          required
          type="date"
          value={f.date}
          onChange={(v) => setF({ ...f, date: v })}
        />
        <Field
          label="Heure"
          type="time"
          value={f.time}
          onChange={(v) => setF({ ...f, time: v })}
        />
        <Field
          label="Personnes"
          type="number"
          value={f.guests}
          onChange={(v) => setF({ ...f, guests: v })}
        />
      </div>
      <Field
        label="Occasion (anniversaire, romantique...)"
        value={f.occasion}
        onChange={(v) => setF({ ...f, occasion: v })}
      />
      <GoldButton onClick={submit} disabled={!ok} className="w-full">
        <MessageCircle size={16} /> Envoyer via WhatsApp
      </GoldButton>
    </div>
  );
}

function CabaneForm({ onSent }: { onSent: () => void }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    date: "",
    spot: "Cabane",
    guests: "2",
  });
  const ok = f.name && f.phone && f.date;
  const submit = () => {
    if (!ok) return;
    sendWhatsApp(
      `Réservation Cabane / Transat - La Playa Beach Resort\nNom: ${f.name}\nTéléphone: ${f.phone}\nDate: ${f.date}\nType: ${f.spot}\nPersonnes: ${f.guests}\nMerci de confirmer la disponibilité.`,
    );
    onSent();
  };
  return (
    <div className="space-y-4">
      <h3 className="font-serif-brand text-xl text-[var(--gold)]">
        Cabane / Transat Plage
      </h3>
      <Field
        label="Nom"
        required
        value={f.name}
        onChange={(v) => setF({ ...f, name: v })}
      />
      <Field
        label="Téléphone"
        required
        value={f.phone}
        onChange={(v) => setF({ ...f, phone: v })}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Date"
          required
          type="date"
          value={f.date}
          onChange={(v) => setF({ ...f, date: v })}
        />
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">
            Type
          </label>
          <select
            value={f.spot}
            onChange={(e) => setF({ ...f, spot: e.target.value })}
            className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
          >
            <option>Cabane</option>
            <option>Transat</option>
            <option>Table plage</option>
          </select>
        </div>
        <Field
          label="Personnes"
          type="number"
          value={f.guests}
          onChange={(v) => setF({ ...f, guests: v })}
        />
      </div>
      <GoldButton onClick={submit} disabled={!ok} className="w-full">
        <MessageCircle size={16} /> Envoyer via WhatsApp
      </GoldButton>
    </div>
  );
}
