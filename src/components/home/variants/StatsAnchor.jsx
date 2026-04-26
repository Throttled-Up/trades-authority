/*
 * StatsAnchor — full-width dark anchor section.
 *
 * Hard visual contrast between service bands.
 * All stat values and labels come from config — no hardcoded client data.
 *
 * config.stats_items: [{ value, label }]  — explicit list (takes precedence)
 * Falls back to building from config.stats fields if stats_items not provided.
 */
export default function StatsAnchor({ config }) {
  const stats = config.stats_items?.length
    ? config.stats_items
    : [
        config.stats?.avg_rating && {
          value: `${Number(config.stats.avg_rating).toFixed(1)}★`,
          label: `from ${config.stats.review_count?.toLocaleString() ?? '0'} reviews`,
        },
        config.stats?.years_in_business && {
          value: `${config.stats.years_in_business}+`,
          label: `Years in Business`,
        },
        config.stats?.stat3_value && {
          value: config.stats.stat3_value,
          label: config.stats.stat3_label ?? '',
        },
        config.stats?.stat4_value && {
          value: config.stats.stat4_value,
          label: config.stats.stat4_label ?? '',
        },
      ].filter(Boolean);

  const certs = config.credentials ?? [];

  return (
    <section aria-label="By the numbers" className="stats-anchor">
      <div className="stats-inner">

        {/* Numbers row */}
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="stats-divider" />

        {/* Credentials */}
        <div className="certs-grid">
          {certs.map(c => (
            <span key={c} className="cert-item">
              <CertIcon /> {c}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .stats-anchor {
          background: var(--color-anchor);
          padding: var(--section-padding-y-sm) 24px;
        }
        .stats-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 24px;
          margin-bottom: 48px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: clamp(2.25rem, 5.5vw, 4rem);
          font-weight: var(--font-weight-black);
          line-height: 1;
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-inverse);
        }
        .stat-label {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(245, 239, 224, 0.65);
          line-height: 1.4;
        }
        .stats-divider {
          height: 1px;
          background: rgba(245, 239, 224, 0.15);
          margin-bottom: 40px;
        }
        .certs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .cert-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(245, 239, 224, 0.85);
        }

        @media (min-width: 768px) {
          .stats-anchor { padding: var(--section-padding-y) 40px; }
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 48px 32px;
          }
          .certs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 48px;
          }
        }

        @media (min-width: 1024px) {
          .certs-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}

function CertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="rgba(29, 104, 64, 0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
