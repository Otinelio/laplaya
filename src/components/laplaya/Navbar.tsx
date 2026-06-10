import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/sejours", label: "Séjours" },
  { to: "/restaurant", label: "Restaurant & Bar" },
  { to: "/evenements", label: "Événements" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(26,26,26,0.95)" : "rgba(26,26,26,0)",
        borderBottomColor: scrolled ? "rgba(200,165,87,0.2)" : "rgba(200,165,87,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="font-serif-brand text-2xl tracking-wider text-[var(--gold)]">
          La Playa
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group relative text-sm uppercase tracking-widest text-[var(--cream)]/85 transition-colors hover:text-[var(--gold)]"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-[var(--gold)] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/reserver"
            className="hidden rounded-full bg-[var(--gold)] px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-[var(--charcoal)] transition-all hover:bg-[var(--gold-light)] hover:shadow-[0_0_24px_rgba(200,165,87,0.4)] lg:inline-block"
          >
            Réserver
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-[var(--gold)]/30 p-2 text-[var(--gold)] lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--gold)]/20 bg-[var(--charcoal)] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-3 py-3 text-sm uppercase tracking-widest text-[var(--cream)]/85 hover:bg-[var(--gold)]/10 hover:text-[var(--gold)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reserver"
                className="mt-4 rounded-full bg-[var(--gold)] px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-[var(--charcoal)]"
              >
                Réserver
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}