'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSProject } from '@/app/data/cs-projects';

interface LaptopProps {
  project: CSProject;
}

const LINE2_FULL = '  explore();';
const VW = 280;
const VH = 260;

// ── Shapes in viewBox coords ──────────────────────────────────────────────────

const SCREEN_POLY: [number, number][] = [[24, 8], [256, 8], [252, 148], [28, 148]];
const BASE_POLY:   [number, number][] = [[16, 156], [264, 156], [282, 232], [2, 232]];
const TRACKPAD:    [number, number][] = [[106, 212], [174, 212], [180, 228], [100, 228]];
const TOUCHID:     [number, number][] = [[235, 158], [251, 158], [251, 166], [235, 166]];

const LINES: [number, number, number, number][] = [
  [24, 152, 256, 152],   // hinge
  [26, 155, 254, 155],   // hinge shadow
  [18, 167, 262, 167],   // fn-row divider
  [108, 222, 172, 222],  // trackpad click line
  [2, 179, 17, 176],     // USB-C port 1
  [2, 191, 17, 188],     // USB-C port 2
  [263, 185, 278, 189],  // headphone
  [20, 176, 260, 176],   // kbd row 1
  [18, 186, 262, 186],   // kbd row 2
  [16, 196, 264, 196],   // kbd row 3
  [14, 206, 266, 206],   // kbd row 4
  [12, 216, 268, 216],   // kbd row 5
  [62, 168, 62, 218],    // kbd col 1
  [102, 168, 102, 218],  // kbd col 2
  [140, 168, 140, 218],  // kbd col 3
  [178, 168, 178, 218],  // kbd col 4
  [218, 168, 218, 218],  // kbd col 5
];

// ── Particle type ─────────────────────────────────────────────────────────────

interface Particle {
  bx: number; by: number;
  dx: number; dy: number;
  baseAlpha: number;
  phase: number;
  period: number;
  r: number;
}

function seg(x1: number, y1: number, x2: number, y2: number, sp: number, r: number): Particle[] {
  const ddx = x2 - x1, ddy = y2 - y1;
  const len = Math.sqrt(ddx * ddx + ddy * ddy);
  const n = Math.max(1, Math.round(len / sp));
  return Array.from({ length: n }, (_, i) => ({
    bx: x1 + ddx * (i / n),
    by: y1 + ddy * (i / n),
    dx: 0, dy: 0,
    baseAlpha: Math.random() * 0.3 + 0.55,
    phase: Math.random() * Math.PI * 2,
    period: Math.random() * 2 + 2.5,
    r,
  }));
}

function poly(pts: [number, number][], sp: number, r: number): Particle[] {
  return pts.flatMap((p, i) => seg(p[0], p[1], pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1], sp, r));
}

function circ(cx: number, cy: number, rad: number, sp: number, r: number): Particle[] {
  const n = Math.max(6, Math.round((2 * Math.PI * rad) / sp));
  return Array.from({ length: n }, (_, i) => ({
    bx: cx + rad * Math.cos((i / n) * 2 * Math.PI),
    by: cy + rad * Math.sin((i / n) * 2 * Math.PI),
    dx: 0, dy: 0,
    baseAlpha: Math.random() * 0.3 + 0.55,
    phase: Math.random() * Math.PI * 2,
    period: Math.random() * 2 + 2.5,
    r,
  }));
}

function buildParticles(): Particle[] {
  const pts: Particle[] = [
    ...poly(SCREEN_POLY, 3.5, 1.4),
    ...poly(BASE_POLY, 3.5, 1.4),
    ...poly(TRACKPAD, 5, 1.1),
    ...poly(TOUCHID, 4, 0.9),
    ...LINES.flatMap(([x1, y1, x2, y2]) => seg(x1, y1, x2, y2, 5, 0.9)),
    ...circ(140, 14, 2.5, 2, 1.0),
  ];

  // Power LED — slightly bigger, faster pulse
  pts.push({ bx: 246, by: 161, dx: 0, dy: 0, baseAlpha: 0.75, phase: 0, period: 1.5, r: 2.2 });

  // Speaker grilles
  [22, 29, 36, 43, 50, 230, 237, 244, 251, 258].forEach(x =>
    pts.push({ bx: x, by: 227, dx: 0, dy: 0, baseAlpha: 0.4, phase: Math.random() * Math.PI * 2, period: 3.5, r: 1.1 })
  );

  return pts;
}

// ── Canvas animation ──────────────────────────────────────────────────────────

