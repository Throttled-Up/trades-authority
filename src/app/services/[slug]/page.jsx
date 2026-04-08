import { notFound }        from 'next/navigation';
import { compileMDX }      from 'next-mdx-remote/rsc';
import { getMdxPage, getMdxSlugs } from '@/lib/mdx';
import { getSiteConfig }   from '@/lib/site-config';
import ContentImage        from '@/components/shared/ContentImage';
import SchemaScript        from '@/components/shared/SchemaScript';
import Breadcrumb          from '@/components/shared/Breadcrumb';
import FAQ                 from '@/components/service/FAQ';
import EmergencyCTA        from '@/components/home/EmergencyCTA';
import MdxStyles           from '@/components/shared/MdxStyles';

export async function generateStaticParams() {
  return getMdxSlugs('services').map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getMdxPage('services', slug);
  if (!page) return {};
  const { frontmatter: fm } = page;
  return {
    title:       fm.meta_title ?? fm.h1,
    description: fm.meta_description ?? '',
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const page     = getMdxPage('services', slug);
  if (!page) notFound();

  const config = getSiteConfig();
  const { frontmatter: fm, content } = page;

  const { content: mdxContent } = await compileMDX({
    source:  content,
    options: { parseFrontmatter: false },
  });

  // Image lookup helpers
  const images  = fm.images ?? [];
  const imgBySlot = slot => images.find(i => i.slot === slot) ?? null;
  const heroImg = imgBySlot('hero');

  // Strip "| Business Name | Tagline" suffix from h1 (meta title convention)
  const displayH1 = (fm.h1 ?? '').split('|')[0].trim();

  // Section images — always show 2 placeholder slots if none generated yet
  const sectionImages = images.filter(i => i.slot !== 'hero');
  const displaySectionImages = sectionImages.length > 0
    ? sectionImages
    : [
        { slot: 'section_1', url: null, alt: '', aspect: '4:3' },
        { slot: 'section_2', url: null, alt: '', aspect: '4:3' },
      ];

  // FAQ items from frontmatter
  const faqItems = fm.faq ?? [];

  // Breadcrumb trail
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: fm.service_name ?? fm.h1 ?? slug },
  ];

  return (
    <>
      {/* JSON-LD schema from content engine pass 5 */}
      <SchemaScript schema={fm.schema} />

      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-hero-bg)' }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Breadcrumb items={breadcrumbs} domain={config.domain} />
        </div>

        {/* Hero — real image or dark placeholder */}
        <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
          {heroImg?.url ? (
            <>
              <ContentImage slot="hero" url={heroImg.url} alt={heroImg.alt} aspect="16:9" className="" />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.4) 60%)',
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
          <div
            className="container"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              paddingBottom: 40,
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#fff',
                lineHeight: 1.15,
                maxWidth: 680,
              }}
            >
              {displayH1}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content + sidebar layout ───────────────────────────────────── */}
      <div className="section-pad bg-surface">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(340px, 30%)',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Main content column */}
          <article
            className="mdx-content"
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: 'var(--color-text-body)',
            }}
          >
            {mdxContent}
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 90 }}>
            <ServiceSidebar config={config} fm={fm} />
          </aside>
        </div>
      </div>

      {/* ── Section images ────────────────────────────────────────────── */}
      <div className="section-pad-sm bg-surface-2">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {displaySectionImages.map(img => (
              <ContentImage
                key={img.slot}
                slot={img.slot}
                url={img.url}
                alt={img.alt}
                aspect={img.aspect ?? '4:3'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <FAQ items={faqItems} />

      {/* ── Emergency CTA ─────────────────────────────────────────────── */}
      <EmergencyCTA config={config} />

      <MdxStyles />
    </>
  );
}

function ServiceSidebar({ config, fm }) {
  const { phone, business_name, stats = {}, license } = config;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Contact card */}
      <div
        style={{
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-card)',
          padding: 24,
          color: '#fff',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            marginBottom: 8,
          }}
        >
          Get a Free Estimate
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
          Call or text — we respond fast.
        </p>
        {phone && (
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              background: '#fff',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 700,
              fontSize: '1.0625rem',
              padding: '12px 16px',
              borderRadius: 4,
              textDecoration: 'none',
              marginBottom: 12,
            }}
          >
            {phone}
          </a>
        )}
        <a
          href="/contact"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.875rem',
            padding: '8px 0',
            textDecoration: 'underline',
          }}
        >
          Send a message instead
        </a>
      </div>

      {/* Trust card */}
      <div
        style={{
          background: '#f8f8f8',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: 20,
        }}
      >
        {[
          license && `Licensed & Insured · ${license}`,
          stats.avg_rating && `${stats.avg_rating}★ (${stats.review_count ?? 0} reviews)`,
          stats.years_in_business && `${stats.years_in_business}+ years in business`,
          config.emergency_available && 'Emergency service available',
        ]
          .filter(Boolean)
          .map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
                fontSize: '0.875rem',
                color: 'var(--color-text-body)',
              }}
            >
              <CheckIcon />
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 1 }}
    >
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

