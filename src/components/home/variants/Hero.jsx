'use client';
import Image from 'next/image';

/*
 * Hero — two variants:
 *
 *   owner_split (default)
 *     Split layout. Text left, full-bleed image right. Owner identity visible.
 *     For: owner-operator-trust persona. Competing against franchises.
 *
 *   full_bleed_project
 *     Full-width project photo underneath dark overlay. Text left-aligned over image.
 *     No split. The image IS the statement — shows scale, difficulty, capability.
 *     For: technical-authority persona. The work speaks before the words do.
 */
export default function Hero({ config, heroImage, trustFeatures, variant = 'owner_split' }) {
  const { business_name, phone, city, state } = config;
  const headline   = config.hero_headline ?? config.tagline ?? business_name;
  const sub        = config.hero_subheadline ?? `Serving ${city} and the surrounding area.`;
  const rating     = config.stats?.avg_rating;
  const reviews    = config.stats?.review_count;
  const ctaLabel   = config.cta_secondary_text ?? 'Get a Free Estimate';
  const ownerName  = config.owner_name ?? null;
  const ownerCtx   = config.owner_context ?? `${city}, ${state}`;
  const trustItems = config.trust_items ?? [config.guarantee_language].filter(Boolean);

  if (variant === 'full_bleed_project') {
    return <HeroFullBleed
      config={config} heroImage={heroImage}
      headline={headline} sub={sub} phone={phone} ctaLabel={ctaLabel}
      rating={rating} reviews={reviews} trustItems={trustItems}
      ownerName={ownerName} ownerCtx={ownerCtx} business_name={business_name}
    />;
  }

  if (variant === 'storm_urgency') {
    return <HeroStormUrgency
      config={config} heroImage={heroImage}
      headline={headline} sub={sub} phone={phone} ctaLabel={ctaLabel}
      statsItems={config.stats_items} trustItems={trustItems}
      business_name={business_name}
    />;
  }

  const headlineTagline = config.hero_tagline ?? null;
  const firstName       = ownerName ? ownerName.split(' ')[0] : null;

  return (
    <section aria-label="Hero" style={{ background: '#ffffff', overflow: 'hidden' }}>

      <div className="hero-split">

        {/* Left: content */}
        <div className="hero-content">

          <p className="hero-eyebrow">
            {config.eyebrow_text ?? `${city}, ${state}`}
          </p>

          <h1 className="hero-headline">{headline}</h1>
          {headlineTagline && (
            <p className="hero-tagline">{headlineTagline}</p>
          )}
          <div className="hero-divider" aria-hidden="true" />

          {ownerName && (
            <div className="hero-owner">
              <span className="hero-owner-name-inline">{ownerName}</span>
              <span className="hero-owner-title-line">
                {config.owner_title ?? 'Owner'}
              </span>
              {config.owner_credential && (
                <span className="hero-owner-credential">{config.owner_credential}</span>
              )}
            </div>
          )}

          <p className="hero-sub">{sub}</p>

          {(rating || reviews) && (
            <div className="hero-reviews">
              <StarRow rating={rating ?? 5} />
              <span className="hero-reviews-label">
                {rating ? `${Number(rating).toFixed(1)}` : '5.0'} stars
                {reviews ? ` · ${Number(reviews).toLocaleString()} reviews` : ''}
                {city ? ` · ${city} homeowners` : ''}
              </span>
            </div>
          )}

          <div className="hero-ctas">
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="btn-primary">
                <PhoneIcon />
                {firstName ? `Call ${firstName} Directly · ${phone}` : phone}
              </a>
            )}
            <a href="/contact" className="btn-secondary">{ctaLabel}</a>
          </div>

          {config.hero_trust_inline && (
            <p className="hero-inline-trust">
              <ShieldIcon /> {config.hero_trust_inline}
            </p>
          )}
        </div>

        {/* Right: owner photo — fades into white left side */}
        <div className="hero-image-col">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt ?? `${ownerName ? ownerName + ' — ' : ''}${business_name}`}
              fill priority
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : (
            <div className="hero-image-placeholder" aria-hidden="true" />
          )}
          <div className="hero-image-fade" aria-hidden="true" />
        </div>
      </div>

      {trustFeatures?.length
        ? <FeatureBar items={trustFeatures} />
        : <TrustBar trustItems={trustItems} />
      }

      <style>{`
        .hero-split {
          display: grid;
          grid-template-columns: 1fr;
        }
        .hero-content {
          padding: 48px 24px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          position: relative;
          z-index: 2;
        }
        .hero-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .hero-headline {
          font-family: var(--font-heading);
          font-size: var(--font-size-hero);
          font-weight: var(--font-weight-black);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-text-heading);
          margin: 0 0 8px;
          max-width: 18ch;
        }
        .hero-tagline {
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          font-style: italic;
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin: 0 0 18px;
          line-height: 1.3;
        }
        .hero-divider {
          width: 36px;
          height: 2px;
          background: var(--color-primary);
          opacity: 0.65;
          margin: 0 0 18px;
        }
        .hero-owner {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin: 0 0 14px;
        }
        .hero-owner-name-inline {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-heading);
          line-height: 1.2;
        }
        .hero-owner-title-line {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-top: 1px;
        }
        .hero-owner-credential {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-muted);
        }
        .hero-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 18px;
          max-width: 44ch;
        }
        .hero-reviews {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .hero-reviews-label {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-body);
        }
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 14px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
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
        .btn-primary:hover { background: var(--color-primary-dark); }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          background: transparent;
          color: var(--color-text-heading);
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          border: 1.5px solid var(--color-border-dark);
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: border-color var(--duration-fast) var(--easing-out),
                      background   var(--duration-fast) var(--easing-out);
        }
        .btn-secondary:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
        }
        .hero-inline-trust {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-muted);
          margin: 0;
        }
        /* Right — image */
        .hero-image-col {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          order: -1;
        }
        .hero-image-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e8f0e8 0%, #c8d8c0 100%);
        }
        .hero-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 40%);
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .hero-split {
            grid-template-columns: 45% 55%;
            min-height: 560px;
          }
          .hero-content { order: 0; padding: 56px 48px 56px 40px; }
          .hero-image-col { order: 0; min-height: unset; }
          .hero-ctas { flex-direction: row; flex-wrap: wrap; }
          .hero-image-fade {
            background: linear-gradient(
              to right,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.85) 18%,
              rgba(255,255,255,0) 50%
            );
          }
        }
        @media (min-width: 1280px) {
          .hero-split { grid-template-columns: 42% 58%; min-height: 620px; }
          .hero-content { padding: 72px 56px 72px 52px; }
          .hero-image-fade {
            background: linear-gradient(
              to right,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.75) 22%,
              rgba(255,255,255,0) 52%
            );
          }
        }
      `}</style>
    </section>
  );
}

