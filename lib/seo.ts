import type { Metadata } from 'next';

const SITE = 'Zephyra Dynamics';

/**
 * Per-page metadata: title, description, canonical URL and matching social previews.
 * Without this, every page inherits the homepage's Open Graph and Twitter tags, so shared
 * links all preview as the homepage.
 */
export function pageMeta({
  title,
  description,
  path,
  image = '/og.jpg',
  imageAlt = 'Kestrel X2 by Zephyra Dynamics flying over Bengaluru at dawn',
  article,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  article?: { published: string; modified?: string };
}): Metadata {
  const images = [{ url: image, width: image === '/og.jpg' ? 1200 : 1600, height: image === '/og.jpg' ? 630 : 900, alt: imageAlt }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE}`,
      description,
      url: path,
      siteName: SITE,
      locale: 'en_IN',
      images,
      ...(article
        ? { type: 'article', publishedTime: article.published, modifiedTime: article.modified ?? article.published, authors: [SITE] }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${SITE}`, description, images: [image] },
  };
}
