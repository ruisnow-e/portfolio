'use client';

import { useEffect, useRef, useState } from 'react';
import WorkNav from '@/app/components/WorkNav';
import ScrollHintDance from '@/app/components/dance/ScrollHintDance';

// ── Data ──────────────────────────────────────────────────────────────────────
// previewUrl: 10s AAC clip of the chorus (cut from the video at chorusStart, fades baked in),
// so the vinyl preview doesn't have to open the multi-hundred-MB video file.

const works = [
  { title: 'ESCAPISM',          music: 'RAYE FEAT. 070 SHAKE',        color: '#4e4578', posterUrl: '/dance/escapism.png',       videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/escapism.mp4',      px: 0, py: 0, chorusStart: 40, previewUrl: '/dance/preview/escapism.m4a' },
  { title: 'FUXK UP THE WORLD', music: 'LISA FEAT. FUTURE',           color: '#9e2e42', posterUrl: '/dance/fuxkuptheworld.jpg', videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/fuxkuptheworld.mp4', px: 0, py: 0, chorusStart: 54, previewUrl: '/dance/preview/fuxkuptheworld.m4a' },
  { title: 'THE WAY I ARE',     music: 'TIMBALAND FEAT. KERI HILSON', color: '#8a5e28', posterUrl: '/dance/wayiare.png',        videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/wayiare.mov',        px: 0, py: 0, chorusStart:  0, previewUrl: '/dance/preview/wayiare.m4a' },
  { title: 'NO LIE',            music: 'SEAN PAUL FEAT. DUA LIPA',    color: '#2a7580', posterUrl: '/dance/nolie.jpg',          videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/NoLie.MOV',          px: 0, py: 0, chorusStart:  0, previewUrl: '/dance/preview/nolie.m4a' },
  { title: 'WITH THE IE',       music: 'JENNIE',                      color: '#9e3e6e', posterUrl: '/dance/withtheie.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/withtheie.mov',      px: 0, py: 0, chorusStart: 11, previewUrl: '/dance/preview/withtheie.m4a' },
  { title: 'TELEPHONE',         music: 'LADY GAGA FEAT. BEYONCÉ',     color: '#a8862c', posterUrl: '/dance/telephone.jpg',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/Telephone.mov',      px: 0, py: 0, chorusStart:  2, previewUrl: '/dance/preview/telephone.m4a' },
  { title: 'APT',               music: 'ROSÉ & BRUNO MARS',           color: '#b83858', posterUrl: '/dance/apt.png',            videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/apt.mov',            px: 0, py: 0, chorusStart: 16, previewUrl: '/dance/preview/apt.m4a' },
  { title: 'SPORTS CAR',        music: 'TATE McRAE',                  color: '#9e3838', posterUrl: '/dance/sportscar.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/sportscar.mov',      px: 0, py: 0, chorusStart:  0, previewUrl: '/dance/preview/sportscar.m4a' },
  { title: 'NO ONE ELSE',       music: 'NOVAX & SEVVEN',              color: '#56588a', posterUrl: '/dance/nooneelse.jpg',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/NoOneElse.MOV',      px: 0, py: 0, chorusStart: 16, previewUrl: '/dance/preview/nooneelse.m4a' },
  { title: 'PARTY 4 U',         music: 'CHARLI XCX',                  color: '#344eb0', posterUrl: '/dance/party4u.png',        videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/party4u.mov',        px: 0, py: 0, chorusStart:  0, previewUrl: '/dance/preview/party4u.m4a' },
  { title: 'LV BAG',            music: 'DON TOLIVER FEAT. J-HOPE',    color: '#245e48', posterUrl: '/dance/lvbag.png',          videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/lvbag.mov',          px: 0, py: 0, chorusStart:  3, previewUrl: '/dance/preview/lvbag.m4a' },
  { title: 'TIT FOR TAT',       music: 'TATE McRAE',                  color: '#9e5228', posterUrl: '/dance/titfortat.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/titfortat.mov',      px: 0, py: 0, chorusStart: 13, previewUrl: '/dance/preview/titfortat.m4a' },
];

const N          = works.length;
const SECTION    = 160;
const ITEM_H     = 52;
const ANCHOR     = 155;
const LOOP       = 560;
const SPEED      = 0.25;                  // mouse/trackpad: 640px of scroll per track
const TOUCH_STEP = 110;                   // touch: a short swipe (110px) moves one track
const ONE_CYCLE  = N * SECTION / SPEED;   // px for one full visual loop (5760)
const PAGE_H     = Math.round(ONE_CYCLE * 5); // total page height with buffer on both sides

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r)      h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function lerpHsl(a: string, b: string, t: number): string {
  const A = hexToHsl(a), B = hexToHsl(b);
  let dh = B[0] - A[0];
  if (dh >  180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = (A[0] + dh * t + 360) % 360;
  const s = A[1] + (B[1] - A[1]) * t;
  const l = A[2] + (B[2] - A[2]) * t;
  return `hsl(${h.toFixed(1)},${s.toFixed(1)}%,${l.toFixed(1)}%)`;
}

const p2 = (n: number) => (n < 10 ? '0' + n : '' + n);

// ── Figure positions in troupe ────────────────────────────────────────────────

const OFFSETS = [
  { left: 35, top:   0 },
  { left: 25, top:  80 },
  { left: 35, top: 160 },
  { left: 28, top: 240 },
  { left: 35, top: 320 },
  { left: 25, top: 400 },
  { left: 33, top: 480 },
];

// Shared SMIL props
const ease = {
  keyTimes:    '0;0.5;1',
  calcMode:    'spline' as const,
  keySplines:  '0.42 0 0.58 1;0.42 0 0.58 1',
  repeatCount: 'indefinite' as const,
};

// ── Figure SVGs ───────────────────────────────────────────────────────────────

function FigureSVG({ fig, left, top }: { fig: number; left: number; top: number }) {
  const s: React.CSSProperties = { position: 'absolute', left, top };

  if (fig === 0) return (
    // 01 HIGH KICK — cyan
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <line x1="30" y1="23" x2="30" y2="50" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#0a0a0a"/>
      <line x1="30" y1="50" x2="26" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <line x1="30" y1="50" x2="40" y2="2" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-6 30 50;6 30 50;-6 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="54" y2="30" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="4 30 28;-4 30 28;4 30 28" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="30" x2="8" y2="40" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-4 30 30;4 30 30;-4 30 30" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  if (fig === 1) return (
    // 02 DISCO — magenta
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <g>
        <line x1="32" y1="23" x2="28" y2="50" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="30" cy="14" r="6" fill="#0a0a0a"/>
        <path d="M 28,30 L 14,42 L 28,52" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="28" y1="50" x2="34" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="28" y1="50" x2="18" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <g>
          <line x1="32" y1="26" x2="56" y2="2" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="rotate" values="-10 32 26;10 32 26;-10 32 26" {...ease} dur="0.55s"/>
        </g>
        <animateTransform attributeName="transform" type="rotate" values="-2 26 80;2 26 80;-2 26 80" {...ease} dur="0.55s"/>
      </g>
    </svg>
  );

  if (fig === 2) return (
    // 03 VOGUE — yellow
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <line x1="30" y1="23" x2="30" y2="50" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#0a0a0a"/>
      <line x1="30" y1="50" x2="20" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <line x1="30" y1="50" x2="40" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <path d="M 30,26 L 8,22 L 16,6" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="-8 30 26;8 30 26;-8 30 26" {...ease} dur="0.6s"/>
      </g>
      <g>
        <path d="M 30,26 L 52,22 L 44,6" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="8 30 26;-8 30 26;8 30 26" {...ease} dur="0.6s"/>
      </g>
    </svg>
  );

  if (fig === 3) return (
    // 04 LUNGE — lavender
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <g>
        <line x1="26" y1="24" x2="40" y2="46" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <path d="M 40,46 L 52,60 L 56,80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="40" y1="46" x2="16" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="24" cy="16" r="6" fill="#0a0a0a"/>
        <g>
          <line x1="28" y1="28" x2="4" y2="38" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="rotate" values="6 28 28;-6 28 28;6 28 28" {...ease} dur="0.65s"/>
        </g>
        <g>
          <line x1="32" y1="30" x2="56" y2="18" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="rotate" values="-6 32 30;6 32 30;-6 32 30" {...ease} dur="0.65s"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 3;0 0" {...ease} dur="0.65s"/>
      </g>
    </svg>
  );

  if (fig === 4) return (
    // 05 SPLITS — brick red
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <g>
        <line x1="30" y1="17" x2="30" y2="40" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="30" cy="8" r="6" fill="#0a0a0a"/>
        <line x1="30" y1="22" x2="4"  y2="18" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="22" x2="56" y2="18" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="40" x2="4"  y2="52" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="40" x2="56" y2="52" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  if (fig === 5) return (
    // 06 RUNNING MAN — mint
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <line x1="30" y1="23" x2="30" y2="50" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#0a0a0a"/>
      <g>
        <line x1="30" y1="50" x2="26" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="3 30 50;-3 30 50;3 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <path d="M 30,50 L 46,38 L 42,58" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="-14 30 50;10 30 50;-14 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="50" y2="32" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-18 30 28;18 30 28;-18 30 28" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="10" y2="22" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="18 30 28;-18 30 28;18 30 28" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  // 07 HIP POP — indigo
  return (
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <circle cx="22" cy="14" r="6" fill="#0a0a0a"/>
      <line x1="26" y1="24" x2="18" y2="4" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <path d="M 26,22 L 38,38 L 24,52" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="38" y1="38" x2="52" y2="40" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="24" y1="52" x2="18" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <line x1="24" y1="52" x2="30" y2="80" stroke="#0a0a0a" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-7 26 22;7 26 22;-7 26 22" {...ease} dur="0.6s"/>
      </g>
    </svg>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function DancePage() {
  const troupeRef   = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<SVGCircleElement>(null);
  const vinylRef    = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<SVGCircleElement>(null);
  const posterRef   = useRef<SVGImageElement>(null);
  const wRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdxRef  = useRef(0);
  const [modalVideo, setModalVideo]     = useState<string | null>(null);
  const [vinylGlow,  setVinylGlow]      = useState(false);
  const [playing,    setPlaying]        = useState(false);
  const audioRef      = useRef<HTMLAudioElement>(null);
  const audioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);


  // Phones/tablets: no hover, so the vinyl is tap-to-toggle
  const isTouch = () => window.matchMedia('(hover: none)').matches;

  // Fade in ~10s of the current track's chorus, then fade out
  const startPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    const w = works[activeIdxRef.current];
    const src = w?.previewUrl || '';
    if (audio.src !== (src ? new URL(src, window.location.href).href : '')) {
      audio.src = src;
    }
    audio.currentTime = 0;
    audio.volume = 0;
    audio.play().catch(() => {});
    // fade in over 600ms
    let v = 0;
    fadeTimerRef.current = setInterval(() => {
      v = Math.min(v + 0.07, 0.75);
      audio.volume = v;
      if (v >= 0.75 && fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    }, 40);
    // fade out and stop after 10s
    audioTimerRef.current = setTimeout(() => {
      let fv = audio.volume;
      fadeTimerRef.current = setInterval(() => {
        fv = Math.max(fv - 0.07, 0);
        audio.volume = fv;
        if (fv <= 0 && fadeTimerRef.current) {
          clearInterval(fadeTimerRef.current);
          audio.pause();
        }
      }, 40);
    }, 9400);
  };

  const stopPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    let fv = audio.volume;
    fadeTimerRef.current = setInterval(() => {
      fv = Math.max(fv - 0.1, 0);
      audio.volume = fv;
      if (fv <= 0 && fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        audio.pause();
      }
    }, 30);
  };

  const openVideo = (url: string) => {
    stopPreview();
    setVinylGlow(false);
    setModalVideo(url);
  };

  // Esc closes the video modal
  useEffect(() => {
    if (!modalVideo) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalVideo(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalVideo]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    history.scrollRestoration = 'manual';
    // A finger swipe covers far less distance than a few wheel clicks, so touch gets a shorter step
    const touch = window.matchMedia('(hover: none)').matches;
    const speed = touch ? SECTION / TOUCH_STEP : SPEED;
    const cycle = N * SECTION / speed;          // scroll px for one full loop of the list
    const STEP  = SECTION / speed;              // scroll px per track
    // Start near the middle of PAGE_H so there's room to scroll both ways
    const START = Math.floor(PAGE_H / 2 / cycle) * cycle;
    window.scrollTo(0, START);

    let phase = START * speed;
    let rafQ = false;
    let teleporting = false;

    const render = () => {
      rafQ = false;
      const norm = ((phase / SECTION) % N + N) % N;
      const idx  = Math.floor(norm);
      const t    = norm - idx;
      const bg   = lerpHsl(works[idx].color, works[(idx + 1) % N].color, t);

      activeIdxRef.current = idx;
      if (labelRef.current)   labelRef.current.setAttribute('fill', bg);
      if (vinylRef.current)   vinylRef.current.style.setProperty('--dn-glow', bg);
      if (ringRef.current)    ringRef.current.setAttribute('stroke', bg);
      if (posterRef.current) {
        posterRef.current.setAttribute('href', works[idx].posterUrl || '');
        posterRef.current.setAttribute('x', String(works[idx].px));
        posterRef.current.setAttribute('y', String(works[idx].py));
      }

      wRefs.current.forEach((el, i) => {
        if (!el) return;
        let rel = i - norm;
        while (rel < -N / 2) rel += N;
        while (rel >  N / 2) rel -= N;
        el.style.transform = `translateY(${ANCHOR - ITEM_H / 2 + rel * ITEM_H}px)`;
        el.style.opacity   = String(Math.max(0.22, 1 - Math.abs(rel) * 0.42));
        el.classList.toggle('is-active', i === idx);
      });

      if (troupeRef.current) {
        const fy = ((phase % LOOP) + LOOP) % LOOP;
        troupeRef.current.style.transform = `translateY(${fy - LOOP}px)`;
      }
    };

    let snapTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (teleporting) return;

      const sy = window.scrollY;

      // Silently teleport back toward the middle when near either edge, preserving visual position
      if (sy < cycle || sy > PAGE_H - window.innerHeight - cycle) {
        teleporting = true;
        const newSy = sy + Math.round((START - sy) / cycle) * cycle;
        window.scrollTo(0, newSy);
        phase = newSy * speed;
        setTimeout(() => { teleporting = false; }, 50);
        if (!rafQ) { rafQ = true; requestAnimationFrame(render); }
        return;
      }

      phase = sy * speed;
      if (!rafQ) { rafQ = true; requestAnimationFrame(render); }
      scheduleSnap();
    };

    // Snap to nearest section boundary after scrolling stops — but never while a finger is down
    let touching = false;
    const scheduleSnap = () => {
      if (snapTimer) clearTimeout(snapTimer);
      if (touching) return;
      snapTimer = setTimeout(() => {
        const targetScrollY = Math.round(window.scrollY / STEP) * STEP;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }, 200);
    };
    const onTouchStart = () => { touching = true; if (snapTimer) clearTimeout(snapTimer); };
    const onTouchEnd   = () => { touching = false; scheduleSnap(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    render();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, []);

  return (
    <>
    <div style={{ minHeight: PAGE_H, background: '#ffffff' }}>
      <WorkNav />
      <ScrollHintDance />

      <div
        className="dn-stage"
        style={{
          position: 'sticky', top: 0,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Main stage: three elements pinned to viewport thirds ── */}
        <div className="dn-main" style={{ position: 'relative', flex: 1, minHeight: 320 }}>

          {/* LEFT: work list — aligned with film page list position */}
          <div className="dn-list">
            {/* Music header */}
            <div style={{
              fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
              fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,0,0,0.45)',
              marginBottom: 10, textTransform: 'uppercase',
            }}>
              Music
            </div>
            {/* Scrolling list */}
            <div className="dn-list-window">
              <div className="dn-list-track">
              {works.map((w, i) => (
                <div
                  key={w.title}
                  ref={el => { wRefs.current[i] = el; }}
                  className="dn-item"
                  onClick={() => { if (w.videoUrl) openVideo(w.videoUrl); }}
                  style={{
                    position: 'absolute', left: 0, right: 0,
                    height: ITEM_H,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
                    color: '#0a0a0a',
                    whiteSpace: 'nowrap',
                    willChange: 'transform, opacity',
                    cursor: w.videoUrl ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.05em', flexShrink: 0 }}>
                      {p2(i + 1)}
                    </span>
                    <span className="dn-item-title" style={{ fontSize: 13, letterSpacing: '0.04em' }}>{w.title}</span>
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.06em', marginTop: 2, paddingLeft: 18 }}>
                    {w.music}
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* CENTER 50%: vinyl — center at 50vw */}
          <div
            onClick={() => {
              // Touch: tap toggles the glow + audio preview; the video opens from the song list instead
              if (isTouch()) {
                if (vinylGlow) stopPreview(); else startPreview();
                setVinylGlow(!vinylGlow);
                return;
              }
              const v = works[activeIdxRef.current]?.videoUrl;
              if (v) openVideo(v);
            }}
            onMouseEnter={() => { if (isTouch()) return; setVinylGlow(true); startPreview(); }}
            onMouseLeave={() => { if (isTouch()) return; setVinylGlow(false); stopPreview(); }}
            ref={vinylRef}
            className={`dn-vinyl${vinylGlow ? ' is-glow' : ''}`}
            style={{
              cursor: 'pointer',
            }}
          >
            <svg className="dn-vinyl-svg" viewBox="0 0 200 200" width={300} height={300} style={{ overflow: 'visible' }}>
              <g>
                <circle cx="100" cy="100" r="95" fill="#0a0a0a"/>
                <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
                <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
                <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
                <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
                <circle ref={labelRef} cx="100" cy="100" r="46" fill={works[0].color}/>
                <defs>
                  <clipPath id="posterClip">
                    <circle cx="100" cy="100" r="46"/>
                  </clipPath>
                  {/* r=98.5 arcs — just outside the vinyl edge (r=95) */}
                  <path id="vinyl-top-arc" d="M 1.5,100 A 98.5,98.5 0 0,1 198.5,100"/>
                  <path id="vinyl-bot-arc" d="M 1.5,100 A 98.5,98.5 0 0,0 198.5,100"/>
                </defs>
                <image
                  ref={posterRef}
                  href=""
                  x={works[0].px} y={works[0].py} width="200" height="200"
                  clipPath="url(#posterClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
                <circle ref={ringRef} cx="100" cy="100" r="48" fill="none" stroke={works[0].color} strokeWidth="3"/>
                <circle cx="100" cy="100" r="2" fill="#0a0a0a"/>

                {/* Engraved text — rotates with the record */}
                <text fontFamily="Inter, system-ui, sans-serif" fontSize={6.5} fontWeight="500" fill="#0a0a0a" fillOpacity={0.65} letterSpacing={1.2}>
                  <textPath href="#vinyl-top-arc" startOffset="50%" textAnchor="middle">
                    ALL CHOREOGRAPHY BY RUI SONG
                  </textPath>
                </text>

                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </g>
            </svg>
            {/* How to interact — the vinyl otherwise gives no hint that it plays / opens anything */}
            <div className="dn-vinyl-hint" aria-live="polite">
              {playing ? '♪ NOW PLAYING' : (
                <>
                  <span className="dn-hint-mouse">HOVER TO LISTEN · CLICK TO WATCH</span>
                  <span className="dn-hint-touch">TAP TO LISTEN · TAP A TITLE TO WATCH</span>
                </>
              )}
            </div>
          </div>

          {/* RIGHT 2/3: figure track — center at 66vw */}
          <div className="dn-troupe">
            <div
              ref={troupeRef}
              style={{
                position: 'absolute', left: 0, right: 0, top: 0,
                height: 1820,
                willChange: 'transform',
              }}
            >
              {[0, 1].flatMap(copy =>
                OFFSETS.map((o, fi) => (
                  <FigureSVG
                    key={`${copy}-${fi}`}
                    fig={fi}
                    left={o.left}
                    top={o.top + copy * LOOP}
                  />
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom disclaimer ── */}
      <div className="dn-disclaimer">
        All choreography © Rui Song. Music tracks are credited to their respective artists and are used solely to document the original choreographic work.
      </div>
    </div>

    {/* ── Hover audio ── */}
    <audio ref={audioRef} preload="auto" style={{ display: 'none' }} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />

    {/* ── Video modal ── */}
    {modalVideo && (
      <div
        onClick={() => setModalVideo(null)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <button
          className="dn-modal-close"
          aria-label="Close video"
          onClick={() => setModalVideo(null)}
        >
          ✕
        </button>
        <video
          className="dn-video"
          src={modalVideo}
          autoPlay
          controls
          onClick={e => e.stopPropagation()}
        />
      </div>
    )}
    </>
  );
}
