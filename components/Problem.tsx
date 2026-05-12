import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import { problems } from '@/lib/content/problems';

// Two-column problem statement. Mirrors Guardbase frame 004's "What Keeps
// Security Teams Up At Night" — restrained type, numbered rows, no card
// chrome. Cell-density plus marks give the engineering-sheet read.
export default function Problem() {
  return (
    <section className="relative bg-white px-[58px] py-[160px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-[120px]">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow variant="plus">THE PROBLEM</Eyebrow>
            <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-ink lg:text-[56px]">
              What mid-market
              <br />
              CFOs face.
            </h2>
            <p className="mt-2 max-w-[420px] text-[15px] leading-[24px] text-ink-soft">
              Capital still moves on a schedule built for paper. The cost shows up in
              cycle time, in fragmented stacks, and in deals that close on terms that
              never quite fit.
            </p>
          </Reveal>

          <div className="flex flex-col">
            {problems.map((p, i) => (
              <Reveal key={p.index} delay={i * 90}>
                <div
                  className={`grid grid-cols-[72px_1fr] gap-x-8 py-[36px] ${
                    i === 0 ? 'border-y' : 'border-b'
                  } border-line-2`}
                >
                  <span
                    className="text-[13px] uppercase leading-[1.6] tracking-[0.16em] text-ink-soft"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {p.index}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] leading-[1.25] text-ink lg:text-[26px]">{p.title}</h3>
                    <p className="mt-3 max-w-[520px] text-[15px] leading-[24px] text-ink-soft">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
