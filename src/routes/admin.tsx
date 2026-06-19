import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  LayoutDashboard,
  Utensils,
  BedDouble,
  Calendar,
  BarChart3,
  Settings,
  Power,
  QrCode,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { PinPad } from "@/components/laplaya/PinModal";
import {
  loadOrders,
  useAdmin,
} from "@/lib/laplaya/stores";
import { MENU, ROOMS, EVENTS } from "@/lib/laplaya/data";
import { formatFCFA } from "@/lib/laplaya/constants";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — La Playa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Section = "dashboard" | "menu" | "rooms" | "events" | "history" | "qr" | "settings";

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const pin = useAdmin((s) => s.adminPin);

  if (!unlocked) return <PinPad expected={pin} onSuccess={() => setUnlocked(true)} title="Admin" />;
  return <AdminDashboard onLogout={() => setUnlocked(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");

  const items: { id: Section; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "rooms", label: "Chambres", icon: BedDouble },
    { id: "events", label: "Événements", icon: Calendar },
    { id: "history", label: "Historique", icon: BarChart3 },
    { id: "qr", label: "QR Codes", icon: QrCode },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--charcoal)] text-[var(--cream)]">
      <aside className="hidden w-60 flex-col border-r border-[var(--gold)]/15 bg-[var(--sidebar)] p-5 lg:flex">
        <p className="font-serif-brand mb-8 text-xl text-[var(--gold)]">La Playa Admin</p>
        <nav className="flex-1 space-y-1">
          {items.map((i) => {
            const active = section === i.id;
            return (
              <button
                key={i.id}
                onClick={() => setSection(i.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                    : "text-[var(--cream)]/70 hover:bg-[var(--gold)]/5 hover:text-[var(--gold)]"
                }`}
              >
                <i.icon size={16} />
                {i.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={onLogout}
          className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--gold)]/20 px-3 py-2 text-sm text-[var(--cream)]/70 hover:text-[var(--gold)]"
        >
          <Power size={14} /> Déconnexion
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <p className="font-serif-brand text-xl text-[var(--gold)]">La Playa Admin</p>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as Section)}
            className="rounded-lg border border-[var(--gold)]/20 bg-[var(--card)] px-3 py-2 text-sm"
          >
            {items.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </div>

        {section === "dashboard" && <DashboardSection />}
        {section === "menu" && <MenuSection />}
        {section === "rooms" && <RoomsSection />}
        {section === "events" && <EventsSection />}
        {section === "history" && <HistorySection />}
        {section === "qr" && <QRSection />}
        {section === "settings" && <SettingsSection />}
      </main>
    </div>
  );
}

function DashboardSection() {
  const orders = loadOrders();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter((o) => o.time >= today.getTime());
  const revenue = todayOrders.reduce((s, o) => s + o.total, 0);

  // last 7 days revenue
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    const end = d.getTime() + 86400000;
    const rev = orders
      .filter((o) => o.time >= d.getTime() && o.time < end)
      .reduce((s, o) => s + o.total, 0);
    return {
      label: d.toLocaleDateString("fr-FR", { weekday: "short" }),
      revenue: Math.round(rev / 1000),
    };
  });

  return (
    <div>
      <h1 className="font-serif-brand text-3xl text-[var(--gold)]">Tableau de bord</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Stat label="Commandes du jour" value={String(todayOrders.length)} />
        <Stat label="Recettes du jour" value={formatFCFA(revenue)} />
        <Stat label="Réservations" value={String(ROOMS.filter((r) => !r.available).length)} />
        <Stat label="Chambres dispos" value={String(ROOMS.filter((r) => r.available).length)} />
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-6">
        <h3 className="font-serif-brand mb-4 text-lg text-[var(--cream)]">
          Recettes des 7 derniers jours <span className="text-xs text-[var(--cream)]/50">(en milliers FCFA)</span>
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={days}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,165,87,0.1)" />
              <XAxis dataKey="label" stroke="#a8a39a" fontSize={12} />
              <YAxis stroke="#a8a39a" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid rgba(200,165,87,0.3)",
                  borderRadius: 8,
                  color: "#FAF7F2",
                }}
              />
              <Bar dataKey="revenue" fill="#C8A557" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <SimpleTable
      title="Menu"
      headers={["Plat", "Catégorie", "Prix"]}
      rows={MENU.map((m) => [m.name, m.category, formatFCFA(m.price)])}
    />
  );
}

function RoomsSection() {
  return (
    <SimpleTable
      title="Chambres"
      headers={["Chambre", "Type", "Prix / nuit", "Statut"]}
      rows={ROOMS.map((r) => [
        r.name,
        r.type,
        formatFCFA(r.price),
        r.available ? "Disponible" : "Complet",
      ])}
    />
  );
}

function EventsSection() {
  return (
    <SimpleTable
      title="Événements"
      headers={["Événement", "Catégorie", "Date", "Tarif"]}
      rows={EVENTS.map((e) => [e.title, e.category, e.date, e.price])}
    />
  );
}

function HistorySection() {
  const orders = loadOrders();
  return (
    <div>
      <h1 className="font-serif-brand text-3xl text-[var(--gold)]">Historique des commandes</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--charcoal)] text-left text-xs uppercase tracking-widest text-[var(--gold)]">
            <tr>
              <th className="px-4 py-3">Spot</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Heure</th>
              <th className="px-4 py-3">Articles</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-[var(--gold)]/10">
                <td className="px-4 py-3 text-[var(--cream)]">{o.spotId}</td>
                <td className="px-4 py-3 text-[var(--cream)]/80">{o.name}</td>
                <td className="px-4 py-3 text-[var(--cream)]/60">
                  {new Date(o.time).toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-[var(--cream)]/60">
                  {o.items.reduce((s, i) => s + i.qty, 0)}
                </td>
                <td className="px-4 py-3 text-[var(--gold)]">{formatFCFA(o.total)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-[var(--gold)]/30 px-2.5 py-0.5 text-xs">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--cream)]/40">
                  Aucune commande pour l'instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsSection() {
  const { receptionPin, adminPin, whatsappNumber, open, setConfig } = useAdmin();
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif-brand text-3xl text-[var(--gold)]">Paramètres</h1>
      <div className="mt-6 space-y-5 rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-6">
        <SettingField label="PIN Réception" value={receptionPin} onChange={(v) => setConfig({ receptionPin: v })} />
        <SettingField label="PIN Admin" value={adminPin} onChange={(v) => setConfig({ adminPin: v })} />
        <SettingField label="Numéro WhatsApp" value={whatsappNumber} onChange={(v) => setConfig({ whatsappNumber: v })} />
        <div className="flex items-center justify-between border-t border-[var(--gold)]/10 pt-5">
          <div>
            <p className="text-sm text-[var(--cream)]">Statut du resort</p>
            <p className="text-xs text-[var(--cream)]/50">Bannière « Ouvert / Fermé » sur la page d'accueil</p>
          </div>
          <button
            onClick={() => setConfig({ open: !open })}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${
              open ? "bg-emerald-500/20 text-emerald-300" : "bg-[var(--coral)]/20 text-[var(--coral)]"
            }`}
          >
            {open ? "Ouvert" : "Fermé"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--gold)]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--gold)]/20 bg-[var(--charcoal)] px-4 py-2.5 text-sm text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
      />
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

function SimpleTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div>
      <h1 className="font-serif-brand text-3xl text-[var(--gold)]">{title}</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--charcoal)] text-left text-xs uppercase tracking-widest text-[var(--gold)]">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[var(--gold)]/10">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-3 text-[var(--cream)]/80">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QRCodeCard({ title, url }: { title: string; url: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(url, { width: 400, margin: 2, color: { dark: '#111827', light: '#ffffff' } }).then(setDataUrl);
  }, [url]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qrcode-${title.replace(/\\s+/g, '-').toLowerCase()}.png`;
    a.click();
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Print QR - ${title}</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #faf7f2; color: #111827; }
            h1 { font-size: 2rem; margin-bottom: 2rem; color: #C8A557; }
            img { max-width: 80vw; max-height: 80vh; background: #fff; padding: 1rem; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
            p { margin-top: 1rem; font-size: 1.2rem; opacity: 0.8; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <img src="${dataUrl}" alt="QR Code" />
          <p>Scannez pour accéder au service</p>
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="flex flex-col items-center justify-between rounded-2xl border border-[var(--gold)]/15 bg-[var(--card)] p-6">
      <h3 className="mb-4 text-lg font-serif-brand text-[var(--gold)] text-center">{title}</h3>
      {dataUrl ? (
        <img src={dataUrl} alt={`QR Code ${title}`} className="mb-4 rounded-lg bg-white p-2 w-48 h-48 object-contain" />
      ) : (
        <div className="mb-4 w-48 h-48 animate-pulse rounded-lg bg-white/10" />
      )}
      <p className="mb-4 text-xs text-[var(--cream)]/60 text-center break-all">{url}</p>
      <div className="flex gap-2 w-full mt-auto">
        <button onClick={handleDownload} className="flex-1 rounded-lg border border-[var(--gold)]/20 px-3 py-2 text-sm text-[var(--cream)]/80 hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors">
          Télécharger
        </button>
        <button onClick={handlePrint} className="flex-1 rounded-lg bg-[var(--gold)]/20 px-3 py-2 text-sm text-[var(--gold)] hover:bg-[var(--gold)]/30 transition-colors">
          Imprimer
        </button>
      </div>
    </div>
  );
}

function QRSection() {
  const [currentOrigin, setCurrentOrigin] = useState("https://togoliving.net");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin);
    }
  }, []);

  const roomQrs = ROOMS.map(r => ({
    title: r.name,
    url: `${currentOrigin}/room/${r.id}`
  }));

  return (
    <div>
      <h1 className="font-serif-brand text-3xl text-[var(--gold)]">QR Codes</h1>
      
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-serif-brand text-[var(--cream)]">Menu Restaurant (Unique pour toutes les tables)</h2>
        <div className="max-w-sm">
          <QRCodeCard title="Menu Restaurant" url={`${currentOrigin}/restaurant`} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-serif-brand text-[var(--cream)]">Conciergerie Digitale (Chambres)</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roomQrs.map(qr => (
            <QRCodeCard key={qr.title} title={qr.title} url={qr.url} />
          ))}
        </div>
      </div>
    </div>
  );
}