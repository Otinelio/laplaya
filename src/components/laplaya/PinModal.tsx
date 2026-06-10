import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Delete } from "lucide-react";

export function PinPad({
  expected,
  onSuccess,
  title = "Accès Restreint",
}: {
  expected: string;
  onSuccess: () => void;
  title?: string;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const push = (n: string) => {
    setError(false);
    const next = (pin + n).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === expected) onSuccess();
        else {
          setError(true);
          setPin("");
        }
      }, 150);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--charcoal)] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl border border-[var(--gold)]/20 bg-[var(--card)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full border border-[var(--gold)]/30 p-3 text-[var(--gold)]">
            <Lock size={20} />
          </div>
          <h2 className="font-serif-brand text-2xl text-[var(--cream)]">{title}</h2>
          <p className="mt-1 text-sm text-[var(--cream)]/60">Saisissez le code PIN</p>
        </div>

        <div className="mb-6 flex justify-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full border ${
                pin.length > i
                  ? "border-[var(--gold)] bg-[var(--gold)]"
                  : "border-[var(--gold)]/30"
              } ${error ? "border-[var(--coral)]" : ""}`}
            />
          ))}
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-[var(--coral)]">Code incorrect</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => push(String(n))}
              className="rounded-xl border border-[var(--gold)]/20 py-4 text-xl font-medium text-[var(--cream)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/10"
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => push("0")}
            className="rounded-xl border border-[var(--gold)]/20 py-4 text-xl font-medium text-[var(--cream)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/10"
          >
            0
          </button>
          <button
            onClick={() => setPin(pin.slice(0, -1))}
            className="flex items-center justify-center rounded-xl border border-[var(--gold)]/20 py-4 text-[var(--cream)]/70 hover:text-[var(--gold)]"
          >
            <Delete size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}