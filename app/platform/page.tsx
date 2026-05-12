import type { Metadata } from 'next';
import { ArrowUpRight } from '@/components/icons';
import WaitlistForm from '@/components/forms/WaitlistForm';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'C33 Platform',
  description:
    'C33 connects businesses directly to intelligent capital — liquidity, adaptive credit scoring, financing, and enriched transaction data across all banks.',
  alternates: { canonical: '/platform' },
};

function PlatformHero() {
  return (
    <section className="relative px-[58px] pt-[180px] pb-[60px]">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-[28px] text-center">
        <h1 className="text-ink text-[52px] leading-[1.05] tracking-[-0.01em]">
          Credit That Moves at the
          <br />
          Speed of Your Business
        </h1>
        <p className="text-mute max-w-[560px] text-[16px] leading-[24px]">
          C33 connects businesses directly to intelligent capital. Through one platform, companies can access
          liquidity, receive an adaptive credit score, apply for financing, and monitor enriched transaction data,
          across all banks and accounts.
        </p>
        <a
          href="#waitlist"
          className="hover:bg-ink mt-2 inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] py-[11px] pr-[13px] pl-[26px] text-[12px] text-white transition-colors"
        >
          Join the Waitlist
          <ArrowUpRight className="size-[20px] text-white" />
        </a>
      </div>
    </section>
  );
}

function SplitSecondMarquee() {
  return (
    <section className="relative overflow-hidden py-[60px]">
      <div className="marquee-track">
        {/* duplicated for seamless loop */}
        {[0, 1].map((i) => (
          <h2
            key={i}
            aria-hidden={i === 1}
            className="px-12 text-[86px] leading-none font-medium tracking-[-0.04em] whitespace-nowrap text-[#0a1170]"
          >
            Build for The Split Second Economy
          </h2>
        ))}
      </div>
    </section>
  );
}

type FeatureCardProps = {
  index?: string;
  // Caller passes the body as an explicit (bold, rest) pair so each card's
  // typographic emphasis matches the Figma spec exactly — no auto-regex.
  bold?: string;
  rest?: string;
  variant: 'light' | 'dark';
  // Optional looping decorative video.
  videoSrc?: string;
  // Where the video sits relative to the text content:
  //   "right"  — fills the right portion of a wide card (Card 01: chrome C)
  //   "bottom" — fills the bottom portion of a tall card (Card 02: chrome 33)
  videoPlacement?: 'right' | 'bottom';
};

function FeatureCard({ index, bold, rest, variant, videoSrc, videoPlacement = 'right' }: FeatureCardProps) {
  const dark = variant === 'dark';
  // Light card bg matches the Cshader.mp4 / 33.mp4 background colour exactly
  // (#f5f6f5) so the video's frame edges disappear into the card.
  return (
    <div
      className={[
        'relative h-full min-h-[260px] overflow-hidden rounded-[29px]',
        dark ? 'bg-black text-white' : 'bg-[#f5f6f5] text-ink',
      ].join(' ')}
    >
      {videoSrc && (
        <video
          aria-hidden="true"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={
            videoPlacement === 'bottom'
              ? // Tall card: video occupies the bottom half-ish, fills width
                'pointer-events-none absolute inset-x-0 bottom-0 h-[60%] w-full object-cover object-center select-none'
              : // Wide card: video on the right side
                'pointer-events-none absolute inset-y-0 right-0 h-full w-[60%] object-cover object-right select-none'
          }
        />
      )}
      <div className="relative z-10 max-w-[320px] p-[40px]">
        {index && (
          <p className={`mb-3 text-[12px] ${dark ? 'text-white/60' : 'text-ink-soft'}`}>{index}</p>
        )}
        {(bold || rest) && (
          <p className="text-[18px] leading-[24px]">
            {bold && <span className="font-semibold">{bold}</span>}
            {bold && rest ? ' ' : null}
            {rest}
          </p>
        )}
      </div>
    </div>
  );
}

function Features() {
  // Figma layout: 3 cols × 2 rows, 4 cards total (L-shape).
  //   Card 01 (wide,  LIGHT, chrome C right)        — cols 1–2, row 1
  //   Card 02 (tall,  LIGHT, text top + chrome 33)  — col 3,    rows 1–2
  //   Card 03 (narrow, DARK, text)                  — col 1,    row 2
  //   Card 04 (narrow, DARK, text)                  — col 2,    row 2
  return (
    <section className="px-[58px] pt-[60px] pb-[80px]">
      <div className="mx-auto max-w-[1051px]">
        <Reveal>
          <h3 className="text-ink mb-[40px] text-[34px] leading-none">Features</h3>
        </Reveal>

        <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-3 lg:grid-rows-[341px_341px]">
          <Reveal className="h-full lg:col-span-2">
            <FeatureCard
              index="( 01 )"
              bold="Pre-approved lending limits"
              rest="for automated split second disbursements"
              variant="light"
              videoSrc="/assets/Cshader.mp4"
              videoPlacement="right"
            />
          </Reveal>
          <Reveal className="h-full lg:col-start-3 lg:row-span-2" delay={100}>
            <FeatureCard
              index="( 02 )"
              bold="Daily AI-powered"
              rest="cash flow forecasts to identify and bridge liquidity gaps"
              variant="light"
              videoSrc="/assets/33.mp4"
              videoPlacement="bottom"
            />
          </Reveal>
          <Reveal className="h-full" delay={200}>
            <FeatureCard
              index="( 03 )"
              bold="Real-time view"
              rest="of your transaction data for informed business decisions"
              variant="dark"
            />
          </Reveal>
          <Reveal className="h-full" delay={300}>
            <FeatureCard
              index="( 04 )"
              bold="Full historical financials"
              rest="with trends and key indicators"
              variant="dark"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section id="waitlist" className="px-3 pt-[40px] pb-[12px]">
      <Reveal className="grid grid-cols-1 gap-[60px] rounded-[28px] bg-black p-[60px] text-white lg:grid-cols-[1fr_1.2fr]">
        <div className="flex max-w-[400px] flex-col gap-[28px]">
          <h2 className="text-[34px] leading-[1.1] text-white">Join the Waitlist</h2>
          <p className="text-[15px] leading-[24px] text-white">Be part of the launch.</p>
          <p className="text-[15px] leading-[24px] text-white/70">
            Get early access to the C33™ direct lending platform, beta tools, and integration opportunities.
          </p>
        </div>
        <WaitlistForm />
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
      <WaitlistSection />
    </main>
  );
}
