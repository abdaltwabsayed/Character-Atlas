import { useCallback, useEffect, useState } from 'react';

export default function useAutoRotate(itemCount, paused, delay = 3000) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    setIndex((current) => (itemCount > 0 ? current % itemCount : 0));
  }, [itemCount]);

  useEffect(() => {
    if (paused || reducedMotion || itemCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % itemCount);
    }, delay);
    return () => window.clearInterval(timer);
  }, [delay, itemCount, paused, reducedMotion]);

  const goTo = useCallback(
    (nextIndex) => {
      if (itemCount > 0) {
        setIndex(((nextIndex % itemCount) + itemCount) % itemCount);
      }
    },
    [itemCount],
  );

  return { index, goTo, reducedMotion };
}
