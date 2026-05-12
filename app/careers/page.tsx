import type { Metadata } from 'next';
import { ArrowUpRight } from '@/components/icons';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import { jobs, type Job } from '@/lib/content/careers';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Capital33 is hiring. Join an EU-incorporated merchant bank building the future of capital markets and direct lending.',
  alternates: { canonical: '/careers' },
};

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 14s5-4.2 5-8.4A5 5 0 008 .5 5 5 0 003 5.6C3 9.8 8 14 8 14z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="6" r="1.7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M2 7l6-5 6 5v6.5A1.5 1.5 0 0112.5 15h-9A1.5 1.5 0 012 13.5V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6.5 15v-4.5h3V15" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function CheckSquareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JobRow({ job, index }: { job: Job; index: number }) {
  return (
    <article className="flex flex-col gap-6 border-t border-line-2 py-[48px] lg:flex-row lg:items-center lg:gap-10">
      <div className="flex shrink-0 items-baseline gap-3 lg:w-[160px]">
        <span
          className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-[14px] text-ink-soft">{job.index}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[22px] leading-[1.2] tracking-[-0.012em] text-ink lg:text-[26px]">{job.title}</h3>
        <p className="mt-3 max-w-[625px] text-[15px] leading-[22px] text-ink-soft">{job.description}</p>

        <ul
          className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-ink-soft"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <li className="inline-flex items-center gap-2">
            <PinIcon className="size-[12px]" /> {job.location}
          </li>
          <li className="inline-flex items-center gap-2">
            <HomeIcon className="size-[12px]" /> {job.remote}
          </li>
          <li className="inline-flex items-center gap-2">
            <CheckSquareIcon className="size-[12px]" /> {job.type}
          </li>
        </ul>
      </div>

      <a
        href={job.applyHref}
        className="group tx-button inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink bg-transparent py-[10px] pl-[22px] pr-[12px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white lg:self-center"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Apply Now
        <ArrowUpRight className="tx-icon size-[18px]" />
      </a>
    </article>
  );
}

export default function CareersPage() {
  return (
    <main>
      <section className="relative bg-white px-[58px] pt-[180px] pb-[100px]">
        <PlusMarks density="cell" cols={6} rows={4} />
        <Reveal className="relative mx-auto flex max-w-[1323px] flex-col items-start gap-8">
          <Eyebrow variant="plus">CAREERS</Eyebrow>
          <h1 className="font-display text-[56px] leading-[1.02] tracking-[-0.024em] text-ink lg:text-[80px]">
            Build the future
            <br />
            of finance.
          </h1>
          <p className="max-w-[560px] text-[16px] leading-[24px] text-ink-soft">
            Capital33 is growing. We are looking for people who combine financial rigour with
            genuine curiosity about what technology can do to markets.
          </p>
        </Reveal>
      </section>

      <section className="relative bg-white px-[58px] pb-[120px]">
        <div className="mx-auto max-w-[1323px]">
          <Reveal className="mb-[40px] flex items-center justify-between">
            <Eyebrow variant="numbered" index="01">OPEN ROLES</Eyebrow>
            <span
              className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(jobs.length).padStart(2, '0')} positions
            </span>
          </Reveal>
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 80}>
              <JobRow job={job} index={i} />
            </Reveal>
          ))}
          <div className="border-b border-line-2" />
        </div>
      </section>

      <section className="relative bg-[var(--color-paper-warm)] px-[58px] py-[140px]">
        <PlusMarks density="cell" cols={6} rows={3} />
        <Reveal className="relative mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
          <Eyebrow variant="plus">APPLY NOW</Eyebrow>
          <h2 className="font-display text-[40px] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[52px]">
            Interested? Let&rsquo;s talk.
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[22px] text-ink-soft">
            Send your CV and a short note on what you would bring to Capital33.
            <br />
            <a href="mailto:careers@capital33.com" className="text-ink underline underline-offset-4">
              careers@capital33.com
            </a>
          </p>
          <a
            href="mailto:careers@capital33.com"
            className="group tx-button mt-4 inline-flex items-center gap-2 rounded-full bg-ink pl-[24px] pr-[14px] py-[11px] text-[11px] uppercase tracking-[0.18em] text-white hover:bg-black"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Apply Now
            <ArrowUpRight className="tx-icon size-[18px] text-white" />
          </a>
        </Reveal>
      </section>
    </main>
  );
}
