'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import DitheredArchitecture from '@/components/DitheredArchitecture';
import PlusMarks from '@/components/PlusMarks';
import { ArrowUpRight } from './icons';

// Capital33 hero — dark, luminous, figure-dominant.
//
// An inverted dithered landscape (bright peaks become halftone, dim sky
// stays empty) fills the viewport against an ink-deep base. Headline +
// body + CTAs overlay the lower-left over a soft dark scrim that keeps
// body copy legible regardless of where the halftone lands. On scroll,
// the landscape fades and blurs upward; the halo swells; the text
// rises out faster. The bottom edge of the figure is masked so the
// section blends seamlessly into Problem below.
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf = 0;
    const apply = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const p = Math.max(0, Math.min(1, -rect.top / vh));

      const halo = haloRef.current;
      const sigil = sigilRef.current;
      const scrim = scrimRef.current;
      const textCol = textColRef.current;
      const caption = captionRef.current;
      const cue = cueRef.current;

      if (halo) {
        halo.style.transform = `translate3d(0, ${-p * 20}px, 0) scale(${1 + p * 0.55})`;
        halo.style.opacity = String(Math.max(0, 0.55 - p * 0.4));
      }
      if (sigil) {
        sigil.style.transform = `translate3d(0, ${-p * 50}px, 0)`;
        sigil.style.opacity = String(Math.max(0, 1 - p * 1.1));
        sigil.style.filter = `blur(${p * 5}px)`;
      }
      if (scrim) {
        scrim.style.opacity = String(Math.max(0, 1 - p * 1.4));
      }
      if (textCol) {
        textCol.style.transform = `translate3d(0, ${-p * 140}px, 0)`;
        textCol.style.opacity = String(Math.max(0, 1 - p * 1.5));
      }
      if (caption) {
        caption.style.opacity = String(Math.max(0, 1 - p * 2));
      }
      if (cue) {
        cue.style.opacity = String(Math.max(0, 1 - p * 3));
        cue.style.transform = `translate3d(-50%, ${p * 28}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const accent: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(135deg, #556be6 0%, #8aa0ff 50%, #556be6 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-white px-[58px]"
    >
      {/* Halo — soft periwinkle ambient field on warm white paper. */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: '-15%',
          top: '5%',
          width: '900px',
          height: '900px',
          background:
            'radial-gradient(circle at 50% 50%, rgba(85,107,230,0.28) 0%, rgba(85,107,230,0.08) 35%, transparent 70%)',
          filter: 'blur(36px)',
          opacity: 0.7,
          willChange: 'transform, opacity',
        }}
      />

      {/* Fullscreen halftone landscape. Inverted: bright peaks → dots,
          dim sky and foreground → empty. Bottom-edge mask feathers the
          dither into the section break below. */}
      <div
        ref={sigilRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          willChange: 'transform, opacity, filter',
          transform: 'translate3d(0, 0, 0)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.55) 84%, rgba(0,0,0,0.18) 94%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.55) 84%, rgba(0,0,0,0.18) 94%, transparent 100%)',
        }}
      >
        <DitheredArchitecture
          src="/assets/hero-delta.webp"
          cell={10}
          dot="#556be6"
          bg="transparent"
          maxR={0.65}
          fill
          invert
          fallback="delta"
          dilate={2}
          className="absolute inset-0"
        />
      </div>

      {/* Warm-white scrim — fades the purple halftone over the text
          column so body copy reads cleanly. Layered: a left-bias ramp
          across the headline + a bottom floor under the CTAs. */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'linear-gradient(105deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.68) 30%, rgba(255,255,255,0.28) 52%, rgba(255,255,255,0) 75%)',
            'linear-gradient(0deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%)',
          ].join(', '),
          willChange: 'opacity',
        }}
      />

      {/* Plus marks frame */}
      <PlusMarks density="cell" cols={8} rows={5} />

      {/* Text content — anchored to the bottom of the viewport. The
          section already supplies px-[58px], so the inner wrapper only
          needs the centered 1323px max-width to match every other
          section's content edge. */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1323px] flex-col justify-end pt-[140px] pb-[180px]">
        <div
          ref={textColRef}
          className="flex max-w-[680px] flex-col gap-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1
            className="font-display text-[64px] font-medium leading-[0.96] tracking-[-0.03em] text-ink sm:text-[88px] lg:text-[108px]"
          >
            <span style={accent}>Capital</span> for
            <br />
            <span style={accent}>Complex</span> Growth.
          </h1>

          <p className="max-w-[480px] text-[16px] leading-[26px] text-ink-soft">
            A next-generation merchant bank for mid-market and large enterprises.
            Debt, equity, and AI-underwritten direct lending — closed at the speed
            of decision.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href="#services"
              className="group tx-button inline-flex h-[44px] items-center gap-2 rounded-full bg-ink pl-[24px] pr-[14px] text-[12px] uppercase tracking-[0.16em] text-white hover:bg-black"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Explore Services
              <ArrowUpRight className="tx-icon size-[20px] text-white" />
            </Link>
            <Link
              href="/platform"
              className="group tx-button inline-flex h-[44px] items-center gap-2 rounded-full border border-ink/15 bg-white pl-[22px] pr-[14px] text-[12px] uppercase tracking-[0.16em] text-ink hover:border-ink/40"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              See the C33 Platform
              <ArrowUpRight className="tx-icon size-[20px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Engineering caption — pinned upper-right, signals the figure. */}
      <div
        ref={captionRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[58px] top-[140px] z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft md:flex"
        style={{
          fontFamily: 'var(--font-mono)',
          willChange: 'opacity',
        }}
      >
        <span>fig.01 / catchment</span>
        <span aria-hidden="true">·</span>
        <span>halftone render · aerial section</span>
      </div>

      {/* Scroll cue — pinned at the bottom edge. */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[40px] left-1/2 z-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ink-soft"
        style={{
          fontFamily: 'var(--font-mono)',
          transform: 'translate3d(-50%, 0, 0)',
          willChange: 'transform, opacity',
        }}
      >
        <span>scroll · 02 / the problem</span>
        <span className="scroll-cue-line block h-[40px] w-px overflow-hidden bg-ink/15">
          <span className="scroll-cue-tick block h-[12px] w-full bg-ink/70" />
        </span>
      </div>
    </section>
  );
}
