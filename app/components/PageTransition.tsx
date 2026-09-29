'use client';

import { createContext, useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Navigate = (href: string) => void;
const Ctx = createContext<Navigate>(() => {});
export const usePageNavigate = () => useContext(Ctx);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  // Touch feedback for nav links (see .is-tapped in globals.css). The empty touchstart
  // listener is what makes iOS Safari apply :active at all.
  useEffect(() => {
    const noop = () => {};
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('.bp-nav-logo, .bp-nav-links a, a.role-link');
      if (link) link.classList.add('is-tapped');
    };
    document.addEventListener('touchstart', noop, { passive: true });
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('touchstart', noop);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <Ctx.Provider value={navigate}>
      {children}
    </Ctx.Provider>
  );
}
