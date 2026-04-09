'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Stats row — years / jobs / rating / response time.
 * Animated number count-up on scroll into view.
 */
export default function Stats({ config }) {
  const { stats = {} } = config;

  const items = [
    stats.years_in_business && {
      value: stats.years_in_business,
      suffix: '+',
      label: 'Years in Business',
      format: 'integer',
    },
    stats.jobs_completed && {
      value: stats.jobs_completed,
      suffix: '+',
      label: 'Jobs Completed',
      format: 'integer',
    },
    stats.avg_rating && {
      value: stats.avg_rating,
      suffix: '★',
      label: `Avg Rating (${stats.review_count ?? 0} Reviews)`,
      format: 'decimal',
    },
    stats.response_time && {
      value: null,
      textValue: stats.response_time,
      label: 'Response Time',
      format: 'text',
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section style={{ background: '#1e2332' }}>
      <div className="container" style={{ paddingBlock: 40 }}>
        <div className="stats-grid">
          {items.map((item, i) => (
            <StatItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ item }) {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted]     = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (item.format === 'text' || item.value == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animateCount(item.value, setDisplayed, item.format);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item, started]);

  const formatted =
    item.format === 'text'
      ? item.textValue
      : item.format === 'decimal'
      ? displayed.toFixed(1)
      : displayed.toLocaleString();

  return (
    <div ref={ref} className="stat-item">
      <div
        style={{
          fontFamily: 'var(--font-heading), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          color: '#fff',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {formatted}
        {item.suffix && (
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6em' }}>
            {item.suffix}
          </span>
        )}
      </div>
      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
        {item.label}
      </div>
    </div>
  );
}

function animateCount(target, setter, format) {
  const duration  = 1600;
  const start     = performance.now();
  const startVal  = 0;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = startVal + (target - startVal) * eased;
    setter(format === 'decimal' ? current : Math.round(current));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
