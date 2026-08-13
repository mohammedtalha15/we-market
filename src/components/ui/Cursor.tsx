"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { pillars } from "@/lib/data/services";

/**
 * WeMarket signature cursor — precision dot, inertial ring, subtle aura.
 * Fine-pointer only; honours reduced-motion; hides over text inputs.
 */

type CursorMode = "default" | "hover" | "cta" | "project" | "service" | "image" | "text";

const SERVICE_ACCENTS = Object.fromEntries(pillars.map((p) => [p.slug, p.accent]));

const MODE_RING: Record<CursorMode, number> = {
  default: 34,
  hover: 40,
  cta: 46,
  project: 52,
  service: 44,
  image: 48,
  text: 34,
};

function getAccent(el: HTMLElement): string | undefined {
  let node: HTMLElement | null = el;
  while (node) {
    const accent = getComputedStyle(node).getPropertyValue("--accent").trim();
    if (accent) return accent;
    if (node instanceof HTMLAnchorElement) {
      const service = node.pathname.match(/\/services\/([^/]+)/)?.[1];
      if (service && SERVICE_ACCENTS[service]) return SERVICE_ACCENTS[service];
    }
    node = node.parentElement;
  }
  return undefined;
}

function isDarkSurface(el: HTMLElement | null): boolean {
  let node: HTMLElement | null = el;
  while (node) {
    if (node instanceof HTMLElement) {
      const cls = typeof node.className === "string" ? node.className : "";
      if (/\bbg-(forest|ink|greenblack)(?:-\d+)?\b/.test(cls)) return true;
      if (/\bbg-(paper|white|lime|cream)(?:-\d+)?\b/.test(cls)) return false;
    }
    node = node.parentElement;
  }
  // body uses paper from globals.css — default to light theme
  return false;
}

function resolveMode(el: HTMLElement | null): CursorMode {
  if (!el) return "default";

  if (el.closest('input, textarea, select, [contenteditable="true"]')) {
    return "text";
  }

  if (el.closest('[data-cursor="project"], a[href^="/work/"]')) {
    return "project";
  }

  if (el.closest('[data-cursor="service"], a[href^="/services/"]')) {
    return "service";
  }

  if (el.closest('[data-cursor="image"]')) {
    return "image";
  }

  if (el.closest("button, [data-cursor='cta']")) {
    return "cta";
  }

  const ctaLink = el.closest("a.rounded-full");
  if (ctaLink instanceof HTMLElement && /\bpy-3(?:\.5)?\b/.test(ctaLink.className)) {
    return "cta";
  }

  if (el.closest('a, button, [role="button"], summary, label[for], [data-cursor="hover"]')) {
    return "hover";
  }

  return "default";
}

function applyTheme(
  root: HTMLElement,
  dark: boolean,
  accent: string | undefined,
  mode: CursorMode,
) {
  root.dataset.mode = mode;
  root.dataset.theme = dark ? "dark" : "light";
  if (accent) root.style.setProperty("--cursor-accent", accent);
  else root.style.removeProperty("--cursor-accent");
}

function getFinePointerEnabled() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function subscribeFinePointer() {
  return () => {};
}

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerEnabled,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let ax = mx;
    let ay = my;
    let mode: CursorMode = "default";
    let visible = true;
    let clickPulse = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const next = resolveMode(target);
      const root = rootRef.current;
      if (root) {
        applyTheme(root, isDarkSurface(target), getAccent(target ?? document.body), next);
        if (labelRef.current) {
          labelRef.current.textContent =
            next === "project" ? "Project →" : next === "image" ? "View →" : "";
        }
      }
      mode = next;
    };

    const onDown = () => {
      clickPulse = 1;
    };

    const show = () => {
      visible = true;
    };
    const hide = () => {
      visible = false;
    };

    const render = () => {
      const dotL = reduce ? 1 : 0.72;
      const ringL = reduce ? 1 : 0.2;
      const auraL = reduce ? 1 : 0.1;

      dx += (mx - dx) * dotL;
      dy += (my - dy) * dotL;
      rx += (mx - rx) * ringL;
      ry += (my - ry) * ringL;
      ax += (mx - ax) * auraL;
      ay += (my - ay) * auraL;

      if (clickPulse > 0 && !reduce) {
        clickPulse *= 0.82;
        if (clickPulse < 0.02) clickPulse = 0;
      }

      const hidden = mode === "text" || !visible;
      const opacity = hidden ? 0 : 1;
      const baseRing = MODE_RING[mode];
      const clickScale = 1 - clickPulse * 0.14;
      const ringSize = baseRing * clickScale;
      const auraSize = ringSize * 1.65;
      const dotScale =
        mode === "cta" || mode === "image" || mode === "project" ? 0 : 1 - clickPulse * 0.2;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const aura = auraRef.current;
      const root = rootRef.current;

      if (dot) {
        dot.style.opacity = String(opacity);
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ring) {
        ring.style.opacity = String(opacity);
        ring.style.width = `${ringSize}px`;
        ring.style.height = `${ringSize}px`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (aura && !reduce) {
        aura.style.opacity = String(opacity * 0.45);
        aura.style.width = `${auraSize}px`;
        aura.style.height = `${auraSize}px`;
        aura.style.transform = `translate3d(${ax}px, ${ay}px, 0) translate(-50%, -50%) scale(${1 + clickPulse * 0.08})`;
      } else if (aura) {
        aura.style.opacity = "0";
      }
      if (root) {
        root.style.opacity = String(opacity);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor-root" data-mode="default" data-theme="dark" aria-hidden>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
        <span className="cursor-arrow" aria-hidden>
          →
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
