import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zephyra Dynamics',
    short_name: 'Zephyra',
    description: 'Shaping the future of Urban Air Mobility in India.',
    start_url: '/',
    display: 'browser',
    background_color: '#F5F8FA',
    theme_color: '#0F1317',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
