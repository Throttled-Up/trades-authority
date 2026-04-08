'use client';
import { useState } from 'react';

/**
 * FAQ — accordion component for service and location pages.
 * Accepts `items` as array of { q, a } objects.
 * Schema for FAQPage JSON-LD is injected at the page level (from MDX frontmatter).
 */
export default function FAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (items.length === 0) return null;

  return (
    <section className="section-pad bg-surface-2">
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-card)' : 'none',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '18px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--color-text-heading)',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-body)',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: 16,
                    }}
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        flexShrink: 0,
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
