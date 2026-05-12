'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from '@/components/icons';
import NewsletterForm from '@/components/forms/NewsletterForm';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import { allArticles, type Article } from '@/lib/content/insights';

type Filter = 'All' | 'Blog posts' | 'Reports';
const filters: Filter[] = ['All', 'Blog posts', 'Reports'];

type CardTone = 'white' | 'tint' | 'paper';

// Card tone is informative, not decorative:
//   · Reports     → spot-tint (pale periwinkle)  — signals long-form / authored
//   · Blog posts  → bg-white  by default; every 4th slot gets spot-paper-warm
//                                                for tonal rhythm without
//                                                adding a new saturated colour.
const TONE_CLASS: Record<CardTone, string> = {
  white: 'border-line bg-white',
  tint:  'spot-tint border-ink/15',
  paper: 'spot-paper border-ink/15',
};

function ArticleCard({ article, index, tone }: { article: Article; index: number; tone: CardTone }) {
  return (
    <article
      className={`group tx-card relative flex h-[423px] flex-col overflow-hidden border p-[40px] hover:border-ink/40 ${TONE_CLASS[tone]}`}
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
      <h3 className="mt-[55px] font-display text-[26px] leading-[1.18] tracking-[-0.012em] text-ink">
        {article.title}
      </h3>
      <a
        href="#"
        className="tx-button mt-auto inline-flex items-center gap-2 self-start rounded-full border border-ink bg-transparent py-[10px] pl-[22px] pr-[12px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Read more
        <ArrowUpRight className="tx-icon size-[18px]" />
      </a>
    </article>
  );
}

function NewsletterSection() {
  return (
    <section className="relative bg-[var(--color-paper-warm)] px-[58px] py-[120px]">
      <PlusMarks density="cell" cols={6} rows={3} />
      <Reveal className="relative mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
        <Eyebrow variant="plus">NEWSLETTER</Eyebrow>
        <h2 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
          Stay ahead of the market.
        </h2>
        <p className="max-w-[460px] text-[16px] leading-[24px] text-ink-soft">
          We deliver market analysis and structured finance insights directly to your inbox.
        </p>
        <NewsletterForm />
      </Reveal>
    </section>
  );
}

export default function InsightsPageClient() {
  const [filter, setFilter] = useState<Filter>('All');
  const [showAll, setShowAll] = useState(false);

  const filteredAll = useMemo(() => {
    return allArticles.filter((a) => {
      if (filter === 'All') return true;
      if (filter === 'Blog posts') return a.category === 'Blog post';
      return a.category === 'Report';
    });
  }, [filter]);

  const visible = showAll ? filteredAll : filteredAll.slice(0, 6);

  return (
    <main>
      <section className="relative bg-white px-[58px] pt-[180px] pb-[80px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <Reveal className="relative mx-auto flex max-w-[1323px] flex-col items-start gap-8">
          <Eyebrow variant="plus">INSIGHTS</Eyebrow>
          <h1 className="font-display text-[56px] leading-[1.02] tracking-[-0.024em] text-ink lg:text-[80px]">
            We publish what
            <br />
            we know.
          </h1>
          <p className="max-w-[625px] text-[16px] leading-[24px] text-ink-soft">
            Market analysis, structured finance perspectives, and credit research written for
            CFOs, treasurers, and capital markets professionals who make decisions under
            pressure.
          </p>

          <div
            className="mt-2 inline-flex items-center gap-1 border border-line-2 bg-paper-edge p-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`tx-button px-4 py-[8px] text-[10px] uppercase tracking-[0.22em] ${
                  filter === f ? 'bg-ink text-white' : 'text-ink hover:bg-white/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-[58px] pb-[100px]">
        <div className="mx-auto grid max-w-[1323px] grid-cols-1 gap-[6px] md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, i) => {
            const tone: CardTone =
              article.category === 'Report'
                ? 'tint'
                : i % 4 === 2
                  ? 'paper'
                  : 'white';
            return (
              <Reveal key={article.title} delay={(i % 6) * 80}>
                <ArticleCard article={article} index={i} tone={tone} />
              </Reveal>
            );
          })}
        </div>

        {!showAll && filteredAll.length > visible.length && (
          <div className="mt-[48px] flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="group tx-button inline-flex items-center gap-2 rounded-full bg-ink pl-[24px] pr-[14px] py-[11px] text-[11px] uppercase tracking-[0.18em] text-white hover:bg-black"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Load more
              <ArrowUpRight className="size-[18px] text-white" />
            </button>
          </div>
        )}
      </section>

      <NewsletterSection />
    </main>
  );
}
