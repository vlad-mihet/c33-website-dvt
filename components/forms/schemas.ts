// Tiny rule-based validation. Each schema maps a field name to an ordered
// list of rules. The first rule that returns a string short-circuits and
// becomes that field's error.

export type Rule = (value: string, all: Record<string, string>) => string | null;
export type Schema = Record<string, Rule[]>;

export const required = (msg = 'Required'): Rule =>
  (v) => (!v || !v.trim() ? msg : null);

export const minLen = (n: number, msg?: string): Rule =>
  (v) => (!v ? null : v.trim().length < n ? msg ?? `Must be at least ${n} characters` : null);

export const maxLen = (n: number, msg?: string): Rule =>
  (v) => (v && v.length > n ? msg ?? `Must be ${n} characters or fewer` : null);

// Liberal email pattern. Valid for our needs (formal addresses); avoids the
// rabbit hole of full RFC 5322.
export const email: Rule = (v) =>
  !v ? null : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Enter a valid email address';

export const oneOf = (allowed: string[], msg = 'Choose an option'): Rule =>
  (v) => (!v || !allowed.includes(v) ? msg : null);

// Run a schema against current values. Returns a partial map of errors —
// fields without errors are absent.
export function validate(schema: Schema, values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of Object.keys(schema)) {
    const rules = schema[field];
    const value = values[field] ?? '';
    for (const rule of rules) {
      const result = rule(value, values);
      if (result) {
        errors[field] = result;
        break;
      }
    }
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Schemas

export const enquiryTypes = [
  'Debt Raise',
  'Equity Raise',
  'Direct Lending (C33™)',
  'Platform partnership',
  'Press & media',
  'Other',
] as const;

export const contactSchema: Schema = {
  firstName: [required('First name is required'), minLen(2)],
  lastName: [required('Last name is required'), minLen(2)],
  email: [required('Email is required'), email],
  enquiryType: [oneOf([...enquiryTypes], 'Select an enquiry type')],
  // Optional fields — present in schema for type completeness, no rules.
  company: [],
  message: [maxLen(2000)],
};

export const waitlistSchema: Schema = {
  firstName: [required('First name is required'), minLen(2)],
  lastName: [required('Last name is required'), minLen(2)],
  email: [required('Email is required'), email],
  company: [],
};

export const newsletterSchema: Schema = {
  email: [required('Email is required'), email],
};
