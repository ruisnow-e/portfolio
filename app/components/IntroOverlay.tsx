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
  holdMs = 350,
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

    // Wordmark fades out during the black→white phase (~900ms)
    wordmarkCtrl.start({
      opacity: 0,
      transition: { duration: 0.9, ease: [0.45, 0, 0.55, 1] },
    });

    // Backdrop: black → white (45%) → hold white (60%) → fade to transparent (100%)
    await backdropCtrl.start({
      backgroundColor: ["#000000", "#ffffff", "#ffffff", "#ffffff"],
      opacity: [1, 1, 1, 0],
      transition: {
        duration: exitDurationMs / 1000,
        times: [0, 0.45, 0.60, 1.0],
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

      {/* Backdrop — cross-fades black → white → transparent on exit */}
      <motion.div
        initial={{ backgroundColor: "#000000", opacity: 1 }}
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
            color: "#E5E5E5",
            letterSpacing: "-0.015em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {chars.map((char, charIndex) => {
            if (char === " ") {
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
