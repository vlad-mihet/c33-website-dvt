import type { Metadata } from 'next';
import InsightsPageClient from './InsightsPageClient';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Market analysis, structured finance perspectives, and credit research from Capital33 — written for CFOs, treasurers, and capital markets professionals.',
  alternates: { canonical: '/insights' },
};

export default function Page() {
  return <InsightsPageClient />;
}
