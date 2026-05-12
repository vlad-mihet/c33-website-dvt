import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site';
import './globals.css';

// Display face — Bricolage Grotesque. Variable-width grotesque with subtle
// character; used for poster-scale headlines only. Body stays on Helvetica
// Neue (set in globals.css).
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// Mono — JetBrains Mono. Used for eyebrows, numbered labels, terminal strip,
// and any technical metadata. Loaded as a CSS variable so it can be referenced
// from globals.css.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s — Capital33',
    default: 'Capital33 — Capital for Complex Growth',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Capital33' }],
  generator: 'Next.js',
  keywords: [
    'merchant bank',
    'capital raising',
    'direct lending',
    'mid-market finance',
    'AI underwriting',
    'debt raise',
    'equity raise',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Capital33 — Capital for Complex Growth',
    description: siteConfig.description,
    // images: auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital33 — Capital for Complex Growth',
    description: siteConfig.description,
    // images: auto-injected from app/opengraph-image.tsx
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#111012',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable}`}>
      <body className="bg-white text-ink min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
