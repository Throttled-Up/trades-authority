/**
 * SocialProof strip — review count + star rating + avatar row.
 * Tight band directly under the hero. Stays above fold on most screens.
 */
export default function SocialProof({ config }) {
  const { stats = {}, business_name } = config;
  const { avg_rating, review_count } = stats;

  if (!avg_rating && !review_count) return null;

  const rating = avg_rating ?? 5.0;
  const count  = review_count ?? 0;

  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--color-border)',
        padding: '14px 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        {/* Avatars (decorative) */}
        <AvatarStack />

        {/* Stars + count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Stars rating={rating} />
          <span
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: 'var(--color-text-heading)',
            }}
          >
            {rating.toFixed(1)} out of 5
          </span>
          {count > 0 && (
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              ({count.toLocaleString()} reviews)
            </span>
          )}
        </div>

        <div
          className="social-divider"
          style={{
            width: 1,
            height: 28,
            background: 'var(--color-border)',
          }}
        />

        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Trusted by homeowners across {config.city}, {config.state}
        </span>
      </div>
    </div>
  );
}

function Stars({ rating }) {
  const full    = Math.floor(rating);
  const partial = rating % 1 >= 0.5 ? 1 : 0;

  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && partial);
        return (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={filled ? '#f59e0b' : '#e5e7eb'}
            stroke={filled ? '#f59e0b' : '#d1d5db'}
            strokeWidth="1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        );
      })}
    </div>
  );
}

// Decorative overlapping avatar circles — placeholder initials
function AvatarStack() {
  const initials = ['JM', 'SR', 'TK', 'AL'];
  const colors   = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

  return (
    <div style={{ display: 'flex' }}>
      {initials.map((init, i) => (
        <div
          key={i}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: colors[i],
            border: '2px solid #fff',
            marginLeft: i > 0 ? -8 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {init}
        </div>
      ))}
    </div>
  );
}
