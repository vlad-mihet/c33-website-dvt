'use client';

import Input from './primitives/Input';
import Select from './primitives/Select';
import SubmitButton from './primitives/SubmitButton';
import SuccessCard from './primitives/SuccessCard';
import Textarea from './primitives/Textarea';
import { useFormState } from './useFormState';
import { contactSchema, enquiryTypes } from './schemas';
import { submitContact, type ContactPayload } from '@/lib/forms';

const enquiryOptions = enquiryTypes.map((label) => ({ value: label, label }));

type Theme = 'light' | 'dark';

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  enquiryType: '',
  message: '',
};

export default function ContactForm({ theme = 'light' }: { theme?: Theme } = {}) {
  const form = useFormState({ initial, schema: contactSchema });

  if (form.submitted) {
    return (
      <SuccessCard theme={theme}>
        Thanks &mdash; we&rsquo;ll be in touch within one business day.
      </SuccessCard>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        const payload: ContactPayload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          company: values.company || undefined,
          enquiryType: values.enquiryType,
          message: values.message || undefined,
        };
        return submitContact(payload);
      })}
      noValidate
      className="flex flex-col gap-3"
    >
      {/* Honeypot — visually hidden but reachable in DOM. */}
      <input
        type="text"
        name="hp_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          {...form.register('firstName')}
          label="First name"
          theme={theme}
          autoComplete="given-name"
          required
        />
        <Input
          {...form.register('lastName')}
          label="Last name"
          theme={theme}
          autoComplete="family-name"
          required
        />
      </div>
      <Input
        {...form.register('email')}
        label="Email address"
        theme={theme}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
      />
      <Input
        {...form.register('company')}
        label="Company"
        theme={theme}
        autoComplete="organization"
      />
      <Select
        {...form.registerSelect('enquiryType')}
        label="Enquiry type"
        theme={theme}
        options={enquiryOptions}
        required
      />
      <Textarea
        {...form.register('message')}
        label="Message"
        theme={theme}
        minRows={4}
        maxLength={2000}
      />

      {form.submitError && (
        <p
          role="alert"
          className={
            theme === 'dark'
              ? 'mt-1 text-[12px] text-[#f87171]'
              : 'mt-1 text-[12px] text-[#dc2626]'
          }
        >
          {form.submitError}
        </p>
      )}

      <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p
          className={`max-w-[420px] text-[12px] leading-[18px] ${
            theme === 'dark' ? 'text-white/55' : 'text-mute'
          }`}
        >
          Your information is used solely to respond to your enquiry. We do not share your data with third parties.{' '}
          <a href="/privacy" className="underline underline-offset-4">
            View our Privacy Policy
          </a>
          .
        </p>
        <SubmitButton
          pending={form.pending}
          pendingLabel="Sending…"
          variant={theme === 'dark' ? 'accentOnDark' : 'inkOnLight'}
          className="self-start sm:self-auto"
        >
          {theme === 'dark' ? 'Send Message' : 'Submit'}
        </SubmitButton>
      </div>
    </form>
  );
}
