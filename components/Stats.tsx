'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';
import { stats } from '@/lib/content/stats';

// Scroll-linked progress bar. As the row scrolls up through the viewport,
// `progress` interpolates 0 → 1; the bar (outer dark pill + glassy inner)
// grows from width 0 to the FULL row width in lockstep. All four rows
// share the same max width — only the scroll progress varies the visible
// extent. Matches the Figma play-mode behaviour where the bar's width is
// tweened with the scroll position.
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
      // Progress mapping:
      //   bar centre at 90% of viewport height → progress 0  (just entered bottom)
      //   bar centre at 45% of viewport height → progress 1  (comfortably in view)
      // Using the centre, not the top, so the fill peaks when the row is
      // optically centred in the viewport.
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

  // Outer pill width grows from 0 → 100% as scroll progresses. The inner
  // glass is absolutely positioned with edge insets (top/bottom 6px, left/
  // right 8px), so it follows the outer's growth automatically — at outer
  // width 0 it collapses to nothing, at outer width 100% it sits as a
  // glassy chrome inside the dark pill, exactly matching the Figma layers.
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
        {/* Inner glassy pill — anchored to outer's inset edges so it grows
            in lockstep with the outer. At outer-width 0 this is clipped to
            zero by the outer's overflow-hidden; at outer-width target it
            sits inset 8px left/right, 6px top/bottom. */}
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
    <section className="px-[58px] pt-[120px] pb-[120px]">
      <div className="max-w-[1323px] mx-auto flex flex-col gap-[137px]">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.value}
            delay={i * 80}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[470px_1fr] lg:gap-[60px]"
          >
            <div className="flex flex-col gap-[42px]">
              <p className="text-ink text-[76px] leading-none tracking-[-0.02em]">{stat.value}</p>
              <p className="text-mute text-[14px] leading-[20px]">{stat.label}</p>
            </div>
            <StatBar />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
