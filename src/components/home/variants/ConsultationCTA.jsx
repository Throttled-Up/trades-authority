/*
 * ConsultationCTA — consultation_request variant
 *
 * Consultative CTA — not "get a quote", not a phone banner.
 * Positions the first contact as an evaluation, not a transaction.
 * For technical-authority persona where the job requires a site assessment
 * before any number can be given honestly.
 *
 * Props: { config }
 * Config fields used:
 *   guarantee_language — e.g. "Free Site Evaluation"
 *   phone
 *   owner_name
 *   city, state
 *   consultation_bullets — optional string[] for what happens at the eval
 */

export default function ConsultationCTA({ config }) {
  const {
    phone,
    owner_name,
    guarantee_language,
    city,
    state,
    consultation_bullets,
  } = config;

  const evalLabel  = guarantee_language ?? 'Free Site Evaluation';
  const defaultBullets = [
    `Tyler walks your property and assesses terrain, soil, and access conditions`,
    `You get a written scope and a clear estimate — not a range, not "it depends"`,
    `No obligation. If the job isn't right for us, we'll tell you that too`,
  ];
  const bullets = consultation_bullets?.length ? consultation_bullets : defaultBullets;

  return (
    <section aria-label="Schedule a consultation" className="consult-section">
      <div className="consult-inner">

        <div className="consult-content">
          <p className="consult-eyebrow">How It Starts</p>
          <h2 className="consult-heading">
            Start with a {evalLabel}
          </h2>
          <p className="consult-subhead">
            Every 2B project starts the same way: we come to you.
            {owner_name ? ` ${owner_name} walks your property before any number is put on paper.` : ''}
            {city ? ` Serving ${city}, ${state} and the surrounding region.` : ''}
          </p>

          <ul className="consult-bullets">
            {bullets.map((b, i) => (
              <li key={i} className="consult-bullet">
                <CheckIcon />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="consult-cta-col">
          <div className="consult-card">
            <p className="consult-card-label">Ready to get started?</p>
            <p className="consult-card-heading">Schedule your {evalLabel.toLowerCase()}</p>
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="consult-phone-btn">
                <PhoneIcon /> {phone}
              </a>
            )}
            <p className="consult-card-note">
              Call or text — we respond same day.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .consult-section {
          background: var(--color-surface);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .consult-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        .consult-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .consult-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: var(--font-weight-black);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 16px;
        }
        .consult-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 28px;
          max-width: 520px;
        }
        .consult-bullets {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .consult-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .consult-bullet svg {
          flex-shrink: 0;
          margin-top: 3px;
        }
        .consult-bullet span {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
        }

        /* Right column card */
        .consult-card {
          background: var(--color-anchor);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          position: sticky;
          top: 80px;
        }
        .consult-card-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: rgba(249, 250, 251, 0.50);
          margin: 0 0 10px;
        }
        .consult-card-heading {
          font-family: var(--font-heading);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: #f9fafb;
          margin: 0 0 28px;
        }
        .consult-phone-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 24px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-black);
          border-radius: var(--btn-radius);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background var(--duration-fast) var(--easing-out);
          margin-bottom: 14px;
        }
        .consult-phone-btn:hover { background: var(--color-primary-dark); }
        .consult-card-note {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          color: rgba(249, 250, 251, 0.45);
          margin: 0;
          text-align: center;
        }

        @media (min-width: 768px) {
          .consult-section { padding: var(--section-padding-y) 40px; }
          .consult-inner {
            grid-template-columns: 1fr 360px;
            gap: 64px;
          }
        }
        @media (min-width: 1024px) {
          .consult-inner { grid-template-columns: 1fr 400px; gap: 80px; }
        }
      `}</style>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#1d6840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}
