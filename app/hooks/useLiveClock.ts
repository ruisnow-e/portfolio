'use client';

import { useEffect, useState } from 'react';

function formatClock(): string {
  const now = new Date();
  const tz = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')?.value ?? 'PT';

  const time = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${tz} ${time}`;
}

export function useLiveClock(): string {
  const [clock, setClock] = useState('');

  useEffect(() => {
    setClock(formatClock());

    const id = setInterval(() => {
      setClock(formatClock());
    }, 30_000);

    return () => clearInterval(id);
  }, []);

  return clock;
}
