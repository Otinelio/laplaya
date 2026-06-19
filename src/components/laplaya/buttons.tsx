import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

type Variant = "gold" | "ghost" | "dark";

function classes(variant: Variant) {
  switch (variant) {
    case "gold":
      return "bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[var(--gold-light)] hover:shadow-[0_0_30px_rgba(200,165,87,0.4)]";
    case "ghost":
      return "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]";
    case "dark":
      return "bg-[var(--charcoal)] text-[var(--cream)] border border-[var(--gold)]/30 hover:border-[var(--gold)]";
  }
}

export function GoldButton({
  variant = "gold",
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm uppercase tracking-widest transition-all ${classes(variant)} ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}

export function LinkButton({
  to,
  variant = "gold",
  children,
  params,
  className = "",
}: {
  to: string;
  variant?: Variant;
  children: ReactNode;
  params?: Record<string, string>;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      params={params as never}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm uppercase tracking-widest transition-all ${classes(variant)} ${className}`}
    >
      {children}
    </Link>
  );
}
