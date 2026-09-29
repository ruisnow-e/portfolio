'use client';

import { usePageNavigate } from '@/app/components/PageTransition';
import { ARROW_NE } from '@/app/components/glyphs';

// Top bar for the work pages (film / cs / dance): same logo and link style as SiteNav,
// but fixed and transparent so it floats over each page's artwork.
export default function WorkNav() {
  const navigate = usePageNavigate();

  return (
    <nav className="bp-nav bp-nav--work">
      <a className="bp-nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        snow<sup>®</sup>
      </a>
      <div className="bp-nav-links">
        <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact <span className="bp-nav-arrow">{ARROW_NE}</span></a>
      </div>
    </nav>
  );
}
