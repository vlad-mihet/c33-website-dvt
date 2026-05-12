'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /**
   * Source image to halftone. When the file is missing the component
   * falls back to a procedural architectural-light placeholder, so the
   * site is never broken while waiting for assets.
   */
  src?: string;
  /** Output cell size in CSS pixels. Smaller = denser dot grid. Default 6. */
  cell?: number;
  /** Dot colour. Default deep ink. */
  dot?: string;
  /** Background colour. Default white. */
  bg?: string;
  /** Maximum dot radius as fraction of cell. Default 0.55. */
  maxR?: number;
  /**
   * When true, the component drops its 16:10 aspect lock and fills the
   * parent (caller must size it — e.g. `absolute inset-0`). Used by the
   * full-viewport hero treatment.
   */
  fill?: boolean;
  /**
   * When true, inverts the dither: bright pixels become big dots
   * (dark pixels become empty space). Use this for dark backgrounds —
   * the resulting halftone reads as a luminous subject against the
   * surrounding void, matching the Guardbase-001 hero treatment.
   */
  invert?: boolean;
  /**
   * Which procedural scene the fallback draws when no source image
   * is available. 'architecture' (default) = brutalist atrium with
   * raking sidelight. 'delta' = aerial river delta with branching
   * channels — bright water threads against dark land mass, the
   * right shape for a luminous-on-dark hero that suggests "capital
   * flowing through territory".
   */
  fallback?: 'architecture' | 'delta';
  /**
   * Max-filter radius (in source-buffer pixels) applied to bright
   * features before the dither samples them. Use this when the source
   * image has fine bright threads (e.g. river channels from satellite)
   * that would otherwise collapse below the halftone resolution.
   * 0 (default) = off; 2 = 5×5 max filter; 3 = 7×7. Higher = thicker.
   */
  dilate?: number;
  className?: string;
};

