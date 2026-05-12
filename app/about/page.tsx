import type { Metadata } from 'next';
import Image from 'next/image';
import EdgeRows from '@/components/about/EdgeRows';
import NewsletterForm from '@/components/forms/NewsletterForm';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import DitheredArchitecture from '@/components/DitheredArchitecture';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Capital33 is a next-generation merchant bank operating at the intersection of structured finance, direct lending, and AI-powered credit intelligence.',
  alternates: { canonical: '/about' },
};

const edgeItems = [
  {
    title: 'Speed Without Compromise',
    body: 'Our deal execution and credit decisioning are built for the pace of modern business not legacy timelines. We move fast because our process is disciplined, not because corners are cut.',
  },
  {
    title: 'Three Capabilities, One View',
    body: 'Capital33 operates across debt raising, capital raising and direct lending simultaneously. That integrated perspective means we see your capital structure whole — and advise accordingly.',
  },
  {
    title: 'Technology as Infrastructure, Not a Feature',
    body: 'SOMA, our proprietary credit platform, is not just a bolt-on product, but the engine behind our direct lending operation, which enables continuous monitoring, automated underwriting, and daily-precision forecasting.',
  },
  {
    title: 'Alignment, Not Just Advice',
    body: 'We structure mandates to align with your governance, dilution objectives, and long-term plan. Our interests are tied to outcomes, not to transaction volume.',
  },
];