function startAnim(canvas: HTMLCanvasElement, particles: Particle[]): () => void {
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  if (!W || !H) return () => {};

  canvas.width = W * dpr;
  canvas.height = H * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Scale so we can draw in viewBox units
  ctx.scale((W * dpr) / VW, (H * dpr) / VH);

  let frame = 0;
  let raf = 0;

  const tick = () => {
    const t = frame++ / 60;
    ctx.clearRect(0, 0, VW, VH);

    for (const p of particles) {
      p.dx += (Math.random() - 0.5) * 0.12;
      p.dy += (Math.random() - 0.5) * 0.12;
      p.dx *= 0.88;
      p.dy *= 0.88;

      const pulse = 0.6 + 0.4 * Math.sin((2 * Math.PI * t) / p.period + p.phase);
      ctx.globalAlpha = Math.max(0.06, Math.min(1, p.baseAlpha * pulse));
      ctx.fillStyle = '#e8e8e8';
      ctx.beginPath();
      ctx.arc(p.bx + p.dx, p.by + p.dy, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(tick);
  };

  tick();
  return () => cancelAnimationFrame(raf);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Laptop({ project }: LaptopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [line2, setLine2] = useState('');
  const playKeyRef = useRef<() => void>(() => {});

  // Audio setup — fetch raw bytes eagerly, lazy-init AudioContext on first keypress
  useEffect(() => {
    let rawBytes: ArrayBuffer | null = null;
    let ctx: AudioContext | null = null;
    let buf: AudioBuffer | null = null;
    let initialising = false;

    fetch('/cs/typing.wav')
      .then(r => r.arrayBuffer())
      .then(ab => { rawBytes = ab; })
      .catch(() => {});

    playKeyRef.current = () => {
      if (!rawBytes) return;

      const play = async () => {
        // Create AudioContext lazily — by first keypress the user has already navigated (gesture done)
        if (!ctx) {
          if (initialising) return;
          initialising = true;
          try {
            ctx = new AudioContext();
            buf = await ctx.decodeAudioData(rawBytes!.slice(0));
          } catch { initialising = false; return; }
          initialising = false;
        }
        if (!buf || !ctx) return;
        if (ctx.state === 'suspended') await ctx.resume();
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.value = 0.28;
        src.connect(gain);
        gain.connect(ctx.destination);
        const offset = Math.random() * Math.max(0, buf.duration - 0.18);
        src.start(0, offset, 0.14);
      };

      play().catch(() => {});
    };

    return () => { ctx?.close(); };
  }, []);

  // Typing animation
  useEffect(() => {
    let cancelled = false;
    let phase: 'typing' | 'pause-full' | 'erasing' | 'pause-empty' = 'typing';
    let charIdx = 0;
    let tid: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (cancelled) return;
      if (phase === 'typing') {
        charIdx++;
        setLine2(LINE2_FULL.slice(0, charIdx));
        playKeyRef.current();
        if (charIdx >= LINE2_FULL.length) { phase = 'pause-full'; tid = setTimeout(tick, 900); }
        else tid = setTimeout(tick, 80);
      } else if (phase === 'pause-full') {
        phase = 'erasing'; tid = setTimeout(tick, 50);
      } else if (phase === 'erasing') {
        charIdx--;
        setLine2(LINE2_FULL.slice(0, charIdx));
        playKeyRef.current();
        if (charIdx <= 0) { charIdx = 0; phase = 'pause-empty'; tid = setTimeout(tick, 400); }
        else tid = setTimeout(tick, 50);
      } else {
        phase = 'typing'; tid = setTimeout(tick, 80);
      }
    };

    tid = setTimeout(tick, 400);
    return () => { cancelled = true; if (tid) clearTimeout(tid); };
  }, []);

  // Particle animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const particles = buildParticles();
    let cleanup = () => {};
    let r1 = 0, r2 = 0;

    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        if (canvasRef.current) cleanup = startAnim(canvasRef.current, particles);
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      cleanup();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: 'clamp(60px, 17vw, 220px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: 'clamp(140px, 15vw, 210px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '18px',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Canvas + SVG wrapper */}
      <div style={{ position: 'relative', width: '100%' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          fill="none"
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="screen-glow-g" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="280" height="180" fill="url(#screen-glow-g)" />
          <rect x="34" y="20" width="212" height="120" fill="#0d0d0d" rx="2" />
          <foreignObject x="34" y="20" width="212" height="120">
            <div
              style={{
                padding: '12px 14px',
                fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
                fontSize: '10px',
                lineHeight: 1.6,
                color: '#e0e0e0',
                background: 'transparent',
                whiteSpace: 'pre',
                overflow: 'hidden',
              }}
            >
              <div>{'while(true) {'}</div>
              <div>
                {line2}
                <span style={{ animation: 'cs-cursor-blink 1s step-end infinite', display: 'inline-block' }}>█</span>
              </div>
              <div>{'}'}</div>
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Mono caption */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
          fontSize: 'clamp(9px, 0.85vw, 11px)',
          letterSpacing: '0.1em',
          color: '#666666',
          lineHeight: 1.65,
          textAlign: 'center',
        }}
      >
        <span>{project.techStack}</span>
        <span>{project.version}</span>
        <span>{project.role}</span>
      </div>
    </div>
  );
}
