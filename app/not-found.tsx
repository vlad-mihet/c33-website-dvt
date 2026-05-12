import Link from 'next/link';
import { ArrowUpRight } from '@/components/icons';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-[58px] text-center">
      <p className="text-mute-2 text-[12px] font-medium tracking-[0.18em] uppercase">404</p>
      <h1 className="text-ink max-w-[760px] text-[64px] leading-[1.05] tracking-[-0.01em]">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="text-mute max-w-[480px] text-[16px] leading-[24px]">
        The link may be outdated, or the page has moved.
      </p>
      <Link
        href="/"
        className="hover:bg-ink mt-4 inline-flex items-center gap-2 rounded-full bg-[rgba(17,16,18,0.9)] py-[11px] pr-[13px] pl-[26px] text-[12px] text-white transition-colors"
      >
        Back to home
        <ArrowUpRight className="size-[20px] text-white" />
      </Link>
    </main>
  );
}
