type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9.5" stroke="currentColor" strokeOpacity="0.18" />
      <path
        d="M7 13L13 7M13 7H8M13 7V12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9.5" stroke="currentColor" strokeOpacity="0.18" />
      <path
        d="M6.5 10H13.5M13.5 10L10.5 7M13.5 10L10.5 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5V4.5M11 1.5V4.5M1.5 7H14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Authentic Capital33 wordmark — single boolean-merged path exported from
// Figma (the file's source-of-truth logo). Uses currentColor by default so
// the surrounding text-color decides the fill (works on light & dark
// backgrounds without code changes).
export function LogoMark({ className, color = 'currentColor' }: IconProps & { color?: string }) {
  return (
    <svg
      viewBox="0 0 122 21.6738"
      fill="none"
      className={className}
      role="img"
      aria-label="Capital33"
    >
      <path
        d="M8.4707 4.9082C12.1837 4.9082 15.2552 7.09861 16.3125 10.4844L16.3623 10.6357H13.2539L13.2285 10.5723C12.3475 8.73466 10.6606 7.72754 8.45801 7.72754C5.33663 7.72759 3.1465 10.0186 3.14648 13.291C3.14648 16.5635 5.33662 18.8544 8.45801 18.8545C10.6606 18.8545 12.36 17.8474 13.2285 16.0098L13.2539 15.9473H16.3623L16.3125 16.0977C15.2552 19.4834 12.1711 21.6738 8.4707 21.6738C3.56197 21.6738 0 18.1494 0 13.291C1.4839e-05 8.43265 3.56198 4.9082 8.4707 4.9082ZM33.3184 21.3711H29.9199L25.2754 9.1748L20.543 21.3711H17.1445L22.582 8.28125H24.9102L23.7646 5.22266H26.7988L33.3184 21.3711ZM42.2393 5.22266C45.625 5.22266 48.0166 7.82832 48.0166 11.0127C48.0165 14.197 45.6249 16.8271 42.2393 16.8271H38.4639V21.3711H35.5059V8.31934H38.4385L37.1797 5.22266H42.2393ZM53.5947 21.3711H50.4609V5.22266H53.5947V21.3711ZM68.5596 8.11719H63.8516V21.3711H60.7178V8.11719H55.998V5.22266H68.5596V8.11719ZM75.584 8.28125H77.9121L83.3496 21.3711H79.9512L75.2188 9.1748L70.5742 21.3711H67.1758L73.6953 5.22266H76.7285L75.584 8.28125ZM88.2197 18.5645H95.2939V21.3711H86.5713L85.0859 17.7842V5.22266H88.2197V18.5645ZM102.856 6.25586L107.161 6.24316C108.042 7.31298 108.57 8.68483 108.57 10.1699C108.57 13.5934 105.638 16.375 102.365 16.375C99.0929 16.3749 96.4121 13.8325 96.1855 10.623H99.0928C99.3193 12.2466 100.691 13.493 102.365 13.4932C104.19 13.4932 105.676 12.0076 105.676 10.1826C105.676 8.35758 104.19 6.87207 102.365 6.87207H99.0557L102.265 2.89453H97.6582V0H107.79L102.856 6.25586ZM121.207 0L116.273 6.25586H120.591C121.472 7.32566 122 8.68486 122 10.1699C122 13.5934 119.067 16.375 115.795 16.375C112.523 16.3749 109.842 13.8325 109.615 10.623H112.522C112.749 12.2466 114.121 13.493 115.795 13.4932C117.62 13.4932 119.105 12.0076 119.105 10.1826C119.105 8.35758 117.62 6.87207 115.795 6.87207H112.485L115.682 2.89453H111.075V0H121.207ZM38.4639 8.33105V13.6309H41.8496C43.8129 13.6308 44.8954 12.7745 44.8955 11C44.8955 9.22536 43.8004 8.30669 41.8496 8.30664L38.4639 8.33105Z"
        fill={color}
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}