// ─────────────────────────────────────────────────────────────────────────
// DitheredArchitecture — Hero signature graphic.
//
// Classical halftone rendering: the source image is downsampled to a grid
// of cells; each cell becomes a circle whose radius is proportional to
// `1 - luminance` (dark areas → big dots, bright areas → near-invisible).
// Produces the newspaper-halftone read that Guardbase's mountain frames
// use — but tuned for architectural photography (C33's institutional
// register) instead of landscape.
//
// When `src` is missing or fails to load, a procedural placeholder is
// rendered: a stylised architectural light wash (raking sidelight on a
// vertical slab), so the hero never collapses to empty space.
// ─────────────────────────────────────────────────────────────────────────
export default function DitheredArchitecture({
  src = '/assets/hero-architecture.webp',
  cell = 6,
  dot = '#0e0d10',
  bg = '#ffffff',
  maxR = 0.55,
  fill = false,
  invert = false,
  fallback = 'architecture',
  dilate = 0,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let cancelled = false;

    const render = (
      sample: (sx: number, sy: number, sw: number, sh: number) => number
    ) => {
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
      ctx.fillStyle = dot;

      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const rMax = (cell / 2) * maxR * 1.6;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const lum = sample(i / cols, j / rows, 1 / cols, 1 / rows);
          // When inverted, bright pixels become big dots — luminous
          // subject on a dark canvas. Otherwise, dark pixels become big
          // dots — classic newspaper halftone on light paper.
          const t = invert
            ? Math.pow(lum, 1.3)
            : Math.pow(1 - lum, 1.3);
          if (t < 0.04) continue;
          const r = t * rMax;
          const cx = i * cell + cell / 2;
          const cy = j * cell + cell / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const renderFromImage = (img: HTMLImageElement) => {
      // Offscreen sample buffer at a workable size
      const buf = document.createElement('canvas');
      const SAMPLE = 360;
      const aspect = img.naturalWidth / img.naturalHeight || 16 / 10;
      buf.width = SAMPLE;
      buf.height = Math.round(SAMPLE / aspect);
      const bctx = buf.getContext('2d');
      if (!bctx) return;
      bctx.drawImage(img, 0, 0, buf.width, buf.height);
      const imgData = bctx.getImageData(0, 0, buf.width, buf.height);
      const data = imgData.data;
      const W = buf.width, H = buf.height;

      // Optional max-filter dilate. Widens bright features before the
      // halftone reads them — essential for source images with fine
      // bright threads (river channels, wires, etc.) that would
      // otherwise fall below the halftone's resolving power.
      if (dilate > 0) {
        const r = Math.max(1, Math.floor(dilate));
        const orig = new Uint8ClampedArray(data);
        for (let y = 0; y < H; y++) {
          const yMin = Math.max(0, y - r);
          const yMax = Math.min(H - 1, y + r);
          for (let x = 0; x < W; x++) {
            const xMin = Math.max(0, x - r);
            const xMax = Math.min(W - 1, x + r);
            let mR = 0, mG = 0, mB = 0;
            for (let yy = yMin; yy <= yMax; yy++) {
              const row = yy * W;
              for (let xx = xMin; xx <= xMax; xx++) {
                const idx = (row + xx) * 4;
                const rr = orig[idx];
                const gg = orig[idx + 1];
                const bb = orig[idx + 2];
                if (rr > mR) mR = rr;
                if (gg > mG) mG = gg;
                if (bb > mB) mB = bb;
              }
            }
            const i = (y * W + x) * 4;
            data[i] = mR;
            data[i + 1] = mG;
            data[i + 2] = mB;
          }
        }
      }

      const sample = (sx: number, sy: number, sw: number, sh: number) => {
        const x0 = Math.floor(sx * W);
        const y0 = Math.floor(sy * H);
        const x1 = Math.min(W, Math.ceil((sx + sw) * W));
        const y1 = Math.min(H, Math.ceil((sy + sh) * H));
        let sum = 0, n = 0;
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const idx = (y * W + x) * 4;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            sum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            n++;
          }
        }
        return n ? sum / n : 1;
      };

      render(sample);
    };

    const renderFallback = () => {
      // Two procedural placeholders, selected by `fallback`:
      //   · architecture: raking sidelight on a brutalist atrium slab,
      //     intended for non-inverted light-theme heroes.
      //   · delta:        aerial river delta with branching channels —
      //     bright water threads against dark land mass.
      const architectureSample = (sx: number, sy: number) => {
        const x = sx;
        const y = sy;
        const lx = 0.78, ly = 0.28;
        const dx = (x - lx);
        const dy = (y - ly);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const light = Math.max(0, 1 - dist * 1.6);
        const cols = 0.5 + 0.5 * Math.sin(x * Math.PI * 8 + 1.2);
        const col = Math.pow(cols, 3) * 0.18;
        const floor = Math.max(0, (y - 0.55) / 0.45) * Math.max(0, 1 - x) * 0.6;
        let lum = 0.35 + light * 0.55 + col - floor * 0.55;
        return Math.max(0, Math.min(1, lum));
      };

      // Delta fallback — drawn as actual stroked polylines to an
      // offscreen canvas, then sampled. The browser's line-drawing
      // primitives (round joins, quadratic curve smoothing, hard
      // line widths) produce a far crisper branching silhouette than
      // a distance-field procedural can at this halftone resolution.
      // Each channel: a normalised polyline + line width + alpha.
      // Bifurcations happen at shared endpoints.
      if (fallback === 'delta') {
        const rectF = wrap.getBoundingClientRect();
        if (rectF.width <= 0 || rectF.height <= 0) return;
        const BUF_W = 480;
        const BUF_H = Math.max(1, Math.round((BUF_W * rectF.height) / rectF.width));

        const off = document.createElement('canvas');
        off.width = BUF_W;
        off.height = BUF_H;
        const oCtx = off.getContext('2d');
        if (!oCtx) return;

        oCtx.fillStyle = '#000000';
        oCtx.fillRect(0, 0, BUF_W, BUF_H);

        const channels: Array<{ pts: [number, number][]; width: number; alpha: number }> = [
          // 1 — Trunk: enters lower-left edge, ascends to bifurcation A
          { pts: [[-0.06, 1.06], [0.10, 0.88], [0.24, 0.74], [0.40, 0.58]], width: 0.030, alpha: 1.00 },
          // 2 — Upper distributary off A → upper-right edge
          { pts: [[0.40, 0.58], [0.56, 0.46], [0.72, 0.32], [0.95, 0.20]],  width: 0.020, alpha: 0.92 },
          // 3 — Middle distributary off A → right edge
          { pts: [[0.40, 0.58], [0.60, 0.54], [0.78, 0.46], [1.02, 0.40]],  width: 0.018, alpha: 0.86 },
          // 4 — Lower distributary off A → bifurcation B
          { pts: [[0.40, 0.58], [0.52, 0.64], [0.64, 0.69]],                width: 0.016, alpha: 0.80 },
          // 5 — Off B → right edge
          { pts: [[0.64, 0.69], [0.80, 0.66], [1.02, 0.62]],                width: 0.014, alpha: 0.72 },
          // 6 — Off B → lower-right edge
          { pts: [[0.64, 0.69], [0.78, 0.78], [0.94, 0.88]],                width: 0.014, alpha: 0.72 },
          // 7 — Tributary feeding the trunk
          { pts: [[0.20, 0.82], [0.30, 0.74], [0.38, 0.62]],                width: 0.010, alpha: 0.55 },
          // 8 — Mouth distributary, upper
          { pts: [[0.72, 0.28], [0.86, 0.24], [1.00, 0.18]],                width: 0.008, alpha: 0.62 },
          // 9 — Mouth distributary, mid
          { pts: [[0.78, 0.40], [0.94, 0.36]],                              width: 0.008, alpha: 0.55 },
          // 10 — Mouth distributary, mid-low
          { pts: [[0.84, 0.52], [1.00, 0.48]],                              width: 0.008, alpha: 0.50 },
        ];

        oCtx.lineCap = 'round';
        oCtx.lineJoin = 'round';
        oCtx.strokeStyle = '#ffffff';

        for (const ch of channels) {
          oCtx.lineWidth = ch.width * BUF_W;
          oCtx.globalAlpha = ch.alpha;
          oCtx.beginPath();
          const p0 = ch.pts[0];
          oCtx.moveTo(p0[0] * BUF_W, p0[1] * BUF_H);
          if (ch.pts.length === 2) {
            const p1 = ch.pts[1];
            oCtx.lineTo(p1[0] * BUF_W, p1[1] * BUF_H);
          } else {
            // Smooth the polyline with quadratic curves through the
            // midpoints — gives organic flowing channels without polyline kinks.
            for (let i = 1; i < ch.pts.length - 1; i++) {
              const cp = ch.pts[i];
              const np = ch.pts[i + 1];
              const mx = ((cp[0] + np[0]) / 2) * BUF_W;
              const my = ((cp[1] + np[1]) / 2) * BUF_H;
              oCtx.quadraticCurveTo(cp[0] * BUF_W, cp[1] * BUF_H, mx, my);
            }
            const pn = ch.pts[ch.pts.length - 1];
            oCtx.lineTo(pn[0] * BUF_W, pn[1] * BUF_H);
          }
          oCtx.stroke();
        }
        oCtx.globalAlpha = 1;

        const data = oCtx.getImageData(0, 0, BUF_W, BUF_H).data;
        const sample = (sx: number, sy: number) => {
          const px = Math.min(BUF_W - 1, Math.max(0, Math.floor(sx * BUF_W)));
          const py = Math.min(BUF_H - 1, Math.max(0, Math.floor(sy * BUF_H)));
          const idx = (py * BUF_W + px) * 4;
          return data[idx] / 255;
        };
        render(sample);
        return;
      }

      render(architectureSample);
    };

    if (!src) {
      setUsedFallback(true);
      renderFallback();
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      setUsedFallback(false);
      try {
        renderFromImage(img);
      } catch {
        setUsedFallback(true);
        renderFallback();
      }
    };
    img.onerror = () => {
      if (cancelled) return;
      setUsedFallback(true);
      renderFallback();
    };
    img.src = src;

    const onResize = () => {
      if (img.complete && img.naturalWidth) {
        try { renderFromImage(img); return; } catch {/* fall through */}
      }
      renderFallback();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
    };
  }, [src, cell, dot, bg, maxR, invert, fallback, dilate]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${fill ? 'h-full w-full' : 'aspect-[16/10] w-full'} ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {usedFallback ? (
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(17,16,18,0.35)', fontFamily: 'var(--font-mono)' }}
        >
          fig.01 · placeholder render
        </span>
      ) : null}
    </div>
  );
}
