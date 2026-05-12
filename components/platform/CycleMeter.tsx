// Cycle-time sparkline + key figure. Replaces the topography sigil in the
// PlatformHero — communicates *speed* (cycle time trending down) rather
// than *risk surface*. SVG line-art in the BarChartMock register so it
// shares the engineering-blueprint vocabulary of the Services cards.

type Props = {
  className?: string;
};

// Monthly cycle-time samples in days (high → low; speed improves over time).
// Last point is the headline "11 days" median we already use elsewhere.
const SAMPLES = [62, 58, 54, 49, 42, 38, 31, 27, 21, 17, 14, 11];
const PEAK = Math.max(...SAMPLES);
const FLOOR = Math.min(...SAMPLES);

export default function CycleMeter({ className = '' }: Props) {
  const W = 480;
  const H = 320;
  const padX = 36;
  const padTop = 64;
  const padBot = 96;

  const innerW = W - padX * 2;
  const innerH = H - padTop - padBot;

  const points = SAMPLES.map((v, i) => {
    const x = padX + (i / (SAMPLES.length - 1)) * innerW;
    const t = (v - FLOOR) / (PEAK - FLOOR);
    const y = padTop + t * innerH;
    return [x, y] as const;
  });

  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ');

  const last = points[points.length - 1];

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        <defs>
          <pattern id="cm-stipple" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.7" fill="#556be6" fillOpacity="0.35" />
          </pattern>
        </defs>

        {/* Stippled background — soft brand-coloured texture so the card
            has the dot-vocabulary signature without leaning on the moon. */}
        <rect x="0" y="0" width={W} height={H} fill="url(#cm-stipple)" />

        {/* Axis hairlines */}
        <line x1={padX} y1={H - padBot} x2={W - padX} y2={H - padBot} stroke="#111" strokeOpacity="0.18" strokeWidth="1" />
        <line x1={padX} y1={padTop} x2={padX} y2={H - padBot} stroke="#111" strokeOpacity="0.10" strokeWidth="1" />

        {/* Floor reference — dashed line at the current (lowest) value. */}
        <line
          x1={padX}
          x2={W - padX}
          y1={last[1]}
          y2={last[1]}
          stroke="#556be6"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Sparkline */}
        <path d={path} stroke="#0e0d10" strokeWidth="1.5" fill="none" />

        {/* Sample dots — small, only the last one is highlighted. */}
        {points.map(([x, y], i) => {
          const isLast = i === points.length - 1;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isLast ? 4.5 : 1.8}
                fill={isLast ? '#556be6' : '#0e0d10'}
              />
              {isLast && (
                <circle cx={x} cy={y} r="9" fill="none" stroke="#556be6" strokeOpacity="0.35" strokeWidth="1" />
              )}
            </g>
          );
        })}

        {/* Headline value — big, anchored bottom-left. */}
        <text
          x={padX}
          y={H - 38}
          fontFamily="var(--font-display)"
          fontSize="56"
          fontWeight="500"
          fill="#0e0d10"
        >
          11
          <tspan fontSize="22" dx="6" fill="#0e0d10" fillOpacity="0.55">DAYS</tspan>
        </text>

        {/* Mono caption — bottom-left below the headline. */}
        <text
          x={padX}
          y={H - 14}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#0e0d10"
          fillOpacity="0.55"
        >
          MEDIAN · MANDATE SIGNED → CASH DRAWN
        </text>

        {/* Top-right corner label — what we're charting. */}
        <text
          x={W - padX}
          y={padTop - 24}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2"
          textAnchor="end"
          fill="#0e0d10"
          fillOpacity="0.55"
        >
          CYCLE TIME · 12-MONTH TRAILING
        </text>

        {/* Y-axis terminal labels (mono) */}
        <text
          x={padX - 6}
          y={padTop + 4}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          letterSpacing="1.5"
          textAnchor="end"
          fill="#0e0d10"
          fillOpacity="0.45"
        >
          {PEAK}d
        </text>
        <text
          x={padX - 6}
          y={H - padBot}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          letterSpacing="1.5"
          textAnchor="end"
          fill="#0e0d10"
          fillOpacity="0.45"
        >
          {FLOOR}d
        </text>
      </svg>
    </div>
  );
}
