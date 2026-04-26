import ContentImage from '@/components/shared/ContentImage';

/**
 * ServiceSectionBand — renders one H2 section as a full-width visual band.
 *
 * Even-indexed sections (0, 2, 4…): text left, image right, white bg.
 * Odd-indexed sections  (1, 3, 5…): image left, text right, grey bg.
 * On mobile: image stacks above text regardless of index.
 *
 * @param {{
 *   slot:     string   — matches images[] slot name from frontmatter
 *   heading:  string   — the H2 section heading
 *   index:    number   — 0-based position, drives alternation + background
 *   image:    object   — { url, alt, aspect } from images[] or null
 *   children: ReactNode — MDX prose content
 * }} props
 */
export default function ServiceSectionBand({ slot, heading, index, image, children }) {
  const isFlip = index % 2 !== 0;
  const bg     = isFlip ? 'var(--color-surface-2)' : 'var(--color-surface)';

  return (
    <section style={{ background: bg }}>
      <div className="container section-pad">
        <div className={`section-band-grid${isFlip ? ' section-band-flip' : ''}`}>

          <div className="section-band-text">
            <h2 className="section-band-heading">{heading}</h2>
            <div className="section-band-prose">{children}</div>
          </div>

          <div className="section-band-image">
            <ContentImage
              slot={slot}
              url={image?.url ?? null}
              alt={image?.alt ?? ''}
              aspect={image?.aspect ?? '4:3'}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
