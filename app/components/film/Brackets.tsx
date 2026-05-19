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
      {/* Left bracket */}
      <svg
        viewBox="0 0 50 360"
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
          d="M 0 0 L 50 0 L 50 36 C 4 75, 4 285, 50 324 L 50 360 L 0 360 Z"
          fill="currentColor"
        />
      </svg>

      {/* Right bracket */}
      <svg
        viewBox="0 0 50 360"
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
          d="M 50 0 L 0 0 L 0 36 C 46 75, 46 285, 0 324 L 0 360 L 50 360 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
