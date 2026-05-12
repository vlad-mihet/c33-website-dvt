import type { Metadata } from 'next';
import { ArrowUpRight } from '@/components/icons';
import WaitlistForm from '@/components/forms/WaitlistForm';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import DitheredTopography from '@/components/DitheredTopography';
import CycleMeter from '@/components/platform/CycleMeter';
import {
  GateMock,
  ForecastMock,
  PulseMock,
  HistoryMock,
} from '@/components/platform/FeatureMocks';

export const metadata: Metadata = {
  title: 'C33 Platform',
  description:
    'C33 connects businesses directly to intelligent capital — liquidity, adaptive credit scoring, financing, and enriched transaction data across all banks.',
  alternates: { canonical: '/platform' },
};

function PlatformHero() {
  return (
    <section className="relative overflow-hidden bg-white px-[58px] pt-[180px] pb-[120px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow variant="plus">C33 PLATFORM</Eyebrow>
            <h1 className="font-display text-[56px] leading-[1.02] tracking-[-0.024em] text-ink lg:text-[80px]">
              Credit that moves at the
              <br />
              speed of your business.
            </h1>
            <p className="max-w-[520px] text-[16px] leading-[26px] text-ink-soft">
              C33 connects businesses directly to intelligent capital. Through one platform,
              companies access liquidity, receive an adaptive credit score, apply for
              financing, and monitor enriched transaction data across all banks and accounts.
            </p>
            <div className="mt-2">
              <a
                href="#waitlist"
                className="group tx-button inline-flex items-center gap-2 rounded-full bg-ink pl-[24px] pr-[14px] py-[12px] text-[12px] uppercase tracking-[0.16em] text-white hover:bg-black"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Join the Waitlist
                <ArrowUpRight className="tx-icon size-[20px]" />
              </a>
            </div>
          </Reveal>
          <div className="relative">
            <PlusMarks density="frame" inset={-8} />
            <div className="border border-line-2 bg-white p-[24px]">
              <CycleMeter />
            </div>
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>fig.p1 / cycle time</span>
              <span>· median signed → drawn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SplitSecondMarquee() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink-deep)] py-[80px]">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <h2
            key={i}
            aria-hidden={i === 1}
            className="font-display whitespace-nowrap px-12 text-[88px] leading-none font-medium tracking-[-0.034em] text-white/90"
          >
            Build for the Split-Second Economy
            <span className="mx-10 text-[var(--color-gold)]">·</span>
          </h2>
        ))}
      </div>
    </section>
  );
}

type Mock = 'gate' | 'forecast' | 'pulse' | 'history';

type FeatureCardProps = {
  index: string;
  bold: string;
  rest: string;
  variant: 'light' | 'dark';
  mock: Mock;
};

