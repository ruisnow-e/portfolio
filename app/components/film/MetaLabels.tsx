'use client';

import { Film } from '@/app/data/films';

interface MetaLabelsProps {
  film: Film;
  index: number;
  total: number;
}

export default function MetaLabels({ film, index, total }: MetaLabelsProps) {
  const frameSize = 'clamp(300px, 32vw, 460px)';

  // Category sits above the bracket frame center
  // The bracket frame top = 50vh - frameSize/2
  // We position label so its bottom aligns just above the frame top
  const categoryBottom = `calc(50vh + ${frameSize} / 2 + 12px)`;

  const indexStr = `${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <>
      {/* Category — above the bracket frame */}
      <div
        aria-live="polite"
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: categoryBottom,
          zIndex: 20,
          fontSize: '13px',
          color: '#555555',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }}
      >
        {film.category}
      </div>

      {/* Services — right side, vertically centered */}
      <div
        style={{
          position: 'fixed',
          right: 'clamp(20px, 2.5vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%) rotate(180deg)',
          zIndex: 20,
          fontSize: '13px',
          color: '#555555',
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

      {/* Index — inside-right, vertically centered */}
      <div
        style={{
          position: 'fixed',
          right: 'clamp(160px, 20vw, 300px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          fontSize: '13px',
          color: '#b8b8b8',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
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
