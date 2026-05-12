'use client';

import { useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from './icons';
import { homeArticles } from '@/lib/content/insights';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import PlusMarks from './PlusMarks';

type CarouselArticle = { date: string; title: string };

function ArticleCard({ article, index, tinted }: { article: CarouselArticle; index: number; tinted: boolean }) {
  return (
    <article
      className={`group tx-card relative h-[423px] w-[463px] shrink-0 overflow-hidden border p-[40px] ${
        tinted
          ? 'spot-sky border-ink/15 hover:border-ink/40'
          : 'border-line bg-white hover:border-ink/40'
      }`}
    >
      <PlusMarks density="frame" inset={12} tone="ink" />

      <div className="flex items-start justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.22em] text-ink/70"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {article.date}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.22em] text-ink/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          / {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-[55px] font-display text-[28px] leading-[1.18] tracking-[-0.012em] text-ink">
        {article.title}
      </h3>

      <a
        href="#"
        className="tx-button absolute bottom-[40px] left-[40px] inline-flex items-center gap-2 rounded-full border border-ink bg-transparent py-[10px] pl-[24px] pr-[12px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Read more
        <ArrowUpRight className="tx-icon size-[18px]" />
      </a>
    </article>
  );
}

export default function Insights() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section id="insights" className="relative bg-white px-[58px] py-[120px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <Reveal className="mb-[80px] flex flex-col items-start gap-6">
          <Eyebrow variant="plus">INSIGHTS</Eyebrow>
          <h2 className="font-display text-[44px] leading-[1.04] tracking-[-0.024em] text-ink lg:text-[56px]">
            Reports and field notes
            <br />
            from the desk.
          </h2>
        </Reveal>

        <div className="relative">
          <div
            ref={trackRef}
            className="snap-x scroll-smooth flex gap-4 overflow-x-auto py-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {homeArticles.map((article, i) => (
              <Reveal key={i} delay={i * 100} className="snap-start">
                <ArticleCard article={article} index={i} tinted={i % 3 === 1} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-[40px] flex items-center justify-end gap-2">
          <button
            onClick={() => scrollBy(-480)}
            className="tx-button group flex h-[48px] w-[48px] items-center justify-center border border-ink/20 bg-white text-ink hover:border-ink hover:bg-ink hover:text-white"
            aria-label="Previous article"
          >
            <ChevronLeft className="size-[18px]" />
          </button>
          <button
            onClick={() => scrollBy(480)}
            className="tx-button group flex h-[48px] w-[48px] items-center justify-center border border-ink bg-ink text-white hover:bg-black"
            aria-label="Next article"
          >
            <ChevronRight className="size-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
