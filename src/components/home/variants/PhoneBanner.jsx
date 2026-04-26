/*
 * PhoneBanner — hard phone-first close.
 *
 * Dark charcoal full-width. Phone number at headline size.
 * Response time + guarantee as trust anchors.
 * No fluff — this is the "call now" section.
 */
export default function PhoneBanner({ config }) {
  const phone     = config?.phone ?? '';
  const guarantee = config?.guarantee_language ?? '72-Hour Re-treat Guarantee';
  const firstName = config?.owner_name ? config.owner_name.split(' ')[0] : null;
  const callLabel = firstName ? `Call ${firstName} directly` : 'Same-day service available';

  return (
    <section aria-label="Contact us" className="phone-banner">
      <div className="pb-inner">

        <div className="pb-label">{callLabel}</div>

        {phone && (
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="pb-phone">
            <PhoneIcon />
            {phone}
          </a>
        )}

        <div className="pb-trust">
          <span className="pb-trust-item"><CheckIcon /> {guarantee}</span>
          <span className="pb-trust-item"><CheckIcon /> Licensed &amp; Insured</span>
          <span className="pb-trust-item"><CheckIcon /> Veteran Owned</span>
        </div>

        <a href="/contact" className="pb-secondary">
          Prefer a free estimate? Request online &rarr;
        </a>
      </div>

      <style>{`
        .phone-banner {
          background: var(--color-anchor);
          padding: var(--section-padding-y-sm) 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .pb-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }
        .pb-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: rgba(249, 250, 251, 0.55);
        }
        .pb-phone {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: var(--font-weight-black);
          letter-spacing: var(--letter-spacing-tight);
          color: #ffffff;
          text-decoration: none;
          transition: opacity var(--duration-fast) var(--easing-out);
        }
        .pb-phone:hover { opacity: 0.85; }
        .pb-phone svg { flex-shrink: 0; }
        .pb-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px 24px;
        }
        .pb-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.70);
        }
        .pb-secondary {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.50);
          text-decoration: none;
          transition: color var(--duration-fast) var(--easing-out);
        }
        .pb-secondary:hover { color: rgba(249, 250, 251, 0.85); }

        @media (min-width: 768px) {
          .phone-banner { padding: var(--section-padding-y) 40px; }
        }
      `}</style>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
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
