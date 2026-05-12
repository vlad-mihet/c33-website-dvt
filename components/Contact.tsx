import { ArrowUpRight } from './icons';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import PlusMarks from './PlusMarks';

// Contact CTA — dark slab, big display headline, monospace metadata strip,
// hatched empty quadrants for engineering-sheet rhythm. Mirrors the dark
// "Thank You" footer from Guardbase frame 011 retuned for an action CTA.
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-ink-deep)] px-[58px] py-[160px] text-white"
    >
      <PlusMarks tone="paper" density="cell" cols={6} rows={4} />

      {/* Diagonal hatch in two outer quadrants for asymmetric texture */}
      <div
        aria-hidden="true"
        className="hatched-dark absolute left-0 top-0 h-1/2 w-1/3"
      />
      <div
        aria-hidden="true"
        className="hatched-dark absolute bottom-0 right-0 h-1/2 w-1/3"
      />

      <Reveal className="relative mx-auto flex max-w-[864px] flex-col items-center gap-8 text-center">
        <Eyebrow variant="plus" className="text-white/80">CONTACT</Eyebrow>

        <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-white lg:text-[56px]">
          For mandates and partnerships
          <br />
          reach out to us directly.
        </h2>

        <p
          className="mt-2 text-[12px] uppercase tracking-[0.24em] text-white/50"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          + hello@capital33.com  ·  Mon–Fri 09:00–19:00 CET
        </p>

        <a
          href="mailto:hello@capital33.com"
          className="group tx-button mt-4 inline-flex items-center gap-2 rounded-full bg-white py-[12px] pl-[28px] pr-[14px] text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-white/85"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Request a Consultation
          <ArrowUpRight className="tx-icon size-[20px]" />
        </a>
      </Reveal>
    </section>
  );
}
