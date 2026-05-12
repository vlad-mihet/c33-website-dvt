'use client';

import { useRef } from 'react';
import { ArrowUpRight, CalendarIcon, ChevronLeft, ChevronRight } from './icons';
import { homeArticles } from '@/lib/content/insights';
import Reveal from './Reveal';

type CarouselArticle = { date: string; title: string };

function ArticleCard({ article }: { article: CarouselArticle }) {
  return (
    <article className="group shrink-0 w-[463px] h-[423px] bg-white border border-line hover:border-ink/40 rounded-[29px] p-[45px] relative transition-[border-color,transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
      <div className="inline-flex items-center gap-2 bg-chip rounded-full px-3 h-[38px] text-[12px] text-ink">
        <CalendarIcon className="size-[14px]" />
        {article.date}
      </div>
      <h3 className="mt-[55px] text-[28px] leading-[33px] text-ink">{article.title}</h3>
      <a
        href="#"
        className="absolute bottom-[45px] left-[45px] inline-flex items-center gap-2 bg-white border border-black/85 hover:bg-ink hover:text-white transition-colors text-ink text-[12px] pl-[26px] pr-[13px] py-[11px] rounded-full"
      >
        Read more
        <ArrowUpRight className="size-[20px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    <section id="insights" className="py-[120px]">
      <Reveal className="flex flex-col items-center gap-8 mb-[80px] px-[58px]">
        <p className="font-medium text-[15px] tracking-[0.12em] uppercase text-mute-2">Articles</p>
        <h2 className="text-[34px] leading-[40px] text-ink">Insights</h2>
      </Reveal>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto px-[58px] py-6 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {homeArticles.map((article, i) => (
            <Reveal key={i} delay={i * 100} className="snap-start">
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-[60px]">
        <button
          onClick={() => scrollBy(-480)}
          className="size-[61px] rounded-full bg-white border border-line flex items-center justify-center hover:bg-chip transition-colors"
          aria-label="Previous article"
        >
          <ChevronLeft className="size-6 text-ink" />
        </button>
        <button
          onClick={() => scrollBy(480)}
          className="size-[61px] rounded-full bg-ink text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Next article"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </section>
  );
}
