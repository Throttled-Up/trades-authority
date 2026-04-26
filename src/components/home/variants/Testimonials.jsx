/*
 * Testimonials — two variants:
 *
 *   pull_quote_trio (default)
 *     Three equal-weight pull quotes in a grid. No hierarchy.
 *
 *   featured_plus_grid
 *     First testimonial is the featured endorsement — visually elevated,
 *     full-width, larger type, labeled if it's a peer/contractor reference.
 *     Remaining testimonials appear below in a 2-column supporting grid.
 *     For technical-authority persona where a contractor-to-contractor or
 *     professional endorsement carries more weight than standard homeowner reviews.
 *
 * Props:
 *   testimonials: [{ body, name, neighborhood, role? }]
 *   config: { city, stats: { review_count } }
 *   variant: 'pull_quote_trio' | 'featured_plus_grid'
 */
export default function Testimonials({ testimonials = [], config, variant = 'pull_quote_trio' }) {
  const items = testimonials.length ? testimonials.slice(0, 3) : DEFAULT_TESTIMONIALS;

  if (variant === 'featured_plus_grid') {
    return <FeaturedPlusGrid items={items} config={config} />;
  }

  if (variant === 'neighborhood_quotes') {
    return <NeighborhoodQuotes items={items} config={config} />;
  }

  if (variant === 'volume_with_metrics') {
    return <VolumeWithMetrics items={items} config={config} />;
  }

  return (
    <section aria-label="What customers say" className="testimonials">
      <div className="test-inner">
        <div className="test-header">
          <p className="test-eyebrow">Reviews</p>
          <h2 className="test-heading">
            What {config?.city ?? 'local'} homeowners say
          </h2>
        </div>
        <div className="test-grid">
          {items.map((t, i) => (
            <blockquote key={i} className="test-quote">
              <span className="test-mark" aria-hidden="true">"</span>
              <p className="test-body">{t.body}</p>
              <footer className="test-footer">
                <span className="test-name">{t.name}</span>
                {t.neighborhood && (
                  <span className="test-neighborhood">{t.neighborhood}</span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
        {config?.stats?.review_count && (
          <div className="test-cta">
            <a href="/reviews" className="test-link">
              Read all {config.stats.review_count}+ reviews
              <ArrowRight />
            </a>
          </div>
        )}
      </div>

      <style>{`
        .testimonials {
          background: var(--color-surface-2);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .test-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .test-header { margin-bottom: 56px; }
        .test-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .test-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0;
          max-width: 20ch;
        }
        .test-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .test-quote { margin: 0; padding: 0; position: relative; }
        .test-mark {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: var(--font-weight-black);
          line-height: 0.7;
          color: var(--color-primary);
          display: block;
          margin-bottom: 14px;
          opacity: 0.5;
        }
        .test-body {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 20px;
        }
        .test-footer { display: flex; flex-direction: column; gap: 2px; }
        .test-name {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-heading);
        }
        .test-neighborhood {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
        }
        .test-cta { padding-top: 32px; border-top: 1px solid var(--color-border); }
        .test-link {
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
        .test-link:hover { gap: 12px; }
        @media (min-width: 768px) {
          .testimonials { padding: var(--section-padding-y) 40px; }
          .test-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; }
          .test-quote { padding-top: 8px; }
        }
      `}</style>
    </section>
  );
}

/* ── featured_plus_grid variant ──────────────────────────────────────────── */

function FeaturedPlusGrid({ items, config }) {
  const [featured, ...supporting] = items;

  return (
    <section aria-label="What customers say" className="fpg-section">
      <div className="fpg-inner">

        <div className="fpg-header">
          <p className="fpg-eyebrow">Reviews</p>
          <h2 className="fpg-heading">
            What {config?.city ?? 'local'} homeowners say
          </h2>
        </div>

        {/* ── Featured endorsement ── */}
        <blockquote className="fpg-featured">
          {featured.role && (
            <p className="fpg-featured-role">{featured.role}</p>
          )}
          <span className="fpg-mark" aria-hidden="true">"</span>
          <p className="fpg-featured-body">{featured.body}</p>
          <footer className="fpg-featured-footer">
            <span className="fpg-featured-name">{featured.name}</span>
            {featured.neighborhood && (
              <span className="fpg-featured-neighborhood">{featured.neighborhood}</span>
            )}
          </footer>
        </blockquote>

        {/* ── Supporting grid ── */}
        {supporting.length > 0 && (
          <div className="fpg-grid">
            {supporting.map((t, i) => (
              <blockquote key={i} className="fpg-quote">
                <span className="fpg-quote-mark" aria-hidden="true">"</span>
                <p className="fpg-quote-body">{t.body}</p>
                <footer className="fpg-quote-footer">
                  <span className="fpg-quote-name">{t.name}</span>
                  {t.neighborhood && (
                    <span className="fpg-quote-neighborhood">{t.neighborhood}</span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {config?.stats?.review_count && (
          <div className="fpg-cta">
            <a href="/reviews" className="fpg-link">
              Read all {config.stats.review_count}+ reviews
              <ArrowRight />
            </a>
          </div>
        )}

      </div>

      <style>{`
        .fpg-section {
          background: var(--color-surface-2);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .fpg-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .fpg-header { margin-bottom: 48px; }
        .fpg-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .fpg-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0;
          max-width: 20ch;
        }

        /* Featured endorsement */
        .fpg-featured {
          margin: 0 0 48px;
          padding: 36px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .fpg-featured-role {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 14px;
        }
        .fpg-mark {
          font-family: var(--font-heading);
          font-size: 4.5rem;
          font-weight: var(--font-weight-black);
          line-height: 0.6;
          color: var(--color-primary);
          display: block;
          margin-bottom: 16px;
          opacity: 0.4;
        }
        .fpg-featured-body {
          font-family: var(--font-body);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 24px;
        }
        .fpg-featured-footer { display: flex; flex-direction: column; gap: 3px; }
        .fpg-featured-name {
          font-family: var(--font-heading);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-heading);
        }
        .fpg-featured-neighborhood {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
        }

        /* Supporting grid */
        .fpg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 40px;
          padding-top: 8px;
          border-top: 1px solid var(--color-border);
        }
        .fpg-quote { margin: 0; padding: 0; }
        .fpg-quote-mark {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: var(--font-weight-black);
          line-height: 0.7;
          color: var(--color-primary);
          display: block;
          margin-bottom: 10px;
          opacity: 0.35;
        }
        .fpg-quote-body {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 14px;
        }
        .fpg-quote-footer { display: flex; flex-direction: column; gap: 2px; }
        .fpg-quote-name {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-heading);
        }
        .fpg-quote-neighborhood {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
        }
        .fpg-cta { padding-top: 8px; }
        .fpg-link {
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
        .fpg-link:hover { gap: 12px; }

        @media (min-width: 768px) {
          .fpg-section { padding: var(--section-padding-y) 40px; }
          .fpg-featured { padding: 44px 48px; }
          .fpg-featured-body { font-size: var(--font-size-xl); }
          .fpg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            padding-top: 40px;
          }
        }
      `}</style>
    </section>
  );
}

/* ── neighborhood_quotes variant ──────────────────────────────────────── */
/*
 * Neighborhood is the primary signal, not the reviewer's name.
 * Each quote card leads with the neighborhood — Nocatee, Ponte Vedra Beach,
 * Palm Valley — because that's what tells the next reader "this person is
 * my neighbor." White cards on surface-2, no star icons.
 */
function NeighborhoodQuotes({ items, config }) {
  return (
    <section aria-label="What customers say" className="nq-section">
      <div className="nq-inner">

        <div className="nq-header">
          <p className="nq-eyebrow">From the Community</p>
          <h2 className="nq-heading">
            What {config?.city ?? 'local'} homeowners say
          </h2>
          {config?.stats?.review_count && (
            <p className="nq-sub">
              {Number(config.stats.avg_rating ?? 5).toFixed(1)}-star rating
              from {config.stats.review_count}+ verified reviews
            </p>
          )}
        </div>

        <div className="nq-grid">
          {items.map((t, i) => (
            <blockquote key={i} className="nq-card">
              {t.neighborhood && (
                <div className="nq-neighborhood">
                  <PinIcon />
                  <span>{t.neighborhood}</span>
                </div>
              )}
              <p className="nq-body">{t.body}</p>
              <footer className="nq-footer">
                <span className="nq-name">{t.name}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="nq-cta">
          <a href="/reviews" className="nq-link">
            Read all {config?.stats?.review_count ?? ''}+ reviews
            <ArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        .nq-section {
          background: var(--color-surface-2);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .nq-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .nq-header { margin-bottom: 48px; }
        .nq-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .nq-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 10px;
        }
        .nq-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          margin: 0;
        }
        .nq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        .nq-card {
          margin: 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .nq-neighborhood {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin-bottom: 14px;
        }
        .nq-body {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 16px;
        }
        .nq-footer { border-top: 1px solid var(--color-border); padding-top: 12px; }
        .nq-name {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-muted);
        }
        .nq-cta { padding-top: 8px; }
        .nq-link {
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
        .nq-link:hover { gap: 12px; }

        @media (min-width: 768px) {
          .nq-section { padding: var(--section-padding-y) 40px; }
          .nq-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .nq-card { padding: 28px; }
        }
      `}</style>
    </section>
  );
}

/* ── volume_with_metrics variant ────────────────────────────────────────── */
/*
 * Scale is the trust signal — not neighborhood pins.
 * Large metric bar anchors the section: roofs completed, reviews, years.
 * Testimonials focus on insurance experience and process quality.
 * Each testimonial uses a "situation label" (e.g. "Hail damage — full replacement")
 * in place of neighborhood pin.
 */
function VolumeWithMetrics({ items, config }) {
  const metricsItems = config?.stats_items ?? [];
  const [featured, ...rest] = items;

  return (
    <section aria-label="What customers say" className="vwm-section">
      <div className="vwm-inner">

        <div className="vwm-header">
          <p className="vwm-eyebrow">Verified Reviews</p>
          <h2 className="vwm-heading">What DFW homeowners say about the process</h2>
        </div>

        {/* Metric anchors */}
        {metricsItems.length > 0 && (
          <div className="vwm-metrics">
            {metricsItems.map(m => (
              <div key={m.label} className="vwm-metric">
                <span className="vwm-metric-value">{m.value}</span>
                <span className="vwm-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Featured testimonial */}
        <blockquote className="vwm-featured">
          {featured.role && (
            <div className="vwm-situation">{featured.role}</div>
          )}
          <p className="vwm-featured-body">{featured.body}</p>
          <footer className="vwm-featured-footer">
            <span className="vwm-featured-name">{featured.name}</span>
          </footer>
        </blockquote>

        {/* Supporting reviews */}
        {rest.length > 0 && (
          <div className="vwm-grid">
            {rest.map((t, i) => (
              <blockquote key={i} className="vwm-card">
                {t.role && (
                  <div className="vwm-card-situation">{t.role}</div>
                )}
                <p className="vwm-card-body">{t.body}</p>
                <footer className="vwm-card-footer">
                  <span className="vwm-card-name">{t.name}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .vwm-section {
          background: var(--color-surface-2);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .vwm-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .vwm-header { margin-bottom: 40px; }
        .vwm-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .vwm-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0;
          max-width: 28ch;
        }

        /* Metrics bar */
        .vwm-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          background: var(--color-anchor);
          border-radius: var(--radius-lg);
          padding: 24px 32px;
          margin-bottom: 40px;
        }
        .vwm-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 0;
        }
        .vwm-metric-value {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-black);
          line-height: 1;
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-inverse);
        }
        .vwm-metric-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          color: rgba(249,250,251,0.60);
          font-weight: var(--font-weight-medium);
        }

        /* Featured testimonial */
        .vwm-featured {
          margin: 0 0 24px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          padding: 28px 24px;
        }
        .vwm-situation {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 14px;
        }
        .vwm-featured-body {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 16px;
        }
        .vwm-featured-footer {
          border-top: 1px solid var(--color-border);
          padding-top: 12px;
        }
        .vwm-featured-name {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-heading);
        }

        /* Supporting grid */
        .vwm-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .vwm-card {
          margin: 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .vwm-card-situation {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-primary);
          margin-bottom: 10px;
        }
        .vwm-card-body {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0 0 14px;
        }
        .vwm-card-footer {
          border-top: 1px solid var(--color-border);
          padding-top: 10px;
        }
        .vwm-card-name {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-muted);
        }

        @media (min-width: 640px) {
          .vwm-metrics { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 768px) {
          .vwm-section { padding: var(--section-padding-y) 40px; }
          .vwm-grid { grid-template-columns: repeat(2, 1fr); }
          .vwm-featured { padding: 32px 32px; }
        }
      `}</style>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

/* ── Default fallback content ──────────────────────────────────────────── */

const DEFAULT_TESTIMONIALS = [
  {
    body: 'Showed up when they said they would, did the work right the first time, and followed up to make sure everything was handled. Exactly what you want from a local contractor.',
    name: 'Customer Review',
    neighborhood: null,
  },
  {
    body: 'We got quotes from three companies. These guys were the only ones who actually walked the property before quoting. The difference in quality showed.',
    name: 'Customer Review',
    neighborhood: null,
  },
  {
    body: 'Very professional. Explained everything clearly, kept us informed through the job, and the finished work passed inspection first try.',
    name: 'Customer Review',
    neighborhood: null,
  },
];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
