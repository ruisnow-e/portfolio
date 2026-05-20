'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  y: number;
  vy: number;
  alpha: number;
  r: number;
  dx: number;
}

interface CSBracketsProps {
  posterHeight: string;
}

const COL_W = 10;

function mkParticle(h: number): Particle {
  const spark = Math.random() < 0.12;
  return {
    y: Math.random() * h,
    vy: spark
      ? (Math.random() * 2.5 + 2) * (Math.random() < 0.7 ? 1 : -1)
      : (Math.random() * 0.9 + 0.3) * (Math.random() < 0.65 ? 1 : -1),
    alpha: spark ? 0.85 : Math.random() * 0.5 + 0.25,
    r: spark ? Math.random() + 2.2 : Math.random() * 1.1 + 0.7,
    dx: (Math.random() - 0.5) * 4,
  };
}

function startAnim(canvas: HTMLCanvasElement, h: number): () => void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = COL_W * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${COL_W}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  ctx.scale(dpr, dpr);

  const pts: Particle[] = Array.from({ length: 35 }, () => mkParticle(h));
  let raf = 0;

  const tick = () => {
    ctx.clearRect(0, 0, COL_W, h);
    for (const p of pts) {
      p.y += p.vy;
      p.dx += (Math.random() - 0.5) * 0.5;
      p.dx = Math.max(-4, Math.min(4, p.dx));
      if (p.y < -2) p.y = h + 2;
      if (p.y > h + 2) p.y = -2;
      if (Math.random() < 0.006) p.alpha = p.r > 2 ? 0.85 : Math.random() * 0.5 + 0.25;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = 'rgba(255,255,255,0.4)';
      ctx.shadowBlur = p.r > 2 ? 7 : 3;
      ctx.fillStyle = p.r > 2 ? '#ffffff' : '#cccccc';
      ctx.beginPath();
      ctx.arc(COL_W / 2 + p.dx, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    raf = requestAnimationFrame(tick);
  };

  tick();
  return () => cancelAnimationFrame(raf);
}

export default function CSBrackets({ posterHeight }: CSBracketsProps) {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftDivRef = useRef<HTMLDivElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    let r1 = 0;
    let r2 = 0;

    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        for (const [canvas, div] of [
          [leftCanvasRef.current, leftDivRef.current],
          [rightCanvasRef.current, rightDivRef.current],
        ] as [HTMLCanvasElement | null, HTMLDivElement | null][]) {
          if (canvas && div) {
            cleanups.push(startAnim(canvas, div.clientHeight || 400));
          }
        }
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      cleanups.forEach(fn => fn());
    };
  }, []);

  const divStyle = (isLeft: boolean): React.CSSProperties => ({
    position: 'fixed',
    ...(isLeft
      ? { left: 'clamp(180px, 28vw, 410px)' }
      : { right: 'clamp(250px, 40vw, 582px)' }),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    pointerEvents: 'none',
    width: `${COL_W}px`,
    height: posterHeight,
  });

  return (
    <>
      <div ref={leftDivRef} style={divStyle(true)}>
        <canvas ref={leftCanvasRef} />
      </div>
      <div ref={rightDivRef} style={divStyle(false)}>
        <canvas ref={rightCanvasRef} />
      </div>
    </>
  );
}
