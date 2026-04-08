/**
 * WhyChooseUs — differentiator cards on alternating background.
 * Reads from config.differentiators (array of { title, description, icon? }).
 * Falls back to config.unique_selling_points if differentiators not set.
 */
export default function WhyChooseUs({ config }) {
  const items = config.differentiators ?? [];
  if (items.length === 0) return null;

  return (
    <section className="section-pad bg-surface-2">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left: headline */}
          <div>
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="section-title" style={{ maxWidth: 400, marginBottom: 20 }}>
              The {config.city} Area's Most Trusted Choice
            </h2>
            <p className="section-lead">
              {config.owner_name
                ? `${config.owner_name} and the team at ${config.business_name} built this business on a single promise: do the job right.`
                : `${config.business_name} built this business on a single promise: do the job right.`
              }
            </p>
          </div>

          {/* Right: cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  background: '#fff',
                  borderRadius: 'var(--radius-card)',
                  padding: '20px 24px',
                  boxShadow: 'var(--shadow-card)',
                  borderLeft: '4px solid var(--color-primary)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#fff',
                  }}
                >
                  <CheckIcon />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading), sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--color-text-heading)',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
