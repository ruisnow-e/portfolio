"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import IntroOverlay from "./components/IntroOverlay";
import { useShouldPlayIntro } from "./hooks/useShouldPlayIntro";

export default function Home() {
  const shouldPlay = useShouldPlayIntro();
  const [introDone, setIntroDone] = useState(false);
  const showOverlay = shouldPlay && !introDone;

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
    </>
  );
}
