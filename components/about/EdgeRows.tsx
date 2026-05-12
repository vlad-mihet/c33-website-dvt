'use client';

import { useState } from 'react';

type EdgeItem = { title: string; body: string };

// "Our Edge" accordion. Numbered rows in monospace, display-font titles,
// sharp toggle marker. Mirrors the engineering-blueprint vocabulary used
// on Services, Problem, and Insights.
export default function EdgeRows({ items }: { items: EdgeItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex flex-col">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <li key={item.title} className="border-t border-line-2 last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="tx-row grid w-full grid-cols-[64px_1fr_auto] items-start gap-6 py-7 text-left hover:bg-paper-edge/60"
            >
              <span
                className="pt-1 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[20px] leading-[1.28] tracking-[-0.01em] text-ink lg:text-[22px]">
                {item.title}
              </span>
              <span
                aria-hidden="true"
                className={`inline-flex size-6 shrink-0 items-center justify-center border border-ink/20 text-ink-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-3">
                  <path d="M8 2.5V13.5M2.5 8H13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="grid min-h-0 grid-cols-[64px_1fr] gap-6">
                <span aria-hidden="true" />
                <p className="max-w-[640px] text-[15px] leading-[24px] text-ink-soft">{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
