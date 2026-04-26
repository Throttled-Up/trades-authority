/*
 * CredentialShowcase — credential_showcase variant
 *
 * For technical-authority persona. Shows specific licenses + what each one
 * allows + why competitors don't have it. Converts credentials from a list
 * into proof that this contractor can do jobs others legally cannot.
 *
 * Expects config.credentials_structured[] — fallback to config.credentials[]
 * for clients that only have the flat array.
 */

const DEFAULT_STRUCTURED = [
  {
    name: 'Licensed & Insured',
    allows: 'Permitted work on your property with full liability coverage.',
    why_it_matters: 'Protects you from liability if anything goes wrong on the job site.',
  },
];

export default function CredentialShowcase({ config }) {
  const structured = config.credentials_structured?.length
    ? config.credentials_structured
    : flatToStructured(config.credentials ?? []);

  if (!structured.length) return null;

  const eyebrow  = 'Why It Matters';
  const heading  = `Licenses that let us do work others can't`;
  const subhead  = config.credentials_subhead ?? null;

  return (
    <section aria-label="Licenses and credentials" className="cred-section">
      <div className="cred-inner">

        <header className="cred-header">
          <p className="cred-eyebrow">{eyebrow}</p>
          <h2 className="cred-heading">{heading}</h2>
          {subhead && <p className="cred-subhead">{subhead}</p>}
        </header>

        <div className="cred-grid">
          {structured.map((c, i) => (
            <div key={i} className="cred-card">
              <div className="cred-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="cred-name">{c.name}</h3>
              {c.allows && (
                <p className="cred-allows">{c.allows}</p>
              )}
              {c.why_it_matters && (
                <p className="cred-why">{c.why_it_matters}</p>
              )}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .cred-section {
          background: var(--color-surface);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .cred-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
        }
        .cred-header {
          margin-bottom: 56px;
          max-width: 640px;
        }
        .cred-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .cred-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 16px;
        }
        .cred-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0;
        }
        .cred-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--color-border);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .cred-card {
          background: var(--color-surface);
          padding: 32px 28px;
          position: relative;
        }
        .cred-num {
          font-family: var(--font-heading);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-black);
          letter-spacing: 0.08em;
          color: var(--color-primary);
          margin-bottom: 12px;
          opacity: 0.7;
        }
        .cred-name {
          font-family: var(--font-heading);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: var(--color-text-heading);
          margin: 0 0 10px;
        }
        .cred-allows {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 8px;
        }
        .cred-why {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          margin: 0;
          padding-top: 10px;
          border-top: 1px solid var(--color-border);
        }

        @media (min-width: 640px) {
          .cred-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .cred-section { padding: var(--section-padding-y) 40px; }
        }
        @media (min-width: 1024px) {
          .cred-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

function flatToStructured(arr) {
  return arr.map(name => ({ name, allows: null, why_it_matters: null }));
}
