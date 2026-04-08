import Image from 'next/image';

/**
 * Hero — full-bleed dark section, left-aligned H1, dual CTA.
 * Image comes from MDX frontmatter images[slot=hero] or falls back to a dark gradient.
 */
export default function Hero({ config, heroImage }) {
  const { business_name, phone, tagline, city, state } = config;

  // Headline built from tagline or business name
  const headline = config.hero_headline ?? tagline ?? business_name;
  const subheadline = config.hero_subheadline ?? `Serving ${city}, ${state} and surrounding areas`;

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--color-hero-bg)',
        minHeight: 560,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      {heroImage?.url && (
        <>
          <Image
            src={heroImage.url}
            alt={heroImage.alt ?? ''}
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.35 }}
            sizes="100vw"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.55) 60%, rgba(15,15,15,0.3) 100%)',
            }}
          />
        </>
      )}

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBlock: '80px 80px',
          maxWidth: 720,
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            display: 'inline-block',
            background: 'var(--color-primary)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 2,
            marginBottom: 20,
          }}
        >
          {city}, {state}
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.65,
            marginBottom: 36,
            maxWidth: 560,
          }}
        >
          {subheadline}
        </p>

        {/* Dual CTA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="btn btn-primary btn-lg"
            >
              <PhoneIcon />
              Call {phone}
            </a>
          )}
          <a href="/contact" className="btn btn-outline btn-lg">
            Free Estimate
          </a>
        </div>

        {/* Trust micro-signals */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            marginTop: 36,
          }}
        >
          {[
            config.license && `Licensed & Insured`,
            config.stats?.avg_rating && `${config.stats.avg_rating}★ Rated`,
            config.stats?.years_in_business && `${config.stats.years_in_business}+ Years`,
            config.emergency_available && 'Emergency Service',
          ]
            .filter(Boolean)
            .map(text => (
              <span
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <CheckIcon />
                {text}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
