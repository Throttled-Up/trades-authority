'use client';
/*
 * EmergencyCTA — emergency_dual variant
 *
 * For volume-service / insurance-driven persona. Urgency-framed dual CTA.
 * Left: form with damage type field — "Request Inspection" (not "Send Request").
 * Right: large phone + "Active storm? Call now." in accent color.
 * Dark anchor background. Orange/red accent for urgency signal.
 *
 * Props: { config }
 * Config fields:
 *   phone, business_name, trust_items, form_service_options
 */
export default function EmergencyCTA({ config }) {
  const phone   = config?.phone ?? '';
  const options = config?.form_service_options ?? [
    'Hail Damage Inspection',
    'Wind Damage',
    'Active Leak — Emergency',
    'Full Roof Replacement',
    'Emergency Tarping',
  ];
  const trust = config?.trust_items ?? [];

  return (
    <section aria-label="Request inspection or call" className="ecta-section">
      <div className="ecta-inner">

        {/* Left — urgency form */}
        <div className="ecta-form-col">
          <p className="ecta-eyebrow">Free Inspection</p>
          <h2 className="ecta-heading">Schedule your storm inspection</h2>
          <p className="ecta-subhead">We'll contact you within the hour during business hours. Same-day response available during active storm events.</p>

          <form className="ecta-form" onSubmit={e => e.preventDefault()}>
            <div className="ecta-field-row">
              <div className="ecta-field">
                <label className="ecta-label" htmlFor="ecta-name">Name</label>
                <input id="ecta-name" className="ecta-input" type="text" placeholder="Your name" autoComplete="name" />
              </div>
              <div className="ecta-field">
                <label className="ecta-label" htmlFor="ecta-phone">Phone</label>
                <input id="ecta-phone" className="ecta-input" type="tel" placeholder="(972) 555-0100" autoComplete="tel" />
              </div>
            </div>
            <div className="ecta-field">
              <label className="ecta-label" htmlFor="ecta-address">Address / Zip Code</label>
              <input id="ecta-address" className="ecta-input" type="text" placeholder="Your address or zip code" autoComplete="street-address" />
            </div>
            <div className="ecta-field">
              <label className="ecta-label" htmlFor="ecta-damage">Type of Damage</label>
              <select id="ecta-damage" className="ecta-select">
                <option value="">Select damage type...</option>
                {options.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="ecta-submit">
              Request Free Inspection
              <ArrowRight />
            </button>
          </form>
        </div>

        {/* Right — emergency phone card */}
        <div className="ecta-phone-col">
          <div className="ecta-phone-card">
            <p className="ecta-urgency-label">
              <BoltIcon /> Active storm or leak?
            </p>
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="ecta-phone">
                <PhoneIcon />
                {phone}
              </a>
            )}
            <p className="ecta-call-note">Call now — same-day response available. We answer during storm events.</p>
            {trust.length > 0 && (
              <ul className="ecta-trust-list">
                {trust.map(t => (
                  <li key={t} className="ecta-trust-item">
                    <CheckIcon /> {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .ecta-section {
          background: var(--color-anchor);
          padding: var(--section-padding-y) 24px;
        }
        .ecta-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Left — form */
        .ecta-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .ecta-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: #f9fafb;
          margin: 0 0 14px;
        }
        .ecta-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.60);
          margin: 0 0 28px;
        }

        /* Form fields */
        .ecta-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ecta-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ecta-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ecta-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          color: rgba(249, 250, 251, 0.65);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .ecta-input, .ecta-select {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          color: #f9fafb;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          outline: none;
          transition: border-color var(--duration-fast) var(--easing-out);
          color-scheme: dark;
        }
        .ecta-input::placeholder { color: rgba(249,250,251,0.35); }
        .ecta-input:focus, .ecta-select:focus {
          border-color: var(--color-primary);
        }
        .ecta-select option { background: #1a2535; }

        .ecta-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          border: none;
          border-radius: var(--btn-radius);
          cursor: pointer;
          transition: background var(--duration-fast) var(--easing-out);
          margin-top: 4px;
          width: 100%;
          justify-content: center;
        }
        .ecta-submit:hover { background: var(--color-primary-dark); }

        /* Right — phone card */
        .ecta-phone-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ecta-urgency-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          color: #f97316;
          margin: 0;
          letter-spacing: 0.01em;
        }
        .ecta-phone {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-black);
          letter-spacing: var(--letter-spacing-tight);
          color: #ffffff;
          text-decoration: none;
          transition: opacity var(--duration-fast) var(--easing-out);
        }
        .ecta-phone:hover { opacity: 0.85; }
        .ecta-call-note {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.55);
          margin: 0;
        }
        .ecta-trust-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 16px;
        }
        .ecta-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.75);
        }

        @media (min-width: 768px) {
          .ecta-section { padding: var(--section-padding-y) 40px; }
          .ecta-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
          .ecta-submit { width: auto; }
        }
        @media (min-width: 1024px) {
          .ecta-inner { grid-template-columns: 1fr 380px; }
        }
      `}</style>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#1d6840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
