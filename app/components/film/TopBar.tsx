'use client';

import { usePageNavigate } from '@/app/components/PageTransition';

export default function TopBar() {
  const navigate = usePageNavigate();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(16px, 2vh, 28px) clamp(20px, 2.5vw, 40px)',
        pointerEvents: 'none',
      }}
    >
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: '#0a0a0a',
          textDecoration: 'none',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          lineHeight: 1,
          display: 'inline-block',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; (e.currentTarget as HTMLAnchorElement).style.textUnderlineOffset = '3px'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}
      >
        SNOW
        <sup style={{ fontSize: '0.32em', verticalAlign: '1em', letterSpacing: 0 }}>®</sup>
        {' FILM'}
      </a>

      <a
        href="/contact"
        onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
        style={{
          fontSize: 'clamp(10px, 1vw, 12px)',
          letterSpacing: '0.1em',
          color: '#0a0a0a',
          textDecoration: 'none',
          pointerEvents: 'auto',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline';
          (e.currentTarget as HTMLAnchorElement).style.textUnderlineOffset = '3px';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
        }}
      >
        CONTACT ↗
      </a>
    </header>
  );
}
