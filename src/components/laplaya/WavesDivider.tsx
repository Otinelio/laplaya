export function WavesDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`pointer-events-none w-full ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-12 w-full"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="rgba(200,165,87,0.12)"
        />
        <path
          d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,80 L0,80 Z"
          fill="rgba(200,165,87,0.18)"
        />
      </svg>
    </div>
  );
}