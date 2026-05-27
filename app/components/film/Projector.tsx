'use client';

import { Film } from '@/app/data/films';
import { useState, useRef } from 'react';


// Wider beam: height determines left spread; right aperture stays fixed at ~64px via calc()
function getBeamHeight(film: Film): string {
  const [w, h] = film.aspectRatio.split('/').map(Number);
  const ratio = film.axis === 'height' ? 1 : h / w;
  const vw = (34 * ratio * 3.8).toFixed(1);
  return `clamp(200px, ${vw}vw, 94vh)`;
}

const LENS_RIGHT = 'clamp(200px, 32vw, 430px)';
// Fixed-pixel lens aperture: right side of beam cone stays ~64px regardless of container height
const R_TOP = 'calc(50% - 32px)';
const R_BOT = 'calc(50% + 32px)';

const MOTES = [
  { x:  6, y: 18, s: 1.8, dur: 5.2, delay:  0.0, anim: 'a' },
  { x: 12, y: 70, s: 1.3, dur: 4.1, delay: -1.8, anim: 'b' },
  { x: 18, y: 42, s: 2.0, dur: 6.3, delay: -3.5, anim: 'c' },
  { x: 22, y: 25, s: 1.4, dur: 4.8, delay: -0.7, anim: 'd' },
  { x: 28, y: 63, s: 1.6, dur: 5.5, delay: -2.3, anim: 'a' },
  { x: 35, y: 14, s: 1.1, dur: 7.0, delay: -4.1, anim: 'b' },
  { x: 32, y: 82, s: 1.9, dur: 4.4, delay: -1.2, anim: 'c' },
  { x: 42, y: 50, s: 1.3, dur: 5.9, delay: -3.0, anim: 'd' },
  { x: 48, y: 33, s: 1.7, dur: 6.6, delay: -0.5, anim: 'a' },
  { x: 20, y: 78, s: 1.0, dur: 4.7, delay: -2.8, anim: 'b' },
  { x:  9, y: 56, s: 1.5, dur: 5.3, delay: -1.5, anim: 'c' },
  { x: 38, y: 60, s: 1.2, dur: 6.1, delay: -3.9, anim: 'd' },
];

