import ContentImage from '@/components/shared/ContentImage';

/**
 * Gallery — project photo grid with location + scope caption.
 * Reads from config.gallery_items or falls back gracefully if empty.
 * Images are client-supplied (client-uploads bucket) or Imagen-generated section images.
 */
export default function Gallery({ config, images = [] }) {
  const items = config.gallery_items ?? [];

  // If no gallery items configured, skip this section entirely
  if (items.length === 0 && images.length === 0) return null;

  // Merge configured gallery items with any passed images
  const displayItems = items.length > 0
    ? items
    : images.filter(img => img.slot?.startsWith('section_')).slice(0, 6).map(img => ({
        url: img.url,
        alt: img.alt,
        location: config.city,
        scope: null,
      }));

  if (displayItems.length === 0) return null;

  return (
    <section className="section-pad bg-surface">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">Recent Work</span>
          <h2 className="section-title">Projects in {config.city} and Surrounding Areas</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {displayItems.slice(0, 6).map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <ContentImage
                slot={`section_${i + 1}`}
                url={item.url}
                alt={item.alt ?? `Project in ${item.location ?? config.city}`}
                aspect="4:3"
              />
              {(item.location || item.scope) && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: '#fff',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {item.location && (
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-heading)' }}>
                      {item.location}
                    </span>
                  )}
                  {item.scope && (
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginLeft: 8 }}>
                      · {item.scope}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
