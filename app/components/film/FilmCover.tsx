'use client';

import { Film } from '@/app/data/films';

interface FilmCoverProps {
  film: Film;
  filmIdx: number;
  copyIdx: number;
  isLocked: boolean;
}

export default function FilmCover({ film, filmIdx, copyIdx, isLocked }: FilmCoverProps) {
  return (
    <article
      className={`film-work${isLocked ? ' locked' : ''}`}
      data-film-idx={filmIdx}
      data-copy-idx={copyIdx}
      role="img"
      aria-label={`${film.title}, ${film.category}`}
      style={{
        width: 'clamp(300px, 32vw, 460px)',
        height: 'clamp(300px, 32vw, 460px)',
        margin: '0 auto 24px',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        className="film-cover"
        style={{
          aspectRatio: film.aspectRatio,
          [film.axis === 'height' ? 'height' : 'width']: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: '#c8c0b8',
          backgroundImage: `url('${film.cover}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isLocked ? 'grayscale(0) contrast(1)' : 'grayscale(1) contrast(0.95)',
          opacity: isLocked ? 1 : 0.32,
          transition:
            'filter 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </article>
  );
}
