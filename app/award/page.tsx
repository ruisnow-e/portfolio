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
  { size: 'M', deco: 'star',  label: 'AWARD WINNER · BEST EDITING',       name: 'Chicago Filmmaker Awards',              sub: 'Drama',               year: '2024', poster: '/award/cert-chicago.jpg',    url: 'https://cifawards.net/2024/10/23/winners-october-2024/'            },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'San Francisco Arthouse Short Festival', sub: 'Drama',               year: '2024', poster: '/award/cert-sfarthouse.jpg', url: 'https://sanfranciscoindieshort.com/winners-july-2024/'             },
  { size: 'L', deco: 'star',  label: 'OFFICIAL SELECTION',                name: 'Kyoto Intl Student Film Festival',      sub: '27th edition',        year: '2025', poster: '/award/cert-kyoto.jpg',      url: 'https://www.consortium.or.jp/en/project/kisfvf/details/2024-2'    },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Madrid Arthouse Film Festival',         sub: 'Drama',               year: '2024', poster: '/award/cert-madrid.jpg',     url: 'https://maffestival.com/winners-october-2024/'                     },
  { size: 'M', deco: 'quote', label: 'HONORABLE MENTION',                 name: 'Los Angeles Short Film Awards',         sub: 'Best LGBTQ Film',     year: '2024', poster: '/award/cert-la.jpg'                                                                           },
  { size: 'L', deco: 'star',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Phoenix Shorts',                        sub: 'Drama',               year: '2024', poster: '/award/cert-phoenix.jpg',    url: 'https://phoenixshortfestival.com/winners-august-2024/'             },
  { size: 'L', deco: 'stage', label: 'OFFICIAL SELECTION',                name: 'San Antonio QFest',                     sub: 'LGBT Film Festival',  year: '2024', poster: '/award/cert-sanantonio.png'                                                                   },
  { size: 'M', deco: 'stage', label: 'OFFICIAL SELECTION',                name: 'SF Another Hole in the Head',           sub: 'Genre Film Festival', year: '2024', poster: '/award/cert-sfhole.png',     url: 'https://holehead2024.eventive.org/films/671997f6f12b3b004193fb7e' },
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

const BASE_SPEED = 1.1;

// Card heights per size (keep in sync with .aw-size-* in globals.css)
const CARD_H = { S: 240, M: 290, L: 320 } as const;
// Height of the OPEN ↗ bar under the certificate on the back face
const LINK_H = 20;

export default function AwardPage() {
  const stripRef           = useRef<HTMLDivElement>(null);
  const trackRef           = useRef<HTMLDivElement>(null);
  const offsetRef          = useRef(0);
  const wheelVelRef        = useRef(0);
  const hoveredRef         = useRef(false);
  const mouseDownOffsetRef = useRef(0);
  const touchDraggedRef    = useRef(false);   // a swipe just happened → the next click is not a flip
  const rafRef             = useRef<number>(0);
  const progressDotRef     = useRef<HTMLDivElement>(null);
  const [paused, setPaused]   = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>(() => new Array(awards.length).fill(false));
  // Natural width/height of each certificate, so a flipped card can match its shape
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

  // RAF scroll loop
  useEffect(() => {
    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          wheelVelRef.current *= 0.92;
          const autoSpeed = hoveredRef.current ? 0 : BASE_SPEED;
          offsetRef.current += autoSpeed + wheelVelRef.current;
          if (offsetRef.current >= half) offsetRef.current -= half;
          if (offsetRef.current < 0)     offsetRef.current += half;
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

  // Wheel with inertia
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const add = e.deltaY * 0.06;
    wheelVelRef.current = Math.max(-18, Math.min(18, wheelVelRef.current + add));
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  // Touch: swipe the strip sideways; finger down pauses it, release flings with a little inertia,
  // then auto-scroll carries on. (Phones never send mouseleave, so hover-pause is mouse-only.)
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let x0 = 0, lastX = 0, vel = 0;
    const onStart = (e: TouchEvent) => {
      x0 = lastX = e.touches[0].clientX; vel = 0;
      touchDraggedRef.current = false;
      hoveredRef.current = true;
      wheelVelRef.current = 0;
    };
    const onMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      if (Math.abs(x - x0) > 6) touchDraggedRef.current = true;
      const dx = x - lastX;
      offsetRef.current -= dx;
      vel = -dx;
      lastX = x;
    };
    const onEnd = () => {
      hoveredRef.current = false;
      if (touchDraggedRef.current) wheelVelRef.current = Math.max(-18, Math.min(18, vel));
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

  const isTouch = () => window.matchMedia('(hover: none)').matches;

  const handleCardClick = useCallback((idx: number) => {
    if (touchDraggedRef.current) { touchDraggedRef.current = false; return; }
    if (Math.abs(offsetRef.current - mouseDownOffsetRef.current) > 5) return;
    setFlipped(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }, []);


  const renderCard = (a: Award, idx: number, key: string) => {
    const ratio = ratios[idx];
    const hasBack = a.poster && a.url;
    // When flipped, the card takes the certificate's proportions so the back has no empty margins
    const flippedWidth = flipped[idx] && ratio
      ? Math.round((CARD_H[a.size] - (hasBack ? LINK_H : 0)) * ratio)
      : undefined;
    return (
    <div
      key={key}
      className={`aw-card aw-size-${a.size}${flipped[idx] ? ' is-flipped' : ''}`}
      style={flippedWidth ? { width: flippedWidth } : undefined}
      onMouseDown={() => { mouseDownOffsetRef.current = offsetRef.current; }}
      onClick={() => handleCardClick(idx)}
      onMouseEnter={() => { if (isTouch()) return; hoveredRef.current = true;  setPaused(true); }}
      onMouseLeave={() => { if (isTouch()) return; hoveredRef.current = false; setPaused(false); }}
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
          {a.url && (
            <a
              className="aw-card-link"
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              OPEN {ARROW_NE}
            </a>
          )}
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className={`aw-stage${paused ? ' is-paused' : ''}`}>
      <SiteNav active="award" />

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
            <span className="aw-hint-mouse">AUTO-SCROLLING · SCROLL OR CLICK TO FLIP CARD</span>
            <span className="aw-hint-touch">SWIPE · TAP TO FLIP CARD</span>
          </span>
          <span className="aw-paused">PAUSED · CLICK TO FLIP CARD</span>
        </div>
      </div>
    </div>
  );
}
