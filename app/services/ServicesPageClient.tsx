'use client';

import { useState } from 'react';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import ServiceRow from '@/components/ServiceRow';
import { services } from '@/lib/content/services';

function ServicesHero() {
  return (
    <section className="relative px-3 pt-3">
      <div className="services-hero relative h-[820px] overflow-hidden rounded-[28px]">
        {/* Foreground topographic landscape silhouettes */}
        <svg
          viewBox="0 0 1440 820"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ridge1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1d35" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0a0c20" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="ridge2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2e4d" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0e1230" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="ridge3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3f63" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1a1f48" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0,640 C140,610 230,625 320,600 C420,565 520,600 620,575 C740,545 820,595 940,565 C1060,535 1180,575 1290,555 C1380,540 1440,560 1440,560 L1440,820 L0,820 Z"
            fill="url(#ridge3)"
          />
          <path
            d="M0,705 C160,675 280,710 400,685 C520,660 620,705 740,680 C860,655 960,700 1080,680 C1200,660 1320,705 1440,690 L1440,820 L0,820 Z"
            fill="url(#ridge2)"
          />
          <path
            d="M0,765 C140,735 260,760 380,745 C500,730 600,760 720,745 C860,725 960,760 1080,745 C1200,730 1320,760 1440,755 L1440,820 L0,820 Z"
            fill="url(#ridge1)"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center px-8 pt-[200px] text-center">
          <h1 className="text-ink max-w-[902px] text-[52px] leading-[1.05] tracking-[-0.01em]">
            Three Capabilities. One Integrated
            <br />
            View of Capital
          </h1>
          <p className="text-ink-soft mt-[36px] max-w-[622px] text-[15px] leading-[22px]">
            Capital33 operates across debt raising, capital raising, and direct lending.
          </p>
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

      <section className="px-3 pt-[60px] pb-[60px]">
        <div className="mx-auto flex max-w-[1418px] flex-col gap-4">
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
