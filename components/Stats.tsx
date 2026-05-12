'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import DitheredOrbit from '@/components/DitheredOrbit';
import { stats } from '@/lib/content/stats';

// Scroll-linked progress bar. Bar width grows from 0 → 100% as the row
// passes through the comfortable viewport band.
function StatBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let rafId = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const centre = rect.top + rect.height / 2;
      const start = vh * 0.9;
      const end = vh * 0.45;
      const raw = (start - centre) / (start - end);
      const next = Math.max(0, Math.min(1, raw));
      setProgress((prev) => (Math.abs(prev - next) < 0.005 ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const outerWidthPct = progress * 100;

  return (
    <div ref={ref} className="relative h-[60px] w-full">
      <div
        className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
        style={{
          width: `${outerWidthPct}%`,
          backgroundImage:
            'linear-gradient(180deg, #14161e 0%, #07080d 50%, #03040a 100%)',
          boxShadow: [
            '0 14px 32px rgba(0,0,0,0.20)',
            'inset 0 1px 0 rgba(255,255,255,0.10)',
            'inset 0 -1px 0 rgba(0,0,0,0.45)',
          ].join(', '),
          willChange: 'width',
        }}
      >
        <div
          className="absolute top-[6px] bottom-[6px] left-[8px] right-[8px] rounded-full"
          style={{
            backgroundImage: [
              'linear-gradient(90deg, rgba(120,140,235,0.55) 0%, rgba(70,90,200,0.45) 16%, rgba(20,28,72,0.6) 40%, rgba(8,10,28,0.95) 70%, rgba(3,4,12,1) 100%)',
              'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%)',
            ].join(', '),
            backgroundColor: '#0a0e1f',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.20)',
              'inset 0 -1px 0 rgba(0,0,0,0.40)',
              'inset 6px 0 32px rgba(90,120,230,0.20)',
            ].join(', '),
          }}
        />
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-white px-[58px] py-[120px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[100px] grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow variant="plus">TRACK RECORD</Eyebrow>
            <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-ink lg:text-[56px]">
              Twelve years of capital,
              <br />
              measured in mandates closed.
            </h2>
            <p className="max-w-[420px] text-[14px] leading-[22px] text-ink-soft">
              Cross-border, cross-instrument, across cycle. The numbers below are the
              residue of disciplined desk work — not a marketing figure.
            </p>
          </div>
          <div className="relative">
            <DitheredOrbit cell={4} dot="#0e0d10" accent="#556be6" className="mx-auto max-w-[420px]" />
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>fig.03 / hubs</span>
              <span>· 10 nodes · live</span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-[120px]">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 80}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[470px_1fr] lg:gap-[60px]"
            >
              <div className="flex flex-col gap-[42px]">
                <p className="font-display text-[76px] leading-none tracking-[-0.024em] text-ink">{stat.value}</p>
                <p className="text-[14px] leading-[20px] text-mute" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stat.label}
                </p>
              </div>
              <StatBar />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
