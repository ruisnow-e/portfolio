'use client';

export default function BottomBarCS() {
  return (
    <footer
      className="cs-scroll-hint"
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 2vh, 28px)',
        left: 'clamp(20px, 2.5vw, 40px)',
        zIndex: 20,
        pointerEvents: 'none',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
        fontSize: 'clamp(9px, 0.9vw, 11px)',
        letterSpacing: '0.1em',
        color: '#999999',
      }}
    >
      SCROLL TO RECOMPILE ↓
    </footer>
  );
}
