import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { BRAND } from "@/lib/laplaya/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--gold)]/15 bg-[var(--charcoal)] pb-10 pt-20">
      <svg
        className="absolute -top-1 left-0 right-0 w-full"
        viewBox="0 0 1440 60"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: 40 }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="rgba(200,165,87,0.08)"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <Link to="/" className="font-serif-brand text-3xl tracking-wider text-[var(--gold)]">
            La Playa
          </Link>
          <p className="font-display-brand mt-2 text-lg italic text-[var(--cream)]/70">
            {BRAND.tagline}
          </p>
        </div>

        <div className="grid gap-12 border-t border-[var(--gold)]/10 pt-12 md:grid-cols-3">
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-widest text-[var(--gold)]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[var(--cream)]/70">
              <li><Link to="/sejours" className="hover:text-[var(--gold)]">Séjours</Link></li>
              <li><Link to="/restaurant" className="hover:text-[var(--gold)]">Restaurant & Bar</Link></li>
              <li><Link to="/evenements" className="hover:text-[var(--gold)]">Événements</Link></li>
              <li><Link to="/galerie" className="hover:text-[var(--gold)]">Galerie</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--gold)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-widest text-[var(--gold)]">
              Le Resort
            </h4>
            <ul className="space-y-3 text-sm text-[var(--cream)]/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-[var(--gold)]" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-[var(--gold)]" />
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-[var(--gold)]" />
                <span>
                  Restaurant : {BRAND.hours.dejeuner} · {BRAND.hours.diner}
                  <br />
                  Bar : {BRAND.hours.bar}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-widest text-[var(--gold)]">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--gold)]/30 p-3 text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--gold)]/30 p-3 text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--gold)]/10 pt-6 text-center text-xs uppercase tracking-widest text-[var(--cream)]/40">
          © 2025 La Playa Beach Resort & Lounge. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}