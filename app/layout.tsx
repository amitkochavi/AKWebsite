import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { isLocale, localeConfig, defaultLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  metadataBase: new URL('https://amitkochavi.com'),
  title: 'Amit Kochavi | Business, Philanthropy & Public Service',
  description:
    'Amit Kochavi — entrepreneur, fourth-generation philanthropist, and public servant for Sderot and the State of Israel.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerLocale = headers().get('x-locale') || defaultLocale;
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const { htmlLang, dir } = localeConfig[locale];

  return (
    <html lang={htmlLang} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
