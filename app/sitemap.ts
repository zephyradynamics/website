import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.zephyradynamics.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/kestrel-x2', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/laminar', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/flightlab', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/blogs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/blogs/uam-fundamentals-india', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blogs/zephyra-vision', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blogs/flightlab', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
