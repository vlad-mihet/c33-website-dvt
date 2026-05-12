'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { validate, type Schema } from './schemas';
import type { SubmitResult } from '@/lib/forms';

export type UseFormStateOptions<T extends Record<string, string>> = {
  initial: T;
  schema: Schema;
};

// Tiny form-state hook. Implements the user-chosen validation pattern:
//   - Validate a field on blur (sets touched).
//   - Once touched, revalidate live on every keystroke until the error clears.
//   - Validate everything on submit; focus the first invalid field.
// Honeypot is checked at submit time and short-circuits to a fake-success.
export function useFormState<T extends Record<string, string>>({
  initial,
  schema,
}: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Keep latest values in a ref so async submit handlers see them without
  // depending on stale closures.
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const setValue = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value } as T;
        // Live revalidation only after first blur on this field.
        if (touched[name as string]) {
          const fresh = validate({ [name]: schema[name as string] ?? [] }, next as Record<string, string>);
          setErrors((errs) => {
            const updated = { ...errs };
            if (fresh[name as string]) updated[name as string] = fresh[name as string];
            else delete updated[name as string];
            return updated;
          });
        }
        return next;
      });
    },
    [schema, touched],
  );

  const markTouched = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      // Don't surface a "Required" error just because the user tabbed through
      // an empty field — only validate on blur if they actually entered
      // content. Required-field errors are reserved for submit. (Once any
      // field has been touched & reported an error, live revalidation in
      // setValue continues to handle clearing/re-showing it as the user
      // edits — including the case where they clear a field back to empty.)
      const value = valuesRef.current[name as string] ?? '';
      if (typeof value === 'string' && value.trim().length === 0) return;
      const fresh = validate(
        { [name]: schema[name as string] ?? [] },
        valuesRef.current as Record<string, string>,
      );
      setErrors((errs) => {
        const updated = { ...errs };
        if (fresh[name as string]) updated[name as string] = fresh[name as string];
        else delete updated[name as string];
        return updated;
      });
    },
    [schema],
  );

  const register = useCallback(
    (name: keyof T) => ({
      id: `field-${String(name)}`,
      name: String(name),
      value: values[name],
      onChange: (event: { target: { value: string } }) => setValue(name, event.target.value),
      onBlur: () => markTouched(name),
      error: errors[name as string],
    }),
    [values, errors, setValue, markTouched],
  );

  // Variant of register for our custom Select which exposes (value: string) =>
  // void rather than a synthetic event.
  const registerSelect = useCallback(
    (name: keyof T) => ({
      id: `field-${String(name)}`,
      name: String(name),
      value: values[name],
      onChange: (value: string) => setValue(name, value),
      onBlur: () => markTouched(name),
      error: errors[name as string],
    }),
    [values, errors, setValue, markTouched],
  );

  const handleSubmit = useCallback(
    (submit: (values: T) => Promise<SubmitResult>) =>
      async (event: { preventDefault: () => void; currentTarget: HTMLFormElement }) => {
        event.preventDefault();
        setSubmitError(null);
        // Honeypot: bot-filled inputs short-circuit to fake-success so the
        // bot moves on and a human refreshing won't lose data.
        const formData = new FormData(event.currentTarget);
        const honeypot = formData.get('hp_field');
        if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
          setSubmitted(true);
          return;
        }

        const allErrors = validate(schema, values as Record<string, string>);
        setErrors(allErrors);
        // Mark every field touched so live revalidation is enabled going forward.
        const allTouched: Record<string, boolean> = {};
        for (const key of Object.keys(schema)) allTouched[key] = true;
        setTouched(allTouched);

        const errorKeys = Object.keys(allErrors);
        if (errorKeys.length > 0) {
          // Focus the first invalid field. We use the same id pattern as
          // `register` so the DOM lookup is deterministic.
          const firstId = `field-${errorKeys[0]}`;
          const node = document.getElementById(firstId);
          if (node) {
            node.focus();
            node.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
          return;
        }

        setPending(true);
        try {
          const result = await submit(values);
          if (result.ok) {
            setSubmitted(true);
          } else {
            setSubmitError(result.error || 'Something went wrong. Please try again.');
            if (result.fieldErrors) setErrors(result.fieldErrors);
          }
        } catch (err) {
          setSubmitError('Network error — please try again.');
          console.error('Form submit failed', err);
        } finally {
          setPending(false);
        }
      },
    [schema, values],
  );

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  return {
    values,
    errors,
    touched,
    pending,
    submitted,
    submitError,
    isValid,
    register,
    registerSelect,
    handleSubmit,
    setValue,
    markTouched,
  };
}
