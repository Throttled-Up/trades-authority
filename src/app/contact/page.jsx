import { getSiteConfig } from '@/lib/site-config';

export async function generateMetadata() {
  const config = getSiteConfig();
  return {
    title:       `Contact ${config.business_name} | ${config.city}, ${config.state}`,
    description: `Contact ${config.business_name} for a free estimate. Serving ${config.city}, ${config.state} and surrounding areas. Call ${config.phone ?? 'today'}.`,
  };
}

export default function ContactPage() {
  const config = getSiteConfig();
  const {
    business_name, phone, email, address, hours,
    city, state, service_areas = [],
  } = config;

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-hero-bg)', paddingBottom: 56 }}>
        <div className="container" style={{ paddingTop: 56 }}>
          <span className="section-eyebrow">Get In Touch</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Contact {business_name}
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.75)', maxWidth: 520 }}>
            Ready to get started? Call, text, or send a message — we respond fast.
          </p>
        </div>
      </div>

      {/* Contact layout */}
      <section className="section-pad bg-surface">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Left: contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 700,
                fontSize: '1.375rem',
                color: 'var(--color-text-heading)',
                marginBottom: 0,
              }}
            >
              Reach Us Directly
            </h2>

            {/* Phone */}
            {phone && (
              <ContactItem
                icon={<PhoneIcon />}
                label="Phone / Text"
                value={<a href={`tel:${phone.replace(/\D/g, '')}`} style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.125rem' }}>{phone}</a>}
              />
            )}

            {/* Email */}
            {email && (
              <ContactItem
                icon={<EmailIcon />}
                label="Email"
                value={<a href={`mailto:${email}`} style={{ color: 'var(--color-primary)' }}>{email}</a>}
              />
            )}

            {/* Address */}
            {address && (
              <ContactItem
                icon={<PinIcon />}
                label="Location"
                value={
                  <address style={{ fontStyle: 'normal', lineHeight: 1.6 }}>
                    {address.street && <div>{address.street}</div>}
                    {(address.city || address.state) && (
                      <div>{[address.city, address.state, address.zip].filter(Boolean).join(', ')}</div>
                    )}
                  </address>
                }
              />
            )}

            {/* Hours */}
            {hours && (
              <ContactItem
                icon={<ClockIcon />}
                label="Hours"
                value={<span>{hours}</span>}
              />
            )}

            {/* Service areas */}
            {service_areas.length > 0 && (
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-heading)', marginBottom: 8 }}>
                  We serve:
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.7 }}>
                  {service_areas.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {/* Right: CTA card (no form — GHL handles lead capture) */}
          <div
            style={{
              background: '#f8f8f8',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: 36,
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <PhoneIconLg />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 700,
                fontSize: '1.375rem',
                color: 'var(--color-text-heading)',
                marginBottom: 10,
              }}
            >
              Fastest Response: Call Us
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', marginBottom: 24, lineHeight: 1.65 }}>
              Most calls are answered immediately. For estimates, have your address and project details ready.
            </p>

            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {phone}
              </a>
            )}

            <p style={{ marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {config.emergency_available
                ? 'Emergency service available 24/7'
                : 'Free estimates — no obligation'
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(232, 82, 10, 0.1)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>;
}
function PhoneIconLg() {
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>;
}
function EmailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function PinIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function ClockIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
