import Reveal from '@/components/Reveal';

type Item = {
  label: string;
  value: string;
  note?: string;
};

type Props = {
  eyebrow?: string;
  timestamp?: string;
  items: Item[];
  figId?: string;
  className?: string;
};

// Institutional market readout. Three credible data points under monospace
// headers, anchored only by the eyebrow + figure caption — no decorative
// sigil, because the DitheredOrbit is reserved for the Stats section's
// "global hubs" treatment and reusing it here created a moon-stutter.
export default function DeskReadout({
  eyebrow = 'FROM THE DESK',
  timestamp,
  items,
  figId = 'fig.04 / desk readout',
  className = '',
}: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[var(--color-ink-deep)] px-[58px] py-[100px] ${className}`}
    >
      <div className="relative mx-auto max-w-[1323px]">
        <div
          className="mb-[48px] flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/55"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>+ {eyebrow}</span>
          {timestamp ? <span>{timestamp}</span> : null}
        </div>

        <Reveal className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-y-0">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-3 md:px-[40px] ${
                i > 0 ? 'md:border-l md:border-white/10' : ''
              } ${i === 0 ? 'md:pl-0' : ''} ${i === items.length - 1 ? 'md:pr-0' : ''}`}
            >
              <span
                className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </span>
              <p className="font-display text-[44px] leading-none tracking-[-0.022em] text-white md:text-[52px]">
                {item.value}
              </p>
              {item.note ? (
                <span
                  className="text-[11px] uppercase tracking-[0.18em] text-white/45"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.note}
                </span>
              ) : null}
            </div>
          ))}
        </Reveal>

        <div
          className="mt-[56px] flex items-end justify-between text-[10px] uppercase tracking-[0.22em] text-white/45"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>· {figId}</span>
          <span aria-hidden="true" className="hidden md:inline">
            ·· ·  · · ·· · ·  ·· ·· · ·· ·  · ·· · ·· · ·· · · ·
          </span>
        </div>
      </div>
    </section>
  );
}
