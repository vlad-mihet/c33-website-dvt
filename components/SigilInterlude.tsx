'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  tagline: ReactNode;
  caption?: string;
  animate?: boolean;
  className?: string;
};

// Atmospheric pause. Full-bleed ink-deep slab textured with a sparse
// halftone dot field — the DitheredOrbit accent-dot vocabulary without
// the sphere — floating a single short line in display type.
//
// Not deployed on the homepage by default. Reserved for /about, /insights
// or as a quiet bridge above the footer on long pages.
export default function SigilInterlude({
  tagline,
  caption,
  animate = false,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = animate && !reduced;

    let raf = 0;
    let phase = 0;

    const render = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cell = 8;
      const cols = Math.ceil(rect.width / cell);
      const rows = Math.ceil(rect.height / cell);
      const drift = phase * 0.6;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Deterministic pseudo-random per cell (cheap hash, no Math.random
          // in render loop).
          const seed = (i * 374761393 + j * 668265263) ^ 0x9e3779b1;
          const r = ((seed >> 16) & 0xffff) / 0xffff;
          const r2 = ((seed >> 0) & 0xffff) / 0xffff;
          // Density falls off slightly toward vertical centre (subtle vignette
          // around the tagline). 0 at centre, ~0.45 at edges.
          const cy = rect.height / 2;
          const fadeBand = Math.min(1, Math.abs(j * cell - cy) / (rect.height * 0.45));
          if (r > 0.18 + fadeBand * 0.55) continue;

          const x = i * cell + cell / 2;
          const y = j * cell + cell / 2 + Math.sin(i * 0.6 + drift) * 0.5;
          const isAccent = r2 > 0.94;
          ctx.fillStyle = isAccent
            ? 'rgba(138,160,255,0.75)'
            : `rgba(255,255,255,${0.18 + r * 0.22})`;
          ctx.beginPath();
          ctx.arc(x, y, isAccent ? 1.5 : 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      phase += 0.008;
      render();
      raf = requestAnimationFrame(loop);
    };

    render();
    if (shouldAnimate) raf = requestAnimationFrame(loop);

    const onResize = () => render();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [animate]);

  return (
    <section
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-[var(--color-ink-deep)] px-[58px] py-[120px] ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />

      <div className="relative mx-auto flex max-w-[1323px] flex-col items-center text-center">
        <p className="font-display text-[32px] leading-[1.18] tracking-[-0.018em] text-white md:text-[40px]">
          {tagline}
        </p>
        {caption ? (
          <span
            className="mt-5 text-[10px] uppercase tracking-[0.22em] text-white/55"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {caption}
          </span>
        ) : null}
      </div>
    </section>
  );
}
