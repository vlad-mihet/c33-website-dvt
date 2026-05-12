import Link from 'next/link';
import { LinkedInIcon, LogoMark } from './icons';
import PlusMarks from './PlusMarks';

// Footer — dark ink-deep slab. Plus-mark grid + typography carries the
// atmosphere; the previous DitheredOrbit sigil was retired so the
// "moon" motif is reserved for the Stats section's hubs treatment.
// Bottom legal strip is separated by a hairline.
export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="relative overflow-hidden bg-[var(--color-ink-deep)] text-white">
        <PlusMarks tone="paper" density="cell" cols={8} rows={4} />

        <div className="relative px-[58px] pt-[100px] pb-[60px]">
          <div className="relative mx-auto max-w-[1323px]">
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
              {/* Lockup + contact */}
              <div className="flex flex-col">
                <LogoMark className="h-[22px] w-[122px] text-white" color="white" />
                <p className="mt-[60px] max-w-[360px] font-display text-[26px] leading-[1.18] tracking-[-0.012em] text-white">
                  Engineered for scalable growth.
                </p>
                <div className="mt-[80px]">
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Get in touch
                  </p>
                  <a
                    href="mailto:hello@capital33.com"
                    className="tx-link mt-2 inline-block text-[16px] text-white underline underline-offset-4 hover:text-white/70"
                  >
                    hello@capital33.com
                  </a>
                </div>
              </div>

              {/* Sitemap */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Sitemap
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
                  {[
                    ['Services', '/services'],
                    ['C33 Platform', '/platform'],
                    ['Insights', '/insights'],
                    ['About', '/about'],
                    ['Careers', '/careers'],
                    ['Contact', '/contact'],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="tx-link text-white/80 hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office + social */}
              <div className="flex flex-col gap-10">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Office
                  </p>
                  <p className="mt-2 text-[14px] leading-[22px] text-white/85">
                    Str. Londra 26
                    <br />
                    Bucharest, Romania
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] text-white/55"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Social
                  </p>
                  <a
                    href="https://www.linkedin.com/company/c33"
                    className="tx-link mt-2 inline-flex items-center gap-2 text-[14px] text-white/85 hover:text-white"
                  >
                    <LinkedInIcon className="size-4" />
                    Capital33
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal strip — sibling to the main content, so the orbit above
            can't intrude here even if it overflows its container. */}
        <div className="relative border-t border-white/10 px-[58px] py-[24px]">
          <div
            className="mx-auto flex max-w-[1323px] flex-col items-start justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/45 md:flex-row md:items-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <p>© 2026 Capital 33 · All rights reserved</p>
            <div className="flex gap-6">
              <a href="#" className="tx-link hover:text-white">Terms &amp; Conditions</a>
              <a href="#" className="tx-link hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
