'use client';

import { createContext, useContext, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Navigate = (href: string) => void;
const Ctx = createContext<Navigate>(() => {});
export const usePageNavigate = () => useContext(Ctx);

const COVER_MS = 420;   // iris fully expands
const TOTAL_MS = 860;   // iris fully contracts

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const busy = useRef(false);

  const navigate = useCallback((href: string) => {
    if (href !== '/work/film') {
      router.push(href);
      return;
    }
    if (busy.current) return;
    busy.current = true;
    setActive(true);
    setTimeout(() => router.push(href), COVER_MS);
    setTimeout(() => { setActive(false); busy.current = false; }, TOTAL_MS);
  }, [router]);

  return (
    <Ctx.Provider value={navigate}>
      {children}
      {active && <div className="page-iris-transition" />}
    </Ctx.Provider>
  );
}
