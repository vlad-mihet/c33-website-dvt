import { type ReactNode } from 'react';
import { fieldStyles, type FieldTheme } from './fieldStyles';

type FieldProps = {
  id: string;
  error?: string;
  hint?: string;
  theme?: FieldTheme;
  children: ReactNode;
  // Allow callers to widen / position the field within their layout.
  className?: string;
};

// Wraps any field primitive (Input/Select/Textarea) and renders the inline
// hint or error message below. Owns the aria-describedby contract — the inner
// primitive reads `${id}-message` to announce errors.
export default function Field({
  id,
  error,
  hint,
  theme = 'light',
  children,
  className = '',
}: FieldProps) {
  const styles = fieldStyles[theme];
  const messageId = `${id}-message`;
  const showError = !!error;
  const showHint = !error && !!hint;

  return (
    <div className={className}>
      {children}
      {showError && (
        <p
          id={messageId}
          role="alert"
          className={`mt-2 flex items-center gap-1.5 text-[12px] leading-[16px] ${styles.error} animate-[field-error-in_220ms_ease-out_both]`}
        >
          <svg
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="size-[14px] shrink-0"
          >
            <path
              d="M7 1.5L13 12H1L7 1.5z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M7 6v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="10.5" r="0.6" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
      {showHint && (
        <p id={messageId} className={`mt-2 text-[12px] leading-[16px] ${styles.hint}`}>
          {hint}
        </p>
      )}
    </div>
  );
}
