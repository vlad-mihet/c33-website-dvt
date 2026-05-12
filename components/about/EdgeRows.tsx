'use client';

import { useState } from 'react';

type EdgeItem = { title: string; body: string };

export default function EdgeRows({ items }: { items: EdgeItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex flex-col">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <li key={item.title} className="border-line-2 border-t last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="hover:bg-line-2/40 flex w-full items-start justify-between gap-6 py-7 text-left transition-colors"
            >
              <span className="text-ink text-[18px] leading-[1.4]">{item.title}</span>
              <span
                aria-hidden="true"
                className={`text-mute mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[16px] transition-transform ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'
              }`}
            >
              <p className="text-mute min-h-0 max-w-[640px] text-[15px] leading-[24px]">{item.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
