import { type ReactNode } from 'react';
import type { FieldTheme } from './fieldStyles';

type SuccessCardProps = {
  theme?: FieldTheme;
  // Style the card as a full-width panel (ContactForm dark) or a compact pill
  // (NewsletterForm). Default 'panel' suits ContactForm/WaitlistForm.
  variant?: 'panel' | 'pill';
  children: ReactNode;
};

// Animated checkmark — stroke-dash draws over 400ms.
function CheckMark({ theme }: { theme: FieldTheme }) {
  const stroke = theme === 'dark' ? '#ffffff' : '#111012';
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-[28px]">
      <circle cx="16" cy="16" r="14.5" stroke={stroke} strokeOpacity="0.15" strokeWidth="1.4" />
      <path
        d="M9.5 16.5l4.5 4.5 9-10"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 28,
          strokeDashoffset: 28,
          animation: 'field-success-check 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards',
        }}
      />
    </svg>
  );
}

export default function SuccessCard({
  theme = 'light',
  variant = 'panel',
  children,
}: SuccessCardProps) {
  if (variant === 'pill') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={
          theme === 'dark'
            ? 'mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-[14px] text-white animate-[field-success-in_280ms_ease-out_both]'
            : 'mt-4 inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3 text-[14px] text-ink animate-[field-success-in_280ms_ease-out_both]'
        }
      >
        <CheckMark theme={theme} />
        <span>{children}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        theme === 'dark'
          ? 'rounded-[18px] border border-white/[0.10] bg-white/[0.04] p-10 text-center text-[16px] text-white animate-[field-success-in_280ms_ease-out_both]'
          : 'rounded-[18px] border border-black/[0.08] bg-white p-10 text-center text-[16px] text-ink animate-[field-success-in_280ms_ease-out_both]'
      }
    >
      <div className="mx-auto mb-4 flex justify-center">
        <CheckMark theme={theme} />
      </div>
      {children}
    </div>
  );
}
