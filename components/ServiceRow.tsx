'use client';

import { useState, type ReactNode } from 'react';
import { ArrowUpRight } from './icons';

export type Bullet = {
  icon: ReactNode;
  text: string;
};

export type ServiceRowData = {
  index: string;
  title: string;
  subtitle: string;
  intro: string;
  bulletsHeading: string;
  bullets: Bullet[];
};

export default function ServiceRow({
  data,
  open,
  onToggle,
}: {
  data: ServiceRowData;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden border border-line-2 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="tx-row flex w-full items-center justify-between bg-paper-edge px-[40px] py-[48px] text-left hover:bg-[#e3e1dd]"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-baseline gap-[60px] lg:gap-[120px]">
          <span
            className="shrink-0 text-[14px] uppercase tracking-[0.22em] text-ink-soft"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {data.index}
          </span>
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="font-display text-[26px] leading-none tracking-[-0.012em] text-ink whitespace-nowrap">
              {data.title}
            </h3>
            <p className="truncate text-[15px] leading-[22px] text-ink-soft">{data.subtitle}</p>
          </div>
        </div>

        <span
          className={`ml-6 flex size-[56px] shrink-0 items-center justify-center border border-ink/15 bg-white text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <ExpandablePanel open={open}>
        <div className="grid grid-cols-1 gap-x-[80px] gap-y-[40px] bg-[var(--color-ink-deep)] px-[40px] py-[60px] text-white lg:grid-cols-2">
          <div className="flex flex-col gap-[28px]">
            <p className="max-w-[450px] text-[15px] leading-[24px] text-white/85">{data.intro}</p>
            <a
              href="#contact"
              className="group tx-button inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-transparent py-[10px] pl-[20px] pr-[12px] text-[11px] uppercase tracking-[0.18em] text-white hover:border-white/60"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Find out more
              <ArrowUpRight className="tx-icon size-[18px]" />
            </a>
          </div>

          <div className="flex flex-col gap-[26px]">
            <p
              className="text-[10px] uppercase tracking-[0.22em] text-white/70"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {data.bulletsHeading}
            </p>
            <ul className="flex flex-col gap-[18px]">
              {data.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-[20px]">
                  <span className="flex size-[44px] shrink-0 items-center justify-center border border-white/10 bg-white/5 text-white">
                    {bullet.icon}
                  </span>
                  <span className="text-[15px] leading-[22px] text-white">{bullet.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ExpandablePanel>
    </div>
  );
}

function ExpandablePanel({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-500 ease-out"
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function useAccordion(initial: number | null = null) {
  const [open, setOpen] = useState<number | null>(initial);
  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i));
  return { open, toggle };
}
