/*
 * ProcessSteps — numbered_steps variant
 *
 * For technical-authority and owner-operator-trust personas. Numbered
 * step-by-step process. Shows the client is organized, professional,
 * and predictable — reduces friction for first-time callers.
 *
 * Expects config.process_steps[] with { number, title, description }.
 * Falls back to a generic 4-step sequence.
 */

const DEFAULT_STEPS = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We walk your property and assess the job. You get an honest scope and a written estimate — no vague ranges.',
  },
  {
    number: '02',
    title: 'Permitting & Planning',
    description: 'We handle all permits and engineering requirements before any work begins. No surprises at inspection.',
  },
  {
    number: '03',
    title: 'Installation',
    description: 'One crew, one mobilization. We stay on site until the job is done right — no subcontractors.',
  },
  {
    number: '04',
    title: 'Final Inspection',
    description: 'We coordinate the inspection and confirm everything passes before we leave the job site.',
  },
];

export default function ProcessSteps({ config, variant = 'numbered_steps' }) {
  if (variant === 'insurance_steps') {
    return <InsuranceSteps config={config} />;
  }

  const steps = config.process_steps?.length ? config.process_steps : DEFAULT_STEPS;
  const heading = config.process_heading ?? 'How It Works';
  const subhead  = config.process_subhead ?? null;

  return (
    <section aria-label="Our process" className="proc-section">
      <div className="proc-inner">

        <header className="proc-header">
          <p className="proc-eyebrow">Our Process</p>
          <h2 className="proc-heading">{heading}</h2>
          {subhead && <p className="proc-subhead">{subhead}</p>}
        </header>

        <ol className="proc-list">
          {steps.map((step, i) => (
            <li key={i} className="proc-step">
              <div className="proc-step-num" aria-hidden="true">
                {step.number ?? String(i + 1).padStart(2, '0')}
              </div>
              <div className="proc-step-content">
                <h3 className="proc-step-title">{step.title}</h3>
                <p className="proc-step-desc">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="proc-connector" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

      </div>

      <style>{`
        .proc-section {
          background: var(--color-anchor);
          padding: var(--section-padding-y) 24px;
        }
        .proc-inner {
          max-width: var(--max-width-content);
          margin: 0 auto;
        }
        .proc-header {
          margin-bottom: 56px;
          max-width: 560px;
        }
        .proc-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .proc-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-inverse);
          margin: 0 0 14px;
        }
        .proc-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.65);
          margin: 0;
        }
        .proc-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .proc-step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 0 20px;
          align-items: start;
          position: relative;
          padding-bottom: 40px;
        }
        .proc-step:last-child {
          padding-bottom: 0;
        }
        .proc-step-num {
          font-family: var(--font-heading);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-black);
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.35;
          letter-spacing: -0.04em;
          padding-top: 4px;
          /* numbers aligned with heading */
          line-height: 1.05;
        }
        .proc-step-content {
          padding-top: 6px;
        }
        .proc-step-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: var(--color-text-inverse);
          margin: 0 0 10px;
        }
        .proc-step-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: rgba(249, 250, 251, 0.65);
          margin: 0;
        }
        /* Vertical connector line between steps */
        .proc-connector {
          display: none;
        }

        @media (min-width: 768px) {
          .proc-section { padding: var(--section-padding-y) 40px; }
          .proc-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 0 48px;
          }
          .proc-step {
            padding-bottom: 0;
          }
        }
        @media (min-width: 1024px) {
          .proc-list {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

/* ── insurance_steps variant ─────────────────────────────────────────────── */
/*
 * Volume-service / insurance-driven persona.
 * Same 4-step structure, different framing: "We handle this — not you."
 * Each step card has a "Handled by Apex" badge to reinforce the promise.
 * Light surface background — visual contrast from dark hero sections.
 */
function InsuranceSteps({ config }) {
  const steps   = config.process_steps?.length ? config.process_steps : DEFAULT_STEPS;
  const heading = config.process_heading ?? 'We handle the process';
  const subhead = config.process_subhead ?? 'You approve. We do the work.';
  const bizName = config.business_name?.split(' ')[0] ?? 'Us';

  return (
    <section aria-label="Our process" className="ins-section">
      <div className="ins-inner">

        <header className="ins-header">
          <p className="ins-eyebrow">How It Works</p>
          <h2 className="ins-heading">{heading}</h2>
          {subhead && <p className="ins-subhead">{subhead}</p>}
          <div className="ins-framing-strip">
            You don't manage this process — we do. Most customers never talk to their adjuster alone.
          </div>
        </header>

        <ol className="ins-list">
          {steps.map((step, i) => (
            <li key={i} className="ins-step">
              <div className="ins-step-header">
                <span className="ins-step-num" aria-hidden="true">
                  {step.number ?? String(i + 1).padStart(2, '0')}
                </span>
                <span className="ins-handled-badge">Handled by {bizName}</span>
              </div>
              <h3 className="ins-step-title">{step.title}</h3>
              <p className="ins-step-desc">{step.description}</p>
            </li>
          ))}
        </ol>

      </div>

      <style>{`
        .ins-section {
          background: var(--color-surface);
          padding: var(--section-padding-y) 24px;
          border-top: 1px solid var(--color-border);
        }
        .ins-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .ins-header { margin-bottom: 48px; max-width: 640px; }
        .ins-eyebrow {
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .ins-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-heading);
          margin: 0 0 12px;
        }
        .ins-subhead {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          margin: 0 0 20px;
        }
        .ins-framing-strip {
          background: var(--color-primary-light, rgba(29,104,64,0.06));
          border-left: 3px solid var(--color-primary);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-body);
          line-height: var(--line-height-relaxed);
        }
        .ins-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .ins-step {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .ins-step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ins-step-num {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: var(--font-weight-black);
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.40;
          letter-spacing: -0.04em;
        }
        .ins-handled-badge {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-primary);
          background: var(--color-primary-light, rgba(29,104,64,0.08));
          border: 1px solid rgba(29,104,64,0.25);
          border-radius: 4px;
          padding: 3px 8px;
        }
        .ins-step-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-snug);
          color: var(--color-text-heading);
          margin: 0 0 8px;
        }
        .ins-step-desc {
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-body);
          margin: 0;
        }
        @media (min-width: 640px) {
          .ins-list { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .ins-section { padding: var(--section-padding-y) 40px; }
        }
        @media (min-width: 1024px) {
          .ins-list { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
}
