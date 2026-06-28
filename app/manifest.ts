import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amit Kochavi',
    short_name: 'Amit Kochavi',
    description:
      'Amit Kochavi — entrepreneur, fourth-generation philanthropist, and public servant for Sderot and the State of Israel.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b0f1a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
