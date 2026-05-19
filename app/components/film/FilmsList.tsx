'use client';

import { Film } from '@/app/data/films';

interface FilmsListProps {
  films: Film[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export default function FilmsList({ films, activeIdx, onSelect }: FilmsListProps) {
  return (
    <nav
      aria-label="Film list"
      style={{
        position: 'fixed',
        left: 'clamp(20px, 2.5vw, 40px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
      }}
    >
      {films.map((film, idx) => (
        <button
          key={film.slug}
          type="button"
          onClick={() => onSelect(idx)}
          aria-current={idx === activeIdx ? 'true' : undefined}
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
            lineHeight: 1.85,
            textAlign: 'left',
            color: idx === activeIdx ? '#000000' : '#b8b8b8',
            fontWeight: idx === activeIdx ? 500 : 400,
            transition: 'color 300ms ease',
          }}
          onMouseEnter={(e) => {
            if (idx !== activeIdx) {
              (e.currentTarget as HTMLButtonElement).style.color = '#555555';
            }
          }}
          onMouseLeave={(e) => {
            if (idx !== activeIdx) {
              (e.currentTarget as HTMLButtonElement).style.color = '#b8b8b8';
            }
          }}
        >
          {film.title}
        </button>
      ))}
    </nav>
  );
}
