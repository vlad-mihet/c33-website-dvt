'use client';

import { useEffect } from 'react';
import Eyebrow from '@/components/Eyebrow';
import PlusMarks from '@/components/PlusMarks';

// Global error boundary. Mirrors the 404 chrome: plus-mark frame, monospace
// metadata, display-font headline, mono uppercase "Try again" button.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[88vh] flex-col items-center justify-center gap-8 bg-white px-[58px] py-[120px] text-center">
      <PlusMarks density="cell" cols={6} rows={4} />
      <div className="relative flex flex-col items-center gap-6">
        <Eyebrow variant="plus">SOMETHING BROKE</Eyebrow>
        <h1 className="flex items-baseline gap-6 font-display text-[80px] leading-none tracking-[-0.034em] text-ink lg:text-[120px]">
          5xx
          <span
            className="text-[12px] uppercase tracking-[0.24em] text-ink-soft"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            · page render fault
          </span>
        </h1>
        <p className="max-w-[480px] text-[15px] leading-[24px] text-ink-soft">
          We hit a problem rendering this page. Try again, or head back to the home
          page — the desk is still open.
        </p>
        {error.digest && (
          <p
            className="text-[10px] uppercase tracking-[0.22em] text-ink-soft"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ref · {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="tx-button mt-2 inline-flex items-center gap-2 rounded-full border border-ink bg-white pl-[24px] pr-[14px] py-[12px] text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          + Try again
        </button>
      </div>
    </main>
  );
}
