import Link from 'next/link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  className?: string;
};

const variants = {
  primary: 'bg-kestrel text-white hover:bg-kestrel-deep',
  secondary: 'bg-carbon text-white hover:bg-black',
  quiet: 'bg-cloud/80 text-carbon ring-1 ring-line-strong backdrop-blur hover:bg-cloud',
};

export function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const classes = `label-mono inline-flex h-12 items-center rounded-full px-6 font-bold transition-colors ${variants[variant]} ${className}`;
  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-(--spacing-gutter) ${className}`}>{children}</div>;
}

/** A section heading: optional kicker, wide headline, supporting line. */
export function Heading({
  kicker,
  title,
  lede,
  as: Tag = 'h2',
  className = '',
}: {
  kicker?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && <p className="kicker mb-5">{kicker}</p>}
      <Tag className={`font-wide max-w-[26ch] text-balance text-carbon ${Tag === 'h1' ? 'text-display' : 'text-section'}`}>{title}</Tag>
      {lede && <p className="mt-6 max-w-[56ch] text-lede text-slate">{lede}</p>}
    </div>
  );
}

/** A fact pair: big figure, short label. Used for approved Kestrel specs. */
export function Figure({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="border-t border-line-strong pt-4">
      <p className="font-semiwide tabular text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.03em] text-carbon">
        {value}
        {unit && <span className="ml-1.5 font-sans text-[0.45em] font-medium tracking-normal text-slate">{unit}</span>}
      </p>
      <p className="label-mono mt-3 text-slate">{label}</p>
    </div>
  );
}
