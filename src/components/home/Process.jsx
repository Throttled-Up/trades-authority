/**
 * Process — numbered steps showing how to hire/work with the business.
 * Reads from config.process_steps (array of { step, title, description }).
 */
export default function Process({ config }) {
  const { process_steps = [] } = config;
  if (process_steps.length === 0) return null;

  return (
    <section className="section-pad bg-dark">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title section-title-light">
            Simple. Fast. Done Right.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(process_steps.length, 4)}, 1fr)`,
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Connector line behind steps */}
          {process_steps.length > 1 && (
            <div
              style={{
                position: 'absolute',
                top: 28,
                left: '12.5%',
                right: '12.5%',
                height: 2,
                background: 'rgba(255,255,255,0.12)',
                zIndex: 0,
              }}
            />
          )}

          {process_steps.map((step, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '0 16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontFamily: 'var(--font-heading), sans-serif',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#fff',
                }}
              >
                {step.step ?? i + 1}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading), sans-serif',
                  fontWeight: 700,
                  fontSize: '1.0625rem',
                  color: '#fff',
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
