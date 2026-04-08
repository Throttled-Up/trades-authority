import { Inter } from 'next/font/google';
import { getSiteConfig, getPrimaryColorStyle } from '@/lib/site-config';
import Nav from '@/components/layout/Nav';
import TopBar from '@/components/layout/TopBar';
import Footer from '@/components/layout/Footer';
import '@/styles/themes/trades-authority.css';
import './globals.css';

// Zero-CLS font loading via next/font — no runtime Google Fonts call
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata() {
  const config = getSiteConfig();
  return {
    metadataBase: new URL(`https://${config.domain ?? 'example.com'}`),
    title: {
      default: `${config.business_name} | ${config.wp_title_tagline ?? config.tagline ?? ''}`,
      template: `%s | ${config.business_name}`,
    },
    description: config.meta_description_default ?? '',
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: config.business_name,
    },
  };
}

export default function RootLayout({ children }) {
  const config = getSiteConfig();
  const primaryColorStyle = getPrimaryColorStyle(config);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Inject client brand color over the skin default */}
        <style dangerouslySetInnerHTML={{ __html: primaryColorStyle }} />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <TopBar config={config} />
        <Nav config={config} />
        <main>{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
