'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, CalendarIcon } from '@/components/icons';
import NewsletterForm from '@/components/forms/NewsletterForm';
import Reveal from '@/components/Reveal';
import { allArticles, type Article } from '@/lib/content/insights';

type Filter = 'All' | 'Blog posts' | 'Reports';
const filters: Filter[] = ['All', 'Blog posts', 'Reports'];

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="border-line group hover:border-ink/40 flex h-[423px] flex-col rounded-[29px] border bg-white p-[45px] transition-[border-color,transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
      <div className="bg-chip text-ink inline-flex h-[38px] items-center gap-2 self-start rounded-full px-3 text-[12px]">
        <CalendarIcon className="size-[14px]" />
        {article.date}
      </div>
      <h3 className="text-ink mt-[55px] text-[28px] leading-[33px]">{article.title}</h3>
      <a
        href="#"
        className="hover:bg-ink text-ink mt-auto inline-flex items-center gap-2 self-start rounded-full border border-black/85 bg-white py-[11px] pr-[13px] pl-[26px] text-[12px] transition-colors hover:text-white"
      >
        Read more
        <ArrowUpRight className="size-[20px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
}

function NewsletterSection() {
  return (
    <section className="dotted-bg relative px-[58px] py-[100px]">
      <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
        <p className="text-mute-2 text-[12px] font-medium tracking-[0.18em] uppercase">Subscribe to our newsletter</p>
        <h2 className="text-ink max-w-[760px] text-[44px] leading-[52px]">Stay Ahead of the Market.</h2>
        <p className="text-mute max-w-[460px] text-[17px] leading-[22px]">
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
      <section className="px-[58px] pt-[180px] pb-[60px]">
        <Reveal className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 text-center">
          <h1 className="text-ink max-w-[760px] text-[52px] leading-[1.05] tracking-[-0.01em]">
            We Publish What We Know.
          </h1>
          <p className="text-mute max-w-[625px] text-[17px] leading-[22px]">
            Market analysis, structured finance perspectives, and credit research written for CFOs, treasurers, and
            capital markets professionals who make decisions under pressure.
          </p>

          <div className="bg-chip mt-2 inline-flex items-center gap-1 rounded-full p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`rounded-full px-4 py-[8px] text-[12px] transition-colors ${
                  filter === f ? 'bg-ink text-white' : 'text-ink hover:bg-white/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-[58px] pb-[80px]">
        <div className="mx-auto grid max-w-[1418px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, i) => (
            <Reveal key={article.title} delay={(i % 6) * 80}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>

        {!showAll && filteredAll.length > visible.length && (
          <div className="mt-[48px] flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="hover:bg-ink inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] py-[11px] pr-[13px] pl-[26px] text-[12px] text-white transition-colors"
            >
              Load more
              <ArrowUpRight className="size-[20px] text-white" />
            </button>
          </div>
        )}
      </section>

      <NewsletterSection />
    </main>
  );
}
