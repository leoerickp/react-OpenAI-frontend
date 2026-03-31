import { useEffect, useRef } from 'react';

export const useContentScroll = (dep: unknown) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(id);
  }, [dep]);
  return ref;
};
