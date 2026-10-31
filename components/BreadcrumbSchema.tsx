const SITE_URL = 'https://www.zephyradynamics.com';

/** Breadcrumb structured data, so search results show "zephyradynamics.com › Page" for each section. */
export default function BreadcrumbSchema({ name, path }: { name: string; path: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }}
    />
  );
}
