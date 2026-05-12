import type { ServiceRowData } from '@/components/ServiceRow';
import {
  CashflowIcon,
  ChartIcon,
  DataIcon,
  EquityIcon,
  ExchangeIcon,
  FlowIcon,
  ForecastIcon,
  GearIcon,
  HandshakeIcon,
  MonitorIcon,
  NetworkIcon,
  PartnerIcon,
  RefreshIcon,
  ShieldIcon,
  StrategicIcon,
} from '@/components/serviceIcons';

export type HomeServiceCard = {
  index: string;
  title: string;
  body: string;
};

export const homeServices: HomeServiceCard[] = [
  {
    index: '( 01 )',
    title: 'Debt Raise',
    body: 'We execute structured debt transactions across the full instrument spectrum. We map financing requirements against an extensive network of banks and alternative lenders, identifying optimal counterparties and structures with compressed timelines.',
  },
  {
    index: '( 02 )',
    title: 'Equity Raise',
    body: 'We source, structure, and close growth capital across private equity, mezzanine, and strategic investment mandates calibrated against governance requirements, dilution thresholds, and long-term value creation objectives.',
  },
  {
    index: '( 03 )',
    title: 'Direct Lending\n(C33™)',
    body: 'Our proprietary direct-lending platform underwrites bespoke credit using real-time cashflow analytics, accelerating decisions and tailoring covenants to each borrower’s operating profile.',
  },
];

export const services: ServiceRowData[] = [
  {
    index: '( 01 )',
    title: 'Debt Raise',
    subtitle: 'Structured Debt Solutions for Mid-Market and Large Enterprises.',
    intro:
      'We structure and arrange debt capital aligned with your cash flow profile, asset base, covenants, and long-term strategic plan.',
    bulletsHeading: 'Our debt raising solutions:',
    bullets: [
      { icon: <NetworkIcon className="size-[26px]" />, text: 'Syndicated loans, club deals, and private placements.' },
      { icon: <HandshakeIcon className="size-[26px]" />, text: 'Acquisition, LBO, and project finance.' },
      { icon: <RefreshIcon className="size-[26px]" />, text: 'Refinancing, maturity extension, and covenant resets.' },
      { icon: <ChartIcon className="size-[26px]" />, text: 'Multi-year CAPEX programmes.' },
      {
        icon: <FlowIcon className="size-[26px]" />,
        text: 'Working capital stabilisation during periods of growth or market volatility.',
      },
    ],
  },
  {
    index: '( 02 )',
    title: 'Equity Raise',
    subtitle: 'Growth Capital with Built-in Governance and Alignment.',
    intro: 'We guide you from initial positioning through the investor process to closing.',
    bulletsHeading: 'Our equity raising solutions:',
    bullets: [
      { icon: <EquityIcon className="size-[26px]" />, text: 'Private equity and mezzanine capital.' },
      {
        icon: <StrategicIcon className="size-[26px]" />,
        text: 'Strategic investments and minority control transactions.',
      },
      {
        icon: <ExchangeIcon className="size-[26px]" />,
        text: 'Equity-linked acquisition and transaction execution.',
      },
      {
        icon: <ShieldIcon className="size-[26px]" />,
        text: 'Balance sheet strengthening ahead of a step-change investment.',
      },
      {
        icon: <PartnerIcon className="size-[26px]" />,
        text: 'Shareholder rebalancing and long-term partnership structuring.',
      },
    ],
  },
  {
    index: '( 03 )',
    title: 'Direct Lending (C33™)',
    subtitle: 'Fast and Reliable Credit, Powered by Continuous Data.',
    intro:
      'Through our direct lending arm, we deploy our own capital via a fully digital platform and proprietary algorithms.',
    bulletsHeading: 'Our direct lending solutions:',
    bullets: [
      {
        icon: <CashflowIcon className="size-[26px]" />,
        text: 'Working capital facilities designed around real operating cycles.',
      },
      {
        icon: <MonitorIcon className="size-[26px]" />,
        text: 'Continuous monitoring, early warning signals, and dynamic risk views.',
      },
      { icon: <DataIcon className="size-[26px]" />, text: 'Real-time data ingestion for faster, disciplined decisions.' },
      { icon: <GearIcon className="size-[26px]" />, text: 'Automated underwriting with clearly defined controls.' },
      { icon: <ForecastIcon className="size-[26px]" />, text: 'Daily-precision forecasting of short-term cash flow gaps.' },
    ],
  },
];
