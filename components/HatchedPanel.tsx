type Tone = 'light' | 'dark';

type Props = {
  tone?: Tone;
  className?: string;
  children?: React.ReactNode;
};

// Diagonal-hatch fill panel. Empty visual block used for grid-cell rhythm —
// pairs with PlusMarks density="cell" on the 404 page and as section
// dividers. `light` for paper backgrounds (faint ink stripes), `dark` for
// ink slabs (faint white stripes).
export default function HatchedPanel({
  tone = 'light',
  className = '',
  children,
}: Props) {
  return (
    <div className={`${tone === 'light' ? 'hatched' : 'hatched-dark'} ${className}`}>
      {children}
    </div>
  );
}
