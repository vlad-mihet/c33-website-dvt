export type Category = 'Blog post' | 'Report';

export type Article = {
  date: string;
  title: string;
  category: Category;
};

export const allArticles: Article[] = [
  {
    date: '10.04.26',
    title: 'Why Leveraged Loan Markets Are Tightening Faster Than Expected in 2026',
    category: 'Blog post',
  },
  { date: '15.04.26', title: 'Choosing the Right Structure for Growth Capital', category: 'Blog post' },
  { date: '20.04.26', title: 'Traditional Credit Assessment: Where the Gap Is Closing', category: 'Report' },
  {
    date: '25.04.26',
    title: 'ECB Rate Decisions and Their Cascading Effect on Mid-Market Borrowing Costs',
    category: 'Report',
  },
  {
    date: '30.04.26',
    title: 'Cash Flow Forecasting at Daily Precision: What CFOs Should Demand in 2026',
    category: 'Blog post',
  },
  {
    date: '01.05.26',
    title: 'When to Recapitalise: A Framework for Navigating Growth and Volatility',
    category: 'Report',
  },
  {
    date: '04.05.26',
    title: 'Mezzanine vs. Unitranche: Cost-of-Capital Tradeoffs in 2026',
    category: 'Blog post',
  },
  { date: '06.05.26', title: 'AI Underwriting: From Pilot to Production at the Mid-Market', category: 'Report' },
  {
    date: '08.05.26',
    title: 'Working Capital in Volatile Cycles: A Modern Treasurer’s Playbook',
    category: 'Blog post',
  },
];

export const homeArticles: Pick<Article, 'date' | 'title'>[] = [
  { date: '10.04.26', title: 'Choosing the Right Structure for Growth Capital' },
  { date: '10.04.26', title: 'Traditional Credit Assessment: Where the Gap Is Closing' },
  { date: '10.04.26', title: 'Mid-Market Debt: Pricing Across the Cycle' },
  { date: '10.04.26', title: 'AI Underwriting in Direct Lending' },
  { date: '10.04.26', title: 'Mezzanine vs. Unitranche: Cost of Capital Tradeoffs' },
  { date: '10.04.26', title: 'Why Cashflow Beats Collateral for Modern Lenders' },
];
