import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import { ArrowUpRight } from '@/components/icons';
import { homeServices, type HomeServiceCard } from '@/lib/content/services';

// Three instruments, three flat-spot-colour patches. Replaces the dark
// hover-flip card with Guardbase's "Why Enterprises Choose Us" pattern
// (frame 005): chunky tinted cards in periwinkle / warm gold / sky blue,
// each with a numbered prefix, headline, body, and a small line-art mock
// of the instrument.

type Tone = 'tint' | 'gold' | 'sky';

const tones: Record<Tone, { wrap: string; mock: string; ink: string }> = {
  tint: { wrap: 'spot-tint', mock: '#3b4ec0', ink: 'text-ink' },
  gold: { wrap: 'spot-gold', mock: '#5c4413', ink: 'text-ink' },
  sky:  { wrap: 'spot-sky',  mock: '#2a4778', ink: 'text-ink' },
};

function BarChartMock({ color }: { color: string }) {
  // Debt raise — extending bar chart with one tall covenant pillar.
  return (
    <svg viewBox="0 0 220 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1}>
        <line x1="6" y1="100" x2="214" y2="100" />
        <line x1="6" y1="100" x2="6" y2="14" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={6 + i * 32} y1="100" x2={6 + i * 32} y2="102" />
        ))}
      </g>
      <g fill={color}>
        <rect x="18"  y="78" width="20" height="22" />
        <rect x="50"  y="64" width="20" height="36" />
        <rect x="82"  y="48" width="20" height="52" />
        <rect x="114" y="58" width="20" height="42" />
        <rect x="146" y="32" width="20" height="68" />
        <rect x="178" y="42" width="20" height="58" />
      </g>
      <g stroke={color} strokeDasharray="2 3" strokeWidth={1}>
        <line x1="6" y1="32" x2="214" y2="32" />
      </g>
    </svg>
  );
}

function RingMock({ color }: { color: string }) {
  // Equity raise — concentric rings with a stake wedge cut out (governance).
  return (
    <svg viewBox="0 0 140 140" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <circle cx="70" cy="70" r="56" stroke={color} strokeWidth={1} />
      <circle cx="70" cy="70" r="40" stroke={color} strokeWidth={1} />
      <circle cx="70" cy="70" r="24" stroke={color} strokeWidth={1} />
      {/* Stake wedge */}
      <path
        d="M70 14 A56 56 0 0 1 126 70 L70 70 Z"
        fill={color}
        fillOpacity="0.7"
      />
      {/* Investor mark */}
      <circle cx="98" cy="42" r="3" fill={color} />
      <line x1="98" y1="42" x2="70" y2="70" stroke={color} strokeWidth={1} strokeDasharray="1 2" />
    </svg>
  );
}

function WaveMock({ color }: { color: string }) {
  // Direct lending — continuous cashflow pulse with a decision marker.
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-[88px] w-auto" aria-hidden="true">
      <g stroke={color} strokeWidth={1.2}>
        <path d="M4 70 Q 20 28 36 50 T 70 60 T 104 44 T 140 64 T 176 36 T 212 58 T 236 50" fill="none" />
      </g>
      <g stroke={color} strokeWidth={1} strokeDasharray="2 3">
        <line x1="4" y1="100" x2="236" y2="100" />
      </g>
      <g fill={color}>
        <rect x="138" y="2" width="2" height="106" />
        <circle cx="139" cy="64" r="4" />
      </g>
      <text
        x="146"
        y="14"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        letterSpacing="1"
        fill={color}
      >
        DECISION
      </text>
    </svg>
  );
}

function SpotCard({
  service,
  tone,
  mock,
}: {
  service: HomeServiceCard;
  tone: Tone;
  mock: 'bar' | 'ring' | 'wave';
}) {
  const t = tones[tone];
  return (
    <Link
      href="/services"
      aria-label={service.title.replace(/\n/g, ' ').trim()}
      className={`group tx-card relative block min-h-[460px] overflow-hidden ${t.wrap} p-[40px]`}
    >
      {/* Plus marks on each card corner */}
      <PlusMarks density="frame" inset={14} />

      {/* Top row: index + arrow */}
      <div className="flex items-start justify-between">
        <span
          className="text-[11px] uppercase tracking-[0.22em] text-ink/70"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {service.index}
        </span>
        <span
          aria-hidden="true"
          className="tx-icon flex h-[28px] w-[28px] items-center justify-center rounded-full border border-ink/30 text-ink"
        >
          <ArrowUpRight className="size-[14px]" />
        </span>
      </div>

      <h3 className={`mt-[64px] font-display text-[34px] leading-[1.08] tracking-[-0.018em] ${t.ink} whitespace-pre-line`}>
        {service.title}
      </h3>

      <p className={`mt-[16px] max-w-[330px] text-[14px] leading-[22px] ${t.ink} opacity-80`}>
        {service.body}
      </p>

      {/* Mock illustration in lower-right */}
      <div className="absolute bottom-[34px] right-[34px]">
        {mock === 'bar'  && <BarChartMock color={t.mock} />}
        {mock === 'ring' && <RingMock color={t.mock} />}
        {mock === 'wave' && <WaveMock color={t.mock} />}
      </div>
    </Link>
  );
}

export default function Services() {
  const layout: Array<{ tone: Tone; mock: 'bar' | 'ring' | 'wave' }> = [
    { tone: 'tint', mock: 'bar' },
    { tone: 'gold', mock: 'ring' },
    { tone: 'sky',  mock: 'wave' },
  ];

  return (
    <section id="services" className="relative bg-white px-[58px] pt-[120px] pb-[120px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[80px] grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow variant="plus">OUR INSTRUMENTS</Eyebrow>
            <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-ink lg:text-[56px]">
              Three instruments.
              <br />
              One operating desk.
            </h2>
          </div>
          <p
            className="max-w-[420px] text-[14px] leading-[22px] text-ink-soft"
          >
            Debt, equity, and AI-underwritten direct lending — assembled and operated
            from the same desk, so structure follows context instead of product silos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <SpotCard service={service} tone={layout[i].tone} mock={layout[i].mock} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
