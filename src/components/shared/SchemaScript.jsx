/**
 * Injects a JSON-LD schema block into <head>.
 * The `schema` prop comes from MDX frontmatter — already minified JSON string.
 * No runtime processing — just a pass-through to the script tag.
 */
export default function SchemaScript({ schema }) {
  if (!schema) return null;

  // schema is a stringified JSON object from the content engine (pass 5)
  const json = typeof schema === 'string' ? schema : JSON.stringify(schema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
