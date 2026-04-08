import { getSiteConfig } from '@/lib/site-config';
import { getMdxSlugs }   from '@/lib/mdx';
import Link              from 'next/link';
import EmergencyCTA      from '@/components/home/EmergencyCTA';

export async function generateMetadata() {
  const config = getSiteConfig();
  return {
    title:       `Service Areas | ${config.business_name} | ${config.state}`,
    description: `${config.business_name} serves ${config.service_areas?.join(', ')}. Call for a free estimate in your area.`,
  };
}

export default function ServiceAreasPage() {
  const config         = getSiteConfig();
  const { service_areas = [], business_name, city, state, phone } = config;

  // Which areas have location pages built
  const locationSlugs  = new Set(getMdxSlugs('locations'));

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-hero-bg)', paddingBottom: 56 }}>
        <div className="container" style={{ paddingTop: 56 }}>
          <span className="section-eyebrow">Service Areas</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {business_name} Serves {state}
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
            We provide professional service across {city} and surrounding communities. Call to confirm availability in your area.
          </p>
        </div>
      </div>

      {/* Area grid */}
      <section className="section-pad bg-surface">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {service_areas.map(area => {
              const slug      = area.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const hasPage   = locationSlugs.has(slug);
              const isPrimary = area === city;

              const card = (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-card)',
                    border: `1px solid ${isPrimary ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: isPrimary ? 'rgba(232,82,10,0.04)' : '#fff',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    textDecoration: 'none',
                  }}
                  className="card-lift"
                >
                  <PinIcon />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), sans-serif',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: isPrimary ? 'var(--color-primary)' : 'var(--color-text-heading)',
                    }}
                  >
                    {area}
                    {isPrimary && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', display: 'block' }}>
                        Primary location
                      </span>
                    )}
                  </span>
                  {hasPage && <ArrowIcon />}
                </div>
              );

              return hasPage ? (
                <Link key={area} href={`/locations/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  {card}
                </Link>
              ) : (
                <div key={area}>{card}</div>
              );
            })}
          </div>

          {phone && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-body)', marginBottom: 16 }}>
                Don&apos;t see your city? Call to check availability.
              </p>
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="btn btn-primary btn-lg">
                {phone}
              </a>
            </div>
          )}
        </div>
      </section>

      <EmergencyCTA config={config} />
    </>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0 }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
