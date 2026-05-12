type Tone = 'ink' | 'paper';
type Density = 'frame' | 'cell';

type Props = {
  /** `ink` = dark glyphs on light backgrounds; `paper` = light glyphs on dark. */
  tone?: Tone;
  /**
   * `frame` (default) places four `+` marks at the corners of the parent.
   * `cell` distributes plus marks across an internal grid (cols × rows) so
   * the parent reads as a measurement sheet, not just a frame.
   */
  density?: Density;
  /** Corner inset in pixels for `frame` density. Default 24. */
  inset?: number;
  /** Grid divisions for `cell` density. Default 4×3 (cols × rows). */
  cols?: number;
  rows?: number;
  className?: string;
};

// Plus-mark registration marks. The engineering-blueprint texture that runs
// through every Guardbase-inspired section. Parent must be `position:
// relative`. Two densities:
//   - frame: four marks at the corners (cheapest, default)
//   - cell:  marks at every intersection of a cols×rows grid (richest, used
//            on hero / 404 / heroic sections)
export default function PlusMarks({
  tone = 'ink',
  density = 'frame',
  inset = 24,
  cols = 4,
  rows = 3,
  className = '',
}: Props) {
  const color = tone === 'ink' ? 'rgba(17,16,18,0.20)' : 'rgba(255,255,255,0.25)';
  const baseStyle: React.CSSProperties = {
    color,
    fontFamily: 'var(--font-mono)',
  };

  if (density === 'cell') {
    // Generate marks at every (i, j) where i ∈ [0..cols], j ∈ [0..rows]
    // Positioned via CSS percentages so the layout is fluid.
    const marks: React.ReactNode[] = [];
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const left = `${(i / cols) * 100}%`;
        const top = `${(j / rows) * 100}%`;
        marks.push(
          <span
            key={`${i}-${j}`}
            aria-hidden="true"
            style={{
              ...baseStyle,
              position: 'absolute',
              left,
              top,
              transform: 'translate(-50%, -50%)',
            }}
            className="text-[12px] leading-none select-none"
          >
            +
          </span>
        );
      }
    }
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className}`}
      >
        {marks}
      </div>
    );
  }

  // density === 'frame'
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span style={{ ...baseStyle, position: 'absolute', left: inset, top: inset }} className="text-[14px] leading-none select-none">+</span>
      <span style={{ ...baseStyle, position: 'absolute', right: inset, top: inset }} className="text-[14px] leading-none select-none">+</span>
      <span style={{ ...baseStyle, position: 'absolute', left: inset, bottom: inset }} className="text-[14px] leading-none select-none">+</span>
      <span style={{ ...baseStyle, position: 'absolute', right: inset, bottom: inset }} className="text-[14px] leading-none select-none">+</span>
    </div>
  );
}
