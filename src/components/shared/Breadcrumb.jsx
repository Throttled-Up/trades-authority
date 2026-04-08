import Link from 'next/link';

/**
 * Breadcrumb — renders a simple breadcrumb trail.
 * Also outputs BreadcrumbList schema as JSON-LD.
 *
 * @param {{ items: Array<{ label: string, href?: string }> }} props
 */
export default function Breadcrumb({ items = [], domain }) {
  if (items.length <= 1) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href && domain ? { item: `https://${domain}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" style={{ padding: '12px 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            alignItems: 'center',
          }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <ChevronIcon />}
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} style={{ color: 'var(--color-text-muted)' }}>{item.label}</Link>
              ) : (
                <span style={{ color: 'var(--color-text-body)' }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
