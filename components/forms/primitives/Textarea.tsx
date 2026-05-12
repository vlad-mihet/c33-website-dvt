'use client';

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react';
import Field from './Field';
import { fieldGeometry, fieldStyles, type FieldTheme } from './fieldStyles';

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> & {
  id: string;
  label: string;
  theme?: FieldTheme;
  error?: string;
  hint?: string;
  fieldClassName?: string;
  // Lower bound so the field doesn't collapse below this height when empty.
  minRows?: number;
};

// Floating-label textarea with auto-resize. Height matches scrollHeight on
// every input, with a minimum derived from `minRows`.
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
    minRows = 3,
    maxLength,
    onChange,
    value,
    ...textareaProps
  },
  ref,
) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  const styles = fieldStyles[theme];
  const messageId = `${id}-message`;
  const hasError = !!error;
  const characterCount = typeof value === 'string' ? value.length : 0;

  // Resize on every value change. useLayoutEffect avoids a flash before paint.
  useLayoutEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
  };

  return (
    <Field id={id} error={error} hint={hint} theme={theme} className={fieldClassName}>
      <div
        className={[
          'relative w-full',
          fieldGeometry.radius,
          fieldGeometry.transition,
          styles.container,
          hasError ? styles.containerError : '',
          disabled ? styles.containerDisabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <textarea
          {...textareaProps}
          ref={innerRef}
          id={id}
          rows={minRows}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || hint ? messageId : undefined}
          placeholder=" "
          className={[
            'peer w-full bg-transparent outline-none resize-none',
            fieldGeometry.paddingX,
            'pt-[28px] pb-[14px]',
            fieldGeometry.textSize,
            styles.text,
            'placeholder:text-transparent',
            'leading-[22px]',
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
            'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'peer-focus:top-[10px] peer-focus:text-[11px]',
            'peer-[:not(:placeholder-shown)]:top-[10px] peer-[:not(:placeholder-shown)]:text-[11px]',
            hasError ? styles.labelError : styles.labelIdle,
          ].join(' ')}
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        {typeof maxLength === 'number' && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute right-4 bottom-3 text-[11px] ${styles.hint}`}
          >
            {characterCount}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  );
});

export default Textarea;
