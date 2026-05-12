import type { Metadata } from 'next';
import Image from 'next/image';
import EdgeRows from '@/components/about/EdgeRows';
import NewsletterForm from '@/components/forms/NewsletterForm';
import Reveal from '@/components/Reveal';

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
      <section className="relative px-[58px] pt-[180px] pb-[80px]">
        <Reveal className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-8 text-center">
          <p className="text-mute-2 text-[15px] font-medium tracking-[0.12em] uppercase">Company</p>
          <h1 className="text-ink max-w-[878px] text-[52px] leading-[1.05] tracking-[-0.01em]">
            Built to Move Capital with Precision and Purpose
          </h1>
          <p className="text-mute max-w-[625px] text-[17px] leading-[22px]">
            Capital33 is a next-generation merchant bank operating at the intersection of structured finance, direct
            lending, and AI-powered credit intelligence.
          </p>
        </Reveal>
      </section>

      {/* Founding statement */}
      <section className="px-[58px] pb-[100px]">
        <Reveal className="mx-auto max-w-[1100px]">
          <p className="text-ink max-w-[460px] text-[15px] leading-[24px]">
            We were founded on a simple conviction: that the companies driving modern economies deserve capital partners
            who move at their speed, think at their depth, and act with conviction.
          </p>
        </Reveal>
      </section>

      {/* Our Mission */}
      <section className="px-[58px] py-[80px]">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="text-ink mb-[60px] text-[34px] leading-[1.1]">Our Mission</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
            <Reveal className="flex flex-col gap-10">
              <div>
                <p className="text-mute-2 mb-3 text-[17px]">Mission statement</p>
                <p className="text-ink text-[17px] leading-[22px]">
                  To make sophisticated capital accessible faster, smarter, and more aligned with the businesses we
                  serve.
                </p>
              </div>
              <div>
                <p className="text-mute-2 mb-3 text-[17px]">Supporting</p>
                <p className="text-mute text-[15px] leading-[22px]">
                  We believe the gap between capital and opportunity is a structural problem not an inevitable one. By
                  combining deep financial expertise with proprietary technology, Capital33 closes that gap for
                  mid-market and large enterprises that need more than a bank, and more than a fund.
                </p>
              </div>
            </Reveal>
            <Reveal className="flex flex-col gap-6" delay={120}>
              <div className="bg-line-2 relative aspect-square overflow-hidden rounded-[24px]">
                <Image
                  src="/assets/about-mission.png"
                  alt="Mission imagery"
                  fill
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-line-2 relative aspect-square overflow-hidden rounded-[24px]">
                <Image
                  src="/assets/about-vision.png"
                  alt="Mission supporting imagery"
                  fill
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="px-[58px] py-[80px]">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="text-ink mb-[60px] text-[34px] leading-[1.1]">Our Vision</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
            <Reveal>
              <p className="text-mute-2 mb-3 text-[17px]">Vision statement</p>
              <p className="text-ink text-[17px] leading-[22px]">
                A financial system where capital flows with the speed and intelligence of the businesses it serves.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-mute-2 mb-3 text-[17px]">Supporting</p>
              <p className="text-mute text-[15px] leading-[22px]">
                The next decade will be defined by companies that can access, deploy, and manage capital in real time.
                We are building the infrastructure and the relationships to make that possible. Through C33, our
                AI-driven lending platform, and through the mandates we execute across debt, equity, and structured
                finance, Capital33 is positioning itself at the centre of that shift.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <section className="px-[58px] py-[80px]">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="text-ink mb-[60px] text-[34px] leading-[1.1]">Our Edge</h2>
          </Reveal>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-[60px]">
            <Reveal>
              <div className="bg-line-2 relative aspect-square overflow-hidden rounded-[24px]">
                <Image
                  src="/assets/about-edge-portrait.png"
                  alt="Capital33 partner"
                  fill
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <EdgeRows items={edgeItems} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="px-[58px] py-[80px]">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mx-auto mb-[40px] flex max-w-[687px] flex-col items-center gap-6 text-center">
            <h2 className="text-ink text-[34px] leading-[1.1]">The Leadership Team</h2>
            <p className="text-mute text-[15px] leading-[22px]">
              Capital33 brings together practitioners from investment banking, credit markets, fintech, and data
              science. We are a small, senior team, built for depth and speed of execution. Every mandate is handled by
              people who have done this before.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {teamPhotos.map((src, i) => (
              <Reveal key={src} delay={i * 120}>
                <div className="bg-line-2 relative aspect-[345/389] overflow-hidden rounded-[24px]">
                  <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us */}
      <section className="dotted-bg relative mx-3 mb-[80px] rounded-[28px] px-[58px] py-[120px]">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-8 text-center">
          <p className="text-mute-2 text-[12px] font-medium tracking-[0.18em] uppercase">Let&rsquo;s work</p>
          <h2 className="text-ink text-[34px] leading-[1.1]">Work With Us</h2>
          <p className="text-mute max-w-[687px] text-[16px] leading-[22px]">
            Whether you have a mandate in mind or want to understand how Capital33 can support your capital strategy, we
            are ready to have that conversation.
          </p>
          <NewsletterForm cta="Join the Waitlist" pendingLabel="Joining…" />
        </Reveal>
      </section>
    </main>
  );
}
