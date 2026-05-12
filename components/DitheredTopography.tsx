'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Output cell size in CSS px. Smaller = denser dots. Default 5. */
  cell?: number;
  /** Halftone dot colour. Default periwinkle. */
  dot?: string;
  /** Background colour. Default white. */
  bg?: string;
  /** Contour line colour. Default periwinkle, low opacity. */
  contour?: string;
  /** Optional deterministic seed (0–1). Same seed → same field. */
  seed?: number;
  className?: string;
};

// ─────────────────────────────────────────────────────────────────────────
// DitheredTopography — Platform / Services signature graphic.
//
// Procedural scalar field rendered as halftone dots, with isocontour lines
// at fixed elevation thresholds. The field is built from three layered
// sines (no noise library, no seeded RNG state needed — deterministic
// purely as a function of (x, y, seed)).
//
// Reads as a topographic survey of an abstract risk surface — fits C33's
// AI-underwriting positioning without illustrating anything literal.
// ─────────────────────────────────────────────────────────────────────────
export default function DitheredTopography({
  cell = 5,
  dot = '#556be6',
  bg = '#ffffff',
  contour = 'rgba(85,107,230,0.35)',
  seed = 0.42,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const field = (x: number, y: number) => {
      // Three layered sines + a shallow centred bowl. Output in [0, 1].
      const s = seed * 6.28;
      const a = Math.sin((x * 4.2 + s) * Math.PI) * Math.cos((y * 3.1 + s * 1.3) * Math.PI);
      const b = Math.sin((x * 7.7 - s * 0.9) * Math.PI + y * 1.4) * 0.6;
      const c = Math.cos((x * 1.6 + y * 2.4 + s * 0.5) * Math.PI) * 0.4;
      const bowl = 1 - Math.min(1, Math.hypot(x - 0.55, y - 0.55) * 1.6);
      const raw = a + b + c + bowl * 1.8;
      return Math.max(0, Math.min(1, (raw + 2.5) / 5));
    };

    const render = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Halftone dot layer
      ctx.fillStyle = dot;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const rMax = (cell / 2) * 0.82;
      const elevation: number[] = new Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const u = i / cols, v = j / rows;
          const e = field(u, v);
          elevation[j * cols + i] = e;
          // Higher elevation → denser dots
          const t = Math.pow(e, 1.6);
          if (t < 0.06) continue;
          const r = t * rMax;
          ctx.beginPath();
          ctx.arc(i * cell + cell / 2, j * cell + cell / 2, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Contour lines — mark cells where the field crosses fixed thresholds.
      // Quick "crossing" approximation: a cell is on a contour if any of its
      // 4 neighbours sits on the other side of the threshold. Crisp enough
      // for the sigil; far cheaper than marching squares.
      ctx.fillStyle = contour;
      const thresholds = [0.38, 0.55, 0.72];
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const e = elevation[j * cols + i];
          for (const th of thresholds) {
            const sign = e >= th ? 1 : -1;
            const neighbours = [
              elevation[j * cols + (i - 1)],
              elevation[j * cols + (i + 1)],
              elevation[(j - 1) * cols + i],
              elevation[(j + 1) * cols + i],
            ];
            const crosses = neighbours.some(
              (n) => (n >= th ? 1 : -1) !== sign
            );
            if (crosses) {
              ctx.fillRect(i * cell + cell / 2 - 0.6, j * cell + cell / 2 - 0.6, 1.2, 1.2);
            }
          }
        }
      }
    };

    render();
    const onResize = () => render();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [cell, dot, bg, contour, seed]);

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-[16/10] w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