/* ── full_bleed_project variant ─────────────────────────────────────────────── */
/*
 * Technical-authority persona. Split layout: dark content left, project image right.
 * No owner identity. Authority credential line anchors below headline.
 * Stats as capability proof (value + label + sublabel). Precision framing throughout.
 */
function HeroFullBleed({ config, heroImage, headline, sub, phone, ctaLabel, trustItems, business_name }) {
  const authorityLine = config.authority_line ?? null;
  const statsItems    = config.stats_items ?? [];

  return (
    <section aria-label="Hero" className="fbp-hero">

      <div className="fbp-grid">

        {/* Left — dark content column */}
        <div className="fbp-content">

          {config.eyebrow_text && (
            <p className="fbp-eyebrow">{config.eyebrow_text}</p>
          )}

          <h1 className="fbp-headline">{headline}</h1>

          {authorityLine && (
            <div className="fbp-authority">
              <ShieldIcon />
              <span>{authorityLine}</span>
            </div>
          )}

          <p className="fbp-sub">{sub}</p>

          {statsItems.length > 0 && (
            <div className="fbp-stats">
              {statsItems.map((s, i) => (
                <div key={i} className="fbp-stat">
                  <span className="fbp-stat-value">{s.value}</span>
                  <span className="fbp-stat-label">{s.label}</span>
                  {s.sublabel && <span className="fbp-stat-sub">{s.sublabel}</span>}
                </div>
              ))}
            </div>
          )}

          <div className="fbp-ctas">
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="fbp-btn-primary">
                <PhoneIcon /> {phone}
              </a>
            )}
            <a href="/contact" className="fbp-btn-secondary">
              {ctaLabel}
              <ChevronRight />
            </a>
          </div>

        </div>

        {/* Right — project image */}
        <div className="fbp-image-col">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt ?? business_name}
              fill priority
              style={{ objectFit: 'cover', objectPosition: 'right center' }}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          ) : (
            <div className="fbp-placeholder" aria-hidden="true" />
          )}
          <div className="fbp-edge-fade" aria-hidden="true" />
        </div>

      </div>

      <TrustBar trustItems={trustItems} />

      <style>{`
        .fbp-hero {
          background: #0a0e14;
          overflow: hidden;
        }
        .fbp-grid {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 580px;
        }

        /* Left — content */
        .fbp-content {
          padding: 52px 24px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #0a0e14;
          position: relative;
          z-index: 2;
        }
        .fbp-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 16px;
        }
        .fbp-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.25rem, 5.5vw, 4rem);
          font-weight: var(--font-weight-black);
          line-height: 1.0;
          letter-spacing: -0.035em;
          color: #ffffff;
          margin: 0 0 18px;
          max-width: 13ch;
        }
        .fbp-authority {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 20px;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
        }
        .fbp-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: rgba(255,255,255,0.52);
          margin: 0 0 26px;
          max-width: 42ch;
          border-left: 2px solid rgba(255,255,255,0.14);
          padding-left: 14px;
        }
        .fbp-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 30px;
          margin-bottom: 26px;
        }
        .fbp-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fbp-stat-value {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: var(--font-weight-black);
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.03em;
        }
        .fbp-stat-label {
          font-family: var(--font-body);
          font-size: 9px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
        }
        .fbp-stat-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: rgba(255,255,255,0.38);
          font-weight: var(--font-weight-medium);
        }
        .fbp-ctas {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fbp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: 800;
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: background var(--duration-fast) var(--easing-out);
        }
        .fbp-btn-primary:hover { background: var(--color-primary-dark); }
        .fbp-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          color: rgba(255,255,255,0.82);
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: border-color var(--duration-fast) var(--easing-out);
        }
        .fbp-btn-secondary:hover { border-color: rgba(255,255,255,0.58); }

        /* Right — image */
        .fbp-image-col {
          position: relative;
          min-height: 300px;
          overflow: hidden;
          order: -1;
        }
        .fbp-placeholder {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            #0e1a27 0px, #0e1a27 20px,
            #131f2e 20px, #131f2e 40px
          );
        }
        .fbp-edge-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10,14,20,1) 0%,
            rgba(10,14,20,0) 50%
          );
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .fbp-grid { grid-template-columns: 42% 58%; min-height: 640px; }
          .fbp-content { padding: 64px 48px 64px 40px; order: 0; }
          .fbp-image-col { order: 0; min-height: unset; }
          .fbp-ctas { flex-direction: row; flex-wrap: wrap; }
          .fbp-edge-fade {
            background: linear-gradient(
              to right,
              rgba(10,14,20,1) 0%,
              rgba(10,14,20,0.5) 40%,
              rgba(10,14,20,0) 70%
            );
          }
        }
        @media (min-width: 1280px) {
          .fbp-grid { grid-template-columns: 40% 60%; min-height: 720px; }
          .fbp-content { padding: 80px 56px 80px 56px; }
        }
      `}</style>
    </section>
  );
}

