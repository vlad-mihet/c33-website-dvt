import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowUpRight } from '@/components/icons';

type SubmitVariant = 'inkOnLight' | 'whiteOnDark' | 'accentOnDark';

type SubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  pending?: boolean;
  pendingLabel?: string;
  variant?: SubmitVariant;
  // Hide the trailing arrow icon (Newsletter pill keeps it; some surfaces
  // prefer plain).
  hideIcon?: boolean;
  children: ReactNode;
};

const variantClass: Record<SubmitVariant, string> = {
  inkOnLight:
    'bg-[rgba(17,16,18,0.9)] text-white hover:bg-ink ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
  whiteOnDark:
    'bg-white text-ink hover:bg-white/90 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
  accentOnDark:
    'bg-[#3a59ff] text-white hover:bg-[#2845e8] ' +
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

// Submit button with idle / pending states. Width is locked to its idle size
// (via min-w from inline measurement is overkill — we pad the label/spinner
// equivalently so the button doesn't visibly re-flow).
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
  const arrowColor = variant === 'inkOnLight' || variant === 'accentOnDark' || variant === 'whiteOnDark' ? '' : '';
  const trailingIconClass =
    variant === 'whiteOnDark'
      ? 'text-ink'
      : 'text-white';

  return (
    <button
      {...rest}
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={[
        'relative inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap',
        'pr-[13px] pl-[26px] py-[12px] text-[12px]',
        'transition-colors duration-200',
        variantClass[variant],
        className,
      ].join(' ')}
    >
      <span
        className={`inline-flex items-center gap-2 transition-opacity duration-150 ${
          pending ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
        {!hideIcon && <ArrowUpRight className={`size-[20px] ${trailingIconClass} ${arrowColor}`} />}
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
