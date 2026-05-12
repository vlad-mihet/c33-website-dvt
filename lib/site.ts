export const siteConfig = {
  name: 'Capital33',
  url: 'https://capital33.com',
  description:
    'Capital33 is a next-generation merchant bank focused on capital raising and AI-powered direct lending for mid-market and large enterprises.',
  // OG image is generated programmatically by app/opengraph-image.tsx.
  // Next.js auto-injects it into openGraph + twitter metadata.
  email: 'hello@capital33.com',
  careersEmail: 'careers@capital33.com',
  linkedin: 'https://www.linkedin.com/company/c33',
};

export const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'C33 Platform', href: '/platform' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
