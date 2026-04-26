/**
 * PageIntro — renders the opening paragraph(s) before the first H2 section.
 * Full-width, constrained text column, primary accent border on top.
 * No image — sets up the page before the alternating section bands begin.
 */
export default function PageIntro({ children }) {
  return (
    <section
      className="bg-surface"
      style={{ borderTop: '3px solid var(--color-primary)' }}
    >
      <div className="container section-pad-sm">
        <div
          className="section-band-prose"
          style={{ maxWidth: 760, fontSize: '1.125rem', lineHeight: 1.8 }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
