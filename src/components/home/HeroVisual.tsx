/**
 * Editorial hero composition — a fanned stack of colourful "proof" cards built
 * from real WeMarket outcomes. Tactile, creative-agency energy (not a dashboard).
 */
const cards = [
  {
    accent: "#f96f54",
    client: "Amba Constructions",
    tag: "Real Estate",
    metric: "1,450",
    unit: "leads / year",
    rotate: -6,
    x: "6%",
    y: "2%",
    z: 10,
    d: "7s",
  },
  {
    accent: "#f4c531",
    client: "Healius",
    tag: "Healthcare",
    metric: "142",
    unit: "walk-ins / year",
    rotate: 5,
    x: "40%",
    y: "22%",
    z: 20,
    d: "8.5s",
  },
  {
    accent: "#74e6bf",
    client: "Aadya Academy",
    tag: "Education",
    metric: "50",
    unit: "leads / month",
    rotate: -3,
    x: "16%",
    y: "48%",
    z: 30,
    d: "6.4s",
  },
];

export function HeroVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[560px]">
      {cards.map((c) => (
        <article
          key={c.client}
          className="float-chip absolute w-[62%] max-w-[300px] overflow-hidden rounded-2xl p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
          style={{
            left: c.x,
            top: c.y,
            zIndex: c.z,
            transform: `rotate(${c.rotate}deg)`,
            background: c.accent,
            ["--float-d" as string]: c.d,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink/70">
              {c.tag}
            </span>
            <span className="text-ink/70" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 12L12 4M12 4H5M12 4v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 font-display text-5xl font-extrabold leading-none tracking-tight text-ink">
            {c.metric}
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-ink/70">{c.unit}</div>
          <div className="mt-5 border-t border-ink/15 pt-3 text-[0.95rem] font-bold tracking-tight text-ink">
            {c.client}
          </div>
        </article>
      ))}
    </div>
  );
}
