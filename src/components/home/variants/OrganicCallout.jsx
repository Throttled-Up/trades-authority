/*
 * OrganicCallout — differentiator section.
 *
 * The organic compost topdressing service is a near-zero competitive
 * offering that targets exactly the eco-conscious Nocatee/Ponte Vedra
 * homeowner. Pull it out of the service band — it's the point of
 * separation from Orkin, Terminix, and Trad's.
 *
 * Dark green full-width band. High-contrast. No fluff.
 */
export default function OrganicCallout({ slug = '/lawn-care-service/' }) {
  return (
    <section aria-label="Organic lawn care" className="organic-callout">
      <div className="organic-inner">

        <div className="organic-label">Something different</div>

        <h2 className="organic-headline">
          The Only Northeast Florida Lawn Service Offering Organic Compost Topdressing
        </h2>

        <p className="organic-body">
          Most companies spray and walk away. Greg&apos;s organic compost program
          rebuilds soil health from the ground up &mdash; improving drainage,
          reducing chemical dependency, and producing visible results after one
          application. A near-zero competitive service, popular with homeowners
          in Nocatee, Ponte Vedra Beach, and Palencia.
        </p>

        <a href={slug} className="organic-cta">
          Learn about the lawn program
          <ArrowRight />
        </a>
      </div>

      <style>{`
        .organic-callout {
          background: var(--color-primary);
          padding: var(--section-padding-y-sm) 24px;
        }
        .organic-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
          max-width: 720px;
        }
        .organic-label {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 16px;
        }
        .organic-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: #ffffff;
          margin: 0 0 20px;
        }
        .organic-body {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 28px;
        }
        .organic-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: #ffffff;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.4);
          padding-bottom: 2px;
          transition: border-color var(--duration-fast) var(--easing-out),
                      gap          var(--duration-fast) var(--easing-out);
        }
        .organic-cta:hover {
          border-color: #ffffff;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .organic-callout { padding: var(--section-padding-y) 40px; }
          .organic-inner { max-width: 680px; }
        }
      `}</style>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