function FeatureCard({ index, bold, rest, variant, mock }: FeatureCardProps) {
  const dark = variant === 'dark';
  const inkColor = dark ? '#e8eaf4' : '#0e0d10';
  const MockComponent = {
    gate: GateMock,
    forecast: ForecastMock,
    pulse: PulseMock,
    history: HistoryMock,
  }[mock];

  return (
    <div
      className={[
        'group relative flex h-full min-h-[420px] flex-col overflow-hidden border p-[40px]',
        dark
          ? 'border-white/10 bg-[var(--color-ink-deep)] text-white'
          : 'border-line-2 bg-white text-ink',
      ].join(' ')}
    >
      <PlusMarks density="frame" inset={14} tone={dark ? 'paper' : 'ink'} />

      <p
        className={`text-[11px] uppercase tracking-[0.24em] ${dark ? 'text-white/55' : 'text-ink-soft'}`}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {index}
      </p>

      <p className="mt-[40px] max-w-[360px] font-display text-[22px] leading-[1.28] tracking-[-0.008em]">
        <span className="font-medium">{bold}</span>{' '}
        <span className={dark ? 'text-white/75' : 'text-ink-soft'}>{rest}</span>
      </p>

      {/* Content-matched mock illustration in the lower-right corner.
          Same compositional pattern as Services' BarChartMock / RingMock /
          WaveMock — single colour, schematic, semantically meaningful. */}
      <div className="mt-auto flex justify-end pt-[24px]">
        <MockComponent color={inkColor} />
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="relative bg-white px-[58px] pt-[100px] pb-[100px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[60px] flex flex-col gap-5">
          <Eyebrow variant="numbered" index="01">FEATURES</Eyebrow>
          <h3 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
            Built for the desk
            <br />
            that closes today.
          </h3>
        </Reveal>

        {/* Equal 2x2 grid — four parallel-structured capabilities, four
            equal cells. Light top row / dark bottom row gives the
            section a clear tonal rhythm without sigils competing. */}
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
          <Reveal className="h-full">
            <FeatureCard
              index="( 01 )"
              bold="Pre-approved lending limits"
              rest="for automated split-second disbursements."
              variant="light"
              mock="gate"
            />
          </Reveal>
          <Reveal className="h-full" delay={100}>
            <FeatureCard
              index="( 02 )"
              bold="Daily AI-powered"
              rest="cash flow forecasts to identify and bridge liquidity gaps."
              variant="light"
              mock="forecast"
            />
          </Reveal>
          <Reveal className="h-full" delay={200}>
            <FeatureCard
              index="( 03 )"
              bold="Real-time view"
              rest="of your transaction data for informed business decisions."
              variant="dark"
              mock="pulse"
            />
          </Reveal>
          <Reveal className="h-full" delay={300}>
            <FeatureCard
              index="( 04 )"
              bold="Full historical financials"
              rest="with trends and key indicators."
              variant="dark"
              mock="history"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type CoverageColumn = {
  label: string;
  headline: string;
  items: string[];
};

const coverageColumns: CoverageColumn[] = [
  {
    label: 'BANK FEEDS',
    headline: 'Operating cash, every account.',
    items: ['PSD2 / Open Banking', 'Plaid', 'TrueLayer', 'GoCardless', 'Direct SFTP ingestion'],
  },
  {
    label: 'ACCOUNTING',
    headline: 'GL truth, daily.',
    items: ['Xero', 'QuickBooks', 'Sage', 'NetSuite', 'Microsoft Dynamics'],
  },
  {
    label: 'TREASURY',
    headline: 'Liquidity at the desk.',
    items: ['SAP Treasury', 'Oracle Treasury', 'Kyriba', 'ION', 'Bottomline'],
  },
  {
    label: 'MARKET DATA',
    headline: 'Pricing context.',
    items: ['Bloomberg', 'Refinitiv', 'S&P Capital IQ', 'ICE Data', 'Internal exports'],
  },
];

function Coverage() {
  return (
    <section className="relative bg-[var(--color-paper-warm)] px-[58px] pt-[140px] pb-[140px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[80px] grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow variant="numbered" index="02">COVERAGE</Eyebrow>
            <h3 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
              Plugs into the rails that
              <br />
              move your operating capital.
            </h3>
          </div>
          <p className="max-w-[440px] text-[15px] leading-[24px] text-ink-soft">
            SOMA ingests across bank feeds, ledgers, treasury systems, and market data —
            so the underwriting model sees a complete operating picture from day one.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
          {coverageColumns.map((col, i) => (
            <Reveal key={col.label} delay={i * 100}>
              <div className="relative h-full border border-line-2 bg-white p-[36px]">
                <PlusMarks density="frame" inset={12} tone="ink" />
                <p
                  className="text-[10px] uppercase tracking-[0.24em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  + {col.label}
                </p>
                <p className="mt-[28px] font-display text-[20px] leading-[1.24] tracking-[-0.008em] text-ink">
                  {col.headline}
                </p>
                <ul
                  className="mt-[36px] flex flex-col gap-[10px] text-[13px] leading-[20px] text-ink"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-ink-soft">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="mt-[40px] text-[10px] uppercase tracking-[0.22em] text-ink-soft"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            + non-exhaustive · custom integrations on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}

type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Ingest',
    body: 'Connect operating data — bank feeds, accounting, treasury. SOMA normalises the inputs into a single cash-flow ledger within hours, not weeks.',
  },
  {
    index: '02',
    title: 'Score',
    body: 'The platform builds an adaptive credit score from forward cash flow patterns, not collateral packs. Updated daily as new transactions land.',
  },
  {
    index: '03',
    title: 'Committee',
    body: 'A senior credit committee reviews the model output, calibrates structure and covenants, and signs the term sheet. Models propose, people commit.',
  },
  {
    index: '04',
    title: 'Fund',
    body: 'Capital deploys against pre-cleared limits. Continuous monitoring after close — early-warning signals, dynamic risk views, no quarterly drift.',
  },
];

function Process() {
  return (
    <section className="relative bg-white px-[58px] pt-[140px] pb-[140px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[80px] grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow variant="numbered" index="03">PROCESS</Eyebrow>
            <h3 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
              How underwriting works.
            </h3>
          </div>
          <div className="relative">
            <PlusMarks density="frame" inset={-8} />
            <DitheredTopography cell={5} dot="#556be6" className="border border-line-2" />
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>fig.p3 / risk surface</span>
              <span>· what SOMA evaluates against</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 border-t border-line-2 pt-[60px] md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 110}>
              <div className="flex flex-col gap-4">
                <span
                  className="text-[11px] uppercase tracking-[0.24em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {step.index} ·
                </span>
                <h4 className="font-display text-[24px] leading-[1.18] tracking-[-0.012em] text-ink">
                  {step.title}
                </h4>
                <p className="max-w-[320px] text-[14px] leading-[22px] text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section id="waitlist" className="relative bg-white px-[58px] pt-[60px] pb-[120px]">
      <Reveal className="relative mx-auto max-w-[1323px] overflow-hidden bg-[var(--color-ink-deep)] p-[60px] text-white">
        <PlusMarks tone="paper" density="frame" inset={18} />
        <div className="grid grid-cols-1 gap-[60px] lg:grid-cols-[1fr_1.2fr]">
          <div className="flex max-w-[400px] flex-col gap-[28px]">
            <Eyebrow variant="plus" className="text-white/80">WAITLIST</Eyebrow>
            <h2 className="font-display text-[36px] leading-[1.06] tracking-[-0.018em] text-white lg:text-[44px]">
              Join the waitlist.
            </h2>
            <p className="text-[15px] leading-[24px] text-white/75">
              Get early access to the C33™ direct lending platform, beta tools, and
              integration opportunities.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </Reveal>
    </section>
  );
}

export default function PlatformPage() {
  return (
    <main>
      <PlatformHero />
      <SplitSecondMarquee />
      <Features />
      <Coverage />
      <Process />
      <WaitlistSection />
    </main>
  );
}
