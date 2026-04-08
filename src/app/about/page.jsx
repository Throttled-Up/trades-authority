import { compileMDX }    from 'next-mdx-remote/rsc';
import { getMdxSinglePage } from '@/lib/mdx';
import { getSiteConfig } from '@/lib/site-config';
import ContentImage      from '@/components/shared/ContentImage';
import SchemaScript      from '@/components/shared/SchemaScript';
import EmergencyCTA      from '@/components/home/EmergencyCTA';

export async function generateMetadata() {
  const config = getSiteConfig();
  const page   = getMdxSinglePage('about');
  return {
    title:       page?.frontmatter?.meta_title ?? `About ${config.business_name}`,
    description: page?.frontmatter?.meta_description ?? '',
  };
}

export default async function AboutPage() {
  const config = getSiteConfig();
  const page   = getMdxSinglePage('about');

  const fm = page?.frontmatter ?? {};

  let mdxContent = null;
  if (page?.content) {
    const result = await compileMDX({
      source:  page.content,
      options: { parseFrontmatter: false },
    });
    mdxContent = result.content;
  }

  const images    = fm.images ?? [];
  const heroImg   = images.find(i => i.slot === 'hero')  ?? null;
  const ownerImg  = images.find(i => i.slot === 'owner') ?? null;

  return (
    <>
      <SchemaScript schema={fm.schema} />

      {/* Hero */}
      <div style={{ background: 'var(--color-hero-bg)', paddingBottom: 56 }}>
        <div className="container" style={{ paddingTop: 56 }}>
          <span className="section-eyebrow">About Us</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 12,
              maxWidth: 680,
            }}
          >
            {fm.h1 ?? `About ${config.business_name}`}
          </h1>
          {config.tagline && (
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
              {config.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Owner section */}
      <section className="section-pad bg-surface">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: ownerImg?.url ? '1fr 280px' : '1fr',
              gap: 56,
              alignItems: 'start',
            }}
          >
            {/* Content */}
            <div>
              {config.owner_name && (
                <p
                  style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontWeight: 700,
                    fontSize: '1.0625rem',
                    color: 'var(--color-primary)',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 32,
                      height: 2,
                      background: 'var(--color-primary)',
                    }}
                  />
                  {config.owner_name}, Owner
                </p>
              )}

              {mdxContent ? (
                <article className="mdx-content" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-body)' }}>
                  {mdxContent}
                </article>
              ) : (
                config.about_short && (
                  <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-body)' }}>
                    {config.about_short}
                  </p>
                )
              )}

              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 32 }}>
                {[
                  config.license && `Licensed & Insured · ${config.license}`,
                  config.stats?.years_in_business && `${config.stats.years_in_business}+ Years in Business`,
                  config.stats?.avg_rating && `${config.stats.avg_rating}★ Average Rating`,
                  config.stats?.jobs_completed && `${config.stats.jobs_completed.toLocaleString()}+ Jobs Completed`,
                ].filter(Boolean).map((badge, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: '#f4f4f4',
                      border: '1px solid var(--color-border)',
                      borderRadius: 4,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-text-heading)',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Owner photo — 4:5 portrait, client upload */}
            {ownerImg?.url && (
              <div>
                <ContentImage
                  slot="owner"
                  url={ownerImg.url}
                  alt={ownerImg.alt ?? `${config.owner_name ?? 'Owner'} of ${config.business_name}`}
                  aspect="4:5"
                />
                {config.owner_name && (
                  <p style={{ textAlign: 'center', marginTop: 10, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-heading)' }}>
                    {config.owner_name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero image if present */}
      {heroImg?.url && (
        <section className="section-pad-sm bg-surface-2">
          <div className="container">
            <ContentImage slot="hero" url={heroImg.url} alt={heroImg.alt} aspect="16:9" />
          </div>
        </section>
      )}

      <EmergencyCTA config={config} />

      <style>{mdxStyles}</style>
    </>
  );
}

const mdxStyles = `
  .mdx-content h2 { font-family: var(--font-heading), sans-serif; font-weight: 700; font-size: 1.5rem; color: var(--color-text-heading); margin-top: 2rem; margin-bottom: 0.75rem; }
  .mdx-content p { margin-bottom: 1.25rem; }
  .mdx-content ul, .mdx-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .mdx-content ul { list-style: disc; } .mdx-content ol { list-style: decimal; }
  .mdx-content li { margin-bottom: 0.5rem; }
  .mdx-content strong { color: var(--color-text-heading); font-weight: 600; }
  .mdx-content a { color: var(--color-primary); text-decoration: underline; }
`;
