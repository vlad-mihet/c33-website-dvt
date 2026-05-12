type Variant = 'dot' | 'plus' | 'numbered';
type Tone = 'ink' | 'paper';

type Props = {
  children: string;
  variant?: Variant;
  /** For variant='numbered'. Two-digit zero-padded string, e.g. "01". */
  index?: string;
  /** `ink` (default) for light backgrounds, `paper` for dark backgrounds. */
  tone?: Tone;
  className?: string;
};

export default function Eyebrow({
  children,
  variant = 'dot',
  index,
  tone = 'ink',
  className = '',
}: Props) {
  const toneClass = tone === 'paper' ? 'eyebrow--paper' : '';
  const cls = [toneClass, className].filter(Boolean).join(' ');
  if (variant === 'numbered') {
    return (
      <p className={`eyebrow eyebrow-num ${cls}`.trim()}>
        <span className="eyebrow-index">{index ?? '01'}</span>
        {children}
      </p>
    );
  }
  if (variant === 'plus') {
    return (
      <p className={`eyebrow eyebrow-plus ${cls}`.trim()}>{children}</p>
    );
  }
  return <p className={`eyebrow ${cls}`.trim()}>{children}</p>;
}
