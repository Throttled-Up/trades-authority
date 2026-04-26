import Image from 'next/image';

/*
 * ServiceBands — two variants:
 *
 *   service_bands (default)
 *     Alternating full-width bands. Equal visual weight per service.
 *     For clients where all services are at parity.
 *
 *   featured_plus_list
 *     First hub = featured. Large dominant section, credential signal, button CTA.
 *     Remaining hubs = secondary list. Compact 2-col grid below, clearly subordinate.
 *     For technical-authority clients where one service drives 80% of revenue
 *     and requires licensed capability competitors lack.
 *
 * Props:
 *   hubs:    [{ title, slug, description, image: { url, alt }, ctaLabel, credential_note? }]
 *   variant: 'service_bands' | 'featured_plus_list'
 */
export default function ServiceBands({ hubs = [], variant = 'service_bands' }) {
  if (!hubs.length) return null;

  if (variant === 'featured_plus_list') {
    return <FeaturedPlusList hubs={hubs} />;
  }

  // banded_photography — same alternating band structure, photography proportionally
  // dominant (65/35 split). Every band is a real job site photo.
  if (variant === 'banded_photography') {
    return <BandedPhotography hubs={hubs} />;
  }

  return (
    <section aria-label="Our services" style={{ background: 'var(--color-surface)' }}>
      {hubs.map((hub, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={hub.slug} className={`band ${flip ? 'band-flip' : ''}`}>
            <div className="band-image-col">
              {hub.image?.url ? (
                <Image
                  src={hub.image.url}
                  alt={hub.image.alt ?? hub.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="band-image-placeholder" />
              )}
            </div>
            <div className="band-content">
              <p className="band-eyebrow">Our Services</p>
              <h2 className="band-title">{hub.title}</h2>
              <p className="band-desc">{hub.description}</p>
              <a href={hub.slug} className="band-cta">
                {hub.ctaLabel ?? `Learn about ${hub.title}`}
                <ArrowRight />
              </a>
            </div>
          </div>
        );
      })}

      <style>{`
        .band {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 400px;
          border-bottom: 1px solid var(--color-border);
        }
        .band:last-child { border-bottom: none; }
        .band-image-col {
          position: relative;
          min-height: 280px;
          background: var(--color-surface-3);
          order: -1;
        }
        .band-image-placeholder {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            135deg,
            var(--color-surface-3) 0, var(--color-surface-3) 16px,
            var(--color-surface-2) 16px, var(--color-surface-2) 32px
          );
        }
        .band-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 24px;
          background: var(--color-surface);
        }
        .band-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .band-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 16px;
        }
        .band-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 28px;
          max-width: 520px;
        }
        .band-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          text-decoration: none;
          transition: gap var(--duration-fast) var(--easing-out);
        }
        .band-cta:hover { gap: 12px; }
        @media (min-width: 768px) {
          .band { grid-template-columns: 1fr 1fr; min-height: 480px; }
          .band-image-col { order: 0; min-height: unset; }
          .band-flip .band-image-col { order: 1; }
          .band-flip .band-content  { order: 0; }
          .band-content { padding: 56px 56px 56px 48px; }
          .band-flip .band-content { padding: 56px 48px 56px 56px; }
        }
        @media (min-width: 1024px) {
          .band { grid-template-columns: 55% 45%; }
          .band-flip { grid-template-columns: 45% 55%; }
          .band-content { padding: 72px 72px 72px 64px; }
          .band-flip .band-content { padding: 72px 64px 72px 72px; }
        }
      `}</style>
    </section>
  );
}

/* ── banded_photography variant ─────────────────────────────────────────────── */
/*
 * Photography-dominant bands. 65% image / 35% content.
 * Alternating image side. Every band shows real job site photography —
 * not stock, not icons. The work is the proof.
 * For owner-operator-trust persona — three service categories with equal
 * visual weight, photography-led.
 */
function BandedPhotography({ hubs }) {
  return (
    <section aria-label="Our services" style={{ background: 'var(--color-surface)' }}>
      {hubs.map((hub, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={hub.slug} className={`bp-band ${flip ? 'bp-flip' : ''}`}>
            <div className="bp-image-col">
              {hub.image?.url ? (
                <Image
                  src={hub.image.url}
                  alt={hub.image.alt ?? hub.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 65vw"
                />
              ) : (
                <div className="bp-img-placeholder" />
              )}
            </div>
            <div className="bp-content">
              <p className="bp-eyebrow">Our Services</p>
              <h2 className="bp-title">{hub.title}</h2>
              <p className="bp-desc">{hub.description}</p>
              <a href={hub.slug} className="bp-cta">
                {hub.ctaLabel ?? `Learn about ${hub.title}`}
                <ArrowRight />
              </a>
            </div>
          </div>
        );
      })}

      <style>{`
        .bp-band {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 420px;
          border-bottom: 1px solid var(--color-border);
        }
        .bp-band:last-child { border-bottom: none; }
        .bp-image-col {
          position: relative;
          min-height: 300px;
          background: var(--color-surface-3);
          order: -1;
        }
        .bp-img-placeholder {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            var(--color-surface-3) 0, var(--color-surface-3) 16px,
            var(--color-surface-2) 16px, var(--color-surface-2) 32px
          );
        }
        .bp-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 24px;
          background: var(--color-surface);
        }
        .bp-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .bp-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 14px;
        }
        .bp-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 24px;
          max-width: 400px;
        }
        .bp-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          text-decoration: none;
          transition: gap var(--duration-fast) var(--easing-out);
        }
        .bp-cta:hover { gap: 12px; }

        @media (min-width: 768px) {
          .bp-band { grid-template-columns: 65% 35%; min-height: 440px; }
          .bp-image-col { order: 0; min-height: unset; }
          .bp-flip { grid-template-columns: 35% 65%; }
          .bp-flip .bp-image-col { order: 1; }
          .bp-flip .bp-content  { order: 0; }
          .bp-content { padding: 48px 40px; }
          .bp-flip .bp-content { padding: 48px 40px; }
        }
        @media (min-width: 1024px) {
          .bp-band { min-height: 480px; }
          .bp-content { padding: 56px 56px 56px 48px; }
          .bp-flip .bp-content { padding: 56px 48px 56px 56px; }
        }
      `}</style>
    </section>
  );
}

