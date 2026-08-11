"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Creative custom cursor: a fast inner dot + a lagging outer ring (the trailing
 * "movement" effect). Uses mix-blend-mode so it inverts over any colour.
 * Fine-pointer only, honours reduced-motion, keeps a text caret inside inputs.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let hovered = false;
    let down = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = e.target as HTMLElement | null;
      hovered = !!el?.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, textarea, select, label, summary',
      );
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);
    const show = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const hide = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const render = () => {
      const dl = reduce ? 1 : 0.42;
      const rl = reduce ? 1 : 0.16;
      dx += (mx - dx) * dl;
      dy += (my - dy) * dl;
      rx += (mx - rx) * rl;
      ry += (my - ry) * rl;
      const rScale = hovered ? 1.9 : down ? 0.7 : 1;
      const dScale = hovered ? 0 : down ? 0.7 : 1;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${dScale})`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${rScale})`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
