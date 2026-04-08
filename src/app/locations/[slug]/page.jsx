import { notFound }        from 'next/navigation';
import { compileMDX }      from 'next-mdx-remote/rsc';
import { getMdxPage, getMdxSlugs } from '@/lib/mdx';
import { getSiteConfig }   from '@/lib/site-config';
import ContentImage        from '@/components/shared/ContentImage';
import SchemaScript        from '@/components/shared/SchemaScript';
import Breadcrumb          from '@/components/shared/Breadcrumb';
import FAQ                 from '@/components/service/FAQ';
import EmergencyCTA        from '@/components/home/EmergencyCTA';
import ServiceAreas        from '@/components/home/ServiceAreas';
import MdxStyles           from '@/components/shared/MdxStyles';

export async function generateStaticParams() {
  return getMdxSlugs('locations').map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getMdxPage('locations', slug);
  if (!page) return {};
  const { frontmatter: fm } = page;
  return {
    title:       fm.meta_title ?? fm.h1,
    description: fm.meta_description ?? '',
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const page     = getMdxPage('locations', slug);
  if (!page) notFound();

  const config = getSiteConfig();
  const { frontmatter: fm, content } = page;

  const { content: mdxContent } = await compileMDX({
    source:  content,
    options: { parseFrontmatter: false },
  });

  const images    = fm.images ?? [];
  const imgBySlot = slot => images.find(i => i.slot === slot) ?? null;
  const heroImg   = imgBySlot('hero');
  const faqItems  = fm.faq ?? [];

  // Strip "| Business Name | Tagline" suffix from h1
  const displayH1 = (fm.h1 ?? '').split('|')[0].trim();

  // Section images — always show 2 placeholders if none generated yet
  const sectionImages = images.filter(i => i.slot !== 'hero');
  const displaySectionImages = sectionImages.length > 0
    ? sectionImages.slice(0, 2)
    : [
        { slot: 'section_1', url: null, alt: '', aspect: '4:3' },
        { slot: 'section_2', url: null, alt: '', aspect: '4:3' },
      ];

  // Services offered in this city — link to service pages
  const cityServices = config.services ?? [];

  const breadcrumbs = [
    { label: 'Home',         href: '/' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: fm.city ?? slug },
  ];

  return (
    <>
      <SchemaScript schema={fm.schema} />

      {/* Hero */}
      <div style={{ background: 'var(--color-hero-bg)' }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Breadcrumb items={breadcrumbs} domain={config.domain} />
        </div>

        {/* Hero — real image or dark placeholder */}
        <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
          {heroImg?.url ? (
            <>
              <ContentImage slot="hero" url={heroImg.url} alt={heroImg.alt} aspect="16:9" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.4) 60%)',
              }} />
            </>
          ) : (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: 36 }}>
            <LocationHeroText displayH1={displayH1} config={config} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="section-pad bg-surface">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(320px, 30%)',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <article className="mdx-content" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-body)' }}>
            {mdxContent}
          </article>

          {/* Sidebar: services in this city */}
          <aside style={{ position: 'sticky', top: 90 }}>
            <LocationSidebar config={config} fm={fm} cityServices={cityServices} />
          </aside>
        </div>
      </div>

      {/* Section images — always show 2 slots (placeholders until generated) */}
      <div className="section-pad-sm bg-surface-2">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
        >
          {displaySectionImages.map(img => (
            <ContentImage key={img.slot} slot={img.slot} url={img.url} alt={img.alt} aspect="4:3" />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* Related service areas */}
      <ServiceAreas config={config} />

      {/* CTA */}
      <EmergencyCTA config={config} />

      <MdxStyles />
    </>
  );
}

function LocationHeroText({ displayH1, config }) {
  return (
    <>
      <h1
        style={{
          fontFamily: 'var(--font-heading), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
          color: '#fff',
          lineHeight: 1.15,
          marginBottom: 12,
          paddingTop: 8,
        }}
      >
        {displayH1}
      </h1>
      {config.phone && (
        <a
          href={`tel:${config.phone.replace(/\D/g, '')}`}
          className="btn btn-primary"
          style={{ marginTop: 4 }}
        >
          Call {config.phone}
        </a>
      )}
    </>
  );
}

function LocationSidebar({ config, fm, cityServices }) {
  const { phone, stats = {}, license } = config;
  const city = fm.city ?? fm.target_city ?? '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* CTA card */}
      <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-card)', padding: 24, color: '#fff' }}>
        <h3 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '1.0625rem', marginBottom: 8 }}>
          Serving {city || 'Your Area'}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
          Call for a free estimate today.
        </p>
        {phone && (
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', background: '#fff', color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700,
              fontSize: '1rem', padding: '11px 16px', borderRadius: 4, textDecoration: 'none',
            }}
          >
            {phone}
          </a>
        )}
      </div>

      {/* Services list */}
      {cityServices.length > 0 && (
        <div style={{ background: '#f8f8f8', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '20px 20px 12px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-heading)', marginBottom: 12 }}>
            Services in {city || 'This Area'}
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {cityServices.map(s => (
              <li key={s.slug}>
                <a
                  href={`/services/${s.slug}`}
                  style={{ fontSize: '0.875rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderBottom: '1px solid var(--color-border)' }}
                >
                  <ArrowIcon />
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

