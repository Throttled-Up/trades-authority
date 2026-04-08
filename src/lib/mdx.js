import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = join(process.cwd(), 'content');

/**
 * Load a single MDX file by type and slug.
 *
 * @param {'services'|'locations'|'hubs'} type
 * @param {string} slug
 * @returns {{ frontmatter: object, content: string }}
 */
export function getMdxPage(type, slug) {
  const filePath = join(CONTENT_ROOT, type, `${slug}.mdx`);

  if (!existsSync(filePath)) {
    return null;
  }

  const raw = readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  return { frontmatter, content };
}

/**
 * Load a single-file MDX page (about, contact).
 *
 * @param {string} filename - e.g. 'about' (no extension)
 * @returns {{ frontmatter: object, content: string } | null}
 */
export function getMdxSinglePage(filename) {
  const filePath = join(CONTENT_ROOT, `${filename}.mdx`);
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  return { frontmatter, content };
}

/**
 * List all slugs for a content type (for generateStaticParams).
 *
 * @param {'services'|'locations'|'hubs'} type
 * @returns {string[]}
 */
export function getMdxSlugs(type) {
  const dir = join(CONTENT_ROOT, type);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

/**
 * List all pages of a type with their frontmatter (for index pages).
 *
 * @param {'services'|'locations'|'hubs'} type
 * @returns {Array<{ slug: string, frontmatter: object }>}
 */
export function getMdxIndex(type) {
  const slugs = getMdxSlugs(type);
  return slugs.map(slug => {
    const { frontmatter } = getMdxPage(type, slug);
    return { slug, frontmatter };
  });
}
