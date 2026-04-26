import { notFound }              from 'next/navigation';
import { compileMDX }            from 'next-mdx-remote/rsc';
import { getMdxPage, getMdxSlugs } from '@/lib/mdx';
import { getSiteConfig }         from '@/lib/site-config';
import ContentImage              from '@/components/shared/ContentImage';
import SchemaScript              from '@/components/shared/SchemaScript';
import Breadcrumb                from '@/components/shared/Breadcrumb';
import FAQ                       from '@/components/service/FAQ';
import ServiceSectionBand        from '@/components/service/ServiceSectionBand';
import PageIntro                 from '@/components/service/PageIntro';
import EmergencyCTA              from '@/components/home/EmergencyCTA';

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
  const { slug }  = await params;
  const page      = getMdxPage('services', slug);
  if (!page) notFound();

  const config                = getSiteConfig();
  const { frontmatter: fm, content } = page;

  // Build slot → image lookup from frontmatter images[]
  const images     = fm.images ?? [];
  const imgBySlot  = (slot) => images.find(i => i.slot === slot) ?? null;
  const heroImg    = imgBySlot('hero');

  // FAQ items from frontmatter (populated by PR builder from schema FAQPage node)
  const faqItems = fm.faq ?? [];

  // Section band index counter — incremented per <ServiceSection> render.
  // Must be a mutable object so the closure inside components can increment it.
  const sectionState = { index: 0 };

  // MDX component map — names match what transformToMdxComponents() outputs
  const components = {
    PageIntro: ({ children }) => (
      <PageIntro>{children}</PageIntro>
    ),

    ServiceSection: ({ slot, heading, children }) => {
      const idx   = sectionState.index++;
      const image = imgBySlot(slot);
      return (
        <ServiceSectionBand slot={slot} heading={heading} index={idx} image={image}>
          {children}
        </ServiceSectionBand>
      );
    },

    FAQSection: () => <FAQ items={faqItems} />,
  };

  const { content: mdxContent } = await compileMDX({
    source:     content,
    options:    { parseFrontmatter: false },
    components,
  });

  // Strip "| Business Name | Tagline" suffix — hero shows clean service + city
  const displayH1 = (fm.h1 ?? '').split('|')[0].trim();

  const breadcrumbs = [
    { label: 'Home',     href: '/' },
    { label: 'Services', href: '/services' },
    { label: fm.service_name ?? displayH1 ?? slug },
  ];

  return (
    <>
      <SchemaScript schema={fm.schema} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-hero-bg)' }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Breadcrumb items={breadcrumbs} domain={config.domain} />
        </div>

        <div style={{ position: 'relative', height: 460, overflow: 'hidden' }}>
          {heroImg?.url ? (
            <>
              <ContentImage slot="hero" url={heroImg.url} alt={heroImg.alt} aspect="16:9" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.35) 65%)',
              }} />
            </>
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            }} />
          )}

          <div className="container" style={{
            position: 'absolute', bottom: 0, left: '50%',
            transform: 'translateX(-50%)', width: '100%', paddingBottom: 48,
          }}>
            <h1 style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
              color: '#fff',
              lineHeight: 1.1,
              maxWidth: 700,
              marginBottom: 24,
            }}>
              {displayH1}
            </h1>

            {config.phone && (
              <a
                href={`tel:${config.phone.replace(/\D/g, '')}`}
                className="btn btn-primary btn-lg"
              >
                Call {config.phone}
              </a>
            )}
          </div>
        </div>

        {/* Trust bar — sits between hero and content */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container" style={{ paddingBlock: 16 }}>
            <div className="service-trust-bar">
              {config.stats?.avg_rating && (
                <TrustItem icon="★" text={`${config.stats.avg_rating} (${config.stats.review_count ?? 0} reviews)`} />
              )}
              {config.license && (
                <TrustItem icon="✓" text={`Licensed & Insured · ${config.license}`} />
              )}
              {config.stats?.years_in_business && (
                <TrustItem icon="✓" text={`${config.stats.years_in_business}+ years serving ${config.city ?? fm.city}`} />
              )}
              {config.emergency_available && (
                <TrustItem icon="⚡" text="Emergency service available" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MDX sections — PageIntro + ServiceSection bands + FAQSection ── */}
      {mdxContent}

      {/* ── Emergency CTA ─────────────────────────────────────────────── */}
      <EmergencyCTA config={config} />
    </>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)',
    }}>
      <span style={{ color: 'var(--color-primary)', fontSize: '1rem' }}>{icon}</span>
      {text}
    </div>
  );
}
