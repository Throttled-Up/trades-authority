import Link from 'next/link';

export default function Footer({ config }) {
  const {
    business_name,
    phone,
    email,
    address,
    license,
    social = {},
    services = [],
    service_areas = [],
    hours,
  } = config;

  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--color-footer-bg)', color: 'rgba(255,255,255,0.7)' }}>
      {/* Main footer grid */}
      <div className="container section-pad-sm">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
          }}
        >
          {/* Column 1: Business info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#fff',
              marginBottom: 4,
            }}>
              {business_name}
            </h3>

            {address && (
              <address style={{ fontStyle: 'normal', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {address.street && <div>{address.street}</div>}
                {(address.city || address.state || address.zip) && (
                  <div>{[address.city, address.state, address.zip].filter(Boolean).join(', ')}</div>
                )}
              </address>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem' }}
              >
                {phone}
              </a>
            )}

            {email && (
              <a href={`mailto:${email}`} style={{ fontSize: '0.875rem' }}>
                {email}
              </a>
            )}

            {hours && (
              <p style={{ fontSize: '0.875rem' }}>{hours}</p>
            )}

            {license && (
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>
                Licensed &amp; Insured · {license}
              </p>
            )}

            {/* Social links */}
            {Object.keys(social).length > 0 && (
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={socialIconStyle}>
                    <FacebookIcon />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={socialIconStyle}>
                    <InstagramIcon />
                  </a>
                )}
                {social.google && (
                  <a href={social.google} target="_blank" rel="noopener noreferrer" aria-label="Google Business" style={socialIconStyle}>
                    <GoogleIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Services */}
          {services.length > 0 && (
            <div>
              <h4 style={footerHeadingStyle}>Services</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {services.slice(0, 8).map(s => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="link-white"
                      style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Service areas */}
          {service_areas.length > 0 && (
            <div>
              <h4 style={footerHeadingStyle}>Service Areas</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {service_areas.slice(0, 8).map(area => (
                  <li key={area}>
                    <span style={{ fontSize: '0.875rem' }}>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 4: Quick links */}
          <div>
            <h4 style={footerHeadingStyle}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Service Areas', href: '/service-areas' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-white"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 0',
          fontSize: '0.8125rem',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}
        >
          <span>© {year} {business_name}. All rights reserved.</span>
          <span>
            <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
            {' · '}
            <Link href="/sitemap.xml" style={{ color: 'rgba(255,255,255,0.4)' }}>Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

const footerHeadingStyle = {
  fontFamily: 'var(--font-heading), sans-serif',
  fontWeight: 700,
  fontSize: '0.875rem',
  color: '#fff',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: 16,
};

const socialIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.7)',
  transition: 'background 0.15s ease',
};

function FacebookIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
