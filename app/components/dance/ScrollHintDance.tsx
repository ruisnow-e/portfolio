'use client';

// Desktop only (hidden on touch layouts via .dn-hint): sits centred in the top bar,
// on the same line as the logo and Contact link.
export default function ScrollHintDance() {
  return (
    <div
      className="dn-hint"
      style={{
        position: 'fixed',
        top: 'calc(clamp(18px, 2.5vh, 28px) + 3px)',
        left: '50%',
        transform: 'translateX(-50%)',
        lineHeight: '25px',
        zIndex: 20,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
        fontSize: 'clamp(9px, 0.9vw, 11px)',
        letterSpacing: '0.1em',
        color: 'rgba(0,0,0,0.5)',
      }}
    >
      SCROLL TO CHANGE TRACK ↓
    </div>
  );
}
