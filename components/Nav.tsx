'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, LogoMark } from './icons';

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'C33 Platform', href: '/platform' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav({ darkOnLight = true }: { darkOnLight?: boolean }) {
  const pathname = usePathname();
  const textColor = darkOnLight ? 'text-ink' : 'text-white';

  return (
    <nav className="absolute top-0 right-0 left-0 z-50 px-[58px] pt-[34px]">
      <div className="mx-auto flex max-w-[1323px] items-center justify-between">
        <Link href="/" className="block">
          <LogoMark className={`h-[22px] w-[122px] ${textColor}`} color="currentColor" />
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center justify-center rounded-full px-3 py-[11px] text-[12px] transition-colors ${
                    active
                      ? 'bg-ink text-white'
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
          className={`inline-flex h-[38px] items-center gap-1.5 rounded-full pr-[13px] pl-[19px] text-[12px] transition-colors ${
            darkOnLight
              ? 'border-ink text-ink border border-black/10 bg-white hover:border-black/30'
              : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Request a Call
          <ArrowUpRight className="size-[20px]" />
        </Link>
      </div>
    </nav>
  );
}
