import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

/*
 * ContentBody — renders the MDX body content (H2 sections + FAQ).
 *
 * Sits below the marketing sections. This is the SEO layer:
 * H2 sections for keyword coverage, FAQ for featured snippets + FAQPage schema.
 * Most visitors won't scroll here; Google always will.
 */
export default async function ContentBody({ file = 'home.md' }) {
  const filePath = path.join(process.cwd(), 'src/content', file);

  let source = '';
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }

  const { content } = await compileMDX({
    source,
    components: {
      h2: ({ children }) => <h2 className="cb-h2">{children}</h2>,
      h3: ({ children }) => <h3 className="cb-h3">{children}</h3>,
      p:  ({ children }) => <p  className="cb-p">{children}</p>,
      ul: ({ children }) => <ul className="cb-ul">{children}</ul>,
      ol: ({ children }) => <ol className="cb-ol">{children}</ol>,
      li: ({ children }) => <li className="cb-li">{children}</li>,
      a:  ({ href, children }) => <a href={href} className="cb-a">{children}</a>,
      strong: ({ children }) => <strong className="cb-strong">{children}</strong>,
    },
  });

  return (
    <section aria-label="About our services" className="content-section">
      <div className="content-inner">
        {content}
      </div>

      <style>{`
        .content-section {
          background: var(--color-surface);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .content-inner {
          max-width: 760px;
          margin: 0 auto;
        }

        /* Intro paragraph — larger */
        .content-inner > .cb-p:first-child {
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin-bottom: 40px;
        }

        /* H2 sections */
        .cb-h2 {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2.5vw, 1.75rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 48px 0 16px;
          padding-top: 40px;
          border-top: 2px solid var(--color-border);
        }
        .content-inner > .cb-h2:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: none;
        }

        /* FAQ H2 — visual break */
        .cb-h2.faq-heading {
          background: var(--color-surface-2);
          border-top: 2px solid var(--color-primary);
          padding: 20px 24px;
          border-radius: var(--radius-lg);
          margin-left: -24px;
          margin-right: -24px;
        }

        /* H3 — FAQ questions */
        .cb-h3 {
          font-family: var(--font-heading);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-heading);
          margin: 28px 0 8px;
          padding-left: 16px;
          border-left: 3px solid var(--color-primary);
          line-height: var(--line-height-snug);
        }

        /* Body paragraphs */
        .cb-p {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin-bottom: 16px;
        }

        /* Lists */
        .cb-ul, .cb-ol {
          margin: 4px 0 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cb-li {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
        }

        /* Bold — "Why 2B" credential bullets */
        .cb-strong {
          font-weight: var(--font-weight-bold);
          color: var(--color-text-heading);
        }

        /* Links */
        .cb-a {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .cb-a:hover { color: var(--color-primary-dark); }

        @media (min-width: 768px) {
          .content-section { padding: var(--section-padding-y) 40px; }
          .cb-h3 { font-size: var(--font-size-md); }
        }
      `}</style>
    </section>
  );
}
