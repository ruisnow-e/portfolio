'use client';

import { useRef, useState, useCallback } from 'react';
import { films } from '@/app/data/films';
import TopBar from '@/app/components/film/TopBar';
import BottomBar from '@/app/components/film/BottomBar';
import Brackets from '@/app/components/film/Brackets';
import FilmsList from '@/app/components/film/FilmsList';
import MetaLabels from '@/app/components/film/MetaLabels';
import FilmsStrip, { FilmsStripHandle } from '@/app/components/film/FilmsStrip';

export default function FilmPage() {
  const [lockedIdx, setLockedIdx] = useState(0);
  const stripRef = useRef<FilmsStripHandle>(null);

  const handleListClick = useCallback((idx: number) => {
    stripRef.current?.handleListClick(idx);
  }, []);

  return (
    <>
      {/* Visually hidden live region for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {films[lockedIdx]?.title}, {films[lockedIdx]?.category}
      </div>

      <main
        className="no-scrollbar"
        style={{
          background: '#ffffff',
          color: '#000000',
          minHeight: '100dvh',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <TopBar />
        <BottomBar />
        <Brackets />

        <FilmsList
          films={films}
          activeIdx={lockedIdx}
          onSelect={handleListClick}
        />

        <MetaLabels
          film={films[lockedIdx]}
          index={lockedIdx + 1}
          total={films.length}
        />

        {/* Center column — the scrolling strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FilmsStrip
            ref={stripRef}
            onLockChange={setLockedIdx}
          />
        </div>
      </main>
    </>
  );
}
