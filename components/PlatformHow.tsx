import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import DitheredTopography from '@/components/DitheredTopography';
import { ArrowUpRight } from '@/components/icons';
import { platformFlow } from '@/lib/content/platform';

// Connect / Underwrite / Close. White paper, dithered topography sigil
// anchoring the right side (the abstract risk surface SOMA underwrites
// against). Cell-density plus marks, monospace step codes.
export default function PlatformHow() {
  return (
    <section className="relative bg-white px-[58px] py-[160px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[80px] grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow variant="plus">HOW IT WORKS</Eyebrow>
            <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-ink lg:text-[56px]">
              Underwritten by data.
              <br />
              Closed by Capital33.
            </h2>
            <p className="max-w-[480px] text-[15px] leading-[24px] text-ink-soft">
              SOMA, our proprietary platform, reads operating cash flow continuously
              and proposes structure before the committee meets. The result: shorter
              cycles, tighter fit, and visibility that does not stop at close.
            </p>
            <div className="mt-4">
              <Link
                href="/platform"
                className="group tx-button inline-flex items-center gap-2 rounded-full bg-ink pl-[22px] pr-[12px] py-[11px] text-[12px] uppercase tracking-[0.16em] text-white hover:bg-black"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                See the platform
                <ArrowUpRight className="tx-icon size-[20px] text-white" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <PlusMarks density="frame" inset={-8} />
            <DitheredTopography cell={5} dot="#556be6" bg="#ffffff" className="border border-line-2" />
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>fig.02 / risk surface</span>
              <span>· contour @ 0.38 / 0.55 / 0.72</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 border-t border-line-2 pt-[60px] md:grid-cols-3 md:gap-8">
          {platformFlow.map((step, i) => (
            <Reveal key={step.code} delay={i * 110}>
              <div className="flex flex-col gap-4">
                <span
                  className="text-[12px] uppercase tracking-[0.22em] text-ink-soft"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {step.code}
                </span>
                <h3 className="font-display text-[24px] leading-[1.18] tracking-[-0.012em] text-ink lg:text-[28px]">{step.title}</h3>
                <p className="max-w-[360px] text-[14px] leading-[22px] text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
