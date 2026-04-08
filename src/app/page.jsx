import { getSiteConfig } from '@/lib/site-config';
import Hero           from '@/components/home/Hero';
import SocialProof    from '@/components/home/SocialProof';
import Stats          from '@/components/home/Stats';
import ServicesGrid   from '@/components/home/ServicesGrid';
import WhyChooseUs    from '@/components/home/WhyChooseUs';
import Process        from '@/components/home/Process';
import Gallery        from '@/components/home/Gallery';
import Testimonials   from '@/components/home/Testimonials';
import ServiceAreas   from '@/components/home/ServiceAreas';
import EmergencyCTA   from '@/components/home/EmergencyCTA';

export async function generateMetadata() {
  const config = getSiteConfig();
  return {
    title: `${config.business_name} | ${config.wp_title_tagline ?? config.tagline ?? ''}`,
    description: config.meta_description_default ?? `${config.business_name} serves ${config.city}, ${config.state} and surrounding areas.`,
  };
}

export default function HomePage() {
  const config = getSiteConfig();

  // Hero image — pulled from config or left null for gradient fallback
  const heroImage = config.hero_image ?? null;

  return (
    <>
      {/* 1. Hero — full bleed, H1, dual CTA */}
      <Hero config={config} heroImage={heroImage} />

      {/* 2. Social proof strip — review count + stars */}
      <SocialProof config={config} />

      {/* 3. Stats row — years / jobs / rating / response time */}
      <Stats config={config} />

      {/* 4. Services grid — 3-col cards */}
      <ServicesGrid config={config} />

      {/* 5. Why choose us — differentiator cards */}
      <WhyChooseUs config={config} />

      {/* 6. Process — numbered steps */}
      <Process config={config} />

      {/* 7. Project gallery */}
      <Gallery config={config} />

      {/* 8. Testimonials */}
      <Testimonials config={config} />

      {/* 9. Service areas geographic strip */}
      <ServiceAreas config={config} />

      {/* 10. Emergency CTA band */}
      <EmergencyCTA config={config} />
    </>
  );
}
