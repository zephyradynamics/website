import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
import { getMember, team } from '@/lib/team';

const SITE_URL = 'https://www.zephyradynamics.com';

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const member = getMember((await params).slug);
  if (!member) return {};
  return pageMeta({ title: `${member.name}, ${member.role}`, description: member.bio, path: `/team/${member.slug}` });
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const member = getMember((await params).slug);
  if (!member) notFound();
  const i = team.indexOf(member);
  const next = team[(i + 1) % team.length];

  const profiles = member.profiles ?? (member.linkedIn ? [{ label: 'LinkedIn', href: member.linkedIn }] : []);
  // the @id ties this person to the Organization block in the root layout (its founder points here)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/team/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: `${SITE_URL}${member.image}`,
    url: `${SITE_URL}/team/${member.slug}`,
    affiliation: { '@type': 'Organization', name: 'Zephyra Dynamics', url: SITE_URL },
    ...(profiles.length ? { sameAs: profiles.map((p) => p.href) } : {}),
    ...member.schema,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <article className="bg-sky pt-[clamp(32px,6vh,72px)] pb-(--spacing-section)">
        <Container>
          <Link href="/about#team" className="label-mono text-slate transition-colors hover:text-kestrel">
            ← Leadership and advisors
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="aspect-[4/5] max-w-[480px] overflow-hidden rounded-[18px] bg-mist">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  width={720}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <dl className="mt-8 max-w-[480px] divide-y divide-line border-y border-line">
                {member.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                    <dt className="label-mono pt-0.5 text-slate">{f.label}</dt>
                    <dd className="space-y-1 text-[15px] leading-snug text-carbon">
                      {f.value.map((v) => (
                        <p key={v}>{v}</p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              {profiles.length > 0 && (
                <ul aria-label={`${member.name} online`} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {profiles.map((p) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="label-mono inline-flex text-carbon transition-colors hover:text-kestrel"
                      >
                        {p.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="max-w-[62ch]">
              <p className="kicker">{member.role}</p>
              <h1 className="font-wide mt-5 text-display text-balance text-carbon">{member.name}</h1>
              <p className="mt-7 text-lede text-carbon/85">{member.bio}</p>

              {member.sections.map((sec) => (
                <section key={sec.heading} className="mt-12 border-t border-line pt-8">
                  <h2 className="font-semiwide text-[24px] text-carbon">{sec.heading}</h2>
                  {sec.body.map((para) => (
                    <p key={para.slice(0, 32)} className="mt-4 text-[16.5px] leading-[1.8] text-slate">
                      {para}
                    </p>
                  ))}
                </section>
              ))}

              <Link
                href={`/team/${next.slug}`}
                className="group mt-16 block rounded-[18px] bg-cloud p-6 ring-1 ring-line transition-colors hover:ring-line-strong"
              >
                <span className="label-mono text-slate">Next</span>
                <span className="font-semiwide mt-2 block text-[22px] text-carbon group-hover:text-kestrel">{next.name}</span>
                <span className="mt-1 block text-[15px] text-slate">{next.role}</span>
              </Link>
            </div>
          </div>
        </Container>
      </article>
      <Footer />
    </>
  );
}
