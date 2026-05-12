'use client';

import { useState } from 'react';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import ServiceRow from '@/components/ServiceRow';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import DitheredTopography from '@/components/DitheredTopography';
import { services } from '@/lib/content/services';

function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-white px-[58px] pt-[180px] pb-[120px]">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative mx-auto max-w-[1323px]">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow variant="plus">SERVICES</Eyebrow>
            <h1 className="font-display text-[56px] leading-[1.02] tracking-[-0.024em] text-ink lg:text-[80px]">
              Three capabilities.
              <br />
              One integrated view of capital.
            </h1>
            <p className="max-w-[520px] text-[16px] leading-[26px] text-ink-soft">
              Capital33 operates across debt raising, capital raising, and direct lending —
              assembled and executed from the same desk so structure follows context.
            </p>
          </Reveal>
          <div className="relative">
            <PlusMarks density="frame" inset={-8} />
            <DitheredTopography cell={5} dot="#556be6" className="border border-line-2" />
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>fig.s1 / risk surface</span>
              <span>· contour @ 0.38 / 0.55 / 0.72</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main>
      <ServicesHero />

      <section className="bg-white px-[58px] pt-[60px] pb-[120px]">
        <div className="mx-auto flex max-w-[1323px] flex-col gap-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <ServiceRow
                data={service}
                open={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