/* ── storm_urgency variant ───────────────────────────────────────────────────── */
/*
 * Volume-service persona. Full-bleed storm/project photo with dark overlay.
 * Inspection CTA is PRIMARY (not phone). Phone is secondary.
 * No owner identity. Scale metrics (roofs completed, reviews, years) above CTAs.
 * Urgency feel — this is a company, not a person.
 */
function HeroStormUrgency({ config, heroImage, headline, sub, phone, ctaLabel, statsItems, trustItems, business_name }) {
  const inspectLabel = ctaLabel ?? 'Schedule Free Inspection';

  return (
    <section aria-label="Hero" className="su-hero">

      <div className="su-image">
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt ?? business_name}
            fill priority
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            sizes="100vw"
          />
        ) : (
          <div className="su-placeholder" aria-hidden="true" />
        )}
        <div className="su-overlay" aria-hidden="true" />
      </div>

      <div className="su-content">
        <div className="su-inner">

          {config.eyebrow_text && (
            <p className="su-eyebrow">{config.eyebrow_text}</p>
          )}

          <h1 className="su-headline">{headline}</h1>
          <p className="su-sub">{sub}</p>

          {statsItems?.length > 0 && (
            <div className="su-stats">
              {statsItems.map(s => (
                <div key={s.label} className="su-stat">
                  <span className="su-stat-value">{s.value}</span>
                  <span className="su-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="su-ctas">
            <a href="/contact" className="su-btn-primary">
              {inspectLabel}
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="su-btn-secondary">
                <PhoneIcon /> {phone}
              </a>
            )}
          </div>

        </div>
      </div>

      <TrustBar trustItems={trustItems} />

      <style>{`
        .su-hero { position: relative; overflow: hidden; }
        .su-image {
          position: relative;
          min-height: 580px;
          background: #0d1a2a;
        }
        .su-placeholder {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            #0b1520 0px, #0b1520 20px,
            #0f1d28 20px, #0f1d28 40px
          );
        }
        .su-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.80) 0%,
            rgba(0,0,0,0.60) 55%,
            rgba(0,0,0,0.30) 100%
          );
        }
        .su-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
        }
        .su-inner {
          padding: 40px 24px;
          max-width: 640px;
        }
        .su-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
          margin: 0 0 8px;
        }
        .su-headline {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: var(--font-weight-black);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin: 0 0 8px;
          max-width: 13ch;
        }
        .su-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: rgba(255,255,255,0.60);
          margin: 0 0 14px;
          max-width: 38ch;
        }
        .su-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          margin-bottom: 8px;
          padding: 8px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .su-stat {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .su-stat-value {
          font-family: var(--font-heading);
          font-size: clamp(1.375rem, 2.2vw, 1.75rem);
          font-weight: var(--font-weight-black);
          line-height: 1;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .su-stat-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: rgba(255,255,255,0.42);
          font-weight: var(--font-weight-medium);
        }
        .su-ctas {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 32px;
        }
        .su-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: 800;
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: background var(--duration-fast) var(--easing-out);
        }
        .su-btn-primary:hover { background: var(--color-primary-dark); }
        .su-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          color: rgba(255,255,255,0.80);
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: var(--btn-radius);
          text-decoration: none;
          width: fit-content;
          transition: border-color var(--duration-fast) var(--easing-out);
        }
        .su-btn-secondary:hover { border-color: rgba(255,255,255,0.60); }

        @media (min-width: 768px) {
          .su-image { min-height: 640px; }
          .su-inner { padding: 56px 56px 56px 32px; }
          .su-ctas { flex-direction: row; flex-wrap: wrap; }
        }
        @media (min-width: 1280px) {
          .su-image { min-height: 720px; }
          .su-inner { padding: 64px 80px 64px 48px; max-width: 720px; }
        }
      `}</style>
    </section>
  );
}

/* ── Shared sub-components ───────────────────────────────────────────────────── */

function TrustBar({ trustItems }) {
  if (!trustItems?.length) return null;
  return (
    <div className="hero-trust-bar">
      <div className="hero-trust-inner">
        {trustItems.map(item => (
          <span key={item} className="hero-trust-item">
            <CheckIcon /> {item}
          </span>
        ))}
      </div>
      <style>{`
        .hero-trust-bar {
          background: var(--color-anchor);
          padding: 14px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hero-trust-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          align-items: center;
          justify-content: center;
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(249, 250, 251, 0.80);
        }
        @media (min-width: 768px) {
          .hero-trust-inner { justify-content: flex-start; gap: 8px 32px; }
        }
      `}</style>
    </div>
  );
}

function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#d97706' : 'none'}
          stroke="#d97706" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

function FeatureBar({ items }) {
  const iconMap = {
    person:   <PersonFeatureIcon />,
    leaf:     <LeafFeatureIcon />,
    thumbsup: <ThumbsUpFeatureIcon />,
    calendar: <CalendarFeatureIcon />,
  };
  return (
    <div className="feat-bar">
      <div className="feat-inner">
        {items.map((item, i) => (
          <div key={i} className="feat-item">
            <div className="feat-icon">{iconMap[item.icon] ?? <PersonFeatureIcon />}</div>
            <div className="feat-text">
              <p className="feat-title">{item.title}</p>
              <p className="feat-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .feat-bar {
          background: #f5f7f4;
          border-top: 1px solid #e0e7de;
          padding: 20px 24px;
        }
        .feat-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px 12px;
        }
        .feat-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .feat-icon {
          width: 38px;
          height: 38px;
          background: rgba(29,104,64,0.10);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-primary);
        }
        .feat-title {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-heading);
          margin: 0 0 2px;
          line-height: 1.3;
        }
        .feat-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          margin: 0;
          line-height: var(--line-height-relaxed);
        }
        @media (min-width: 640px) {
          .feat-inner {
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
          }
          .feat-item {
            padding: 0 16px;
            border-right: 1px solid #dce4da;
          }
          .feat-item:first-child { padding-left: 0; }
          .feat-item:last-child { border-right: none; padding-right: 0; }
        }
        @media (min-width: 768px) {
          .feat-bar { padding: 20px 40px; }
        }
      `}</style>
    </div>
  );
}

function PersonFeatureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function LeafFeatureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 014 13V6l7-3 7 3v7a7 7 0 01-7 7z"/>
      <path d="M4 6l7 7"/>
    </svg>
  );
}
function ThumbsUpFeatureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
    </svg>
  );
}
function CalendarFeatureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
