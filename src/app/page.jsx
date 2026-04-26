import { compileMDX }  from 'next-mdx-remote/rsc';
import { getSiteConfig } from '@/lib/site-config';
import { getMdxPage }   from '@/lib/mdx';
import SchemaScript     from '@/components/shared/SchemaScript';
import FAQ              from '@/components/service/FAQ';
import ServiceSectionBand from '@/components/service/ServiceSectionBand';
import PageIntro        from '@/components/service/PageIntro';

// Variant components — one per section type
import Hero          from '@/components/home/variants/Hero';
import StatsAnchor   from '@/components/home/variants/StatsAnchor';
import ServiceBands  from '@/components/home/variants/ServiceBands';
import StoryBlock    from '@/components/home/variants/StoryBlock';
import ProcessSteps  from '@/components/home/variants/ProcessSteps';
import Testimonials  from '@/components/home/variants/Testimonials';
import ServiceAreas  from '@/components/home/variants/ServiceAreas';
import PhoneBanner   from '@/components/home/variants/PhoneBanner';
import ConsultationCTA from '@/components/home/variants/ConsultationCTA';
import FormPlusPhone  from '@/components/home/variants/FormPlusPhone';
import EmergencyCTA  from '@/components/home/variants/EmergencyCTA';

/*
 * SECTION_MAP — maps section + variant names from design_blueprint.layout_sequence
 * to render functions. Each render function receives the full site config.
 *
 * Adding a new variant: add one entry here. No other file changes needed.
 */
const SECTION_MAP = {
  hero: {
    owner_split:        (c, ctx) => <Hero config={c} heroImage={ctx.heroImage} variant="owner_split" />,
    full_bleed_project: (c, ctx) => <Hero config={c} heroImage={ctx.heroImage} variant="full_bleed_project" />,
    storm_urgency:      (c, ctx) => <Hero config={c} heroImage={ctx.heroImage} variant="storm_urgency" />,
  },
  trust_bar: {
    certs_plus_reviews: (c) => <StatsAnchor config={c} />,
    stats_only:         (c) => <StatsAnchor config={c} variant="stats_only" />,
  },
  services: {
    service_bands:      (c) => <ServiceBands hubs={c.hubs ?? []} variant="service_bands" />,
    featured_plus_list: (c) => <ServiceBands hubs={c.hubs ?? []} variant="featured_plus_list" />,
    banded_photography: (c) => <ServiceBands hubs={c.hubs ?? []} variant="banded_photography" />,
  },
  owner_story: {
    story_block: (c) => <StoryBlock config={c} />,
  },
  process: {
    numbered_steps:  (c) => <ProcessSteps config={c} variant="numbered_steps" />,
    insurance_steps: (c) => <ProcessSteps config={c} variant="insurance_steps" />,
  },
  social_proof: {
    pull_quote_trio:     (c) => <Testimonials config={c} variant="pull_quote_trio" />,
    featured_plus_grid:  (c) => <Testimonials config={c} variant="featured_plus_grid" />,
    neighborhood_quotes: (c) => <Testimonials config={c} variant="neighborhood_quotes" />,
    volume_with_metrics: (c) => <Testimonials config={c} variant="volume_with_metrics" />,
  },
  cta: {
    phone_banner:         (c) => <PhoneBanner config={c} />,
    consultation_request: (c) => <ConsultationCTA config={c} />,
    form_plus_phone:      (c) => <FormPlusPhone config={c} />,
    emergency_dual:       (c) => <EmergencyCTA config={c} />,
  },
  service_areas: {
    text_list: (c) => <ServiceAreas config={c} variant="text_list" />,
  },
};

/*
 * Fallback sequence when no design_blueprint is present.
 * Tuned for technical-authority persona (excavation, septic, demo, roofing).
 * content_body is a special section type — renders MDX from the content engine.
 */
const DEFAULT_SEQUENCE = [
  { section: 'hero',         variant: 'full_bleed_project' },
  { section: 'trust_bar',    variant: 'certs_plus_reviews' },
  { section: 'services',     variant: 'service_bands' },
  { section: 'content_body', variant: 'mdx' },
  { section: 'process',      variant: 'numbered_steps' },
  { section: 'social_proof', variant: 'pull_quote_trio' },
  { section: 'service_areas', variant: 'text_list' },
  { section: 'cta',          variant: 'phone_banner' },
];

export async function generateMetadata() {
  const config = getSiteConfig();
  const page   = getMdxPage('services', 'homepage');
  const fm     = page?.frontmatter ?? {};
  return {
    title:       fm.meta_title       ?? `${config.business_name} | ${config.wp_title_tagline ?? config.tagline ?? ''}`,
    description: fm.meta_description ?? config.meta_description_default ?? `${config.business_name} serves ${config.city}, ${config.state} and surrounding areas.`,
  };
}

export default async function HomePage() {
  const config   = getSiteConfig();
  const heroImage = config.hero_image ?? null;

  // Blueprint-driven layout sequence — falls back to DEFAULT_SEQUENCE
  const blueprint = config.design_blueprint ?? null;
  const sequence  = blueprint?.layout_sequence?.length
    ? blueprint.layout_sequence
    : DEFAULT_SEQUENCE;

  // Compile MDX once — only consumed when content_body appears in sequence
  const homePage   = getMdxPage('services', 'homepage');
  const fm         = homePage?.frontmatter ?? {};
  const faqItems   = fm.faq ?? [];
  const images     = fm.images ?? [];
  const imgBySlot  = (slot) => images.find(i => i.slot === slot) ?? null;
  const sectionState = { index: 0 };

  const mdxComponents = {
    PageIntro: ({ children }) => <PageIntro>{children}</PageIntro>,
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

  let mdxContent = null;
  if (homePage?.content) {
    const result = await compileMDX({
      source:     homePage.content,
      options:    { parseFrontmatter: false },
      components: mdxComponents,
    });
    mdxContent = result.content;
  }

  const renderCtx = { heroImage };

  return (
    <>
      <SchemaScript schema={fm.schema} />
      {sequence.map(({ section, variant }, i) => {
        // Special case: MDX body from content engine
        if (section === 'content_body') {
          return mdxContent
            ? <div key={`content_body-${i}`}>{mdxContent}</div>
            : null;
        }

        const sectionVariants = SECTION_MAP[section];
        if (!sectionVariants) return null;

        const render = sectionVariants[variant];
        if (!render) {
          console.error(`[trades-authority] Unknown variant: ${section}.${variant} — skipping section`);
          return null;
        }

        return <div key={`${section}-${i}`}>{render(config, renderCtx)}</div>;
      })}
    </>
  );
}
