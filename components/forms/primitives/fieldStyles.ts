// Single source of truth for field theming. Every primitive (Input, Select,
// Textarea) reads from these maps, so changing the visual language of every
// form happens in one place.
//
// IMPORTANT: All classes here must be LITERAL strings — Tailwind's JIT scanner
// won't pick up dynamically composed names. Don't refactor to template-string
// concatenation.

export type FieldTheme = 'light' | 'dark';

export type FieldStateStyles = {
  // Container box (the visible field). Owns bg, border, focus ring.
  container: string;
  containerError: string;
  containerDisabled: string;
  // Inner text (input value).
  text: string;
  // Floating label classes — already include peer-* variants for floated state.
  labelIdle: string;
  labelError: string;
  // Helper / error message colors.
  hint: string;
  error: string;
  // Listbox surface (dropdown panel).
  listbox: string;
  listboxOption: string;
  listboxOptionSelected: string;
  listboxOptionActive: string;
  // Submit button variants.
  submitPrimary: string;
  submitOnDark: string;
};

export const fieldStyles: Record<FieldTheme, FieldStateStyles> = {
  light: {
    // Sharp-edged container (Guardbase blueprint aesthetic). Periwinkle
    // focus ring harmonises with --color-glow.
    container:
      'bg-white border border-black/15 hover:border-black/35 ' +
      'focus-within:border-ink ' +
      'focus-within:shadow-[0_0_0_3px_rgba(85,107,230,0.18)]',
    containerError:
      'border-[#dc2626] hover:border-[#dc2626] focus-within:border-[#dc2626] ' +
      'focus-within:shadow-[0_0_0_3px_rgba(220,38,38,0.18)]',
    containerDisabled: 'opacity-60 pointer-events-none',
    text: 'text-ink',
    labelIdle:
      'text-ink-soft peer-focus:text-ink peer-[:not(:placeholder-shown)]:text-ink',
    labelError:
      'text-[#dc2626] peer-focus:text-[#dc2626] peer-[:not(:placeholder-shown)]:text-[#dc2626]',
    hint: 'text-ink-soft',
    error: 'text-[#dc2626]',
    listbox:
      'bg-white border border-black/15 shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
    listboxOption: 'text-ink hover:bg-black/[0.04]',
    listboxOptionSelected: 'bg-black/[0.04]',
    listboxOptionActive: 'bg-black/[0.06]',
    submitPrimary:
      'bg-ink text-white hover:bg-black active:bg-black ' +
      'disabled:opacity-60 disabled:cursor-not-allowed',
    submitOnDark:
      'bg-white text-ink hover:bg-white/85 ' +
      'disabled:opacity-60 disabled:cursor-not-allowed',
  },
  dark: {
    container:
      'bg-white/[0.04] border border-white/15 hover:border-white/35 ' +
      'focus-within:border-white/65 ' +
      'focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.10)]',
    containerError:
      'border-[#f87171] hover:border-[#f87171] focus-within:border-[#f87171] ' +
      'focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.22)]',
    containerDisabled: 'opacity-60 pointer-events-none',
    text: 'text-white',
    labelIdle:
      'text-white/55 peer-focus:text-white peer-[:not(:placeholder-shown)]:text-white',
    labelError:
      'text-[#f87171] peer-focus:text-[#f87171] peer-[:not(:placeholder-shown)]:text-[#f87171]',
    hint: 'text-white/55',
    error: 'text-[#f87171]',
    listbox:
      'bg-[var(--color-ink-deep)] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
    listboxOption: 'text-white/85 hover:bg-white/[0.06]',
    listboxOptionSelected: 'bg-white/[0.08] text-white',
    listboxOptionActive: 'bg-white/[0.10]',
    // Dark-theme submit reads as the inverted Contact CTA — white slab on
    // ink. Avoids competing with the periwinkle accent.
    submitPrimary:
      'bg-white text-ink hover:bg-white/85 active:bg-white/85 ' +
      'disabled:opacity-60 disabled:cursor-not-allowed',
    submitOnDark:
      'bg-white text-ink hover:bg-white/85 ' +
      'disabled:opacity-60 disabled:cursor-not-allowed',
  },
};

// Common geometry shared across all primitives. Keep here so any future tweak
// (e.g. height) propagates everywhere. Corners are sharp to match the
// engineering-blueprint aesthetic of the rest of the site.
export const fieldGeometry = {
  height: 'h-[64px]',
  radius: '', // sharp corners — no rounding
  paddingX: 'px-5',
  // Top padding leaves room for the floated label; bottom keeps text optically
  // centred when label is idle (sits at top: 22px in idle state).
  paddingY: 'pt-[22px] pb-[8px]',
  textSize: 'text-[15px]',
  // Smooth transitions for border + ring.
  transition:
    'transition-[border-color,box-shadow,background-color] duration-200 ease-out',
};
