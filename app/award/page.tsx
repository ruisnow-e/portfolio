'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import SiteNav from '@/app/components/SiteNav';
import { ARROW_NE } from '@/app/components/glyphs';

type DecoType = 'laurel' | 'number' | 'quote' | 'star' | 'stage' | 'currency';

interface Award {
  size: 'S' | 'M' | 'L';
  deco: DecoType;
  decoValue?: string;
  decoSup?: string;
  label: string;
  name: string;
  sub: string;
  year: string;
  poster?: string;
  url?: string;
}

const awards: Award[] = [
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Berlin Short Film Festival',            sub: 'Drama',               year: '2024', poster: '/award/cert-berlin.jpg',     url: 'https://berlinshortsaward.com/winners-july-2024/'                  },
  { size: 'M', deco: 'star',  label: 'AWARD WINNER · BEST EDITING',       name: 'Chicago Filmmaker Awards',              sub: 'Drama',               year: '2024', poster: '/award/cert-chicago.jpg',    url: 'https://cifawards.net/winners-october-2024/'            },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'San Francisco Arthouse Short Festival', sub: 'Drama',               year: '2024', poster: '/award/cert-sfarthouse.jpg', url: 'https://sanfranciscoindieshort.com/winners-july-2024/'             },
  { size: 'L', deco: 'star',  label: 'OFFICIAL SELECTION',                name: 'Kyoto Intl Student Film Festival',      sub: '27th edition',        year: '2025', poster: '/award/cert-kyoto.jpg',      url: 'https://www.consortium.or.jp/en/project/kisfvf/details/2024-2'    },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Madrid Arthouse Film Festival',         sub: 'Drama',               year: '2024', poster: '/award/cert-madrid.jpg',     url: 'https://maffestival.com/winners-october-2024/'                     },
  { size: 'M', deco: 'quote', label: 'HONORABLE MENTION',                 name: 'Los Angeles Short Film Awards',         sub: 'Best LGBTQ Film',     year: '2024', poster: '/award/cert-la.jpg'                                                                           },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Phoenix Shorts',                        sub: 'Drama',               year: '2024', poster: '/award/cert-phoenix.jpg',    url: 'https://phoenixshortfestival.com/winners-august-2024/'             },
  { size: 'L', deco: 'stage', label: 'OFFICIAL SELECTION',                name: 'San Antonio QFest',                     sub: 'LGBT Film Festival',  year: '2024', poster: '/award/cert-sanantonio.jpg', url: '/films/san-antonio-qfest-2024.pdf'                        },
  { size: 'M', deco: 'stage', label: 'OFFICIAL SELECTION',                name: 'SF Another Hole in the Head',           sub: 'Genre Film Festival', year: '2024', poster: '/award/cert-sfhole.jpg',     url: 'https://holehead2024.eventive.org/films/671997f6f12b3b004193fb7e' },
];

const LAUREL_SVG = (
  <svg viewBox="0 0 100 50" width="92" height="46">
    <g fill="none" stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round">
      <path d="M 32 38 C 16 38, 10 22, 18 6"/>
      <path d="M 68 38 C 84 38, 90 22, 82 6"/>
      <line x1="13" y1="30" x2="20" y2="28" strokeWidth="2.4"/>
      <line x1="11" y1="22" x2="18" y2="20" strokeWidth="2.4"/>
      <line x1="14" y1="14" x2="20" y2="13" strokeWidth="2.4"/>
      <line x1="87" y1="30" x2="80" y2="28" strokeWidth="2.4"/>
      <line x1="89" y1="22" x2="82" y2="20" strokeWidth="2.4"/>
      <line x1="86" y1="14" x2="80" y2="13" strokeWidth="2.4"/>
    </g>
  </svg>
);

