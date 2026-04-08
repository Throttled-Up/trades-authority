// TopBar — phone number + trust badges. Visible desktop only.
export default function TopBar({ config }) {
  const { phone, hours, license } = config;

  return (
    <div
      className="topbar"
      style={{
        background: 'var(--color-topbar-bg)',
        color: 'var(--color-topbar-text)',
        fontSize: '0.8125rem',
        lineHeight: 1,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: '10px',
        }}
      >
        {/* Left: hours */}
        {hours && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ClockIcon />
            {hours}
          </span>
        )}

        {/* Right: phone + license badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto' }}>
          {license && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldIcon />
              Licensed &amp; Insured · {license}
            </span>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              style={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <PhoneIcon />
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
