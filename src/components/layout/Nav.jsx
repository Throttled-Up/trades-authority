'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav({ config }) {
  const { business_name, phone, services = [], hubs = [] } = config;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build nav items from config — hubs first, then top-level services
  const navItems = [
    { label: 'Home', href: '/' },
    ...(hubs ?? []).map(h => ({ label: h.name, href: `/${h.slug}` })),
    { label: 'Services', href: '/services' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const navBg    = scrolled ? 'rgba(15,15,15,0.97)' : 'rgba(15,15,15,0.85)';
  const navShadow = scrolled ? '0 2px 16px rgba(0,0,0,0.4)' : 'none';

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: navBg,
        boxShadow: navShadow,
        backdropFilter: 'blur(8px)',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: 24,
        }}
      >
        {/* Logo / Business Name */}
        <Link
          href="/"
          className="nav-biz-name"
          style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          {business_name}
        </Link>

        {/* Desktop nav links */}
        <ul
          style={{
            alignItems: 'center',
            gap: 4,
            flex: 1,
            justifyContent: 'center',
          }}
          className="hidden-mobile"
        >
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: 4,
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.target.style.color = '#fff')}
                onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.85)')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {phone && (
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="btn btn-primary hidden-mobile"
            style={{ flexShrink: 0, fontSize: '0.9rem', padding: '10px 20px' }}
          >
            {phone}
          </a>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="show-mobile"
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(15,15,15,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 0 24px',
          }}
        >
          <ul className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {phone && (
              <li style={{ marginTop: 16 }}>
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <PhoneIcon />
                  Call Now
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open
        ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
        : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
      }
    </svg>
  );
}