const teamPhotos = ['/assets/team-1.png', '/assets/team-2.png', '/assets/team-3.png'];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-white px-[58px] pt-[180px] pb-[120px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <div className="relative mx-auto max-w-[1323px]">
          {/* Top row — eyebrow on the left, monospace dateline on the
              right. Engineering-blueprint texture for the section header. */}
          <Reveal className="flex items-center justify-between">
            <Eyebrow variant="plus">COMPANY</Eyebrow>
            <span
              className="hidden text-[10px] uppercase tracking-[0.22em] text-ink-soft md:inline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              EST. 2024 · BUCHAREST · LONDON
            </span>
          </Reveal>

          {/* Headline — full width. No column constraint so the line
              break after "capital" stays clean, both lines fit at the
              intended size, and the type reads as an institutional
              statement instead of a corner caption. */}
          <Reveal delay={80}>
            <h1 className="mt-[44px] max-w-[1100px] font-display text-[48px] leading-[1.02] tracking-[-0.024em] text-ink sm:text-[64px] lg:text-[80px]">
              Built to move capital
              <br />
              with precision and purpose.
            </h1>
          </Reveal>

          {/* Below the headline: subtitle on the left + figure on the
              right. Both get more comfortable width than before. */}
          <div className="mt-[80px] grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-[80px]">
            <Reveal>
              <p className="max-w-[520px] text-[17px] leading-[28px] text-ink/85">
                Capital33 is a next-generation merchant bank operating at the intersection of
                structured finance, direct lending, and AI-powered credit intelligence.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col">
              <div className="relative">
                <PlusMarks density="frame" inset={-8} />
                <DitheredArchitecture cell={5} className="border border-line-2" />
              </div>
              <div
                className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>fig.a1 / atrium</span>
                <span>· halftone</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founding statement */}
      <section className="bg-white px-[58px] pb-[100px]">
        <Reveal className="mx-auto max-w-[1323px]">
          <p className="max-w-[680px] font-display text-[26px] leading-[1.32] tracking-[-0.012em] text-ink lg:text-[34px]">
            We were founded on a simple conviction: that the companies driving modern
            economies deserve capital partners who move at their speed, think at their
            depth, and act with conviction.
          </p>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="relative bg-[var(--color-paper-warm)] px-[58px] py-[120px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <div className="relative mx-auto max-w-[1323px]">
          <Reveal className="mb-[60px] flex flex-col gap-5">
            <Eyebrow variant="numbered" index="01">MISSION</Eyebrow>
            <h2 className="font-display text-[36px] leading-[1.08] tracking-[-0.018em] text-ink lg:text-[44px]">Our Mission</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
            <Reveal className="flex flex-col gap-10">
              <div>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Mission statement
                </p>
                <p className="font-display text-[22px] leading-[1.32] tracking-[-0.01em] text-ink">
                  To make sophisticated capital accessible faster, smarter, and more aligned
                  with the businesses we serve.
                </p>
              </div>
              <div>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Supporting
                </p>
                <p className="text-[15px] leading-[24px] text-ink-soft">
                  We believe the gap between capital and opportunity is a structural problem,
                  not an inevitable one. By combining deep financial expertise with proprietary
                  technology, Capital33 closes that gap for mid-market and large enterprises
                  that need more than a bank, and more than a fund.
                </p>
              </div>
            </Reveal>
            <Reveal className="flex flex-col gap-4" delay={120}>
              <div className="relative aspect-square overflow-hidden bg-line-2">
                <Image src="/assets/about-mission.png" alt="" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden bg-line-2">
                <Image src="/assets/about-vision.png" alt="" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative bg-white px-[58px] py-[120px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <div className="relative mx-auto max-w-[1323px]">
          <Reveal className="mb-[60px] flex flex-col gap-5">
            <Eyebrow variant="numbered" index="02">VISION</Eyebrow>
            <h2 className="font-display text-[36px] leading-[1.08] tracking-[-0.018em] text-ink lg:text-[44px]">Our Vision</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
            <Reveal>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Vision statement
              </p>
              <p className="font-display text-[22px] leading-[1.32] tracking-[-0.01em] text-ink">
                A financial system where capital flows with the speed and intelligence of the
                businesses it serves.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Supporting
              </p>
              <p className="text-[15px] leading-[24px] text-ink-soft">
                The next decade will be defined by companies that can access, deploy, and
                manage capital in real time. We are building the infrastructure and the
                relationships to make that possible. Through C33, our AI-driven lending
                platform, and through the mandates we execute across debt, equity, and
                structured finance, Capital33 is positioning itself at the centre of that
                shift.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Edge */}
      <section className="relative bg-white px-[58px] py-[120px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <div className="relative mx-auto max-w-[1323px]">
          <Reveal className="mb-[60px] flex flex-col gap-5">
            <Eyebrow variant="numbered" index="03">EDGE</Eyebrow>
            <h2 className="font-display text-[36px] leading-[1.08] tracking-[-0.018em] text-ink lg:text-[44px]">Our Edge</h2>
          </Reveal>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-[60px]">
            <Reveal>
              <div className="relative aspect-square overflow-hidden bg-line-2">
                <Image src="/assets/about-edge-portrait.png" alt="Capital33 partner" fill sizes="(min-width: 1024px) 340px, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <EdgeRows items={edgeItems} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative bg-[var(--color-paper-warm)] px-[58px] py-[120px]">
        <PlusMarks density="cell" cols={6} rows={3} />
        <div className="relative mx-auto max-w-[1323px]">
          <Reveal className="mx-auto mb-[60px] flex max-w-[687px] flex-col items-center gap-6 text-center">
            <Eyebrow variant="numbered" index="04">LEADERSHIP</Eyebrow>
            <h2 className="font-display text-[36px] leading-[1.08] tracking-[-0.018em] text-ink lg:text-[44px]">
              The Leadership Team
            </h2>
            <p className="text-[15px] leading-[24px] text-ink-soft">
              Capital33 brings together practitioners from investment banking, credit markets,
              fintech, and data science. We are a small, senior team, built for depth and
              speed of execution. Every mandate is handled by people who have done this
              before.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {teamPhotos.map((src, i) => (
              <Reveal key={src} delay={i * 120}>
                <div className="relative aspect-[345/389] overflow-hidden bg-line-2">
                  <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us */}
      <section className="relative bg-white px-[58px] py-[140px]">
        <PlusMarks density="cell" cols={6} rows={3} />
        <Reveal className="relative mx-auto flex max-w-[760px] flex-col items-center gap-8 text-center">
          <Eyebrow variant="plus">LET&rsquo;S WORK</Eyebrow>
          <h2 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
            Work With Us
          </h2>
          <p className="max-w-[687px] text-[15px] leading-[24px] text-ink-soft">
            Whether you have a mandate in mind or want to understand how Capital33 can support
            your capital strategy, we are ready to have that conversation.
          </p>
          <NewsletterForm cta="Join the Waitlist" pendingLabel="Joining…" />
        </Reveal>
      </section>
    </main>
  );
}
