'use client';

import { Film } from '@/app/data/films';

interface FilmCoverProps {
  film: Film;
  filmIdx: number;
  copyIdx: number;
  isLocked: boolean;
  onLockedClick?: () => void;
}

export default function FilmCover({ film, filmIdx, copyIdx, isLocked, onLockedClick }: FilmCoverProps) {
  return (
    <article
      className={`film-work${isLocked ? ' locked' : ''}`}
      onClick={isLocked && onLockedClick ? onLockedClick : undefined}
      data-film-idx={filmIdx}
      data-copy-idx={copyIdx}
      role="img"
      aria-label={`${film.title}, ${film.category}`}
      style={{
        width: 'clamp(220px, 24vw, 340px)',
        height: 'clamp(220px, 24vw, 340px)',
        margin: '0 auto 0',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div
          className="film-cover"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            backgroundImage: `url('${film.cover}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: isLocked ? 'grayscale(0) contrast(1)' : 'grayscale(1) contrast(0.95)',
            opacity: isLocked ? 1 : 0.22,
            transition:
              'filter 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)',
            cursor: isLocked && onLockedClick ? 'pointer' : undefined,
          }}
        />
        {isLocked && onLockedClick && (
          <div className="fp-cta">↳ CLICK TO OPEN</div>
        )}
      </div>
    </article>
  );
}
