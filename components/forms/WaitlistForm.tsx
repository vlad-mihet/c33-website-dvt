'use client';

import Input from './primitives/Input';
import SubmitButton from './primitives/SubmitButton';
import SuccessCard from './primitives/SuccessCard';
import { useFormState } from './useFormState';
import { waitlistSchema } from './schemas';
import { submitWaitlist, type WaitlistPayload } from '@/lib/forms';

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
};

export default function WaitlistForm() {
  const form = useFormState({ initial, schema: waitlistSchema });

  if (form.submitted) {
    return (
      <div className="self-end">
        <SuccessCard theme="dark">Thanks &mdash; we&rsquo;ll be in touch.</SuccessCard>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        const payload: WaitlistPayload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          company: values.company || undefined,
        };
        return submitWaitlist(payload);
      })}
      noValidate
      className="flex flex-col gap-3 self-end"
    >
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
          theme="dark"
          autoComplete="given-name"
          required
        />
        <Input
          {...form.register('lastName')}
          label="Last name"
          theme="dark"
          autoComplete="family-name"
          required
        />
      </div>
      <Input
        {...form.register('email')}
        label="Email address"
        theme="dark"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
      />
      <Input
        {...form.register('company')}
        label="Company"
        theme="dark"
        autoComplete="organization"
      />

      {form.submitError && (
        <p role="alert" className="text-[12px] text-[#f87171]">
          {form.submitError}
        </p>
      )}

      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-[12px] text-white/55">No spam. Early access only.</p>
        <SubmitButton
          pending={form.pending}
          pendingLabel="Joining…"
          variant="whiteOnDark"
        >
          Join the Waitlist
        </SubmitButton>
      </div>
    </form>
  );
}
