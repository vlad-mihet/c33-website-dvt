import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Capital33 operates across debt raising, capital raising, and direct lending — three capabilities, one integrated view of capital.',
  alternates: { canonical: '/services' },
};

export default function Page() {
  return <ServicesPageClient />;
}
