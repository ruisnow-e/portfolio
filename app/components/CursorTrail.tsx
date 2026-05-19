"use client";

import { useEffect, useRef } from "react";

interface TrailPuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // Only on pointer devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, animId: number, frame = 0;
    const trail: TrailPuff[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      frame++;

      // Spawn a trail puff every 2 frames
      if (frame % 2 === 0 && mouseRef.current.x > -1000) {
        trail.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 4,
          y: mouseRef.current.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.3, // drift slightly upward
          age: 0,
          maxAge: 28 + Math.random() * 18,
        });
      }

      ctx.clearRect(0, 0, W, H);

      // Trail puffs
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        const t   = p.age / p.maxAge;
        const r   = 3 + t * 10;
        const op  = (1 - t) * (1 - t) * 0.55;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0,   `rgba(210, 202, 190, ${op})`);
        g.addColorStop(0.5, `rgba(150, 143, 133, ${op * 0.4})`);
        g.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (p.age >= p.maxAge) trail.splice(i, 1);
      }

      // Main cursor dot
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > -1000) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 14);
        g.addColorStop(0,    "rgba(245, 240, 230, 0.95)");
        g.addColorStop(0.35, "rgba(220, 212, 200, 0.55)");
        g.addColorStop(0.7,  "rgba(180, 172, 160, 0.18)");
        g.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
