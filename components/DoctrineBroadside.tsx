import type { ReactNode } from 'react';
import PlusMarks from '@/components/PlusMarks';
import Reveal from '@/components/Reveal';

type Props = {
  eyebrow?: string;
  index?: string;
  quote: ReactNode;
  attribution: string;
  className?: string;
};

// Voice-of-firm intermission. Full-bleed ink-deep slab carrying a single
// pull-quote in display type, framed with corner plus marks and bracketed
// by a monospace eyebrow row above and attribution below.
export default function DoctrineBroadside({
  eyebrow = 'DOCTRINE',
  index,
  quote,
  attribution,
  className = '',
}: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[var(--color-ink-deep)] px-[58px] py-[140px] ${className}`}
    >
      <div className="relative mx-auto max-w-[1323px]">
        <PlusMarks tone="paper" density="frame" inset={-4} />

        <div
          className="mb-[44px] flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/55"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>· {eyebrow}</span>
          {index ? <span>{index}</span> : null}
        </div>

        <Reveal>
          <p className="font-display max-w-[20ch] text-[40px] leading-[1.08] tracking-[-0.022em] text-white md:text-[52px] lg:text-[60px]">
            {quote}
          </p>
        </Reveal>

        <div
          className="mt-[64px] flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/55"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span aria-hidden="true" className="inline-block h-px w-[28px] bg-white/30" />
          <span>{attribution}</span>
        </div>
      </div>
    </section>
  );
}
