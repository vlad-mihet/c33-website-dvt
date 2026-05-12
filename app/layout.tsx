import type { Metadata, Viewport } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site';
import './globals.css';

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
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital33 — Capital for Complex Growth',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
    <html lang="en">
      <body className="bg-white text-ink min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
