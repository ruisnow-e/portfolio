'use client';

export default function Brackets() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(300px, 32vw, 460px)',
        height: 'clamp(300px, 32vw, 460px)',
        zIndex: 8,
        pointerEvents: 'none',
      }}
    >
      {/* Left bracket [ */}
      <svg
        viewBox="0 0 50 220"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '-68px',
          transform: 'translateY(-50%)',
          width: 'clamp(34px, 3.4vw, 52px)',
          color: '#000000',
          pointerEvents: 'none',
          display: 'block',
        }}
      >
        <path
          d="M 0 0 L 50 0 L 50 22 C 4 46, 4 174, 50 198 L 50 220 L 0 220 Z"
          fill="currentColor"
        />
      </svg>

      {/* Right bracket ] */}
      <svg
        viewBox="0 0 50 220"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-68px',
          transform: 'translateY(-50%)',
          width: 'clamp(34px, 3.4vw, 52px)',
          color: '#000000',
          pointerEvents: 'none',
          display: 'block',
        }}
      >
        <path
          d="M 50 0 L 0 0 L 0 22 C 46 46, 46 174, 0 198 L 0 220 L 50 220 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
