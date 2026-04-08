/**
 * EmergencyCTA — bold phone band. High contrast. Placed just before footer.
 * Shows when config.emergency_available is true or when always_show_emergency_cta is true.
 */
export default function EmergencyCTA({ config }) {
  const { phone, business_name, emergency_available, city, state } = config;

  if (!phone) return null;

  const headline = emergency_available
    ? 'Emergency Service Available'
    : `Ready to Help in ${city}, ${state}`;

  const sub = emergency_available
    ? `Call now — ${business_name} responds fast, day or night.`
    : `Call ${business_name} today for a free estimate.`;

  return (
    <section
      style={{
        background: 'var(--color-primary)',
        padding: '48px 0',
      }}
    >
      <div className="container">
        <div className="emergency-inner">
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#fff',
                marginBottom: 6,
              }}
            >
              {headline}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
              {sub}
            </p>
          </div>

          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="emergency-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              padding: '14px 32px',
              borderRadius: 'var(--btn-radius)',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <PhoneIcon />
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}
