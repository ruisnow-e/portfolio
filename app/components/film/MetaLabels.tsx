'use client';

import { Film } from '@/app/data/films';

interface MetaLabelsProps {
  film: Film;
  index: number;
  total: number;
}

export default function MetaLabels({ film, index, total }: MetaLabelsProps) {
  const indexStr = `${String(index).padStart(2, '0')}`;

  return (
    <>
      {/* Services — right side, vertically centered, rotated */}
      <div
        style={{
          position: 'fixed',
          right: 'clamp(56px, 6vw, 96px)',
          top: '50%',
          transform: 'translateY(-50%) rotate(180deg)',
          zIndex: 20,
          fontSize: '13px',
          color: '#9a9a9a',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          letterSpacing: '0.02em',
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        {film.services}
      </div>

      {/* Index — far right edge */}
      <div
        style={{
          position: 'fixed',
          right: 'clamp(20px, 2.5vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          fontSize: '13px',
          color: '#9a9a9a',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          letterSpacing: '-0.01em',
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }}
      >
        {indexStr}
      </div>
    </>
  );
}
