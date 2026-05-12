'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, LogoMark } from './icons';

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'Services',     href: '/services' },
  { label: 'C33 Platform', href: '/platform' },
  { label: 'Insights',     href: '/insights' },
  { label: 'About',        href: '/about'    },
  { label: 'Contact',      href: '/contact'  },
];

// Nav — two stacked strips: monospace metadata bar at the top, primary
// navigation row beneath. Both rows mirror the body section pattern exactly
// (outer wrapper with px-[58px], inner mx-auto max-w-[1323px]) so the logo
// lands at the same horizontal position as every section's content.
export default function Nav({ darkOnLight = true }: { darkOnLight?: boolean }) {
  const pathname = usePathname();
  const textColor = darkOnLight ? 'text-ink' : 'text-white';
  const muted     = darkOnLight ? 'text-ink-soft' : 'text-white/70';
  const borderC   = darkOnLight ? 'border-line-2' : 'border-white/15';

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 ${darkOnLight ? 'bg-white/85' : 'bg-[var(--color-ink-deep)]/85'} backdrop-blur`}>
      {/* Top metadata strip — monospace coordinates, always present. */}
      <div className={`border-b ${borderC} px-[58px] py-[8px]`}>
        <div
          className={`mx-auto flex max-w-[1323px] items-center justify-between text-[10px] uppercase tracking-[0.22em] ${muted}`}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>C33 / MERCHANT BANK · EST. 2024</span>
          <span className="hidden md:inline">Debt · equity · ai-underwritten direct lending</span>
          <span className="hidden sm:inline">
            {pathname === '/' ? 'HOME' : pathname?.toUpperCase().replace('/', '/ ')}
          </span>
        </div>
      </div>

      {/* Primary nav row */}
      <div className="px-[58px] py-[18px]">
        <div className="mx-auto flex max-w-[1323px] items-center justify-between">
          <Link href="/" className="block">
            <LogoMark className={`h-[20px] w-[110px] ${textColor}`} color="currentColor" />
          </Link>

          <ul
            className="hidden items-center gap-1 lg:flex"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {links.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`tx-button inline-flex items-center justify-center px-3 py-[8px] text-[11px] uppercase tracking-[0.18em] ${
                      active
                        ? darkOnLight
                          ? 'bg-ink text-white'
                          : 'bg-white text-ink'
                        : `${textColor} ${darkOnLight ? 'hover:bg-black/5' : 'hover:bg-white/10'}`
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className={`group tx-button inline-flex h-[36px] items-center gap-1.5 rounded-full pl-[18px] pr-[12px] text-[10px] uppercase tracking-[0.18em] ${
              darkOnLight
                ? 'border border-ink/20 bg-white text-ink hover:border-ink/50'
                : 'border border-white/25 bg-white/5 text-white hover:bg-white/15'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Request a Call
            <ArrowUpRight className="tx-icon size-[16px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
