/**
 * StickyCallBar — fixed mobile CTA bar pinned to the bottom of the screen.
 * Visible only on mobile (hidden at md breakpoint via CSS).
 * Highest-impact mobile conversion element for contractor sites.
 */
export default function StickyCallBar({ config }) {
  const { phone, business_name } = config;
  if (!phone) return null;

  const tel = phone.replace(/\D/g, '');

  return (
    <a
      href={`tel:${tel}`}
      aria-label={`Call ${business_name}`}
      style={{
        position:        'fixed',
        bottom:          0,
        left:            0,
        right:           0,
        zIndex:          1000,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             10,
        background:      'var(--color-primary)',
        color:           '#fff',
        fontFamily:      'var(--font-heading), sans-serif',
        fontWeight:      700,
        fontSize:        '1.0625rem',
        padding:         '16px 24px',
        textDecoration:  'none',
        boxShadow:       '0 -2px 12px rgba(0,0,0,0.18)',
      }}
      className="sticky-call-bar"
    >
      <PhoneIcon />
      Call {phone}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}
