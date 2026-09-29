"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const POOL = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#&%";

// Each reel row is taller than the glyph so descenders (g, p, y) aren't clipped
// and the previous random letter can't peek in above.
const ROW = 1.3; // em

function rndChar(): string {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export type LetterReelProps = {
  char: string;
  delayMs: number;
  durationMs: number;
  randomCount?: number;
  skipped?: boolean;
  /** Overrides the inherited text colour for this letter */
  color?: string;
  onComplete?: () => void;
};

export default function LetterReel({
  char,
  delayMs,
  durationMs,
  randomCount = 3,
  skipped = false,
  color,
  onComplete,
}: LetterReelProps) {
  const randoms = useRef(Array.from({ length: randomCount }, rndChar));
  const stripCtrl = useAnimation();
  const wrapCtrl = useAnimation();
  const stripRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (skipped) {
      wrapCtrl.set({ opacity: 1 });
      stripCtrl.set({ y: `-${randomCount * ROW}em` });
      if (stripRef.current) stripRef.current.style.willChange = "auto";
      onComplete?.();
      return;
    }

    let alive = true;
    let tid: ReturnType<typeof setTimeout>;

    async function run() {
      await new Promise<void>((res) => {
        tid = setTimeout(res, delayMs);
      });
      if (!alive) return;

      // Fade in and roll start simultaneously
      wrapCtrl.start({ opacity: 1, transition: { duration: 0.12, ease: "linear" } });
      await stripCtrl.start({
        y: `-${randomCount * ROW}em`,
        // easeOutCubic — settles without the long, near-motionless tail
        transition: { duration: durationMs / 1000, ease: [0.33, 1, 0.68, 1] },
      });
      if (!alive) return;

      if (stripRef.current) stripRef.current.style.willChange = "auto";
      onComplete?.();
    }

    run();

    return () => {
      alive = false;
      clearTimeout(tid!);
      wrapCtrl.stop();
      stripCtrl.stop();
    };
  }, [skipped]); // eslint-disable-line react-hooks/exhaustive-deps

  const allChars = [...randoms.current, char];

  return (
    <span style={{ display: "inline-block", position: "relative", lineHeight: ROW, verticalAlign: "top", color }}>
      {/* Invisible target char reserves exact width — prevents row shifting */}
      <span style={{ visibility: "hidden", display: "inline-block", height: `${ROW}em` }}>{char}</span>

      {/* Rolling window — absolutely overlays the reserved space */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={wrapCtrl}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          overflow: "hidden",
        }}
      >
        <motion.span
          ref={stripRef}
          initial={{ y: 0 }}
          animate={stripCtrl}
          style={{
            display: "flex",
            flexDirection: "column",
            willChange: "transform",
          }}
        >
          {allChars.map((c, i) => (
            <span key={i} style={{ display: "block", height: `${ROW}em`, lineHeight: ROW }}>
              {c}
            </span>
          ))}
        </motion.span>
      </motion.span>
    </span>
  );
}
