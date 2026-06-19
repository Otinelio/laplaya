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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor:
          scrolled || open ? "rgba(15,15,15,0.85)" : "rgba(15,15,15,0)",
        borderBottomColor:
          scrolled || open ? "rgba(200,165,87,0.15)" : "rgba(200,165,87,0)",
        backdropFilter: scrolled || open ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-serif-brand text-3xl tracking-widest text-[var(--gold)] drop-shadow-[0_0_10px_rgba(200,165,87,0.3)] transition-colors duration-500 group-hover:text-white">
            La Playa
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative px-2 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                  active
                    ? "text-[var(--gold)]"
                    : "text-[var(--cream)]/80 hover:text-[var(--gold)]"
                }`}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-[var(--gold)] shadow-[0_0_8px_rgba(200,165,87,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[var(--gold)]/50 transition-all duration-300 group-hover:w-6" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/reserver"
            className="hidden rounded-full bg-gradient-to-r from-[var(--gold)] to-[#e5c07b] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)] shadow-[0_0_15px_rgba(200,165,87,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,165,87,0.5)] lg:inline-flex"
          >
            Réserver
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="group relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/30 text-[var(--gold)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 lg:hidden"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 -z-10 flex h-screen flex-col bg-[var(--charcoal)] pt-[96px] lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-24">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.to;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-serif-brand tracking-widest transition-colors ${
                        active
                          ? "text-[var(--gold)] drop-shadow-[0_0_8px_rgba(200,165,87,0.5)]"
                          : "text-[var(--cream)] hover:text-[var(--gold)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/reserver"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[var(--gold)] px-12 py-4 text-sm font-bold uppercase tracking-widest text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-[var(--charcoal)] hover:shadow-[0_0_20px_rgba(200,165,87,0.3)]"
                >
                  Réserver
                </Link>
              </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--gold)]/10 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
