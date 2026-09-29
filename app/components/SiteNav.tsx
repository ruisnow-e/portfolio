'use client';

import { usePageNavigate } from '@/app/components/PageTransition';
import { ARROW_NE } from '@/app/components/glyphs';

type Page = 'bio' | 'award' | 'contact';

const LINKS: { page: Page; href: string; label: string }[] = [
  { page: 'bio',     href: '/bio',     label: 'Bio' },
  { page: 'award',   href: '/award',   label: 'Award' },
  { page: 'contact', href: '/contact', label: `Contact ${ARROW_NE}` },
];

export default function SiteNav({ active }: { active: Page }) {
  const navigate = usePageNavigate();

  return (
    <nav className="bp-nav">
      <a className="bp-nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        snow<sup>®</sup>
      </a>
      <div className="bp-nav-links">
        {LINKS.map(({ page, href, label }) =>
          page === active
            ? <span key={page} className="bp-nav-active">{label}</span>
            : <a key={page} href={href} onClick={(e) => { e.preventDefault(); navigate(href); }}>{label}</a>
        )}
      </div>
    </nav>
  );
}
