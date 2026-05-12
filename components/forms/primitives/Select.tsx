'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import Field from './Field';
import { fieldGeometry, fieldStyles, type FieldTheme } from './fieldStyles';

export type SelectOption = { value: string; label: string };

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  // Mirrors native <input> blur — gives consumers a hook for "validate on
  // blur" behavior. We fire it when focus leaves the trigger AND the listbox.
  onBlur?: () => void;
  theme?: FieldTheme;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  fieldClassName?: string;
};

// Custom listbox dropdown. We render a hidden <input type="hidden"> so the
// select participates in normal FormData if a caller submits via native form.
// Keyboard handling matches the WAI-ARIA listbox practices: Arrow keys move
// the active option, Enter/Space selects, Esc closes, type-ahead jumps.
export default function Select({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  theme = 'light',
  error,
  hint,
  required,
  disabled,
  fieldClassName = '',
}: SelectProps) {
  const styles = fieldStyles[theme];
  const messageId = `${id}-message`;
  const listboxId = `${id}-listbox`;
  const hasError = !!error;
  const isFilled = !!value;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : 0;
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value],
  );

  // Type-ahead buffer. Reset 600ms after last keypress.
  const bufferRef = useRef('');
  const bufferTimerRef = useRef<number | null>(null);

  const closeAndReturnFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Scroll the active option into view inside the listbox when it changes.
  useEffect(() => {
    if (!open) return;
    const node = optionRefs.current[activeIndex];
    if (node) node.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  // Outside-click close. Use pointerdown on the document so clicking the
  // trigger itself (which toggles open) doesn't get fired again.
  useEffect(() => {
    if (!open) return;
    const handler = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (triggerRef.current?.contains(target)) return;
      if (listboxRef.current?.contains(target)) return;
      setOpen(false);
      // Defer onBlur so React state has a chance to settle.
      onBlur?.();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open, onBlur]);

  const selectAt = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    closeAndReturnFocus();
    onBlur?.();
  };

  const handleTypeAhead = (key: string) => {
    if (bufferTimerRef.current) window.clearTimeout(bufferTimerRef.current);
    bufferRef.current = (bufferRef.current + key).toLowerCase();
    bufferTimerRef.current = window.setTimeout(() => {
      bufferRef.current = '';
    }, 600);

    const buffer = bufferRef.current;
    const startIndex = (activeIndex + 1) % options.length;
    for (let i = 0; i < options.length; i += 1) {
      const idx = (startIndex + i) % options.length;
      if (options[idx].label.toLowerCase().startsWith(buffer)) {
        setActiveIndex(idx);
        return;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    const { key } = event;
    if (!open) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        event.preventDefault();
        setOpen(true);
        return;
      }
      // Type-ahead from the trigger jumps to a matching option without opening
      // (matches native <select> behavior). We open + jump for clarity.
      if (key.length === 1 && /\S/.test(key)) {
        event.preventDefault();
        setOpen(true);
        handleTypeAhead(key);
      }
      return;
    }
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectAt(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        closeAndReturnFocus();
        onBlur?.();
        break;
      case 'Tab':
        // Allow tab to leave the field, but close first.
        setOpen(false);
        onBlur?.();
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) {
          event.preventDefault();
          handleTypeAhead(key);
        }
    }
  };

  const reactId = useId();
  const containerId = `${id}-${reactId}`;

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
        {/* Hidden input — lets the select submit naturally if anyone uses
            native FormData on the parent <form>. */}
        <input type="hidden" name={name} value={value} />

        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || hint ? messageId : undefined}
          aria-activedescendant={open ? `${containerId}-option-${activeIndex}` : undefined}
          disabled={disabled}
          data-filled={isFilled || undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          onBlur={(event) => {
            // Don't fire onBlur if focus is moving to the listbox.
            const next = event.relatedTarget as Node | null;
            if (next && listboxRef.current?.contains(next)) return;
            onBlur?.();
          }}
          className={[
            'peer w-full h-full bg-transparent outline-none flex items-center text-left',
            fieldGeometry.paddingX,
            fieldGeometry.paddingY,
            fieldGeometry.textSize,
            styles.text,
            // When unfilled, render the value text as transparent so the label
            // sits centred, matching Input's idle look.
            isFilled ? '' : 'text-transparent',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="flex-1 truncate">{selectedLabel || ' '}</span>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={`size-4 shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            } ${theme === 'dark' ? 'text-white/60' : 'text-ink/60'}`}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Floating label. The label uses the same float-on-fill rule as
            Input — but here "fill" is determined by data-filled rather than
            :placeholder-shown. */}
        <label
          htmlFor={id}
          className={[
            'pointer-events-none absolute left-5 origin-[0_0]',
            'top-[22px] text-[14px]',
            'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            // Float when trigger is focused or value is set.
            'peer-focus:top-[10px] peer-focus:text-[11px]',
            'peer-aria-expanded:top-[10px] peer-aria-expanded:text-[11px]',
            'peer-data-[filled]:top-[10px] peer-data-[filled]:text-[11px]',
            hasError ? styles.labelError : styles.labelIdle,
          ].join(' ')}
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>

        {open && (
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            tabIndex={-1}
            className={[
              'absolute left-0 right-0 top-[calc(100%+6px)] z-50',
              'rounded-[14px] py-2 max-h-[280px] overflow-y-auto',
              'animate-[field-listbox-in_180ms_ease-out_both]',
              styles.listbox,
            ].join(' ')}
            onKeyDown={handleKeyDown}
          >
            {options.map((option, index) => {
              const selected = option.value === value;
              const active = index === activeIndex;
              return (
                <li
                  key={option.value}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  id={`${containerId}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    // Prevent trigger from losing focus before click registers.
                    event.preventDefault();
                  }}
                  onClick={() => selectAt(index)}
                  className={[
                    'cursor-pointer flex items-center justify-between gap-3 px-5 py-3 text-[14px]',
                    styles.listboxOption,
                    selected ? styles.listboxOptionSelected : '',
                    active ? styles.listboxOptionActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && (
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0">
                      <path
                        d="M3.5 8.5l3 3 6-6.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Field>
  );
}
