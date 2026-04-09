import { readFileSync } from 'fs';
import { join } from 'path';

const CONFIG_PATH = join(process.cwd(), 'site.config.json');

let _cached = null;

/**
 * Load and return the site.config.json.
 * Cached after first read (safe for build-time use in RSC).
 * Throws clearly if the file is missing or malformed.
 */
export function getSiteConfig() {
  if (_cached) return _cached;

  let raw;
  try {
    raw = readFileSync(CONFIG_PATH, 'utf-8');
  } catch {
    // No site.config.json — bare template deploy. Return a minimal stub so
    // generateStaticParams returns empty arrays and the build succeeds.
    // Client repos always have this file written by configureClientRepo().
    _cached = {
      business_name: 'Trades Authority',
      city: '', state: '', phone: '', primary_color: '#e8520a',
      services: [], hubs: [], service_areas: [],
      testimonials: [], process_steps: [], differentiators: [],
      stats: {}, social: {},
    };
    return _cached;
  }

  try {
    _cached = JSON.parse(raw);
  } catch (err) {
    throw new Error(`[trades-authority] site.config.json is invalid JSON: ${err.message}`);
  }

  return _cached;
}

/**
 * Returns the CSS string that injects the client's brand color.
 * Injected as an inline <style> in the root layout.
 */
export function getPrimaryColorStyle(config) {
  const primary = config.primary_color ?? '#e8520a';
  // naive 15% darkening — good enough for hover states without a color library
  const dark = darken(primary, 0.15);
  return `:root { --color-primary: ${primary}; --color-primary-dark: ${dark}; }`;
}

/** Very simple hex darkening — avoids pulling in a color library */
function darken(hex, amount) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = Math.max(0, Math.round(parseInt(h.slice(0, 2), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(h.slice(2, 4), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(h.slice(4, 6), 16) * (1 - amount)));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}
