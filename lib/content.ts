import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { Locale } from './i18n';
import type { SiteContent } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Content is read from the runtime overlay in /data first (where dashboard edits
 * are saved), falling back to the committed defaults in /content. This keeps the
 * shipped defaults in version control while allowing live edits to persist on a
 * stateful server.
 */
export async function getContent(locale: Locale): Promise<SiteContent> {
  const overlayPath = path.join(DATA_DIR, `${locale}.json`);
  const defaultPath = path.join(CONTENT_DIR, `${locale}.json`);
  try {
    const raw = await fs.readFile(overlayPath, 'utf-8');
    return JSON.parse(raw) as SiteContent;
  } catch {
    const raw = await fs.readFile(defaultPath, 'utf-8');
    return JSON.parse(raw) as SiteContent;
  }
}

export async function saveContent(locale: Locale, content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const overlayPath = path.join(DATA_DIR, `${locale}.json`);
  await fs.writeFile(overlayPath, JSON.stringify(content, null, 2), 'utf-8');
}

/** Reset a locale back to the committed default by removing its overlay. */
export async function resetContent(locale: Locale): Promise<void> {
  const overlayPath = path.join(DATA_DIR, `${locale}.json`);
  try {
    await fs.unlink(overlayPath);
  } catch {
    /* no overlay to remove */
  }
}
