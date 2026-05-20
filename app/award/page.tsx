'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePageNavigate } from '@/app/components/PageTransition';

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
}

const awards: Award[] = [
  { size: 'L', deco: 'laurel',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Berlin Shorts Award',               sub: 'Drama · Heirloom',               year: '2024', poster: '/award/1.png'  },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Tokyo ShortFest',                   sub: 'Drama · Heirloom',               year: '2024', poster: '/award/2.jpg'  },
  { size: 'M', deco: 'star',    label: 'AWARD WINNER · BEST EDITING',      name: 'Chicago Filmmaker Awards',          sub: 'Drama · Heirloom',               year: '2024', poster: '/award/3.jpg'  },
  { size: 'L', deco: 'laurel',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'SF Arthouse Short Film Festival',   sub: 'Drama · Heirloom',               year: '2024', poster: '/award/4.jpg'  },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Austin Intl Art Festival',          sub: 'Drama · Heirloom',               year: '2024', poster: '/award/5.jpg'  },
  { size: 'M', deco: 'laurel',  label: 'OFFICIAL SELECTION',               name: 'Kyoto Intl Student Film Festival',  sub: '27th edition · Heirloom',        year: '2025', poster: '/award/6.jpg'  },
  { size: 'L', deco: 'laurel',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Madrid Arthouse Film Festival',     sub: 'Drama · Heirloom',               year: '2024', poster: '/award/7.jpg'  },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Atlanta Movie Awards',              sub: 'Drama · Heirloom',               year: '2024', poster: '/award/8.png'  },
  { size: 'M', deco: 'quote',   label: 'HONORABLE MENTION',                name: 'Los Angeles Short Film Awards',     sub: 'Best LGBTQ Film · Heirloom',     year: '2024', poster: '/award/9.png'  },
  { size: 'L', deco: 'laurel',  label: 'AWARD WINNER · BEST LGBTQ SHORT',  name: 'Phoenix Shorts',                    sub: 'Drama · Heirloom',               year: '2024', poster: '/award/10.jpg' },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Brooklyn Intl Short Awards',        sub: 'Drama · Heirloom',               year: '2024', poster: '/award/11.png' },
  { size: 'M', deco: 'stage',   label: 'OFFICIAL SELECTION',               name: 'San Antonio QFest',                 sub: 'LGBT Film Festival · Heirloom',  year: '2024', poster: '/award/12.png' },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Hong Kong Indie Film Festival',     sub: 'Drama · Heirloom',               year: '2024', poster: '/award/13.png' },
  { size: 'M', deco: 'quote',   label: 'HONORABLE MENTION',                name: 'New York Film & Actor Awards',      sub: 'Best LGBTQ Film · Heirloom',     year: '2024', poster: '/award/14.jpg' },
  { size: 'S', deco: 'laurel',  label: 'SEMI-FINALIST',                    name: 'Paris Intl Short Festival',         sub: 'Drama · Heirloom',               year: '2024' },
  { size: 'M', deco: 'stage',   label: 'OFFICIAL SELECTION',               name: 'SF Another Hole in the Head',       sub: 'Genre Film Festival · Heirloom', year: '2024' },
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

export default function AwardPage() {
  const navigate    = usePageNavigate();
  const stripRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);
  const wheelVelRef = useRef(0);
  const hoveredRef  = useRef(false);
  const mouseDownOffsetRef = useRef(0);
  const rafRef      = useRef<number>(0);
  const [paused, setPaused]   = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>(() => new Array(awards.length).fill(false));

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

  const handleCardClick = useCallback((idx: number) => {
    // Ignore if the ticker moved significantly (wheel scroll drag)
    if (Math.abs(offsetRef.current - mouseDownOffsetRef.current) > 5) return;
    setFlipped(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const renderCard = (a: Award, idx: number, key: string) => (
    <div
      key={key}
      className={`aw-card aw-size-${a.size}${flipped[idx] ? ' is-flipped' : ''}`}
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
            ? <img src={a.poster} alt="" />
            : null}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`aw-stage${paused ? ' is-paused' : ''}`}>
      <header className="aw-header">
        <a className="aw-header-left" href="/"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          SNOW<sup>®</sup>{' AWARD'}
        </a>
        <a className="aw-header-right" href="/contact"
          onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
          CONTACT ↗
        </a>
      </header>

      <div
        ref={stripRef}
        className="aw-strip"
        onMouseEnter={() => { hoveredRef.current = true;  setPaused(true); }}
        onMouseLeave={() => { hoveredRef.current = false; setPaused(false); }}
      >
        <div ref={trackRef} className="aw-track">
          {awards.map((a, i) => renderCard(a, i, `a-${i}`))}
          {awards.map((a, i) => renderCard(a, i, `b-${i}`))}
        </div>
      </div>

      <div className="aw-foot">
        <div className="indicator">
          <span className="aw-pulse" />
          <span className="aw-playing">AUTO-SCROLLING · SCROLL OR CLICK TO FLIP</span>
          <span className="aw-paused">PAUSED · CLICK TO FLIP</span>
        </div>
        <div>{pad(awards.length)} RECORDS</div>
      </div>
    </div>
  );
}