function BeamLayer({
  blur, color, solidFrom, clipTop, clipBottom, dur, delay = '0s',
}: {
  blur: number; color: string; solidFrom: number;
  clipTop: number; clipBottom: number; dur: string; delay?: string;
}) {
  const pct = ((1 - solidFrom) * 100).toFixed(0);
  return (
    <div style={{ position: 'absolute', inset: 0, filter: `blur(${blur}px)`, animation: `beam-flicker ${dur} ease-in-out infinite ${delay}` }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 0%, ${color} ${pct}%, ${color} 100%)`, clipPath: `polygon(0% ${clipTop}%, 0% ${clipBottom}%, 100% ${R_BOT}, 100% ${R_TOP})` }} />
    </div>
  );
}

export default function Projector({ film }: { film: Film }) {
  const bh = getBeamHeight(film);
  const [hovered, setHovered] = useState(false);
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const fadeRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="beam-grain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4"
              seed="7" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
            <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* BEAM — outer positions, inner sways from lens */}
      <div style={{ position: 'fixed', right: LENS_RIGHT, top: '50%', transform: 'translateY(-50%)', width: '64vw', height: bh, pointerEvents: 'none', zIndex: 6, overflow: 'visible', transition: 'height 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
        {/* sway + breathe wrapper — rotates from the right (lens) edge */}
        <div style={{ position: 'absolute', inset: 0, transformOrigin: 'right center', animation: 'beam-sway 11s ease-in-out infinite, beam-breathe 3.8s ease-in-out infinite' }}>
          <BeamLayer blur={28} color="rgba(130,130,140,0.15)"  solidFrom={0}   clipTop={0}  clipBottom={100} dur="4.8s" delay="0.3s" />
          <BeamLayer blur={14} color="rgba(115,115,128,0.22)"  solidFrom={0}   clipTop={3}  clipBottom={97}  dur="3.2s" />
          <BeamLayer blur={6}  color="rgba(100,100,115,0.28)"  solidFrom={0}   clipTop={18} clipBottom={82}  dur="2.6s" delay="0.7s" />
          <BeamLayer blur={2}  color="rgba(88,88,102,0.34)"    solidFrom={0.4} clipTop={30} clipBottom={70}  dur="2.0s" delay="1.1s" />
          {/* grain */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 0%, rgba(120,120,135,0.16) 35%, rgba(100,100,118,0.24) 100%)`, clipPath: `polygon(0% 0%, 0% 100%, 100% ${R_BOT}, 100% ${R_TOP})`, filter: 'url(#beam-grain)', opacity: 0.7 }} />
          {/* dust motes — clipped to beam cone */}
          <div style={{ position: 'absolute', inset: 0, clipPath: `polygon(0% 0%, 0% 100%, 100% ${R_BOT}, 100% ${R_TOP})`, pointerEvents: 'none' }}>
            {MOTES.map((m, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${m.x}%`,
                top: `${m.y}%`,
                width: m.s,
                height: m.s,
                borderRadius: '50%',
                background: 'rgba(100,100,110,0.5)',
                animation: `beam-mote-${m.anim} ${m.dur}s ${m.delay}s linear infinite`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTOR */}
      <div
        onMouseEnter={() => {
          setHovered(true);
          const a = audioRef.current;
          if (!a) return;
          if (fadeRef.current) clearInterval(fadeRef.current);
          a.currentTime = 0;
          a.volume = 0;
          a.loop = true;
          a.play().catch(() => {});
          let v = 0;
          fadeRef.current = setInterval(() => {
            v = Math.min(v + 0.06, 0.6);
            a.volume = v;
            if (v >= 0.6 && fadeRef.current) clearInterval(fadeRef.current);
          }, 40);
        }}
        onMouseLeave={() => {
          setHovered(false);
          const a = audioRef.current;
          if (!a) return;
          if (fadeRef.current) clearInterval(fadeRef.current);
          let v = a.volume;
          fadeRef.current = setInterval(() => {
            v = Math.max(v - 0.08, 0);
            a.volume = v;
            if (v <= 0 && fadeRef.current) {
              clearInterval(fadeRef.current);
              a.pause();
            }
          }, 30);
        }}
        style={{
          position: 'fixed', right: 'clamp(60px, 17vw, 220px)', top: '50%',
          transform: 'translateY(calc(-50% + 60px))',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '18px', width: 'clamp(140px, 15vw, 210px)',
          pointerEvents: 'auto', overflow: 'visible',
          filter: hovered
            ? 'drop-shadow(0 0 10px rgba(255,190,60,0.9)) drop-shadow(0 0 32px rgba(255,140,20,0.45))'
            : 'none',
          transition: 'filter 350ms ease',
          cursor: 'default',
        }}
      >
        {/*
          Redesigned SVG — viewBox 0 0 280 390.
          Fixes: body details redistributed evenly (3 balanced elements);
          bullseye moved to center-body; no crowded right corner; slimmer tripod.
        */}
        <svg viewBox="90 0 170 250" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>

          <g transform="translate(170, 40)">
            <circle r={18} fill="#0a0a0a"/>
            <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'reel-cw 6s linear infinite' }}>
              <circle r={1}   fill="#ffffff"/>
              <circle cy={-10} r={5} fill="#ffffff"/>
              <circle cx={10}  r={5} fill="#ffffff"/>
              <circle cy={10}  r={5} fill="#ffffff"/>
              <circle cx={-10} r={5} fill="#ffffff"/>
            </g>
          </g>

          <g transform="translate(220, 40)">
            <circle r={18} fill="#0a0a0a"/>
            <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'reel-ccw 6s linear infinite' }}>
              <circle r={1}   fill="#ffffff"/>
              <circle cy={-10} r={5} fill="#ffffff"/>
              <circle cx={10}  r={5} fill="#ffffff"/>
              <circle cy={10}  r={5} fill="#ffffff"/>
              <circle cx={-10} r={5} fill="#ffffff"/>
            </g>
          </g>

          <path d="M 152,58 L 238,58 L 222,78 L 188,78 Z" fill="#0a0a0a"/>

          <rect x={120} y={78} width={140} height={58} rx={4} fill="#0a0a0a"/>

          <path d="M 120,94 L 90,80 L 90,134 L 120,120 Z" fill="#0a0a0a"/>

          <rect x={138} y={92} width={32} height={24} rx={1.5} fill="#ffffff"/>
          <rect x={142} y={96} width={24} height={16} fill="#0a0a0a"/>
          <circle cx={164} cy={110} r={1.6} fill="#ffffff"/>

          <circle cx={215} cy={107} r={11}  fill="#ffffff"/>
          <circle cx={215} cy={107} r={7}   fill="#0a0a0a"/>
          <circle cx={215} cy={107} r={4}   fill="#ffffff"/>
          <circle cx={215} cy={107} r={1.5} fill="#0a0a0a"/>

          <rect x={250} y={100} width={8} height={14} rx={1} fill="#ffffff"/>

          <rect x={124} y={127} width={132} height={1.5} fill="#ffffff"/>
          <rect x={124} y={131} width={132} height={1.5} fill="#ffffff"/>

          <rect x={180} y={136} width={20} height={8} rx={1} fill="#0a0a0a"/>

          <line x1={200} y1={142} x2={232} y2={160} stroke="#0a0a0a" strokeWidth={3} strokeLinecap="round"/>
          <circle cx={232} cy={160} r={2.5} fill="#0a0a0a"/>

          <line x1={190} y1={145} x2={142} y2={225} stroke="#0a0a0a" strokeWidth={3.5} strokeLinecap="round"/>
          <line x1={190} y1={145} x2={190} y2={225} stroke="#0a0a0a" strokeWidth={3.5} strokeLinecap="round"/>
          <line x1={190} y1={145} x2={238} y2={225} stroke="#0a0a0a" strokeWidth={3.5} strokeLinecap="round"/>

          <line x1={167} y1={193} x2={190} y2={188} stroke="#0a0a0a" strokeWidth={2} strokeLinecap="round"/>
          <line x1={190} y1={188} x2={213} y2={193} stroke="#0a0a0a" strokeWidth={2} strokeLinecap="round"/>

          <line x1={135} y1={226} x2={149} y2={226} stroke="#0a0a0a" strokeWidth={3} strokeLinecap="round"/>
          <line x1={183} y1={226} x2={197} y2={226} stroke="#0a0a0a" strokeWidth={3} strokeLinecap="round"/>
          <line x1={231} y1={226} x2={245} y2={226} stroke="#0a0a0a" strokeWidth={3} strokeLinecap="round"/>

          <ellipse cx={190} cy={232} rx={70} ry={3} fill="#0a0a0a" opacity={0.08}/>
        </svg>

        {/* Mono caption */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)', fontSize: 'clamp(9px, 0.85vw, 11px)', letterSpacing: '0.1em', color: '#0a0a0a', lineHeight: 1.65, overflow: 'visible' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{film.format.toUpperCase()}</span>
          {film.timecode && <span>{film.timecode}</span>}
          <span style={{ whiteSpace: 'nowrap' }}>{film.roles}</span>
        </div>
      </div>

      <audio ref={audioRef} src="/film/projector.wav" preload="none" style={{ display: 'none' }} />
    </>
  );
}
