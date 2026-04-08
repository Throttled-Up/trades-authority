/**
 * MdxStyles — shared prose styles for MDX-rendered content.
 * Injected once per page via <style> tag. Scoped to .mdx-content.
 */
export default function MdxStyles() {
  return <style>{styles}</style>;
}

export const styles = `
  .mdx-content h2 {
    font-family: var(--font-heading), sans-serif;
    font-weight: 700;
    font-size: clamp(1.25rem, 2.5vw, 1.625rem);
    color: var(--color-text-heading);
    margin-top: 2.5rem;
    margin-bottom: 0.875rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-primary);
    display: inline-block;
  }
  .mdx-content h2 { display: block; }
  .mdx-content h3 {
    font-family: var(--font-heading), sans-serif;
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--color-text-heading);
    margin-top: 1.75rem;
    margin-bottom: 0.625rem;
  }
  .mdx-content p  { margin-bottom: 1.25rem; }
  .mdx-content ul,
  .mdx-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .mdx-content ul { list-style: disc; }
  .mdx-content ol { list-style: decimal; }
  .mdx-content li { margin-bottom: 0.5rem; }
  .mdx-content strong { color: var(--color-text-heading); font-weight: 600; }
  .mdx-content a  { color: var(--color-primary); text-decoration: underline; }
  .mdx-content blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    color: var(--color-text-muted);
    font-style: italic;
    margin: 1.5rem 0;
  }
`;
