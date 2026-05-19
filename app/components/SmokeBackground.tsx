"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vy: number;
  age: number;
  maxAge: number;
  wobbleAngle: number;
  wobbleSpeed: number;
  exploding: boolean;
  evx: number;
  evy: number;
  currentOp: number;
}

export default function SmokeBackground({
  revealed,
  explodeCount = 0,
}: {
  revealed: boolean;
  explodeCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const explodeCountRef = useRef(explodeCount);

  useEffect(() => {
    explodeCountRef.current = explodeCount;
  }, [explodeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0, frame = 0, lastExplodeCount = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Desktop wordmark is right-aligned: right = clamp(56px,10vw,180px)
    // fontSize = clamp(110px, 24vw, 360px); "snow" width ≈ fontSize * 2.4
    function getWordmarkCX(): number {
      if (W < 768) {
        // Mobile: wordmark is top of vertical stack, left-aligned
        const padH = Math.max(20, Math.min(24, W * 0.04));
        const fontSize = Math.min(130, Math.max(56, W * 0.22));
        return padH + fontSize * 1.2;
      }
      const insetX = Math.max(56, Math.min(180, W * 0.10));
      const fontSize = Math.min(360, Math.max(110, W * 0.24));
      return W - insetX - fontSize * 1.2;
    }

    function makeParticle(age = 0): Particle {
      const cx = getWordmarkCX();
      const vy = 0.7 + Math.random() * 0.6;
      return {
        x: cx + (Math.random() - 0.5) * 100,
        y: -30 + vy * age,
        vy,
        age,
        maxAge: Math.ceil((H + 400) / vy),
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.006 + Math.random() * 0.010,
        exploding: false,
        evx: 0,
        evy: 0,
        currentOp: 0,
      };
    }

    // Pre-fill so there's no empty-canvas startup
    const particles: Particle[] = [];
    for (let i = 0; i < 48; i++) {
      particles.push(makeParticle(Math.random() * 420));
    }

    function triggerExplosion() {
      const cx = getWordmarkCX();
      const cy = H * 0.5;
      for (const p of particles) {
        p.exploding = true;
        p.evx = (p.x - cx) * 0.04 + (Math.random() - 0.5) * 6;
        p.evy = (p.y - cy) * 0.04 + (Math.random() - 0.5) * 6;
      }
    }

    const draw = () => {
      frame++;

      if (explodeCountRef.current > lastExplodeCount) {
        lastExplodeCount = explodeCountRef.current;
        triggerExplosion();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0A0908";
      ctx.fillRect(0, 0, W, H);

      if (frame % 5 === 0) particles.push(makeParticle());

      ctx.globalCompositeOperation = "screen";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;

        if (p.exploding) {
          p.x += p.evx;
          p.y += p.evy;
          p.evx *= 0.97;
          p.evy *= 0.97;
          p.currentOp -= 0.008;
          if (
            p.currentOp <= 0 ||
            p.x < -400 || p.x > W + 400 ||
            p.y < -400 || p.y > H + 400
          ) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          p.wobbleAngle += p.wobbleSpeed;
          p.x += Math.sin(p.wobbleAngle) * 0.55;
          p.y += p.vy;

          const fadeIn = Math.min(p.age / 25, 1);
          p.currentOp = 0.11 * fadeIn;

          if (p.y > H + 380) {
            particles.splice(i, 1);
            continue;
          }
        }

        const t = Math.min(p.age / p.maxAge, 1);
        const r = 25 + (160 - 25) * t;
        const op = p.currentOp;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0,    `rgba(200, 192, 182, ${op})`);
        grad.addColorStop(0.38, `rgba(140, 133, 124, ${op * 0.52})`);
        grad.addColorStop(0.72, `rgba(68, 63, 58,   ${op * 0.13})`);
        grad.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: revealed ? 1 : 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}
