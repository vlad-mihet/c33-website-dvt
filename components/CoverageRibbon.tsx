import Reveal from '@/components/Reveal';

type Props = {
  label?: string;
  items: string[];
  metadata?: string;
  className?: string;
};

// Slim warm-gold band. Editorial breath; communicates breadth (sectors,
// geographies, instruments) without competing with surrounding sections.
// Not deployed on the homepage by default — reserved for /services,
// /platform, or as a slot above Contact on long pages.
export default function CoverageRibbon({
  label = 'COVERAGE UNIVERSE',
  items,
  metadata,
  className = '',
}: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[var(--color-gold)] px-[58px] py-[44px] text-ink ${className}`}
    >
      <div className="relative mx-auto max-w-[1323px]">
        <div
          className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink/75"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>+ {label}</span>
          {metadata ? <span>{metadata}</span> : null}
        </div>

        <Reveal>
          <p className="font-display mt-[18px] text-[22px] leading-[1.3] tracking-[-0.012em] text-ink md:text-[26px]">
            {items.map((item, i) => (
              <span key={item}>
                {item}
                {i < items.length - 1 ? <span className="mx-3 text-ink/45">·</span> : null}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
