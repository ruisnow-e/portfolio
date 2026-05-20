'use client';

import { Film } from '@/app/data/films';
import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';

interface FilmsListProps {
  films: Film[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  onFracUpdate: (fn: ((f: number) => void) | null) => void;
}

const ITEM_H = 40;

export default function FilmsList({ films, activeIdx, onSelect, onFracUpdate }: FilmsListProps) {
  const N = films.length;
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const applyFrac = useCallback((frac: number) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      let dist = i - frac;
      while (dist >  N / 2) dist -= N;
      while (dist < -N / 2) dist += N;
      el.style.transform = `translateY(calc(-50% + ${dist * ITEM_H}px))`;
      el.style.opacity = String(Math.max(0, 1 - Math.abs(dist) * 0.55));
    });
  }, [N]);

  useLayoutEffect(() => { applyFrac(activeIdx); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFracUpdate(applyFrac);
    return () => onFracUpdate(null);
  }, [onFracUpdate, applyFrac]);

  return (
    <nav
      aria-label="Film list"
      style={{
        position: 'fixed',
        left: 'clamp(10px, calc(28vw - 50px), 330px)',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        width: 'clamp(120px, 14vw, 200px)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {films.map((film, filmIdx) => (
        <button
          key={film.slug}
          type="button"
          ref={el => { itemRefs.current[filmIdx] = el; }}
          onClick={() => onSelect(filmIdx)}
          aria-current={filmIdx === activeIdx ? 'true' : undefined}
          style={{
            position: 'absolute',
            left: 0, right: 0,
            top: '50%',
            height: ITEM_H,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
            fontSize: '13px',
            textAlign: 'left',
            color: '#0a0a0a',
            fontWeight: filmIdx === activeIdx ? 500 : 400,
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transform: 'translateY(-50%)',
            willChange: 'transform, opacity',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '10px', opacity: 0.5, fontFamily: 'inherit', minWidth: '16px' }}>
            {String(filmIdx + 1).padStart(2, '0')}
          </span>
          {film.title}
        </button>
      ))}
    </nav>
  );
}
