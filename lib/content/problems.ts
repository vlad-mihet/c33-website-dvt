export type Problem = {
  index: string;
  title: string;
  body: string;
};

// "What mid-market CFOs face." Four sharp statements, no dossier theater.
// Numbered 01-04, restrained copy, rendered as a list — not feature cards.
export const problems: Problem[] = [
  {
    index: '01',
    title: 'Speed Mismatch',
    body: 'Mid-market mandates wait quarters for a credit decision the data could have answered in days. Cycle time has become the cost.',
  },
  {
    index: '02',
    title: 'Fragmented Capital Stack',
    body: 'Debt, equity, and direct lending sit in different rooms with different incentives. Borrowers carry the integration tax.',
  },
  {
    index: '03',
    title: 'Stale Underwriting',
    body: 'Most lenders price off annual statements and collateral. Operating cash flow tells a sharper, fresher story — and most are not reading it.',
  },
  {
    index: '04',
    title: 'Misaligned Incentives',
    body: 'Fee-driven mandates push deals to close, not to fit. Capital33 is paid to be right about the structure, not just present at the table.',
  },
];