/* ── featured_plus_list variant ─────────────────────────────────────────────── */

function FeaturedPlusList({ hubs }) {
  const [featured, ...secondary] = hubs;

  return (
    <section aria-label="Our services">

      {/* ── Featured service — dominant ── */}
      <div className="fpl-featured">
        <div className="fpl-featured-image-col">
          {featured.image?.url ? (
            <Image
              src={featured.image.url}
              alt={featured.image.alt ?? featured.title}
              fill priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          ) : (
            <div className="fpl-img-placeholder" />
          )}
        </div>
        <div className="fpl-featured-content">
          <p className="fpl-featured-eyebrow">Primary Service</p>
          <h2 className="fpl-featured-title">{featured.title}</h2>
          <p className="fpl-featured-desc">{featured.description}</p>
          {featured.credential_note && (
            <div className="fpl-credential-note">
              <LockIcon />
              <span>{featured.credential_note}</span>
            </div>
          )}
          <a href={featured.slug} className="fpl-featured-cta">
            {featured.ctaLabel ?? `Learn about ${featured.title}`}
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* ── Secondary services — subordinate ── */}
      {secondary.length > 0 && (
        <div className="fpl-secondary-section">
          <div className="fpl-secondary-header">
            <h3 className="fpl-secondary-heading">Additional Services</h3>
          </div>
          <div className="fpl-secondary-grid">
            {secondary.map((hub) => (
              <div key={hub.slug} className="fpl-card">
                {hub.image?.url && (
                  <div className="fpl-card-image">
                    <Image
                      src={hub.image.url}
                      alt={hub.image.alt ?? hub.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="fpl-card-content">
                  <h3 className="fpl-card-title">{hub.title}</h3>
                  <p className="fpl-card-desc">{hub.description}</p>
                  <a href={hub.slug} className="fpl-card-cta">
                    {hub.ctaLabel ?? `Learn more`}
                    <ArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        /* ── Featured section ── */
        .fpl-featured {
          display: grid;
          grid-template-columns: 1fr;
          background: var(--color-surface);
          border-bottom: 3px solid var(--color-primary);
        }
        .fpl-featured-image-col {
          position: relative;
          min-height: 320px;
          background: var(--color-surface-3);
          order: -1;
        }
        .fpl-img-placeholder {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            135deg,
            var(--color-surface-3) 0, var(--color-surface-3) 16px,
            var(--color-surface-2) 16px, var(--color-surface-2) 32px
          );
        }
        .fpl-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 24px 56px;
        }
        .fpl-featured-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 14px;
        }
        .fpl-featured-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: var(--font-weight-black);
          line-height: var(--line-height-tight);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 18px;
        }
        .fpl-featured-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 20px;
          max-width: 540px;
        }
        .fpl-credential-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: var(--color-primary-light);
          border-left: 3px solid var(--color-primary);
          padding: 10px 14px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 24px;
          max-width: 540px;
        }
        .fpl-credential-note svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--color-primary);
        }
        .fpl-credential-note span {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          font-weight: var(--font-weight-medium);
        }
        .fpl-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: background var(--duration-fast) var(--easing-out);
        }
        .fpl-featured-cta:hover { background: var(--color-primary-dark); }

        /* ── Secondary section ── */
        .fpl-secondary-section {
          background: var(--color-surface-2);
          padding: 48px 24px;
          border-top: 1px solid var(--color-border);
        }
        .fpl-secondary-header {
          margin-bottom: 32px;
        }
        .fpl-secondary-heading {
          font-family: var(--font-heading);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0;
        }
        .fpl-secondary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .fpl-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .fpl-card-image {
          position: relative;
          height: 180px;
          background: var(--color-surface-3);
        }
        .fpl-card-content {
          padding: 24px;
        }
        .fpl-card-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: var(--color-text-heading);
          margin: 0 0 10px;
        }
        .fpl-card-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 16px;
        }
        .fpl-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          text-decoration: none;
          transition: gap var(--duration-fast) var(--easing-out);
        }
        .fpl-card-cta:hover { gap: 10px; }

        @media (min-width: 768px) {
          .fpl-featured {
            grid-template-columns: 60% 40%;
            min-height: 520px;
          }
          .fpl-featured-image-col { order: 0; min-height: unset; }
          .fpl-featured-content { padding: 64px 56px 64px 48px; }
          .fpl-secondary-section { padding: 56px 40px; }
          .fpl-secondary-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .fpl-featured { min-height: 580px; }
          .fpl-featured-content { padding: 80px 72px 80px 64px; }
          .fpl-secondary-section { padding: 64px; }
        }
      `}</style>
    </section>
  );
}

/* ── Shared icons ─────────────────────────────────────────────────────────── */

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
