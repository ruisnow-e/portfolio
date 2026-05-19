"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const POOL = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#&%";

function rndChar(): string {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export type LetterReelProps = {
  char: string;
  delayMs: number;
  durationMs: number;
  randomCount?: number;
  skipped?: boolean;
  onComplete?: () => void;
};

export default function LetterReel({
  char,
  delayMs,
  durationMs,
  randomCount = 3,
  skipped = false,
  onComplete,
}: LetterReelProps) {
  const randoms = useRef(Array.from({ length: randomCount }, rndChar));
  const stripCtrl = useAnimation();
  const wrapCtrl = useAnimation();
  const stripRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (skipped) {
      wrapCtrl.set({ opacity: 1 });
      stripCtrl.set({ y: `-${randomCount}em` });
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
        y: `-${randomCount}em`,
        transition: { duration: durationMs / 1000, ease: [0.22, 1, 0.36, 1] },
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
    <span style={{ display: "inline-block", position: "relative", lineHeight: 1 }}>
      {/* Invisible target char reserves exact width — prevents row shifting */}
      <span style={{ visibility: "hidden", display: "inline-block" }}>{char}</span>

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
            <span key={i} style={{ display: "block", height: "1em", lineHeight: 1 }}>
              {c}
            </span>
          ))}
        </motion.span>
      </motion.span>
    </span>
  );
}
