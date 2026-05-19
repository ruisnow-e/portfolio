"use client";

import { useEffect, useState } from "react";

export function useShouldPlayIntro(): boolean {
  const [should, setShould] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem("rss_intro_played") === "1";
    setShould(!reducedMotion && !played);
  }, []);

  return should;
}
