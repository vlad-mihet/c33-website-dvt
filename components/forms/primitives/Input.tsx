import { forwardRef, type InputHTMLAttributes } from 'react';
import Field from './Field';
import { fieldGeometry, fieldStyles, type FieldTheme } from './fieldStyles';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  id: string;
  label: string;
  theme?: FieldTheme;
  error?: string;
  hint?: string;
  // Optional: caller can override the wrapper className (positioning within a
  // grid cell, etc.) — falls through to <Field>.
  fieldClassName?: string;
};

// Floating-label text input. The placeholder is set to a single space so the
// CSS `:placeholder-shown` selector can drive the floating label without
// requiring JS to track filled state.
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    theme = 'light',
    error,
    hint,
    required,
    disabled,
    className = '',
    fieldClassName = '',
    ...inputProps
  },
  ref,
) {
  const styles = fieldStyles[theme];
  const messageId = `${id}-message`;
  const hasError = !!error;

  return (
    <Field id={id} error={error} hint={hint} theme={theme} className={fieldClassName}>
      <div
        className={[
          'relative w-full',
          fieldGeometry.height,
          fieldGeometry.radius,
          fieldGeometry.transition,
          styles.container,
          hasError ? styles.containerError : '',
          disabled ? styles.containerDisabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          {...inputProps}
          ref={ref}
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || hint ? messageId : undefined}
          // Single space so :placeholder-shown drives the floating label.
          placeholder=" "
          className={[
            'peer w-full h-full bg-transparent outline-none',
            fieldGeometry.paddingX,
            fieldGeometry.paddingY,
            fieldGeometry.textSize,
            styles.text,
            'placeholder:text-transparent',
            // Autofill: prevent browsers from painting a yellow background.
            '[&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        />
        <label
          htmlFor={id}
          className={[
            'pointer-events-none absolute left-5 origin-[0_0]',
            'top-[22px] text-[14px]',
            // Smooth float transition. Same easing as Reveal animations.
            'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            // Float up when the field has focus or is filled.
            'peer-focus:top-[10px] peer-focus:text-[11px]',
            'peer-[:not(:placeholder-shown)]:top-[10px] peer-[:not(:placeholder-shown)]:text-[11px]',
            // Idle/floated/error color comes from theme tokens (literal strings
            // so Tailwind's JIT picks them up).
            hasError ? styles.labelError : styles.labelIdle,
          ].join(' ')}
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      </div>
    </Field>
  );
});

export default Input;
