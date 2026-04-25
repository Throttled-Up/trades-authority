import { notFound }        from 'next/navigation';
import { compileMDX }      from 'next-mdx-remote/rsc';
import { getMdxPage, getMdxSlugs, getMdxIndex } from '@/lib/mdx';
import { getSiteConfig }   from '@/lib/site-config';
import ContentImage        from '@/components/shared/ContentImage';
import SchemaScript        from '@/components/shared/SchemaScript';
import Breadcrumb          from '@/components/shared/Breadcrumb';
import FAQ                 from '@/components/service/FAQ';
import EmergencyCTA        from '@/components/home/EmergencyCTA';
import Link                from 'next/link';
import MdxStyles           from '@/components/shared/MdxStyles';

/**
 * Hub/category page — e.g. /pest-control/termite-treatment
 * Also handles the hub root itself: /pest-control (slug = 'index')
 *
 * generateStaticParams reads from config.hubs to know which category slugs exist,
 * then lists all hub-grouped services.
 */
export async function generateStaticParams() {
  const config = getSiteConfig();
  const params = [];

  // Hub root pages: /[category]
  for (const hub of config.hubs ?? []) {
    params.push({ category: hub.slug, slug: 'index' });
  }

  // Hub child service pages: /[category]/[service-slug]
  const services = getMdxIndex('services');
  for (const { slug, frontmatter: fm } of services) {
    if (fm.hub_slug) {
      params.push({ category: fm.hub_slug, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  if (slug === 'index') {
    const config = getSiteConfig();
    const hub = (config.hubs ?? []).find(h => h.slug === category);
    return {
      title: hub ? `${hub.name} Services | ${config.business_name}` : '',
    };
  }

  const page = getMdxPage('services', slug);
  if (!page) return {};
  return {
    title:       page.frontmatter.meta_title ?? page.frontmatter.h1,
    description: page.frontmatter.meta_description ?? '',
  };
}

export default async function HubPage({ params }) {
  const { category, slug } = await params;
  const config = getSiteConfig();

  // Hub root index
  if (slug === 'index') {
    return <HubIndexPage config={config} category={category} />;
  }

  // Hub child service page — same as service page but with hub breadcrumb
  const page = getMdxPage('services', slug);
  if (!page) notFound();

  const { frontmatter: fm, content } = page;

  const images    = fm.images ?? [];
  const imgBySlot = slot => images.find(i => i.slot === slot) ?? null;
  const heroImg   = imgBySlot('hero');
  const faqItems  = fm.faq ?? [];

  // Inline prose components — hub child pages keep the sidebar layout,
  // so MDX sections render as headed prose rather than full-width bands.
  const mdxComponents = {
    PageIntro: ({ children }) => (
      <div className="section-band-prose" style={{ marginBottom: 28 }}>
        {children}
      </div>
    ),
    ServiceSection: ({ heading, children }) => (
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: 'var(--color-text-heading)', lineHeight: 1.25, marginBottom: 12 }}>
          {heading}
        </h2>
        <div className="section-band-prose">{children}</div>
      </div>
    ),
    FAQSection: () => null,
  };

  const { content: mdxContent } = await compileMDX({
    source:     content,
    options:    { parseFrontmatter: false },
    components: mdxComponents,
  });

  const displayH1 = (fm.h1 ?? '').split('|')[0].trim();

  const sectionImages = images.filter(i => i.slot !== 'hero');
  const displaySectionImages = sectionImages.length > 0
    ? sectionImages
    : [
        { slot: 'section_1', url: null, alt: '', aspect: '4:3' },
        { slot: 'section_2', url: null, alt: '', aspect: '4:3' },
      ];

  const hub = (config.hubs ?? []).find(h => h.slug === category);

  const breadcrumbs = [
    { label: 'Home',            href: '/' },
    { label: hub?.name ?? category, href: `/${category}` },
    { label: fm.service_name ?? fm.h1 ?? slug },
  ];

  return (
    <>
      <SchemaScript schema={fm.schema} />

      <div style={{ background: 'var(--color-hero-bg)' }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Breadcrumb items={breadcrumbs} domain={config.domain} />
        </div>

        <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
          {heroImg?.url ? (
            <>
              <ContentImage slot="hero" url={heroImg.url} alt={heroImg.alt} aspect="16:9" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.4) 60%)' }} />
            </>
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: 40 }}>
            <h1 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#fff', lineHeight: 1.15, maxWidth: 680 }}>
              {displayH1}
            </h1>
          </div>
        </div>
      </div>

      <div className="section-pad bg-surface">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr min(340px, 30%)', gap: 48, alignItems: 'start' }}>
          <article className="mdx-content" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-body)' }}>
            {mdxContent}
          </article>
          <aside>
            <HubServiceSidebar config={config} hub={hub} />
          </aside>
        </div>
      </div>

      <div className="section-pad-sm bg-surface-2">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {displaySectionImages.map(img => (
            <ContentImage key={img.slot} slot={img.slot} url={img.url} alt={img.alt} aspect={img.aspect ?? '4:3'} />
          ))}
        </div>
      </div>

      <FAQ items={faqItems} />
      <EmergencyCTA config={config} />

      <MdxStyles />
    </>
  );
}

// Hub root index — lists all services under this category
function HubIndexPage({ config, category }) {
  const hub      = (config.hubs ?? []).find(h => h.slug === category);
  const services = (config.services ?? []).filter(s => s.hub === category);

  if (!hub) notFound();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: hub.name },
  ];

  return (
    <>
      <div style={{ background: 'var(--color-hero-bg)' }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 56 }}>
          <Breadcrumb items={breadcrumbs} domain={config.domain} />
          <h1 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#fff', lineHeight: 1.15, marginTop: 8 }}>
            {hub.name} Services in {config.city}, {config.state}
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.75)', marginTop: 12, maxWidth: 600 }}>
            {hub.description ?? `Professional ${hub.name.toLowerCase()} services from ${config.business_name}.`}
          </p>
        </div>
      </div>

      <section className="section-pad bg-surface">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {services.map(service => (
              <Link
                key={service.slug}
                href={`/${category}/${service.slug}`}
                className="card-hover"
                style={{
                  display: 'block', background: '#fff', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)', padding: 28, boxShadow: 'var(--shadow-card)',
                  textDecoration: 'none',
                }}
              >
                <h2 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-heading)', marginBottom: 8 }}>
                  {service.name}
                </h2>
                {service.description && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: 12 }}>
                    {service.description}
                  </p>
                )}
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmergencyCTA config={config} />
    </>
  );
}

function HubServiceSidebar({ config, hub }) {
  const { phone } = config;
  const services  = (config.services ?? []).filter(s => s.hub === hub?.slug);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-card)', padding: 24, color: '#fff' }}>
        <h3 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '1.0625rem', marginBottom: 8 }}>
          Get a Free Estimate
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
          Call today — fast response.
        </p>
        {phone && (
          <a href={`tel:${phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#fff', color: 'var(--color-primary)', fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '1rem', padding: '11px 16px', borderRadius: 4, textDecoration: 'none' }}>
            {phone}
          </a>
        )}
      </div>

      {services.length > 0 && (
        <div style={{ background: '#f8f8f8', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '20px 20px 12px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-heading)', marginBottom: 12 }}>
            {hub?.name} Services
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {services.map(s => (
              <li key={s.slug}>
                <Link href={`/${hub.slug}/${s.slug}`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderBottom: '1px solid var(--color-border)' }}>
                  → {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

