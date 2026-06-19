export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent ${className}`}
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
      {children}
    </p>
  );
}
