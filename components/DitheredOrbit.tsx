'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Dot grid pitch in CSS px. Smaller = denser. Default 4. */
  cell?: number;
  /** Dot colour. Default deep ink. */
  dot?: string;
  /** Highlight dot colour (hubs / accents). Default periwinkle. */
  accent?: string;
  /** Background colour. Default transparent (sits on the section bg). */
  bg?: string;
  /** Disable rotation. Default false (rotates slowly). */
  still?: boolean;
  className?: string;
};

// ─────────────────────────────────────────────────────────────────────────
// DitheredOrbit — Stats signature graphic.
//
// Replaces the original PixelGlobe with a Guardbase-style dot-matrix
// sphere. Sphere shading is a day/night terminator (light from upper-left)
// + spherical falloff toward the limb. A handful of accent dots punctuate
// the dark side, evoking lit financial hubs without illustrating literal
// geography.
//
// Animated via a slow longitude rotation. Pauses under
// prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────
export default function DitheredOrbit({
  cell = 4,
  dot = '#0e0d10',
  accent = '#556be6',
  bg = 'transparent',
  still = false,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let raf = 0;
    let phase = 0;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !still && !reduced;

    // Deterministic hub positions in (longitude, latitude) — lit dots that
    // ride the surface. Spread across both hemispheres so the dark side
    // never looks empty.
    const hubs: Array<[number, number]> = [
      [-74, 40.7],   // NYC
      [-0.1, 51.5],  // London
      [103.8, 1.3],  // Singapore
      [139.7, 35.7], // Tokyo
      [114.2, 22.3], // Hong Kong
      [55.3, 25.2],  // Dubai
      [-118, 34],    // Los Angeles
      [-46.6, -23.5],// São Paulo
      [151.2, -33.9],// Sydney
      [37.6, 55.7],  // Moscow
    ];

    const render = () => {
      const rect = wrap.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      if (size <= 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      if (bg !== 'transparent') {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, rect.width, rect.height);
      } else {
        ctx.clearRect(0, 0, rect.width, rect.height);
      }

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const R = (size / 2) * 0.92;

      const cols = Math.ceil((R * 2) / cell);
      const rows = cols;
      const left = cx - R;
      const top = cy - R;

      const lonOffset = phase; // radians

      // Halftone sphere
      ctx.fillStyle = dot;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = left + i * cell + cell / 2;
          const y = top + j * cell + cell / 2;
          const dx = (x - cx) / R;
          const dy = (y - cy) / R;
          const r2 = dx * dx + dy * dy;
          if (r2 > 1) continue;
          const z = Math.sqrt(1 - r2);

          // Light from upper-left
          const lightDot = dx * -0.5 + dy * -0.5 + z * 0.71;
          const lit = Math.max(0, lightDot);

          // Limb darkening — slight emphasis at the edge
          const limb = Math.pow(1 - r2, 0.4);

          // Combined luminance ~ [0..1]. Invert for dot density (dark = dense).
          const lum = Math.min(1, lit * 0.85 + limb * 0.18);
          const t = Math.pow(1 - lum, 1.7);
          if (t < 0.05) continue;

          const rad = (cell / 2) * t * 0.95;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Crisp limb stroke — barely-there ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(17,16,18,0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Accent dots — lit hubs projected through current rotation
      ctx.fillStyle = accent;
      for (const [lon, lat] of hubs) {
        const lonR = (lon * Math.PI) / 180 + lonOffset;
        const latR = (lat * Math.PI) / 180;
        const sx = Math.cos(latR) * Math.sin(lonR);
        const sy = -Math.sin(latR);
        const sz = Math.cos(latR) * Math.cos(lonR);
        if (sz < 0) continue; // back hemisphere
        const px = cx + sx * R;
        const py = cy + sy * R;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        // soft outer ring
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(85,107,230,0.30)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const loop = () => {
      phase += 0.0011;
      render();
      raf = requestAnimationFrame(loop);
    };

    render();
    if (shouldAnimate) {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => render();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [cell, dot, accent, bg, still]);

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
