export type FlowStep = {
  code: string;
  title: string;
  body: string;
};

// Three-step product narrative for the C33 / SOMA platform section.
// Restrained — three steps, three short statements, one shared illustration
// (DitheredTopography sigil) anchoring the section. No per-step vignettes.
export const platformFlow: FlowStep[] = [
  {
    code: '01',
    title: 'Connect',
    body: 'Plug your operating data into SOMA — bank feeds, accounting, internal cash flow. No collateral packs, no quarterly statements.',
  },
  {
    code: '02',
    title: 'Underwrite',
    body: 'Automated underwriting proposes instruments, sizing, and covenants. A senior credit committee reviews, calibrates, and signs.',
  },
  {
    code: '03',
    title: 'Close',
    body: 'Cycle time measured in days, not quarters. Continuous monitoring after close — early warning signals, dynamic risk views.',
  },
];
