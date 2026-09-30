'use client';

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { films } from '@/app/data/films';
import FilmCover from './FilmCover';

const REPEAT = 3;

export interface FilmsStripHandle {
  handleListClick: (targetFilmIdx: number) => void;
}

interface FilmsStripProps {
  onLockChange: (idx: number) => void;
  onProgress?: (frac: number) => void;
  onLockedClick?: () => void;
}

const FilmsStrip = forwardRef<FilmsStripHandle, FilmsStripProps>(
  function FilmsStrip({ onLockChange, onProgress, onLockedClick }, ref) {
    const onProgressRef = useRef(onProgress);
    useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);
    const stripRef = useRef<HTMLDivElement>(null);
    const [lockedIdx, setLockedIdx] = useState(0);
    const rafRef = useRef<number | null>(null);
    const baseScrollRef = useRef<number>(0);
    const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isSnappingRef = useRef(false);
    const snapAnimRef = useRef<number | null>(null);
    const lockedRef = useRef(0);   // mirrors lockedIdx for the resize handler
    const repeated = useMemo(
      () => Array.from({ length: REPEAT }).flatMap(() => films),
      []
    );

    const updateLocked = useCallback(() => {
      if (!stripRef.current) return;
      const works =
        stripRef.current.querySelectorAll<HTMLElement>('.film-work');
      const center = window.innerHeight / 2;
      let best = 0;
      let minDist = Infinity;
      works.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          best = i;
        }
      });
      const actual = best % films.length;
      lockedRef.current = actual;
      setLockedIdx(actual);
      onLockChange(actual);
    }, [onLockChange]);

    const smoothScrollTo = useCallback((targetY: number) => {
      if (snapAnimRef.current) cancelAnimationFrame(snapAnimRef.current);
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;
      const duration = 1100;
      const t0 = performance.now();
      isSnappingRef.current = true;
      const step = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
        window.scrollTo(0, startY + dist * ease);
        if (t < 1) {
          snapAnimRef.current = requestAnimationFrame(step);
        } else {
          isSnappingRef.current = false;
          snapAnimRef.current = null;
        }
      };
      snapAnimRef.current = requestAnimationFrame(step);
    }, []);

    const snapToNearest = useCallback(() => {
      if (!stripRef.current || isSnappingRef.current) return;
      const works = stripRef.current.querySelectorAll<HTMLElement>('.film-work');
      const center = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let minDist = Infinity;
      works.forEach(el => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < minDist) { minDist = dist; best = el; }
      });
      if (!best || minDist < 4) return;
      const targetY = (best as HTMLElement).offsetTop + (best as HTMLElement).offsetHeight / 2 - window.innerHeight / 2;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: targetY, behavior: 'auto' });
      } else {
        smoothScrollTo(targetY);
      }
    }, [smoothScrollTo]);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      history.scrollRestoration = 'manual';

      // Centre film `idx` of the middle copy, and re-derive the loop's base scroll from the current layout
      const centreOn = (idx: number) => {
        if (!stripRef.current) return;
        const works =
          stripRef.current.querySelectorAll<HTMLElement>('.film-work');
        const firstCopyB = works[films.length];
        const target = works[films.length + idx];
        if (!firstCopyB || !target) return;
        const centreY = (el: HTMLElement) =>
          el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2;
        baseScrollRef.current = centreY(firstCopyB);
        window.scrollTo({ top: centreY(target), behavior: 'auto' });
        updateLocked();
      };

      requestAnimationFrame(() => centreOn(0));

      // Phone posters are sized in dvh, so the layout shifts when the viewport height changes
      // (iOS toolbar showing/hiding, late CSS). Re-centre: on Heirloom until the visitor starts
      // browsing, afterwards on whichever film is locked.
      let interacted = false;
      const markInteracted = () => { interacted = true; };
      window.addEventListener('touchstart', markInteracted, { passive: true, once: true });
      window.addEventListener('wheel', markInteracted, { passive: true, once: true });
      window.addEventListener('keydown', markInteracted, { once: true });
      let lastH = stripRef.current?.offsetHeight ?? 0;
      const ro = new ResizeObserver(() => {
        const h = stripRef.current?.offsetHeight ?? 0;
        if (h === lastH) return;
        lastH = h;
        if (snapAnimRef.current) { cancelAnimationFrame(snapAnimRef.current); snapAnimRef.current = null; }
        isSnappingRef.current = false;
        centreOn(interacted ? lockedRef.current : 0);
      });
      if (stripRef.current) ro.observe(stripRef.current);

      const onScroll = () => {
        if (!isSnappingRef.current) {
          if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
          snapTimerRef.current = setTimeout(snapToNearest, 600);
        }

        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          if (!stripRef.current) return;
          // One copy of the list = distance between film 0 of copy A and film 0 of copy B
          // (scrollHeight / REPEAT would also count the strip's 50vh top/bottom padding)
          const works = stripRef.current.querySelectorAll<HTMLElement>('.film-work');
          const oneSetHeight = works[films.length].offsetTop - works[0].offsetTop;
          const base = baseScrollRef.current;
          const sy = window.scrollY;
          // 2px slack: phone posters are sized in dvh, so positions are fractional and
          // iOS rounds scrollY down — without it the first frame looks like an upward wrap
          if (sy >= base + oneSetHeight - 2) {
            window.scrollTo({ top: sy - oneSetHeight, behavior: 'auto' });
            return;
          }
          if (sy < base - 2) {
            window.scrollTo({ top: sy + oneSetHeight, behavior: 'auto' });
            return;
          }
          const oneFilmH = oneSetHeight / films.length;
          onProgressRef.current?.((sy - base) / oneFilmH);
          updateLocked();
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener('touchstart', markInteracted);
        window.removeEventListener('wheel', markInteracted);
        window.removeEventListener('keydown', markInteracted);
        window.removeEventListener('scroll', onScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
        if (snapAnimRef.current) cancelAnimationFrame(snapAnimRef.current);
      };
    }, [updateLocked, snapToNearest]);

    const handleListClick = useCallback(
      (targetFilmIdx: number) => {
        if (!stripRef.current) return;
        const works =
          stripRef.current.querySelectorAll<HTMLElement>('.film-work');
        const targets = Array.from(works).filter(
          (w) => Number(w.dataset.filmIdx) === targetFilmIdx
        );
        if (!targets.length) return;

        const currentCenter = window.scrollY + window.innerHeight / 2;
        const closest = targets.reduce((best, el) => {
          const ec = el.offsetTop + el.offsetHeight / 2;
          const bc = best.offsetTop + best.offsetHeight / 2;
          return Math.abs(ec - currentCenter) < Math.abs(bc - currentCenter)
            ? el
            : best;
        });

        const targetY =
          closest.offsetTop + closest.offsetHeight / 2 - window.innerHeight / 2;

        const reduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
          window.scrollTo({ top: targetY, behavior: 'auto' });
        } else {
          smoothScrollTo(targetY);
        }
      },
      [smoothScrollTo]
    );

    useImperativeHandle(ref, () => ({ handleListClick }), [handleListClick]);

    return (
      <div
        ref={stripRef}
        style={{
          paddingTop: '50vh',
          paddingBottom: '50vh',
          overflow: 'visible',
        }}
      >
        {repeated.map((film, globalIdx) => {
          const filmIdx = globalIdx % films.length;
          const copyIdx = Math.floor(globalIdx / films.length);
          const isLocked = filmIdx === lockedIdx;
          return (
            <FilmCover
              key={`${copyIdx}-${film.slug}`}
              film={film}
              filmIdx={filmIdx}
              copyIdx={copyIdx}
              isLocked={isLocked}
              onLockedClick={isLocked ? onLockedClick : undefined}
            />
          );
        })}
      </div>
    );
  }
);

export default FilmsStrip;
