'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { films } from '@/app/data/films';
import WorkNav from '@/app/components/WorkNav';
import BottomBar from '@/app/components/film/BottomBar';
import FilmsList from '@/app/components/film/FilmsList';
import FilmsStrip, { FilmsStripHandle } from '@/app/components/film/FilmsStrip';
import Projector from '@/app/components/film/Projector';
import FilmModal from '@/app/components/film/FilmModal';

export default function FilmPage() {
  const [lockedIdx, setLockedIdx] = useState(0);
  const [modalFilm, setModalFilm] = useState<(typeof films)[0] | null>(null);
  const handleLockedClick = useCallback(() => setModalFilm(films[lockedIdx]), [lockedIdx]);
  const stripRef = useRef<FilmsStripHandle>(null);
  const fracUpdateRef = useRef<((f: number) => void) | null>(null);

  useEffect(() => {
    document.body.classList.add('film-page');
    return () => document.body.classList.remove('film-page');
  }, []);

  const handleFracUpdate = useCallback((fn: ((f: number) => void) | null) => {
    fracUpdateRef.current = fn;
  }, []);

  const handleProgress = useCallback((f: number) => {
    fracUpdateRef.current?.(f);
  }, []);

  const handleListClick = useCallback((idx: number) => {
    stripRef.current?.handleListClick(idx);
  }, []);

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: 1, height: 1, padding: 0, margin: -1,
          overflow: 'hidden', clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap', border: 0,
        }}
      >
        {films[lockedIdx]?.title}, {films[lockedIdx]?.category}
      </div>

      <main
        className="no-scrollbar"
        style={{
          background: '#ffffff',
          color: '#0a0a0a',
          minHeight: '100dvh',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <WorkNav />
        <BottomBar />

        <FilmsList films={films} activeIdx={lockedIdx} onSelect={handleListClick} onFracUpdate={handleFracUpdate} />

<Projector film={films[lockedIdx]} />

        {/* Center strip — offset left to sit between list and projector */}
        <div className="fm-strip">
          <FilmsStrip ref={stripRef} onLockChange={setLockedIdx} onProgress={handleProgress} onLockedClick={handleLockedClick} />
        </div>
      </main>

      <FilmModal
        film={modalFilm}
        onClose={() => setModalFilm(null)}
      />
    </>
  );
}
