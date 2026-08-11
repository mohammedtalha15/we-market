import Link from "next/link";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";

/** Services mega panel — four capability pillars with their services. */
export function ServicesMega({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-6">
      {pillars.map((p) => (
        <div key={p.id} className="flex flex-col gap-4">
          <Link
            href={`/services/${p.slug}`}
            onClick={onNavigate}
            className="group flex items-baseline gap-2"
          >
            <span className="font-mono text-[0.7rem] text-teal">{p.index}</span>
            <span className="text-lg font-extrabold tracking-tight text-ink transition-colors group-hover:text-teal">
              {p.name}
            </span>
          </Link>
          <p className="text-[0.78rem] leading-snug text-fg-muted">{p.category}</p>
          <ul className="flex flex-col gap-1.5">
            {p.services.slice(0, 6).map((s) => (
              <li key={s}>
                <Link
                  href={`/services/${p.slug}`}
                  onClick={onNavigate}
                  className="link-sweep text-[0.85rem] text-fg-muted transition-colors hover:text-ink"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Industries mega panel. */
export function IndustriesMega({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-3">
      {industries.map((ind) => (
        <Link
          key={ind.slug}
          href={`/industries/${ind.slug}`}
          onClick={onNavigate}
          className="group flex flex-col gap-1 rounded-2xl border border-transparent px-4 py-4 transition-colors hover:border-line hover:bg-paper"
        >
          <span className="flex items-center gap-2">
            <span className="font-mono text-[0.7rem] text-teal">{ind.index}</span>
            <span className="text-[1.05rem] font-bold tracking-tight text-ink transition-colors group-hover:text-teal">
              {ind.name}
            </span>
          </span>
          <span className="text-[0.82rem] leading-snug text-fg-muted">{ind.short}</span>
        </Link>
      ))}
    </div>
  );
}
