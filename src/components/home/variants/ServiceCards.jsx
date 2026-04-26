/*
 * ServiceCards — damage_assessment_grid variant
 *
 * For volume-service / insurance-driven persona. Four service cards in a grid.
 * Icon-based — speed and clarity over photography. Insurance Claim Assistance
 * card is visually elevated with accent border to signal primary differentiator.
 *
 * Props: { hubs: [{ title, slug, description, ctaLabel }] }
 */
export default function ServiceCards({ hubs = [] }) {
  if (!hubs.length) return null;

  return (
    <section aria-label="Our services" className="svc-section">
      <div className="svc-inner">
        <header className="svc-header">
          <p className="svc-eyebrow">What We Do</p>
          <h2 className="svc-heading">Storm damage services — from inspection to final inspection</h2>
        </header>
        <div className="svc-grid">
          {hubs.map((hub) => {
            const isInsurance = /insurance|claim/i.test(hub.slug + hub.title);
            return (
              <div key={hub.slug} className={`svc-card${isInsurance ? ' svc-card-featured' : ''}`}>
                <div className="svc-icon-wrap" aria-hidden="true">
                  {getServiceIcon(hub.title)}
                </div>
                {isInsurance && (
                  <div className="svc-differentiator-badge">Our Differentiator</div>
                )}
                <h3 className="svc-title">{hub.title}</h3>
                <p className="svc-desc">{hub.description}</p>
                <a href={hub.slug} className="svc-cta">
                  {hub.ctaLabel ?? `Learn more`}
                  <ArrowRight />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .svc-section {
          background: var(--color-surface);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .svc-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
        }
        .svc-header {
          margin-bottom: 48px;
          max-width: 640px;
        }
        .svc-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .svc-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0;
        }
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .svc-card {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          transition: box-shadow var(--duration-fast) var(--easing-out);
        }
        .svc-card:hover {
          box-shadow: var(--shadow-card);
        }
        .svc-card-featured {
          border-color: var(--color-primary);
          border-top-width: 3px;
          background: var(--color-primary-light, rgba(29,104,64,0.04));
        }
        .svc-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: var(--color-primary);
          margin-bottom: 4px;
        }
        .svc-differentiator-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: var(--radius-sm, 4px);
        }
        .svc-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: var(--color-text-heading);
          margin: 0;
        }
        .svc-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0;
          flex: 1;
        }
        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          text-decoration: none;
          margin-top: 4px;
          transition: gap var(--duration-fast) var(--easing-out);
        }
        .svc-cta:hover { gap: 10px; }

        @media (min-width: 640px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .svc-section { padding: var(--section-padding-y) 40px; }
        }
        @media (min-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
}

function getServiceIcon(title = '') {
  const t = title.toLowerCase();
  if (/inspect|assess|damage/.test(t)) return <StormIcon />;
  if (/replacement|replace|install/.test(t)) return <RoofIcon />;
  if (/insurance|claim|adjuster/.test(t)) return <ClaimIcon />;
  if (/emergency|tarp|board/.test(t)) return <EmergencyIcon />;
  return <RoofIcon />;
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function StormIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
      <polyline points="13 11 9 17 15 17 11 23"/>
    </svg>
  );
}

function RoofIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function ClaimIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
