'use client';

import Link from 'next/link';
import { useLiveClock } from '@/app/hooks/useLiveClock';

export default function TopBar() {
  const clock = useLiveClock();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {/* Logo — top-left */}
      <div
        style={{
          position: 'fixed',
          top: 'clamp(16px, 2vh, 28px)',
          left: 'clamp(20px, 2.5vw, 40px)',
          pointerEvents: 'auto',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            color: '#000000',
            textDecoration: 'none',
            fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          snow
          <sup
            style={{
              fontSize: '0.32em',
              verticalAlign: '1em',
              letterSpacing: 0,
            }}
          >
            ®
          </sup>
        </Link>
      </div>

      {/* Right block — top-right */}
      <div
        style={{
          position: 'fixed',
          top: 'clamp(16px, 2vh, 28px)',
          right: 'clamp(20px, 2.5vw, 40px)',
          pointerEvents: 'auto',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          alignItems: 'flex-end',
        }}
      >
        {/* Row 1: nav */}
        <nav
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            fontSize: '14px',
          }}
        >
          <Link
            href="/work"
            style={{
              color: '#000000',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              fontFamily: 'inherit',
            }}
          >
            Work,
          </Link>
          <Link
            href="/about"
            style={{
              color: '#888888',
              textDecoration: 'none',
              fontFamily: 'inherit',
            }}
          >
            About
          </Link>
          {clock && (
            <span
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '13px',
                color: '#888888',
                letterSpacing: '-0.02em',
              }}
            >
              {clock}
            </span>
          )}
          <Link
            href="/contact"
            style={{
              color: '#888888',
              textDecoration: 'none',
              fontFamily: 'inherit',
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Row 2: tagline */}
        <p
          style={{
            maxWidth: '320px',
            fontSize: '13px',
            color: '#1a1a1a',
            lineHeight: 1.55,
            textAlign: 'right',
            margin: 0,
          }}
        >
          Films exploring memory, body, and rupture. Each piece is a personal
          study in how cinema can hold what language can&#39;t.
        </p>

        {/* Row 3: contact */}
        <p style={{ margin: 0, fontSize: '13px', color: '#555555' }}>
          <span style={{ color: '#555555' }}>Contact: </span>
          <a
            href="mailto:song.r1@northeastern.edu"
            style={{
              color: '#000000',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            song.r1@northeastern.edu
          </a>
        </p>
      </div>
    </header>
  );
}
