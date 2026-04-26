/*
 * ServiceAreas — text_list variant
 *
 * For owner-operator-trust persona. Neighborhood names as the signal,
 * not just the service radius. Premium zip codes listed first — Ponte Vedra,
 * Nocatee, Palm Valley — followed by the broader coverage area.
 * White background, tight layout. Not a map, not pills — text.
 *
 * Props: { config }
 * Config fields:
 *   service_area_cities: string[]
 *   service_areas_primary: string[] (optional — listed first, larger)
 *   city, state
 */
export default function ServiceAreas({ config }) {
  const all      = config.service_area_cities ?? [];
  const primary  = config.service_areas_primary ?? all.slice(0, 4);
  const rest     = all.filter(c => !primary.includes(c));

  if (!all.length) return null;

  return (
    <section aria-label="Service areas" className="sa-section">
      <div className="sa-inner">
        <div className="sa-left">
          <p className="sa-eyebrow">Where We Serve</p>
          <h2 className="sa-heading">
            {config.city ?? 'Local'} and surrounding communities
          </h2>
          <p className="sa-sub">
            {config.service_area_sub ?? (
              <>
                Based in {config.city ?? 'the area'}
                {config.owner_name ? `, ${config.owner_name.split(' ')[0]} serves` : ', we serve'} homeowners across {config.state ?? 'the region'}.
              </>
            )}
          </p>
        </div>

        <div className="sa-right">
          {primary.length > 0 && (
            <ul className="sa-primary-list" aria-label="Primary service areas">
              {primary.map(c => (
                <li key={c} className="sa-primary-item">{c}</li>
              ))}
            </ul>
          )}
          {rest.length > 0 && (
            <ul className="sa-rest-list" aria-label="Additional service areas">
              {rest.map(c => (
                <li key={c} className="sa-rest-item">{c}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        .sa-section {
          background: var(--color-surface-2);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .sa-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        .sa-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .sa-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 14px;
        }
        .sa-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Primary list — larger, bold */
        .sa-primary-list {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px 24px;
        }
        .sa-primary-item {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-heading);
          padding: 6px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .sa-primary-item::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--color-primary);
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
          margin-bottom: 2px;
        }

        /* Rest — smaller, muted */
        .sa-rest-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 4px 0;
        }
        .sa-rest-item {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          padding: 2px 16px 2px 0;
        }
        .sa-rest-item:not(:last-child)::after {
          content: ' ·';
          color: var(--color-border-dark);
        }

        @media (min-width: 768px) {
          .sa-section { padding: var(--section-padding-y) 40px; }
          .sa-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
          .sa-primary-list { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .sa-inner { grid-template-columns: 380px 1fr; }
        }
      `}</style>
    </section>
  );
}
