/**
 * Testimonials — name + city + quote cards.
 * Reads from config.testimonials (array of { name, city, quote, rating? }).
 */
export default function Testimonials({ config }) {
  const { testimonials = [], business_name } = config;
  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad bg-surface-2">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">What Customers Say</span>
          <h2 className="section-title">Real Reviews from Real Neighbors</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {testimonials.slice(0, 6).map((t, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 'var(--radius-card)',
                padding: 28,
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Stars */}
              <Stars rating={t.rating ?? 5} />

              {/* Quote */}
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-body)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#fff',
                    fontSize: '0.875rem',
                    flexShrink: 0,
                  }}
                >
                  {(t.name ?? '?')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-heading)' }}>
                    {t.name}
                  </div>
                  {t.city && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      {t.city}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google review CTA */}
        {config.social?.google && (
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a
              href={config.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read All Reviews on Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? '#f59e0b' : '#e5e7eb'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}
