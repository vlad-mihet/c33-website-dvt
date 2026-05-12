'use client';

import { ArrowUpRight } from '@/components/icons';
import SuccessCard from './primitives/SuccessCard';
import { useFormState } from './useFormState';
import { newsletterSchema } from './schemas';
import { submitNewsletter, type NewsletterPayload } from '@/lib/forms';

type NewsletterFormProps = {
  cta?: string;
  pendingLabel?: string;
};

// Pill-shaped marketing newsletter input. Different visual language from the
// other forms — no floating label (would break the pill), but the same
// validation/state machinery via useFormState.
export default function NewsletterForm({
  cta = 'Subscribe',
  pendingLabel = 'Subscribing…',
}: NewsletterFormProps = {}) {
  const form = useFormState({ initial: { email: '' }, schema: newsletterSchema });

  if (form.submitted) {
    return <SuccessCard theme="light" variant="pill">Thanks &mdash; check your inbox to confirm.</SuccessCard>;
  }

  const emailField = form.register('email');
  const hasError = !!emailField.error;

  return (
    <div className="flex w-full flex-col items-center">
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const payload: NewsletterPayload = { email: values.email };
          return submitNewsletter(payload);
        })}
        noValidate
        className={[
          'mt-4 flex w-full max-w-[520px] items-center gap-2 rounded-full border bg-white py-1 pr-1 pl-5',
          'transition-[border-color,box-shadow] duration-200 ease-out',
          hasError
            ? 'border-[#dc2626] focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]'
            : 'border-line hover:border-line-2 focus-within:border-ink focus-within:shadow-[0_0_0_4px_rgba(85,107,230,0.12)]',
        ].join(' ')}
      >
        <input
          type="text"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] size-px opacity-0"
        />
        <input
          {...emailField}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${emailField.id}-message` : undefined}
          className="text-ink placeholder:text-mute flex-1 bg-transparent py-2 text-[14px] outline-none"
        />
        <button
          type="submit"
          disabled={form.pending}
          aria-busy={form.pending || undefined}
          className="bg-ink text-white relative inline-flex items-center justify-center gap-2 rounded-full py-[10px] pr-[12px] pl-[20px] text-[12px] transition-colors hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className={`inline-flex items-center gap-2 transition-opacity duration-150 ${form.pending ? 'opacity-0' : 'opacity-100'}`}>
            {cta}
            <ArrowUpRight className="size-[18px] text-white" />
          </span>
          <span
            aria-hidden={!form.pending}
            className={`absolute inset-0 inline-flex items-center justify-center gap-2 transition-opacity duration-150 ${form.pending ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-[16px] animate-[field-spin_750ms_linear_infinite]">
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
              <path d="M17.5 10a7.5 7.5 0 00-7.5-7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>{pendingLabel}</span>
          </span>
        </button>
      </form>
      {hasError && (
        <p
          id={`${emailField.id}-message`}
          role="alert"
          className="mt-2 ml-5 flex items-center gap-1.5 text-[12px] text-[#dc2626] animate-[field-error-in_220ms_ease-out_both]"
        >
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="size-[14px] shrink-0">
            <path d="M7 1.5L13 12H1L7 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M7 6v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="10.5" r="0.6" fill="currentColor" />
          </svg>
          {emailField.error}
        </p>
      )}
      {form.submitError && (
        <p role="alert" className="mt-2 ml-5 text-[12px] text-[#dc2626]">
          {form.submitError}
        </p>
      )}
    </div>
  );
}
