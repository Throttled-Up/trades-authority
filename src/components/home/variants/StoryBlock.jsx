/*
 * StoryBlock — story_block variant
 *
 * For owner-operator-trust persona. Owner narrative section — the one thing
 * no franchise can copy. Photo left, story right on desktop (stacked mobile).
 * Credentials as visual badges, not a bullet list. Guarantee callout embedded.
 *
 * Props: { config }
 * Config fields:
 *   owner_name, owner_title, owner_story, owner_photo: { url, alt }
 *   owner_credentials: [{ label, detail }]
 *   guarantee_label, guarantee_detail
 *   story_headline (optional)
 */
export default function StoryBlock({ config }) {
  const {
    owner_name,
    owner_title,
    owner_story,
    owner_photo,
    owner_credentials,
    guarantee_label,
    guarantee_detail,
    story_headline,
    city,
    state,
  } = config;

  const name     = owner_name ?? 'Owner';
  const headline = story_headline ?? `Why ${name} started this company`;
  const story    = owner_story ?? `After years in this trade, I started this company because I got tired of seeing homeowners taken advantage of by operations that don't know the local terrain. Every job I take on personally, and every job I stand behind.`;
  const creds    = owner_credentials ?? [];
  const guarLabel = guarantee_label ?? 'Satisfaction Guaranteed';
  const guarDetail = guarantee_detail ?? 'We stand behind every job.';

  return (
    <section aria-label={`About ${name}`} className="story-section">
      <div className="story-inner">

        {/* Photo column */}
        <div className="story-photo-col">
          {owner_photo?.url ? (
            <div className="story-photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={owner_photo.url}
                alt={owner_photo.alt ?? `${name} — ${owner_title ?? 'Owner'}`}
                className="story-photo"
              />
            </div>
          ) : (
            <div className="story-photo-placeholder" aria-hidden="true">
              <div className="story-photo-initials">
                {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
            </div>
          )}
          {city && (
            <p className="story-location-tag">
              <PinIcon /> {city}, {state} — locally owned &amp; operated
            </p>
          )}
        </div>

        {/* Content column */}
        <div className="story-content-col">
          <p className="story-eyebrow">The Owner</p>
          <h2 className="story-heading">{headline}</h2>
          <p className="story-body">{story}</p>

          {/* Credential badges */}
          {creds.length > 0 && (
            <div className="story-creds">
              {creds.map((c, i) => (
                <div key={i} className="story-cred-badge">
                  <div className="story-cred-label">{c.label}</div>
                  {c.detail && <div className="story-cred-detail">{c.detail}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Guarantee callout */}
          <div className="story-guarantee" aria-label={guarLabel}>
            <div className="story-guarantee-icon" aria-hidden="true">
              <ShieldIcon />
            </div>
            <div className="story-guarantee-text">
              <div className="story-guarantee-label">{guarLabel}</div>
              <div className="story-guarantee-detail">{guarDetail}</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .story-section {
          background: var(--color-anchor);
          padding: var(--section-padding-y) 24px;
        }
        .story-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Photo column */
        .story-photo-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .story-photo-wrap {
          width: 100%;
          max-width: 340px;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 3px solid var(--color-primary);
        }
        .story-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .story-photo-placeholder {
          width: 100%;
          max-width: 340px;
          aspect-ratio: 3 / 4;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          border: 3px solid var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .story-photo-initials {
          font-family: var(--font-heading);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-black);
          color: var(--color-primary);
          opacity: 0.4;
          letter-spacing: -0.02em;
        }
        .story-location-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.45);
          text-align: center;
        }

        /* Content column */
        .story-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .story-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: #f9fafb;
          margin: 0 0 20px;
        }
        .story-body {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.75);
          margin: 0 0 32px;
        }

        /* Credential badges */
        .story-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }
        .story-cred-badge {
          background: rgba(29, 104, 64, 0.15);
          border: 1px solid rgba(29, 104, 64, 0.35);
          border-radius: var(--radius-md);
          padding: 10px 16px;
        }
        .story-cred-label {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          color: #f9fafb;
          margin-bottom: 2px;
        }
        .story-cred-detail {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: rgba(249, 250, 251, 0.55);
        }

        /* Guarantee callout */
        .story-guarantee {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-left: 3px solid var(--color-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          padding: 18px 20px;
        }
        .story-guarantee-icon {
          flex-shrink: 0;
          color: var(--color-primary);
          margin-top: 2px;
        }
        .story-guarantee-label {
          font-family: var(--font-heading);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: #f9fafb;
          margin-bottom: 4px;
        }
        .story-guarantee-detail {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.65);
        }

        @media (min-width: 768px) {
          .story-section  { padding: var(--section-padding-y) 40px; }
          .story-inner    { grid-template-columns: 300px 1fr; gap: 64px; }
          .story-photo-col { align-items: flex-start; }
          .story-photo-wrap, .story-photo-placeholder { max-width: 100%; }
        }
        @media (min-width: 1024px) {
          .story-inner { grid-template-columns: 340px 1fr; gap: 80px; }
        }
      `}</style>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
