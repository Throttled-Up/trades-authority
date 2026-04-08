import Link from 'next/link';

/**
 * ServicesGrid — 3-column grid, icon + service name + short description.
 * Reads from config.services array.
 */
export default function ServicesGrid({ config }) {
  const { services = [], gbp_primary_category } = config;
  if (services.length === 0) return null;

  return (
    <section className="section-pad bg-surface">
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">
            {gbp_primary_category ?? 'Our Services'}
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Professional service delivered on time, done right the first time.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {services.map(service => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* All services CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const href = service.hub
    ? `/${service.hub}/${service.slug}`
    : `/services/${service.slug}`;

  return (
    <Link
      href={href}
      className="card-hover"
      style={{
        display: 'block',
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: 28,
        boxShadow: 'var(--shadow-card)',
        textDecoration: 'none',
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'rgba(var(--color-primary-rgb, 232, 82, 10), 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          color: 'var(--color-primary)',
        }}
      >
        <WrenchIcon />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-heading), sans-serif',
          fontWeight: 700,
          fontSize: '1.0625rem',
          color: 'var(--color-text-heading)',
          marginBottom: 8,
        }}
      >
        {service.name}
      </h3>

      {service.description && (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: 16 }}>
          {service.description}
        </p>
      )}

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-primary)',
        }}
      >
        Learn more
        <ArrowIcon />
      </span>
    </Link>
  );
}

function WrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
