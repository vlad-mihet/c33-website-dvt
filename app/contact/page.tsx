import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, LinkedInIcon } from '@/components/icons';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Capital33 for mandates, partnerships, and direct lending enquiries. We respond fast because we are built that way.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative bg-white px-[58px] pt-[200px] pb-[100px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <Reveal className="relative mx-auto flex max-w-[1323px] flex-col items-start gap-8">
          <Eyebrow variant="plus">CONTACT</Eyebrow>
          <h1 className="font-display text-[56px] leading-[1.02] tracking-[-0.024em] text-ink lg:text-[80px]">
            Let&rsquo;s grow
            <br />
            together.
          </h1>
          <p className="max-w-[625px] text-[16px] leading-[24px] text-ink-soft">
            For mandates, partnerships, and direct lending enquiries, reach the{' '}
            <span className="text-ink">Capital33 team</span> directly. We respond fast because
            we are built that way.
          </p>
        </Reveal>
      </section>

      {/* Dark form panel — heading + "what happens next" timeline on the
          left, form on the right. Replaces the robot-hand illustration with
          information that actually pays off the CTA. */}
      <section className="bg-white px-[58px] pb-[120px]">
        <Reveal className="relative mx-auto max-w-[1323px] overflow-hidden bg-[var(--color-ink-deep)] dotted-bg-dark">
          <PlusMarks tone="paper" density="frame" inset={18} />
          <div className="relative grid grid-cols-1 gap-10 px-[58px] pt-[60px] pb-[60px] lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-16">
            <div className="relative flex min-h-full flex-col text-white">
              <div>
                <Eyebrow variant="plus" className="text-white/80">GET IN TOUCH</Eyebrow>
                <h2 className="mt-4 font-display text-[34px] leading-[1.08] tracking-[-0.014em] lg:text-[44px]">
                  Send the desk
                  <br />
                  a message.
                </h2>
              </div>

              <div className="mt-12">
                <p
                  className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  What happens next
                </p>
                <ol className="mt-5 flex flex-col gap-3 text-[13px] leading-[1.5]">
                  {[
                    ['01', 'Initial reply within 24 hours, EU business days.'],
                    ['02', 'A 30-minute call to scope structure and timing.'],
                    ['03', 'Engagement letter drafted and counter-signed.'],
                    ['04', 'Mandate work starts — first deliverable inside the week.'],
                  ].map(([n, body]) => (
                    <li key={n} className="grid grid-cols-[40px_1fr] items-baseline gap-3">
                      <span
                        className="text-[11px] uppercase tracking-[0.2em] text-white/55"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {n}
                      </span>
                      <span className="text-white/85">{body}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.22em] text-white/40"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>fig.x2 / intake</span>
                <span>· encrypted in transit · GDPR</span>
              </div>
            </div>

            <div className="relative">
              <ContactForm theme="dark" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reach Us Directly */}
      <section className="relative bg-white px-[58px] py-[140px]">
        <PlusMarks density="cell" cols={6} rows={3} />
        <Reveal className="relative mx-auto max-w-[1323px]">
          <div className="mb-[60px] flex items-center justify-between">
            <Eyebrow variant="numbered" index="01">DIRECT LINES</Eyebrow>
            <span
              className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              · Mon–Fri 09:00–19:00 CET
            </span>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1px_1fr] md:gap-0">
            <dl className="flex flex-col gap-7 md:pr-16">
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  General enquiries
                </dt>
                <dd>
                  <a
                    href="mailto:hello@capital33.com"
                    className="tx-link font-display text-[20px] leading-[1.3] text-ink underline underline-offset-4 hover:text-ink/60"
                  >
                    hello@capital33.com
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  C33 platform / direct lending
                </dt>
                <dd>
                  <a
                    href="mailto:hello@c33.ai"
                    className="tx-link font-display text-[20px] leading-[1.3] text-ink underline underline-offset-4 hover:text-ink/60"
                  >
                    hello@c33.ai
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Careers
                </dt>
                <dd>
                  <a
                    href="mailto:careers@capital33.com"
                    className="tx-link font-display text-[20px] leading-[1.3] text-ink underline underline-offset-4 hover:text-ink/60"
                  >
                    careers@capital33.com
                  </a>
                </dd>
              </div>
            </dl>

            <div className="hidden bg-line-2 md:block" />

            <dl className="flex flex-col gap-7 md:pl-16">
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Office
                </dt>
                <dd className="font-display text-[20px] leading-[1.3] text-ink">
                  Str. Londra 26
                  <br />
                  Bucharest, Romania
                </dd>
              </div>
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Social
                </dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/company/c33"
                    className="tx-link inline-flex items-center gap-2 font-display text-[20px] text-ink underline underline-offset-4 hover:text-ink/60"
                  >
                    <LinkedInIcon className="size-4" />
                    Capital33
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Already know what you need? */}
      <section className="relative bg-[var(--color-paper-warm)] px-[58px] py-[120px]">
        <PlusMarks density="cell" cols={6} rows={3} />
        <Reveal className="relative mx-auto flex max-w-[860px] flex-col items-center gap-10 text-center">
          <Eyebrow variant="plus">SHORTCUT</Eyebrow>
          <h2 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
            Already know what you need?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hello@capital33.com?subject=Request%20a%20Call"
              className="group tx-button inline-flex items-center gap-2 rounded-full bg-ink pl-[24px] pr-[14px] py-[11px] text-[11px] uppercase tracking-[0.18em] text-white hover:bg-black"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Request a Call
              <ArrowUpRight className="tx-icon size-[18px] text-white" />
            </a>
            <Link
              href="/services"
              className="group tx-button inline-flex items-center gap-2 rounded-full border border-ink bg-transparent pl-[24px] pr-[14px] py-[11px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Explore Services
              <ArrowUpRight className="tx-icon size-[18px]" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
