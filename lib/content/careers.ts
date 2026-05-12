export type Job = {
  index: string;
  title: string;
  description: string;
  location: string;
  remote: 'Remote' | 'On-site' | 'Hybrid';
  type: 'Full Time' | 'Part Time' | 'Contract';
  applyHref: string;
};

export const jobs: Job[] = [
  {
    index: '( 01 )',
    title: 'Senior Back End Engineer',
    description:
      "Join our frontline team and become a trusted advisor to our community. We're looking for empathetic problem-solvers who want to help people manage their money better every single day.",
    location: 'Bucharest, Romania',
    remote: 'Remote',
    type: 'Full Time',
    applyHref: 'mailto:careers@capital33.com?subject=Senior Back End Engineer',
  },
  {
    index: '( 02 )',
    title: 'Senior Full-Stack Architect',
    description:
      "Join our frontline team and become a trusted advisor to our community. We're looking for empathetic problem-solvers.",
    location: 'Bucharest, Romania',
    remote: 'Remote',
    type: 'Full Time',
    applyHref: 'mailto:careers@capital33.com?subject=Senior Full-Stack Architect',
  },
  {
    index: '( 03 )',
    title: 'Risk, Compliance & Security',
    description:
      "Join our frontline team and become a trusted advisor to our community. We're looking for empathetic problem-solvers.",
    location: 'Bucharest, Romania',
    remote: 'Remote',
    type: 'Full Time',
    applyHref: 'mailto:careers@capital33.com?subject=Risk, Compliance %26 Security',
  },
  {
    index: '( 04 )',
    title: 'Corporate & Investment Banking',
    description:
      "Join our frontline team and become a trusted advisor to our community. We're looking for empathetic problem-solvers who want to help shape capital strategy across mid-market and large enterprises.",
    location: 'Bucharest, Romania',
    remote: 'Remote',
    type: 'Full Time',
    applyHref: 'mailto:careers@capital33.com?subject=Corporate %26 Investment Banking',
  },
];
