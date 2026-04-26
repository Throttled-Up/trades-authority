/*
 * FormPlusPhone — form_plus_phone variant
 *
 * Dual-path CTA. Captures two types of intent on one section:
 *   - Research-stage: visitor isn't ready to call — form lets them reach out
 *     without picking up the phone. Lower friction for complex / higher-ticket jobs.
 *   - Urgent replacement: visitor needs someone now — phone is large and visible.
 *
 * Phone still feels primary. Form is the alternative path, not the hero.
 * Dark anchor background — pairs with the page's dark structural sections.
 *
 * Props: { config }
 * Config fields: phone, city, state, guarantee_language, cta_secondary_text,
 *   form_action (optional URL — defaults to '/contact' for template)
 *   form_service_options (optional string[] for project type dropdown)
 */
export default function FormPlusPhone({ config }) {
  const {
    phone,
    city,
    state,
    guarantee_language,
    form_action,
    form_service_options,
  } = config;

  const services = form_service_options ?? [
    'Septic system installation',
    'Septic system repair / replacement',
    'Excavation & site preparation',
    'Utility line installation',
    'Not sure — need an evaluation',
  ];

  const action = form_action ?? '/contact';

  return (
    <section aria-label="Request a site evaluation" className="fpp-section">
      <div className="fpp-inner">

        {/* Left: form */}
        <div className="fpp-form-col">
          <p className="fpp-eyebrow">Get Started</p>
          <h2 className="fpp-heading">
            Request a {guarantee_language ?? 'Site Evaluation'}
          </h2>
          <p className="fpp-subhead">
            Not ready to call? Send us your project details and we'll follow up within one business day.
          </p>

          <form className="fpp-form" action={action} method="POST">
            <div className="fpp-field">
              <label className="fpp-label" htmlFor="fpp-name">Your name</label>
              <input
                id="fpp-name"
                className="fpp-input"
                type="text"
                name="name"
                placeholder="First and last name"
                autoComplete="name"
                required
              />
            </div>

            <div className="fpp-field-row">
              <div className="fpp-field">
                <label className="fpp-label" htmlFor="fpp-phone">Phone</label>
                <input
                  id="fpp-phone"
                  className="fpp-input"
                  type="tel"
                  name="phone"
                  placeholder="(208) 555-0000"
                  autoComplete="tel"
                />
              </div>
              <div className="fpp-field">
                <label className="fpp-label" htmlFor="fpp-location">City / Area</label>
                <input
                  id="fpp-location"
                  className="fpp-input"
                  type="text"
                  name="location"
                  placeholder={`e.g. ${city ?? 'Hayden Lake'}`}
                />
              </div>
            </div>

            <div className="fpp-field">
              <label className="fpp-label" htmlFor="fpp-service">Project type</label>
              <select id="fpp-service" className="fpp-select" name="service">
                <option value="">Select a project type</option>
                {services.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="fpp-field">
              <label className="fpp-label" htmlFor="fpp-message">Brief description (optional)</label>
              <textarea
                id="fpp-message"
                className="fpp-textarea"
                name="message"
                rows={3}
                placeholder="Lot type, terrain, any relevant details..."
              />
            </div>

            <button type="submit" className="fpp-submit">
              Send Request
              <ArrowRight />
            </button>
          </form>
        </div>

        {/* Right: phone CTA */}
        <div className="fpp-phone-col">
          <div className="fpp-phone-card">
            <p className="fpp-phone-label">Prefer to call?</p>
            <p className="fpp-phone-heading">We answer and respond same day.</p>
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="fpp-phone-link">
                {phone}
              </a>
            )}
            <p className="fpp-phone-note">Call or text — {city ? `serving ${city}, ${state} and surrounding areas` : 'available 7 days a week'}.</p>

            <div className="fpp-phone-trust">
              {[
                guarantee_language ?? 'Free Site Evaluation',
                'Licensed & Insured',
                'Veteran Owned & Operated',
              ].map(item => (
                <div key={item} className="fpp-trust-item">
                  <CheckIcon />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .fpp-section {
          background: var(--color-anchor);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .fpp-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        .fpp-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .fpp-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-black);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: #f9fafb;
          margin: 0 0 14px;
        }
        .fpp-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.60);
          margin: 0 0 32px;
        }

        /* Form */
        .fpp-form { display: flex; flex-direction: column; gap: 20px; }
        .fpp-field { display: flex; flex-direction: column; gap: 6px; }
        .fpp-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .fpp-label {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.75);
        }
        .fpp-input, .fpp-select, .fpp-textarea {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          color: var(--color-text-heading);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          width: 100%;
          transition: border-color var(--duration-fast) var(--easing-out),
                      background    var(--duration-fast) var(--easing-out);
          outline: none;
          box-sizing: border-box;
          -webkit-appearance: none;
          color-scheme: dark;
        }
        .fpp-input::placeholder, .fpp-textarea::placeholder {
          color: rgba(249, 250, 251, 0.30);
        }
        .fpp-input:focus, .fpp-select:focus, .fpp-textarea:focus {
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: var(--shadow-focus);
        }
        .fpp-textarea { resize: vertical; min-height: 80px; }
        .fpp-select option { background: #1f2937; color: #f9fafb; }
        .fpp-submit {
          display: inline-flex;
          align-items: center;
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
          width: fit-content;
          transition: background var(--duration-fast) var(--easing-out);
        }
        .fpp-submit:hover { background: var(--color-primary-dark); }

        /* Phone card */
        .fpp-phone-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          position: sticky;
          top: 80px;
        }
        .fpp-phone-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: rgba(249, 250, 251, 0.40);
          margin: 0 0 8px;
        }
        .fpp-phone-heading {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.70);
          margin: 0 0 20px;
        }
        .fpp-phone-link {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: var(--font-weight-black);
          letter-spacing: var(--letter-spacing-tight);
          color: #f9fafb;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color var(--duration-fast) var(--easing-out);
        }
        .fpp-phone-link:hover { color: var(--color-primary); }
        .fpp-phone-note {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          color: rgba(249, 250, 251, 0.40);
          margin: 0 0 28px;
        }
        .fpp-phone-trust {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .fpp-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fpp-trust-item span {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          color: rgba(249, 250, 251, 0.65);
        }

        @media (min-width: 768px) {
          .fpp-section { padding: var(--section-padding-y) 40px; }
          .fpp-inner {
            grid-template-columns: 1fr 360px;
            gap: 64px;
          }
        }
        @media (min-width: 1024px) {
          .fpp-inner { grid-template-columns: 1fr 400px; gap: 80px; }
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

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#1d6840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
