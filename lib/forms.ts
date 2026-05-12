// Stub form handlers. When a real backend is wired (Cloudflare Worker, Resend,
// Formspree, or a c33-api endpoint), swap each implementation for a real fetch
// and keep the same return contract so callers don't change.

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  enquiryType: string;
  message?: string;
};

export type WaitlistPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
};

export type NewsletterPayload = {
  email: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

// TODO(form-backend): replace stubs with real submission.
async function stub(): Promise<SubmitResult> {
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}

export function submitContact(_payload: ContactPayload): Promise<SubmitResult> {
  return stub();
}

export function submitWaitlist(_payload: WaitlistPayload): Promise<SubmitResult> {
  return stub();
}

export function submitNewsletter(_payload: NewsletterPayload): Promise<SubmitResult> {
  return stub();
}

// Reject submissions where the honeypot field was filled (bots auto-fill all
// inputs). Forms render the field hidden via CSS, real users never touch it.
export function isHoneypotTriggered(formData: FormData): boolean {
  const value = formData.get('hp_field');
  return typeof value === 'string' && value.trim().length > 0;
}
