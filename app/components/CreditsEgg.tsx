"use client";

import { useEffect, useState } from "react";

// Easter egg: the ® after "snow" opens the end-credits page. Hover makes it glow; a click/tap
// sends a halo out from the mark before navigating. /credits is a static page (rewrite), so
// it's a full page load rather than a client-side route change.
export default function CreditsEgg({ mark, style }: { mark: string; style: React.CSSProperties }) {
  const [ringing, setRinging] = useState(false);

  // Coming back with the browser's back button can restore this page from cache mid-animation
  useEffect(() => {
    const reset = () => setRinging(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();   // don't also trigger the wordmark's smoke burst
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.assign("/credits");
      return;
    }
    setRinging(true);
    setTimeout(() => window.location.assign("/credits"), 520);
  };

  return (
    <sup style={style}>
      <a href="/credits" aria-label="End credits" className={`credits-egg${ringing ? " is-ringing" : ""}`} onClick={open}>
        {mark}
      </a>
    </sup>
  );
}
