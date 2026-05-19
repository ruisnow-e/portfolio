'use client';

export default function BottomBar() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 2vh, 28px)',
        left: 'clamp(20px, 2.5vw, 40px)',
        right: 'clamp(20px, 2.5vw, 40px)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
      }}
    >
      {/* Left: view mode labels */}
      <nav
        style={{
          display: 'flex',
          gap: '16px',
          fontSize: '13px',
          pointerEvents: 'auto',
        }}
      >
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontSize: '13px',
            color: '#000000',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontFamily: 'inherit',
          }}
        >
          Vertical
        </button>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontSize: '13px',
            color: '#888888',
            fontFamily: 'inherit',
          }}
        >
          Horizontal
        </button>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontSize: '13px',
            color: '#888888',
            fontFamily: 'inherit',
          }}
        >
          Grid
        </button>
      </nav>

      {/* Right: copyright */}
      <span
        style={{
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '12px',
          color: '#b8b8b8',
          letterSpacing: '-0.01em',
        }}
      >
        All rights reserved. © 2026 Snow® Studio
      </span>
    </footer>
  );
}
