import Link from 'next/link';
import { ArrowUpRight } from '@/components/icons';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';
import HatchedPanel from '@/components/HatchedPanel';

// 404 — mirrors Guardbase frame 011. Empty grid cells filled with diagonal
// hatch, oversized "404 PAGE NOT FOUND" stamped across the middle, a
// monospace "+ BACK TO HOME" anchor, and engineering-blueprint plus marks
// everywhere.
export default function NotFound() {
  return (
    <main className="relative min-h-[88vh] bg-white px-[58px] pt-[160px] pb-[100px]">
      <PlusMarks density="cell" cols={6} rows={4} />

      <div className="relative mx-auto grid min-h-[60vh] max-w-[1323px] grid-cols-2 grid-rows-[1fr_1.4fr_1fr] gap-1 lg:grid-cols-4">
        {/* Top-left hatched quadrant */}
        <HatchedPanel className="aspect-square lg:col-span-1 lg:row-span-1" />
        {/* Top-centre empty */}
        <div className="aspect-square border border-line-2 lg:col-span-2" />
        <HatchedPanel className="aspect-square lg:col-span-1 lg:row-span-1" />

        {/* Centre row — 404 stamp spans all four columns */}
        <div className="col-span-2 flex flex-col items-center justify-center gap-8 px-6 py-12 lg:col-span-4">
          <Eyebrow variant="plus">PAGE NOT FOUND</Eyebrow>
          <h1 className="flex items-baseline gap-6 font-display text-[120px] leading-none tracking-[-0.04em] text-ink lg:text-[200px]">
            404
            <span
              className="text-[14px] uppercase tracking-[0.24em] text-ink-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              · page not found
            </span>
          </h1>
          <p className="max-w-[420px] text-center text-[15px] leading-[24px] text-ink-soft">
            The link may be outdated, or the page has moved. The desk is still open —
            check the homepage or reach out directly.
          </p>
          <Link
            href="/"
            className="group tx-button inline-flex items-center gap-2 rounded-full border border-ink bg-white pl-[24px] pr-[14px] py-[12px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            + Back to home
            <ArrowUpRight className="tx-icon size-[18px]" />
          </Link>
        </div>

        {/* Bottom row */}
        <HatchedPanel className="aspect-square lg:col-span-1" />
        <div className="aspect-square border border-line-2 lg:col-span-2" />
        <HatchedPanel className="aspect-square lg:col-span-1" />
      </div>
    </main>
  );
}
