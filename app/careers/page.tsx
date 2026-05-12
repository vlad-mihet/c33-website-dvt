import type { Metadata } from 'next';
import { ArrowUpRight } from '@/components/icons';
import Reveal from '@/components/Reveal';
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
      <path
        d="M8 14s5-4.2 5-8.4A5 5 0 008 .5 5 5 0 003 5.6C3 9.8 8 14 8 14z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="1.7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 7l6-5 6 5v6.5A1.5 1.5 0 0112.5 15h-9A1.5 1.5 0 012 13.5V7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
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

function JobRow({ job }: { job: Job }) {
  return (
    <article className="border-line flex flex-col gap-6 border-t py-[44px] lg:flex-row lg:items-center lg:gap-10">
      <p className="text-ink-soft shrink-0 text-[20px] lg:w-[140px]">{job.index}</p>

      <div className="min-w-0 flex-1">
        <h3 className="text-ink text-[20px] leading-[1.2]">{job.title}</h3>
        <p className="text-mute mt-3 max-w-[625px] text-[15px] leading-[22px]">{job.description}</p>

        <ul className="text-ink-soft mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[12px]">
          <li className="inline-flex items-center gap-2">
            <PinIcon className="size-[14px]" />
            {job.location}
          </li>
          <li className="inline-flex items-center gap-2">
            <HomeIcon className="size-[14px]" />
            {job.remote}
          </li>
          <li className="inline-flex items-center gap-2">
            <CheckSquareIcon className="size-[14px]" />
            {job.type}
          </li>
        </ul>
      </div>

      <a
        href={job.applyHref}
        className="hover:bg-ink text-ink inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-black/85 bg-white py-[11px] pr-[13px] pl-[22px] text-[12px] transition-colors hover:text-white lg:self-center"
      >
        Apply Now
        <ArrowUpRight className="size-[20px]" />
      </a>
    </article>
  );
}

export default function CareersPage() {
  return (
    <main>
      <section className="px-[58px] pt-[180px] pb-[60px]">
        <Reveal className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 text-center">
          <h1 className="text-ink max-w-[760px] text-[52px] leading-[1.05] tracking-[-0.01em]">
            Build the Future of
            <br />
            Finance
          </h1>
          <p className="text-mute max-w-[625px] text-[15px] leading-[22px]">
            Capital33 is growing. We are looking for people who combine financial rigour with genuine curiosity about
            what technology can do to markets.
          </p>
        </Reveal>
      </section>

      <section className="px-[58px] pb-[100px]">
        <div className="mx-auto max-w-[1300px]">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 80}>
              <JobRow job={job} />
            </Reveal>
          ))}
          <div className="border-line border-b" />
        </div>
      </section>

      <section className="dotted-bg relative px-[58px] py-[120px]">
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
          <p className="text-mute-2 text-[12px] font-medium tracking-[0.18em] uppercase">Apply Now</p>
          <h2 className="text-ink max-w-[760px] text-[40px] leading-[44px]">Interested? Let&rsquo;s Talk.</h2>
          <p className="text-mute max-w-[480px] text-[15px] leading-[22px]">
            Send your CV and a short note on what you would bring to Capital33.
            <br />
            <a href="mailto:careers@capital33.com" className="text-ink underline underline-offset-4">
              careers@capital33.com
            </a>
          </p>

          <a
            href="mailto:careers@capital33.com"
            className="hover:bg-ink mt-4 inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] py-[11px] pr-[13px] pl-[26px] text-[12px] text-white transition-colors"
          >
            Apply Now
            <ArrowUpRight className="size-[20px] text-white" />
          </a>
        </Reveal>
      </section>
    </main>
  );
}
