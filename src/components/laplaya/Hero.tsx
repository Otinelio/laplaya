import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Hero({
  image,
  label,
  title,
  subtitle,
  children,
  height = "min-h-[70vh]",
}: {
  image: string;
  label?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  height?: string;
}) {
  return (
    <section
      className={`relative ${height} flex w-full items-end overflow-hidden pb-16 pt-32 lg:pb-24`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="max-w-3xl"
        >
          {label && (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mb-4 text-xs uppercase tracking-[0.4em] text-[var(--gold)]"
            >
              {label}
            </motion.p>
          )}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-serif-brand text-4xl leading-tight text-[var(--cream)] sm:text-5xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--cream)]/80 lg:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}