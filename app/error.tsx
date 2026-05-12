'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-[58px] text-center">
      <p className="text-mute-2 text-[12px] font-medium tracking-[0.18em] uppercase">Something went wrong</p>
      <h1 className="text-ink max-w-[760px] text-[48px] leading-[1.05] tracking-[-0.01em]">
        We hit a problem rendering this page.
      </h1>
      <p className="text-mute max-w-[480px] text-[16px] leading-[24px]">
        Try again, or head back to the home page.
      </p>
      <button
        onClick={reset}
        className="hover:bg-ink mt-4 inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] px-[26px] py-[11px] text-[12px] text-white transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
