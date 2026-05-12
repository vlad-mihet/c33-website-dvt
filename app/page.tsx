import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import PlatformHow from '@/components/PlatformHow';
import DeskReadout from '@/components/DeskReadout';
import Stats from '@/components/Stats';
import DoctrineBroadside from '@/components/DoctrineBroadside';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <PlatformHow />
      <DeskReadout
        eyebrow="DESK ACTIVITY"
        timestamp="YTD · 2026"
        figId="fig.04 / desk activity"
        items={[
          {
            label: 'MANDATES CLOSED',
            value: '14',
            note: 'senior · unitranche · mezzanine',
          },
          {
            label: 'CYCLE TIME (MEDIAN)',
            value: '11 days',
            note: 'mandate signed → cash drawn',
          },
          {
            label: 'PORTFOLIO UNDER WATCH',
            value: '€620M',
            note: '47 facilities · 6 jurisdictions',
          },
        ]}
      />
      <Stats />
      <DoctrineBroadside
        eyebrow="OPERATING PRINCIPLE"
        quote={
          <>
            We lend on forward cash flow.{' '}
            <em className="not-italic text-[var(--color-glow)]">
              Not on collateral packs. Not on quarterly statements.
            </em>
          </>
        }
        attribution="Capital33 · Credit Committee"
      />
      <Insights />
      <Contact />
    </>
  );
}
