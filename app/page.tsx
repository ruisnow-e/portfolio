"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import IntroOverlay from "./components/IntroOverlay";
import CursorTrail from "./components/CursorTrail";
import { useShouldPlayIntro } from "./hooks/useShouldPlayIntro";

export default function Home() {
  const shouldPlay = useShouldPlayIntro();
  const [introDone, setIntroDone] = useState(false);
  const showOverlay = shouldPlay && !introDone;

  // The white intro card now covers the screen, so drop the pre-paint white cover (layout.tsx)
  useEffect(() => {
    // (useShouldPlayIntro starts false before it reads sessionStorage, so only the overlay mounting clears it;
    //  the head script only sets data-intro under the same conditions that make the overlay play)
    if (showOverlay) document.documentElement.removeAttribute("data-intro");
  }, [showOverlay]);

  useEffect(() => {
    document.body.classList.add("hide-cursor");
    return () => document.body.classList.remove("hide-cursor");
  }, []);

  return (
    <>
      <main aria-hidden={showOverlay ? true : undefined}>
        <Hero />
      </main>
      {showOverlay && (
        <IntroOverlay
          brand="Rui Snow Song"
          onComplete={() => {
            sessionStorage.setItem("rss_intro_played", "1");
            setIntroDone(true);
          }}
        />
      )}
      <CursorTrail />
    </>
  );
}
