export type Stat = {
  value: string;
  label: string;
  /** Fraction of the bar that should be filled (0–1). */
  fill: number;
};

export const stats: Stat[] = [
  { value: '12+', label: 'Years of experience', fill: 0.22 },
  { value: '€2B', label: 'In debt raise transactions', fill: 0.82 },
  { value: '€200M', label: 'In equity raise transactions', fill: 0.42 },
  { value: '€10M+', label: 'In direct lending transactions', fill: 0.16 },
];
