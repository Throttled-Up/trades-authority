import Image from 'next/image';

/**
 * ContentImage — renders an image slot at its locked aspect ratio.
 *
 * Aspect ratios (from image pipeline spec):
 *   hero         → 16:9  (56.25%)
 *   section_*    → 4:3   (75%)
 *   owner/team   → 4:5   (125%)
 *
 * Missing slots render a neutral dark placeholder — never breaks layout.
 *
 * @param {{ slot: string, url?: string, alt?: string, aspect?: string, className?: string }} props
 */
export default function ContentImage({ slot, url, alt, aspect, className = '' }) {
  const paddingTop = aspectToPadding(aspect ?? inferAspect(slot));

  return (
    <div
      className={className}
      style={{ position: 'relative', paddingTop, overflow: 'hidden', borderRadius: 'var(--radius-card)' }}
    >
      {url ? (
        <Image
          src={url}
          alt={alt ?? ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          style={{ objectFit: 'cover' }}
          loading={slot === 'hero' ? 'eager' : 'lazy'}
          priority={slot === 'hero'}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function aspectToPadding(aspect) {
  if (aspect === '16:9') return '56.25%';
  if (aspect === '4:5')  return '125%';
  return '75%'; // 4:3 default for all section slots
}

function inferAspect(slot) {
  if (slot === 'hero') return '16:9';
  if (slot === 'owner' || slot === 'team') return '4:5';
  return '4:3';
}

function Placeholder() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </div>
  );
}
