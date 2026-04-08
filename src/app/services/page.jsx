import { getSiteConfig } from '@/lib/site-config';
import { getMdxIndex }   from '@/lib/mdx';
import Link              from 'next/link';
import EmergencyCTA      from '@/components/home/EmergencyCTA';

export async function generateMetadata() {
  const config = getSiteConfig();
  return {
    title:       `All Services | ${config.business_name} | ${config.city}, ${config.state}`,
    description: `${config.business_name} offers professional services in ${config.city}, ${config.state}. View all services and get a free estimate.`,
  };
}

export default function ServicesIndexPage() {
  const config   = getSiteConfig();
  const allPages = getMdxIndex('services');

  // Group by hub if services have hub_slug in frontmatter
  const hubs     = config.hubs ?? [];
  const hubMap   = {};
  const noHub    = [];

  for (const { slug, frontmatter: fm } of allPages) {
    const service = (config.services ?? []).find(s => s.slug === slug);
    const hubSlug = fm.hub_slug ?? service?.hub ?? null;

    if (hubSlug) {
      if (!hubMap[hubSlug]) hubMap[hubSlug] = [];
      hubMap[hubSlug].push({ slug, fm, service });
    } else {
      noHub.push({ slug, fm, service });
    }
  }

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-hero-bg)', paddingBottom: 56 }}>
        <div className="container" style={{ paddingTop: 56 }}>
          <span className="section-eyebrow">All Services</span>
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
            Services in {config.city}, {config.state}
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
            {config.business_name} offers professional services across the {config.city} area.
          </p>
        </div>
      </div>

      <section className="section-pad bg-surface">
        <div className="container">
          {/* Hub groups */}
          {hubs.map(hub => {
            const services = hubMap[hub.slug] ?? [];
            if (services.length === 0) return null;
            return (
              <div key={hub.slug} style={{ marginBottom: 56 }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    color: 'var(--color-text-heading)',
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: '2px solid var(--color-primary)',
                    display: 'inline-block',
                  }}
                >
                  {hub.name}
                </h2>
                <ServiceGrid items={services} category={hub.slug} />
              </div>
            );
          })}

          {/* Ungrouped services */}
          {noHub.length > 0 && (
            <div>
              {hubs.length > 0 && (
                <h2
                  style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    color: 'var(--color-text-heading)',
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: '2px solid var(--color-primary)',
                    display: 'inline-block',
                  }}
                >
                  Additional Services
                </h2>
              )}
              <ServiceGrid items={noHub} category={null} />
            </div>
          )}
        </div>
      </section>

      <EmergencyCTA config={config} />
    </>
  );
}

function ServiceGrid({ items, category }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 20,
      }}
    >
      {items.map(({ slug, fm, service }) => {
        const href = category ? `/${category}/${slug}` : `/services/${slug}`;
        return (
          <Link
            key={slug}
            href={href}
            className="card-lift"
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: '22px 24px',
              boxShadow: 'var(--shadow-card)',
              textDecoration: 'none',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-text-heading)',
                marginBottom: 6,
              }}
            >
              {fm.service_name ?? service?.name ?? slug}
            </h3>
            {(fm.meta_description ?? service?.description) && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.55, marginBottom: 12 }}>
                {fm.meta_description ?? service?.description}
              </p>
            )}
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              Learn more →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
