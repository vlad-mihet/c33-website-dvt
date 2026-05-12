// Four line-art mocks that each illustrate the meaning of their Feature
// card. Vocabulary intentionally matches Services' BarChartMock / RingMock /
// WaveMock — single-colour strokes, monospace mini-labels, schematic.
//
// Each component accepts a `color` prop so the same mark can ink against
// light or dark backgrounds.

type MockProps = { color: string };

// 01 — Pre-approved limits / automated split-second disbursement.
// A pre-cleared trigger line: closed gate on the left, several timing
// ticks, then a single bright launch dot accelerating right with arrow.
// Reads as "ready, then fires."
export function GateMock({ color }: MockProps) {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1}>
        {/* Track */}
        <line x1="10" y1="78" x2="226" y2="78" />
        {/* Closed-gate bars on the left */}
        <line x1="22" y1="60" x2="22" y2="96" />
        <line x1="30" y1="60" x2="30" y2="96" />
        <line x1="38" y1="60" x2="38" y2="96" />
        {/* Timing ticks across the track */}
        {[64, 96, 128, 160, 192].map((x) => (
          <line key={x} x1={x} y1="74" x2={x} y2="82" />
        ))}
        {/* Trigger marker — vertical dashed line at the gate exit */}
        <line x1="50" y1="40" x2="50" y2="100" strokeDasharray="2 3" />
        {/* Launch arrow */}
        <line x1="200" y1="78" x2="222" y2="78" />
        <polyline points="216,72 226,78 216,84" fill="none" />
      </g>
      <g fill={color}>
        {/* Two faint trailing dots (recent fires) and one bright "now" dot */}
        <circle cx="80" cy="78" r="2" fillOpacity="0.35" />
        <circle cx="120" cy="78" r="2.5" fillOpacity="0.55" />
        <circle cx="178" cy="78" r="4" />
      </g>
      <text
        x="50"
        y="32"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1"
        fill={color}
        fillOpacity="0.7"
      >
        TRIGGER
      </text>
    </svg>
  );
}

// 02 — Daily AI-powered cash flow forecast.
// A solid past-line continuing into a dashed forecast with a confidence
// fan around it. Reads as "we project forward."
export function ForecastMock({ color }: MockProps) {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1}>
        {/* Axis */}
        <line x1="10" y1="100" x2="230" y2="100" />
        {/* Vertical "now" rule */}
        <line x1="118" y1="20" x2="118" y2="100" strokeDasharray="2 3" />
      </g>
      {/* Confidence fan — soft filled cone widening to the right */}
      <path
        d="M 118 70 L 230 40 L 230 96 Z"
        fill={color}
        fillOpacity="0.10"
      />
      {/* Past trajectory — solid */}
      <path
        d="M 14 86 Q 32 70 50 78 T 90 64 T 118 70"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
      {/* Forecast trajectory — dashed */}
      <path
        d="M 118 70 Q 150 60 180 56 T 226 50"
        stroke={color}
        strokeWidth="1.4"
        strokeDasharray="3 3"
        fill="none"
      />
      {/* Markers along the past line */}
      <g fill={color}>
        <circle cx="50" cy="78" r="1.6" />
        <circle cx="90" cy="64" r="1.6" />
        <circle cx="118" cy="70" r="3" />
      </g>
      <text
        x="118"
        y="14"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1"
        fill={color}
        fillOpacity="0.7"
        textAnchor="middle"
      >
        NOW
      </text>
    </svg>
  );
}

// 03 — Real-time view of transaction data.
// A live pulse waveform with timestamp ticks. Reads as "always on,
// streaming." Sharp irregular peaks, like a heart rate or tape reader.
export function PulseMock({ color }: MockProps) {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1.4}>
        {/* Baseline */}
        <line x1="10" y1="68" x2="230" y2="68" strokeWidth="1" strokeOpacity="0.4" />
        {/* Pulse trace */}
        <polyline
          points="10,68 28,68 36,68 42,40 48,92 54,52 60,68 76,68 88,68 96,46 102,88 108,68 130,68 142,68 150,42 156,90 162,54 168,68 188,68 200,68 208,48 214,86 220,60 226,68"
          fill="none"
        />
      </g>
      {/* Vertical timestamp ticks */}
      <g stroke={color} strokeWidth={1} strokeOpacity="0.35">
        {[40, 90, 140, 190].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="106" />
        ))}
      </g>
      {/* Bright "live" indicator dot at the right end */}
      <g fill={color}>
        <circle cx="226" cy="68" r="3.5" />
        <circle cx="226" cy="68" r="7" fillOpacity="0" stroke={color} strokeOpacity="0.4" />
      </g>
      <text
        x="226"
        y="22"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1"
        fill={color}
        fillOpacity="0.7"
        textAnchor="end"
      >
        · LIVE
      </text>
    </svg>
  );
}

// 04 — Full historical financials with trends.
// Grouped bars across multiple periods, dashed mean line, mono axis tick.
// Reads as "we hold the whole record."
export function HistoryMock({ color }: MockProps) {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1}>
        {/* Axes */}
        <line x1="14" y1="100" x2="230" y2="100" />
        <line x1="14" y1="14" x2="14" y2="100" />
        {/* Period ticks */}
        {[44, 74, 104, 134, 164, 194, 224].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="103" />
        ))}
      </g>
      {/* Stacked bars per period (taller bar = total, lighter top = secondary) */}
      <g fill={color}>
        {/* Format: [x, total-height-from-baseline-going-up, top-band-height] */}
        {[
          [22, 50, 18],
          [52, 38, 14],
          [82, 60, 20],
          [112, 44, 16],
          [142, 70, 24],
          [172, 56, 18],
          [202, 80, 28],
        ].map(([x, total, top], i) => (
          <g key={i}>
            <rect x={x} y={100 - total} width="18" height={total - top} fillOpacity="0.85" />
            <rect x={x} y={100 - total} width="18" height={top} fillOpacity="0.5" />
          </g>
        ))}
      </g>
      {/* Dashed trailing mean */}
      <line
        x1="14"
        y1="48"
        x2="230"
        y2="40"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.6"
      />
      <text
        x="230"
        y="34"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1"
        fill={color}
        fillOpacity="0.7"
        textAnchor="end"
      >
        TRAILING MEAN
      </text>
    </svg>
  );
}
