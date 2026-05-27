'use client';

import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Navigate = (href: string) => void;
const Ctx = createContext<Navigate>(() => {});
export const usePageNavigate = () => useContext(Ctx);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  return (
    <Ctx.Provider value={navigate}>
      {children}
    </Ctx.Provider>
  );
}