const STAGE_SVG = (
  <svg viewBox="0 0 60 50" width="56" height="46">
    <g stroke="#0a0a0a" strokeWidth="1" fill="none">
      <rect x="8" y="8" width="44" height="32" strokeLinejoin="round"/>
      <line x1="8" y1="14" x2="52" y2="14"/>
      <circle cx="12" cy="11" r="0.8" fill="#0a0a0a" stroke="none"/>
      <circle cx="16" cy="11" r="0.8" fill="#0a0a0a" stroke="none"/>
    </g>
    <text x="30" y="32" textAnchor="middle" fontFamily="Times New Roman, serif" fontSize="11" fontStyle="italic" fill="#0a0a0a">stage</text>
  </svg>
);

function Deco({ award }: { award: Award }) {
  switch (award.deco) {
    case 'laurel':   return LAUREL_SVG;
    case 'stage':    return STAGE_SVG;
    case 'quote':    return <div className="aw-quote">&ldquo;</div>;
    case 'star':     return <div className="aw-star">★</div>;
    case 'number':   return <div className="aw-num">{award.decoValue}<sup>{award.decoSup}</sup></div>;
    case 'currency': return <div className="aw-currency">{award.decoValue}</div>;
    default:         return null;
  }
}

const LATEST_ZOOM = {
  cert: { src: '/award/cert-ippa.jpg', alt: 'iPhone Photography Awards 2026 certificate, Honorable Mention' },
} as const;

const BASE_SPEED = 1.1;
const MAX_FLING  = 60;     // px per frame
const FLING_DECAY = 0.95;  // per frame, after a drag/swipe is released

// Release velocity (px per frame) from the last ~100ms of pointer samples; positive = strip moves left
function flingVelocity(samples: { x: number; t: number }[]) {
  const last = samples[samples.length - 1];
  if (!last || performance.now() - last.t > 80) return 0;   // finger/mouse rested before letting go
  const first = samples.find(p => last.t - p.t <= 100) ?? last;
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  const v = -((last.x - first.x) / dt) * 16.7;
  return Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
}

// Card heights per size (keep in sync with .aw-size-* in globals.css)
const CARD_H = { S: 240, M: 290, L: 320 } as const;

