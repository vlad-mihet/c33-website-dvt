import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, LinkedInIcon } from '@/components/icons';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Capital33 for mandates, partnerships, and direct lending enquiries. We respond fast because we are built that way.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative px-[58px] pt-[260px] pb-[60px]">
        <Reveal className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-[40px] text-center">
          <h1 className="text-ink text-[44px] leading-[1.0] tracking-[-0.01em]">Let&rsquo;s Grow Together.</h1>
          <p className="text-mute max-w-[625px] text-[15px] leading-[22px]">
            For mandates, partnerships, and direct lending enquiries, reach the{' '}
            <span className="text-ink">Capital33 team</span> directly.
            <br />
            We respond fast because we are built that way.
          </p>
        </Reveal>
      </section>

      {/* Dark form panel with robot-hand image */}
      <section className="px-3 pb-[120px]">
        <Reveal className="bg-ink dotted-bg-dark relative mx-auto max-w-[1418px] overflow-hidden rounded-[28px]">
          <div className="relative grid grid-cols-1 gap-10 px-[58px] pt-[60px] pb-[60px] lg:grid-cols-[1.13fr_1fr] lg:items-stretch lg:gap-16">
            {/* Left — heading + robot hand. The hand fills the remaining
                vertical space so the panel never has dead space below the form. */}
            <div className="relative flex min-h-full flex-col text-white">
              <div>
                <p className="text-[12px] tracking-[0.18em] text-white/55 uppercase">Let&rsquo;s talk</p>
                <h2 className="mt-3 text-[30px] leading-[1.1]">Get in Touch</h2>
              </div>
              <div className="relative mt-10 flex flex-1 items-end lg:-ml-16">
                <Image
                  src="/assets/robot-hand.png"
                  alt=""
                  width={1200}
                  height={826}
                  className="pointer-events-none h-auto w-full max-w-[560px] select-none"
                  priority={false}
                />
              </div>
            </div>

            {/* Right — form */}
            <div className="relative">
              <ContactForm theme="dark" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reach Us Directly */}
      <section className="px-[58px] pb-[140px]">
        <Reveal className="mx-auto max-w-[1100px]">
          <h2 className="text-ink mb-[60px] text-center text-[34px] leading-[1.1]">Reach Us Directly</h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1px_1fr] md:gap-0">
            <dl className="flex flex-col gap-6 md:pr-16">
              <div>
                <dt className="text-ink text-[15px]">General enquiries</dt>
                <dd>
                  <a
                    href="mailto:hello@capital33.com"
                    className="text-mute hover:text-ink text-[15px] underline underline-offset-4 transition-colors"
                  >
                    hello@capital33.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink text-[15px]">C33 platform / Direct Lending</dt>
                <dd>
                  <a
                    href="mailto:hello@c33.ai"
                    className="text-mute hover:text-ink text-[15px] underline underline-offset-4 transition-colors"
                  >
                    hello@c33.ai
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink text-[15px]">Careers</dt>
                <dd>
                  <a
                    href="mailto:careers@capital33.com"
                    className="text-mute hover:text-ink text-[15px] underline underline-offset-4 transition-colors"
                  >
                    careers@capital33.com
                  </a>
                </dd>
              </div>
            </dl>

            <div className="bg-line-2 hidden md:block" />

            <dl className="flex flex-col gap-6 md:pl-16">
              <div>
                <dt className="text-ink text-[15px]">Office</dt>
                <dd className="text-mute text-[15px] leading-[24px]">
                  Str. Londra 26
                  <br />
                  Bucharest, Romania
                </dd>
              </div>
              <div>
                <dt className="text-ink text-[15px]">Social</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/company/c33"
                    className="text-mute hover:text-ink inline-flex items-center gap-2 text-[15px] transition-colors"
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
      <section className="dotted-bg relative mx-3 mb-[80px] rounded-[28px] px-[58px] py-[120px]">
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-10 text-center">
          <h2 className="text-ink text-[44px] leading-[52px]">Already know what you need?</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hello@capital33.com?subject=Request%20a%20Call"
              className="hover:bg-ink inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] py-[11px] pr-[13px] pl-[26px] text-[12px] text-white transition-colors"
            >
              Request a Call
              <ArrowUpRight className="size-[20px] text-white" />
            </a>
            <Link
              href="/services"
              className="border-ink/85 text-ink hover:bg-ink inline-flex items-center gap-2 rounded-full border bg-white py-[11px] pr-[13px] pl-[26px] text-[12px] transition-colors hover:text-white"
            >
              Explore Services
              <ArrowUpRight className="size-[20px]" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
