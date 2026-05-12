import { ImageResponse } from 'next/og';

// Programmatic Open Graph image. Generated at build time (static export).
// Reads as Guardbase-blueprint: ink slab background, plus-mark frame,
// monospace metadata strip, oversize headline with periwinkle accent words.
// No custom fonts (system stack only) — keeps the build self-contained.

// `output: 'export'` requires the route be marked statically rendered.
export const dynamic = 'force-static';

export const alt = 'Capital33 — Capital for Complex Growth.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const INK_DEEP = '#06060a';
  const INK_SOFT = 'rgba(255,255,255,0.55)';
  const PERIWINKLE = '#8aa0ff';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: INK_DEEP,
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 64px',
          position: 'relative',
        }}
      >
        {/* Plus marks at corners */}
        {[
          { top: 32, left: 32 },
          { top: 32, right: 32 },
          { bottom: 32, left: 32 },
          { bottom: 32, right: 32 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              color: 'rgba(255,255,255,0.30)',
              fontSize: 22,
              fontFamily: 'ui-monospace, monospace',
              ...pos,
            }}
          >
            +
          </div>
        ))}

        {/* Top metadata strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: INK_SOFT,
            fontFamily: 'ui-monospace, monospace',
            paddingBottom: 16,
            borderBottom: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <span>C33 / MERCHANT BANK · EST. 2024</span>
          <span>FIG.01</span>
        </div>

        {/* Body — pushed to the bottom, headline left-aligned */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.18em',
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: '-0.028em',
              fontWeight: 500,
            }}
          >
            <span style={{ color: PERIWINKLE }}>Capital</span>
            <span>for</span>
            <span style={{ color: PERIWINKLE }}>Complex</span>
            <span>Growth.</span>
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 22,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.70)',
              maxWidth: 820,
            }}
          >
            Debt, equity, and AI-underwritten direct lending — closed at the speed of decision.
          </div>

          <div
            style={{
              marginTop: 36,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: INK_SOFT,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <span>capital33.com</span>
            <span>· halftone render · 360dpi</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
