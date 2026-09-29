"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import LetterReel from "./LetterReel";

export type IntroOverlayProps = {
  brand?: string;
  staggerMs?: number;
  letterDurationMs?: number;
  holdMs?: number;
  exitDurationMs?: number;
  onComplete: () => void;
};

type Stage = "assembling" | "holding" | "exiting";

export default function IntroOverlay({
  brand = "Rui Snow Song",
  staggerMs = 140,
  letterDurationMs = 500,
  holdMs = 700,
  exitDurationMs = 1600,
  onComplete,
}: IntroOverlayProps) {
  const [stage, setStage] = useState<Stage>("assembling");
  const stageRef = useRef<Stage>("assembling");
  const [skipped, setSkipped] = useState(false);
  const backdropCtrl = useAnimation();
  const wordmarkCtrl = useAnimation();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync for use inside callbacks without stale closure issues
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const chars = brand.split("");
  const nonSpaceCount = chars.filter((c) => c !== " ").length;

  const runExit = useCallback(async () => {
    if (stageRef.current === "exiting") return;
    setStage("exiting");
    stageRef.current = "exiting";

    // Wordmark fades out first…
    wordmarkCtrl.start({
      opacity: 0,
      transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1] },
    });

    // …then the white card dissolves straight into the black home page (white → black, one pass)
    await backdropCtrl.start({
      opacity: [1, 1, 0],
      transition: {
        duration: exitDurationMs / 1000,
        times: [0, 0.3, 1.0],
        ease: [0.45, 0, 0.55, 1],
      },
    });

    onComplete();
  }, [backdropCtrl, wordmarkCtrl, exitDurationMs, onComplete]);

  const handleLastReelComplete = useCallback(() => {
    if (stageRef.current !== "assembling") return;
    setStage("holding");
    stageRef.current = "holding";
    setTimeout(() => {
      if (stageRef.current === "holding") runExit();
    }, holdMs);
  }, [holdMs, runExit]);

  const skipToReveal = useCallback(() => {
    if (stageRef.current === "exiting") return;
    setSkipped(true);
    runExit();
  }, [runExit]);

  // Focus overlay on mount for keyboard capture
  useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  let reelIdx = 0;
  let wordIdx = 0;
  // Middle word ("Snow") in dark grey, set apart from "Rui" and "Song" — echoes the Bio heading
  const MIDDLE_WORD_COLOR = "#666666";
  const isMiddleWord = (w: number) => w === 1;

  return (
    <>
      {/* Screen reader announcement — fires once on mount */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        {brand}, portfolio loading
      </div>

      {/* Backdrop — white card; fades to transparent on exit, revealing the black home page */}
      <motion.div
        initial={{ backgroundColor: "#ffffff", opacity: 1 }}
        animate={backdropCtrl}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
        }}
      />

      {/* Wordmark layer — fixed center, independent from backdrop */}
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 1 }}
        animate={wordmarkCtrl}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-label="Intro animation. Click or press any key to skip."
        onClick={skipToReveal}
        onKeyDown={(e) => {
          if (!e.repeat) skipToReveal();
        }}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
          outline: "none",
          cursor: "pointer",
          userSelect: "none",
          willChange: "opacity",
        }}
      >
        <div
          style={{
            fontFamily:
              "var(--font-inter, Inter, system-ui, -apple-system, sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.2vw, 30px)",
            color: "#0a0a0a",
            letterSpacing: "-0.015em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {chars.map((char, charIndex) => {
            if (char === " ") {
              wordIdx++;
              return (
                <span
                  key={charIndex}
                  style={{ display: "inline-block", width: "0.35em" }}
                />
              );
            }
            const idx = reelIdx++;
            return (
              <LetterReel
                key={charIndex}
                color={isMiddleWord(wordIdx) ? MIDDLE_WORD_COLOR : undefined}
                char={char}
                delayMs={100 + idx * staggerMs}
                durationMs={letterDurationMs}
                skipped={skipped}
                onComplete={idx === nonSpaceCount - 1 ? handleLastReelComplete : undefined}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