export default function AwardPage() {
  const stripRef           = useRef<HTMLDivElement>(null);
  const trackRef           = useRef<HTMLDivElement>(null);
  const offsetRef          = useRef(0);
  const wheelVelRef        = useRef(0);   // fling velocity left over from a drag/swipe
  const wheelPendingRef    = useRef(0);   // wheel/trackpad distance still to glide through
  const holdRef            = useRef(false);   // finger or mouse button down on the strip → auto-scroll waits
  const mouseDownOffsetRef = useRef(0);
  const draggedRef         = useRef(false);   // a swipe/drag just happened → the next click is not a flip
  const flippedAnyRef      = useRef(false);   // any card showing its back → strip holds still
  const rafRef             = useRef<number>(0);
  const progressDotRef     = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => new Array(awards.length).fill(false));
  // Natural width/height of each certificate, so a flipped card can match its shape
  const [zoom, setZoom]       = useState<keyof typeof LATEST_ZOOM | null>(null);
  const [ratios, setRatios]   = useState<(number | null)[]>(() => new Array(awards.length).fill(null));

  const onPosterLoad = useCallback((idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setRatios(prev => {
      if (prev[idx] === ratio) return prev;
      const next = [...prev];
      next[idx] = ratio;
      return next;
    });
  }, []);

  useEffect(() => {
    document.body.classList.add('film-page');
    return () => document.body.classList.remove('film-page');
  }, []);

  // Esc closes the lightbox
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  // RAF scroll loop
  useEffect(() => {
    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          wheelVelRef.current *= FLING_DECAY;
          if (Math.abs(wheelVelRef.current) < 0.05) wheelVelRef.current = 0;
          // Wheel glides: take a share of what's left each frame, so steps feel smooth but still immediate
          const wheelStep = wheelPendingRef.current * 0.3;
          wheelPendingRef.current -= wheelStep;
          const autoSpeed = holdRef.current || flippedAnyRef.current ? 0 : BASE_SPEED;
          offsetRef.current += autoSpeed + wheelVelRef.current + wheelStep;
          offsetRef.current = ((offsetRef.current % half) + half) % half;
          track.style.transform = `translateX(-${offsetRef.current}px)`;
          if (progressDotRef.current) {
            progressDotRef.current.style.left = `${(offsetRef.current / half) * 100}%`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Wheel / trackpad: horizontal two-finger swipes and vertical wheel both move the strip, 1:1 in distance
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const px = e.deltaMode === 1 ? d * 16 : e.deltaMode === 2 ? d * window.innerWidth : d;
    wheelVelRef.current = 0;
    wheelPendingRef.current = Math.max(-2000, Math.min(2000, wheelPendingRef.current + px));
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  // Touch: swipe the strip sideways; finger down pauses it, release flings with a little inertia,
  // then auto-scroll carries on.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let x0 = 0, lastX = 0;
    let samples: { x: number; t: number }[] = [];
    const onStart = (e: TouchEvent) => {
      x0 = lastX = e.touches[0].clientX;
      samples = [{ x: x0, t: performance.now() }];
      draggedRef.current = false;
      holdRef.current = true;
      wheelVelRef.current = 0;
      wheelPendingRef.current = 0;
    };
    const onMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      if (Math.abs(x - x0) > 6) draggedRef.current = true;
      offsetRef.current -= x - lastX;
      lastX = x;
      samples.push({ x, t: performance.now() });
      if (samples.length > 20) samples.shift();
    };
    const onEnd = () => {
      holdRef.current = false;
      if (draggedRef.current) wheelVelRef.current = flingVelocity(samples);
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchcancel', onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, []);

  // Mouse: click-and-drag the strip like a touch swipe, with the same fling on release
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let x0 = 0, lastX = 0, down = false;
    let samples: { x: number; t: number }[] = [];
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();   // no text selection / native image drag
      down = true;
      x0 = lastX = e.clientX;
      samples = [{ x: x0, t: performance.now() }];
      draggedRef.current = false;
      holdRef.current = true;
      wheelVelRef.current = 0;
      wheelPendingRef.current = 0;
    };
    const onMove = (e: MouseEvent) => {
      if (!down) return;
      if (Math.abs(e.clientX - x0) > 6 && !draggedRef.current) {
        draggedRef.current = true;
        el.classList.add('is-dragging');
      }
      offsetRef.current -= e.clientX - lastX;
      lastX = e.clientX;
      samples.push({ x: e.clientX, t: performance.now() });
      if (samples.length > 20) samples.shift();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      holdRef.current = false;
      el.classList.remove('is-dragging');
      if (draggedRef.current) wheelVelRef.current = flingVelocity(samples);
    };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const anyFlipped = flipped.some(Boolean);
  useEffect(() => { flippedAnyRef.current = anyFlipped; }, [anyFlipped]);

  const handleCardClick = useCallback((idx: number) => {
    if (draggedRef.current) { draggedRef.current = false; return; }
    if (Math.abs(offsetRef.current - mouseDownOffsetRef.current) > 5) return;
    setFlipped(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }, []);


  const renderCard = (a: Award, idx: number, key: string) => {
    const ratio = ratios[idx];
    // When flipped, the card takes the certificate's proportions so the back has no empty margins
    const flippedWidth = flipped[idx] && ratio
      ? Math.round(CARD_H[a.size] * ratio)
      : undefined;
    return (
    <div
      key={key}
      className={`aw-card aw-size-${a.size}${flipped[idx] ? ' is-flipped' : ''}`}
      style={flippedWidth ? { width: flippedWidth } : undefined}
      onMouseDown={() => { mouseDownOffsetRef.current = offsetRef.current; }}
      onClick={() => handleCardClick(idx)}
    >
      <div className="aw-card-inner">
        {/* Front */}
        <div className="aw-card-front">
          <div className="aw-deco"><Deco award={a} /></div>
          <div className="aw-label">{a.label}</div>
          <div className="aw-name">{a.name}</div>
          <div className="aw-sub">{a.sub}</div>
          <div className="aw-year">{a.year}</div>
        </div>
        {/* Back */}
        <div className="aw-card-back">
          {a.poster
            /* eslint-disable-next-line @next/next/no-img-element */
            ? <img src={a.poster} alt="" onLoad={(e) => onPosterLoad(idx, e.currentTarget)} ref={(el) => { if (el?.complete && el.naturalWidth) onPosterLoad(idx, el); }} />
            : null}
        </div>
      </div>
      {/* Gallery-style caption under the flipped card; outside the flip so it never covers the certificate */}
      {a.url && (
        <a
          className="aw-card-link"
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={flipped[idx] ? 0 : -1}
          onClick={(e) => { e.stopPropagation(); if (draggedRef.current) e.preventDefault(); }}
        >
          VIEW {a.label.startsWith('OFFICIAL SELECTION') ? 'SELECTION' : 'WINNERS'} {ARROW_NE}
        </a>
      )}
    </div>
    );
  };

  return (
    <div className={`aw-stage${anyFlipped ? ' is-paused' : ''}`}>
      <SiteNav active="award" />

      {/* Latest award: pinned above the strip so it never scrolls away */}
      <section className="aw-latest">
        <div className="aw-latest-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/award/ippa-shinjuku-gyoen.jpg" alt="Shinjuku Gyoen National Garden, shot on iPhone 17 Pro" />
        </div>
        <div className="aw-latest-text">
          <div className="aw-latest-kicker"><span className="aw-pulse" />LATEST AWARD</div>
          <div className="aw-latest-name">iPhone Photography Awards</div>
          <div className="aw-latest-sub">Honorable Mention · Other</div>
          <div className="aw-latest-work">&ldquo;Shinjuku Gyoen National Garden&rdquo; &mdash; shot on iPhone 17 Pro</div>
          <div className="aw-latest-meta">
            <span>2026</span>
            <a href="https://ippawards.com/functions/getWinnerSharePage?id=6a2d66cfca09f31c81fc667b" target="_blank" rel="noopener noreferrer">VIEW ON IPPA {ARROW_NE}</a>
            <button type="button" onClick={() => setZoom('cert')}>CERTIFICATE {ARROW_NE}</button>
          </div>
        </div>
      </section>

      {zoom && (
        <div className="aw-lightbox" role="dialog" aria-modal="true" aria-label={LATEST_ZOOM[zoom].alt} onClick={() => setZoom(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LATEST_ZOOM[zoom].src} alt={LATEST_ZOOM[zoom].alt} />
          <button type="button" className="aw-lightbox-close" aria-label="Close">CLOSE ✕</button>
        </div>
      )}

      <div ref={stripRef} className="aw-strip">
        <div ref={trackRef} className="aw-track">
          {awards.map((a, i) => renderCard(a, i, `a-${i}`))}
          {awards.map((a, i) => renderCard(a, i, `b-${i}`))}
        </div>
      </div>

      <div className="aw-progress-wrap">
        <div className="aw-progress">
          <div className="aw-progress-dot" ref={progressDotRef} />
        </div>
      </div>

      <div className="aw-foot">
        <div className="indicator">
          <span className="aw-pulse" />
          <span className="aw-playing">
            <span className="aw-hint-mouse">AUTO-SCROLLING · DRAG OR CLICK TO FLIP CARD</span>
            <span className="aw-hint-touch">SWIPE · TAP TO FLIP CARD</span>
          </span>
          <span className="aw-paused">
            <span className="aw-hint-mouse">PAUSED · CLICK CARD TO FLIP BACK</span>
            <span className="aw-hint-touch">PAUSED · TAP CARD TO FLIP BACK</span>
          </span>
        </div>
      </div>
    </div>
  );
}
