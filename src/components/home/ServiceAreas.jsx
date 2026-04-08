import Link from 'next/link';

/**
 * ServiceAreas — geographic strip listing all served cities.
 * Links to location pages when they exist.
 */
export default function ServiceAreas({ config }) {
  const { service_areas = [], city, state } = config;
  if (service_areas.length === 0) return null;

  return (
    <section
      className="section-pad-sm"
      style={{ background: 'var(--color-hero-bg)' }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginRight: 8,
              flexBasis: '100%',
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            Serving {state}
          </span>

          {service_areas.map((area, i) => {
            const slug = area.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return (
              <Link
                key={i}
                href={`/locations/${slug}`}
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.75)',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  background: area === city ? 'var(--color-primary)' : 'transparent',
                  borderColor: area === city ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
                  color: area === city ? '#fff' : 'rgba(255,255,255,0.75)',
                }}
                className={area !== city ? 'pill-hover' : ''}
              >
                {area}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
