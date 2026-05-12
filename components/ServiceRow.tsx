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
    <div className="rounded-[29px] overflow-hidden">
      {/* Collapsed/header row — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-[#e8e8e8] hover:bg-[#dedede] transition-colors px-[47px] py-[54px] flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-[100px] min-w-0">
          <span className="text-[22px] text-ink shrink-0">{data.index}</span>
          <div className="flex flex-col gap-3 min-w-0">
            <h3 className="text-[22px] leading-none text-ink whitespace-nowrap">{data.title}</h3>
            <p className="text-[16px] leading-[24px] text-ink truncate">{data.subtitle}</p>
          </div>
        </div>

        <span
          className={`shrink-0 ml-6 size-[63px] rounded-full bg-white border border-black/10 flex items-center justify-center transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5 text-ink">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Expanded panel */}
      <ExpandablePanel open={open}>
        <div className="bg-black text-white px-[47px] py-[60px] grid grid-cols-1 lg:grid-cols-2 gap-x-[80px] gap-y-[40px]">
          <div className="flex flex-col gap-[28px]">
            <p className="text-[15px] leading-[24px] text-white/85 max-w-[450px]">{data.intro}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 self-start bg-black border border-white/20 hover:border-white/50 transition-colors text-white text-[12px] pl-[18px] pr-[13px] py-[11px] rounded-full"
            >
              Find out more
              <ArrowUpRight className="size-[20px]" />
            </a>
          </div>

          <div className="flex flex-col gap-[26px]">
            <p className="text-[15px] font-medium text-white">{data.bulletsHeading}</p>
            <ul className="flex flex-col gap-[20px]">
              {data.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-[28px]">
                  <span className="shrink-0 size-[50px] bg-[#f6f6f6] rounded-[11px] flex items-center justify-center text-ink">
                    {bullet.icon}
                  </span>
                  <span className="text-[15px] leading-[24px] text-white">{bullet.text}</span>
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
