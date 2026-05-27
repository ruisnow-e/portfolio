'use client';

import { useEffect, useRef, useState } from 'react';
import TopBarDance from '@/app/components/dance/TopBarDance';
import BottomBarDance from '@/app/components/dance/BottomBarDance';

// ── Data ──────────────────────────────────────────────────────────────────────

const works = [
  { title: 'ESCAPISM',          music: 'RAYE FEAT. 070 SHAKE',        color: '#4e4578', posterUrl: '/dance/escapism.png',       videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/escapism.mp4',      px: 0, py: 0, chorusStart: 40 },
  { title: 'FUXK UP THE WORLD', music: 'LISA FEAT. FUTURE',           color: '#9e2e42', posterUrl: '/dance/fuxkuptheworld.jpg', videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/fuxkuptheworld.mp4', px: 0, py: 0, chorusStart: 54 },
  { title: 'THE WAY I ARE',     music: 'TIMBALAND FEAT. KERI HILSON', color: '#8a5e28', posterUrl: '/dance/wayiare.png',        videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/wayiare.mov',        px: 0, py: 0, chorusStart:  0 },
  { title: 'WITH THE IE',       music: 'JENNIE',                      color: '#9e3e6e', posterUrl: '/dance/withtheie.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/withtheie.mov',      px: 0, py: 0, chorusStart: 11 },
  { title: 'SPORTS CAR',        music: 'TATE McRAE',                  color: '#9e3838', posterUrl: '/dance/sportscar.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/sportscar.mov',      px: 0, py: 0, chorusStart:  0 },
  { title: 'APT',               music: 'ROSÉ & BRUNO MARS',           color: '#b83858', posterUrl: '/dance/apt.png',            videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/apt.mov',            px: 0, py: 0, chorusStart: 16 },
  { title: 'PARTY 4 U',         music: 'CHARLI XCX',                  color: '#344eb0', posterUrl: '/dance/party4u.png',        videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/party4u.mov',        px: 0, py: 0, chorusStart:  0 },
  { title: 'TIT FOR TAT',       music: 'TATE McRAE',                  color: '#9e5228', posterUrl: '/dance/titfortat.png',      videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/titfortat.mov',      px: 0, py: 0, chorusStart: 13 },
  { title: 'LV BAG',            music: 'DON TOLIVER FEAT. J-HOPE',    color: '#245e48', posterUrl: '/dance/lvbag.png',          videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/dance/lvbag.mov',          px: 0, py: 0, chorusStart:  3 },
];

const N          = 9;
const SECTION    = 160;
const ITEM_H     = 52;
const ANCHOR     = 155;
const LOOP       = 560;
const SPEED      = 0.25;
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
      <line x1="30" y1="23" x2="30" y2="50" stroke="#3da4d8" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#3da4d8"/>
      <line x1="30" y1="50" x2="26" y2="80" stroke="#3da4d8" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <line x1="30" y1="50" x2="40" y2="2" stroke="#3da4d8" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-6 30 50;6 30 50;-6 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="54" y2="30" stroke="#3da4d8" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="4 30 28;-4 30 28;4 30 28" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="30" x2="8" y2="40" stroke="#3da4d8" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-4 30 30;4 30 30;-4 30 30" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  if (fig === 1) return (
    // 02 DISCO — magenta
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <g>
        <line x1="32" y1="23" x2="28" y2="50" stroke="#e856a3" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="30" cy="14" r="6" fill="#e856a3"/>
        <path d="M 28,30 L 14,42 L 28,52" stroke="#e856a3" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="28" y1="50" x2="34" y2="80" stroke="#e856a3" strokeWidth={5} strokeLinecap="round"/>
        <line x1="28" y1="50" x2="18" y2="80" stroke="#e856a3" strokeWidth={5} strokeLinecap="round"/>
        <g>
          <line x1="32" y1="26" x2="56" y2="2" stroke="#e856a3" strokeWidth={5} strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="rotate" values="-10 32 26;10 32 26;-10 32 26" {...ease} dur="0.55s"/>
        </g>
        <animateTransform attributeName="transform" type="rotate" values="-2 26 80;2 26 80;-2 26 80" {...ease} dur="0.55s"/>
      </g>
    </svg>
  );

  if (fig === 2) return (
    // 03 VOGUE — yellow
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <line x1="30" y1="23" x2="30" y2="50" stroke="#f7c93b" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#f7c93b"/>
      <line x1="30" y1="50" x2="20" y2="80" stroke="#f7c93b" strokeWidth={5} strokeLinecap="round"/>
      <line x1="30" y1="50" x2="40" y2="80" stroke="#f7c93b" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <path d="M 30,26 L 8,22 L 16,6" stroke="#f7c93b" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="-8 30 26;8 30 26;-8 30 26" {...ease} dur="0.6s"/>
      </g>
      <g>
        <path d="M 30,26 L 52,22 L 44,6" stroke="#f7c93b" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="8 30 26;-8 30 26;8 30 26" {...ease} dur="0.6s"/>
      </g>
    </svg>
  );

  if (fig === 3) return (
    // 04 LUNGE — lavender
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <g>
        <line x1="26" y1="24" x2="40" y2="46" stroke="#b07cd0" strokeWidth={5} strokeLinecap="round"/>
        <path d="M 40,46 L 52,60 L 56,80" stroke="#b07cd0" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="40" y1="46" x2="16" y2="80" stroke="#b07cd0" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="24" cy="16" r="6" fill="#b07cd0"/>
        <g>
          <line x1="28" y1="28" x2="4" y2="38" stroke="#b07cd0" strokeWidth={5} strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="rotate" values="6 28 28;-6 28 28;6 28 28" {...ease} dur="0.65s"/>
        </g>
        <g>
          <line x1="32" y1="30" x2="56" y2="18" stroke="#b07cd0" strokeWidth={5} strokeLinecap="round"/>
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
        <line x1="30" y1="17" x2="30" y2="40" stroke="#d8443e" strokeWidth={5} strokeLinecap="round"/>
        <circle cx="30" cy="8" r="6" fill="#d8443e"/>
        <line x1="30" y1="22" x2="4"  y2="18" stroke="#d8443e" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="22" x2="56" y2="18" stroke="#d8443e" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="40" x2="4"  y2="52" stroke="#d8443e" strokeWidth={5} strokeLinecap="round"/>
        <line x1="30" y1="40" x2="56" y2="52" stroke="#d8443e" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  if (fig === 5) return (
    // 06 RUNNING MAN — mint
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <line x1="30" y1="23" x2="30" y2="50" stroke="#5fc99c" strokeWidth={5} strokeLinecap="round"/>
      <circle cx="30" cy="14" r="6" fill="#5fc99c"/>
      <g>
        <line x1="30" y1="50" x2="26" y2="80" stroke="#5fc99c" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="3 30 50;-3 30 50;3 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <path d="M 30,50 L 46,38 L 42,58" stroke="#5fc99c" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="-14 30 50;10 30 50;-14 30 50" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="50" y2="32" stroke="#5fc99c" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-18 30 28;18 30 28;-18 30 28" {...ease} dur="0.5s"/>
      </g>
      <g>
        <line x1="30" y1="28" x2="10" y2="22" stroke="#5fc99c" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="18 30 28;-18 30 28;18 30 28" {...ease} dur="0.5s"/>
      </g>
    </svg>
  );

  // 07 HIP POP — indigo
  return (
    <svg viewBox="0 0 60 90" width={40} height={60} style={s}>
      <circle cx="22" cy="14" r="6" fill="#5e6dd0"/>
      <line x1="26" y1="24" x2="18" y2="4" stroke="#5e6dd0" strokeWidth={5} strokeLinecap="round"/>
      <g>
        <path d="M 26,22 L 38,38 L 24,52" stroke="#5e6dd0" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="38" y1="38" x2="52" y2="40" stroke="#5e6dd0" strokeWidth={5} strokeLinecap="round"/>
        <line x1="24" y1="52" x2="18" y2="80" stroke="#5e6dd0" strokeWidth={5} strokeLinecap="round"/>
        <line x1="24" y1="52" x2="30" y2="80" stroke="#5e6dd0" strokeWidth={5} strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="rotate" values="-7 26 22;7 26 22;-7 26 22" {...ease} dur="0.6s"/>
      </g>
    </svg>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function DancePage() {
  const stageRef    = useRef<HTMLDivElement>(null);
  const troupeRef   = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<SVGCircleElement>(null);
  const ringRef     = useRef<SVGCircleElement>(null);
  const posterRef   = useRef<SVGImageElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const wRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdxRef  = useRef(0);
  const [modalVideo, setModalVideo]     = useState<string | null>(null);
  const [vinylGlow,  setVinylGlow]      = useState(false);
  const audioRef      = useRef<HTMLAudioElement>(null);
  const audioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    history.scrollRestoration = 'manual';
    // Start in the middle of PAGE_H so there's room to scroll both ways
    const START = ONE_CYCLE * 2;
    window.scrollTo(0, START);

    let phase = START * SPEED;
    let rafQ = false;
    let teleporting = false;

    const render = () => {
      rafQ = false;
      const norm = ((phase / SECTION) % N + N) % N;
      const idx  = Math.floor(norm);
      const t    = norm - idx;
      const bg   = lerpHsl(works[idx].color, works[(idx + 1) % N].color, t);

      activeIdxRef.current = idx;
      if (stageRef.current)   stageRef.current.style.backgroundColor = bg;
      if (labelRef.current)   labelRef.current.setAttribute('fill', bg);
      if (ringRef.current)    ringRef.current.setAttribute('stroke', bg);
      if (posterRef.current) {
        posterRef.current.setAttribute('href', works[idx].posterUrl || '');
        posterRef.current.setAttribute('x', String(works[idx].px));
        posterRef.current.setAttribute('y', String(works[idx].py));
      }
      if (counterRef.current) counterRef.current.textContent = `${p2(idx + 1)} / ${p2(N)} · ${works[idx].title} — ${works[idx].music}`;

      wRefs.current.forEach((el, i) => {
        if (!el) return;
        let rel = i - norm;
        while (rel < -N / 2) rel += N;
        while (rel >  N / 2) rel -= N;
        el.style.transform = `translateY(${ANCHOR - ITEM_H / 2 + rel * ITEM_H}px)`;
        el.style.opacity   = String(Math.max(0.22, 1 - Math.abs(rel) * 0.42));
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

      // Silently teleport when approaching either edge, preserving visual position
      if (sy < ONE_CYCLE) {
        teleporting = true;
        const newSy = sy + ONE_CYCLE;
        window.scrollTo(0, newSy);
        phase = newSy * SPEED;
        setTimeout(() => { teleporting = false; }, 50);
        if (!rafQ) { rafQ = true; requestAnimationFrame(render); }
        return;
      }
      if (sy > ONE_CYCLE * 4) {
        teleporting = true;
        const newSy = sy - ONE_CYCLE;
        window.scrollTo(0, newSy);
        phase = newSy * SPEED;
        setTimeout(() => { teleporting = false; }, 50);
        if (!rafQ) { rafQ = true; requestAnimationFrame(render); }
        return;
      }

      phase = sy * SPEED;
      if (!rafQ) { rafQ = true; requestAnimationFrame(render); }

      // Snap to nearest section boundary after scrolling stops
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const STEP = SECTION / SPEED;
        const targetScrollY = Math.round(window.scrollY / STEP) * STEP;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }, 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    render();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, []);

  return (
    <>
    <div style={{ minHeight: PAGE_H, background: '#111' }}>
      <TopBarDance />
      <BottomBarDance />

      {/* counter — fixed bottom-right */}
      <span
        ref={counterRef}
        style={{
          position: 'fixed',
          bottom: 'clamp(16px, 2vh, 28px)',
          right: 'clamp(20px, 2.5vw, 40px)',
          zIndex: 20,
          pointerEvents: 'none',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          fontSize: 'clamp(9px, 0.9vw, 11px)',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          mixBlendMode: 'difference',
        }}
      >
        01 / 09 · ESCAPISM — RAYE FEAT. 070 SHAKE
      </span>

      <div
        ref={stageRef}
        style={{
          position: 'sticky', top: 0,
          height: '100vh',
          padding: 'clamp(90px, 11vh, 130px) 0 clamp(40px, 5vh, 60px) 0',
          backgroundColor: works[0].color,
          transition: 'background-color 0.06s linear',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Main stage: three elements pinned to viewport thirds ── */}
        <div style={{ position: 'relative', flex: 1, minHeight: 320 }}>

          {/* LEFT: work list — aligned with film page list position */}
          <div style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left: 'calc(34vw - 120px)',
          }}>
            {/* Music header */}
            <div style={{
              fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
              fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)',
              marginBottom: 10, textTransform: 'uppercase',
            }}>
              Music
            </div>
            {/* Scrolling list */}
            <div style={{ position: 'relative', width: 240, height: 310, overflow: 'hidden' }}>
              {works.map((w, i) => (
                <div
                  key={w.title}
                  ref={el => { wRefs.current[i] = el; }}
                  onClick={() => { if (w.videoUrl) setModalVideo(w.videoUrl); }}
                  style={{
                    position: 'absolute', left: 0, right: 0,
                    height: ITEM_H,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    willChange: 'transform, opacity',
                    cursor: w.videoUrl ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.05em', flexShrink: 0 }}>
                      {p2(i + 1)}
                    </span>
                    <span
                      style={{ fontSize: 13, letterSpacing: '0.04em' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; (e.currentTarget as HTMLElement).style.textUnderlineOffset = '3px'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
                    >{w.title}</span>
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.06em', marginTop: 2, paddingLeft: 18 }}>
                    {w.music}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER 50%: vinyl — center at 50vw */}
          <div
            onClick={() => {
              const v = works[activeIdxRef.current]?.videoUrl;
              if (v) setModalVideo(v);
            }}
            onMouseEnter={() => {
              setVinylGlow(true);
              const audio = audioRef.current;
              if (!audio) return;
              if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
              if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
              const w = works[activeIdxRef.current];
              const src = w?.videoUrl || '';
              if (audio.src !== (src ? new URL(src, window.location.href).href : '')) {
                audio.src = src;
              }
              audio.currentTime = w?.chorusStart ?? 0;
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
            }}
            onMouseLeave={() => {
              setVinylGlow(false);
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
            }}
            style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: 'calc(50vw - 150px)',
              cursor: 'pointer',
              filter: vinylGlow
                ? 'drop-shadow(0 0 18px rgba(255,255,255,0.75)) drop-shadow(0 0 40px rgba(255,255,255,0.35))'
                : 'none',
              transition: 'filter 400ms ease',
            }}
          >
            <svg viewBox="0 0 200 200" width={300} height={300} style={{ overflow: 'visible' }}>
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
                  {/* r=102 arcs — outside the vinyl edge (r=95), with breathing room */}
                  <path id="vinyl-top-arc" d="M -2,100 A 102,102 0 0,1 202,100"/>
                  <path id="vinyl-bot-arc" d="M -2,100 A 102,102 0 0,0 202,100"/>
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
                <text fontFamily="Inter, system-ui, sans-serif" fontSize={9} fontWeight="500" fill="white" fillOpacity={0.65} letterSpacing={1.4}>
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
          </div>

          {/* RIGHT 2/3: figure track — center at 66vw */}
          <div style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left: 'calc(66vw - 55px)', width: 110, height: 310, overflow: 'hidden',
          }}>
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
      <div style={{
        position: 'fixed',
        bottom: 'clamp(16px, 2.5vh, 28px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        pointerEvents: 'none',
        textAlign: 'center',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
        fontSize: 'clamp(9px, 0.75vw, 11px)',
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}>
        All choreography © Rui Song. Music tracks are credited to their respective artists and are used solely to document the original choreographic work.
      </div>
    </div>

    {/* ── Hover audio ── */}
    <audio ref={audioRef} preload="none" style={{ display: 'none' }} />

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
        <video
          src={modalVideo}
          autoPlay
          controls
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: 4,
            outline: 'none',
          }}
        />
      </div>
    )}
    </>
  );
}
