import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowUpRight } from '@/components/icons';

type SubmitVariant = 'inkOnLight' | 'whiteOnDark' | 'accentOnDark';

type SubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  pending?: boolean;
  pendingLabel?: string;
  variant?: SubmitVariant;
  // Hide the trailing arrow icon.
  hideIcon?: boolean;
  children: ReactNode;
};

// Mono-uppercase pill buttons — same language as the site-wide CTAs. The
// three variants:
//   inkOnLight   — primary CTA on white surfaces
//   whiteOnDark  — primary CTA on the dark form panel / dark slabs
//   accentOnDark — kept for callers; aliases to whiteOnDark visuals so the
//                  Guardbase aesthetic stays consistent (periwinkle is for
//                  accents and headlines, not buttons).
const variantClass: Record<SubmitVariant, string> = {
  inkOnLight:
    'bg-ink text-white hover:bg-black ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
  whiteOnDark:
    'bg-white text-ink hover:bg-white/85 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
  accentOnDark:
    'bg-white text-ink hover:bg-white/85 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
};

const Spinner = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className={`size-[16px] animate-[field-spin_750ms_linear_infinite] ${className}`}
  >
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path
      d="M17.5 10a7.5 7.5 0 00-7.5-7.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function SubmitButton({
  pending = false,
  pendingLabel = 'Sending…',
  variant = 'inkOnLight',
  hideIcon = false,
  children,
  className = '',
  disabled,
  ...rest
}: SubmitButtonProps) {
  return (
    <button
      {...rest}
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={[
        'group tx-button relative inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap',
        'pl-[26px] pr-[14px] py-[12px]',
        'text-[11px] uppercase tracking-[0.18em]',
        variantClass[variant],
        className,
      ].join(' ')}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span
        className={`inline-flex items-center gap-2 transition-opacity duration-150 ${
          pending ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
        {!hideIcon && <ArrowUpRight className="tx-icon size-[18px]" />}
      </span>
      <span
        aria-hidden={!pending}
        className={`absolute inset-0 inline-flex items-center justify-center gap-2 transition-opacity duration-150 ${
          pending ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Spinner />
        <span>{pendingLabel}</span>
      </span>
    </button>
  );
}
