"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// useLayoutEffect warns during server render; it only needs to run in the browser
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// A template re-mounts on every navigation, so its wrapper replays the enter animation.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Paint the body in the new page's colour before the first frame, so the fade starts from
  // white on the white pages (CS/Dance don't set a body class of their own). Home keeps its
  // class-driven dark/intro background.
  useIsoLayoutEffect(() => {
    document.body.style.backgroundColor = pathname === "/" ? "" : "#ffffff";
  }, [pathname]);

  // Work pages position themselves by scroll offset (film centring, dance/cs scroll tracks),
  // so they fade without the rise to keep their measurements exact.
  const scrollDriven = pathname.startsWith("/work/");
  return <div className={`page-enter${scrollDriven ? " page-enter--fade" : ""}`}>{children}</div>;
}
