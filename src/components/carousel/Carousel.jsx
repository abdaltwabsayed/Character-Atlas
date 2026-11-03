import { useEffect, useMemo, useState } from 'react';
import useAutoRotate from '../../hooks/useAutoRotate.js';
import CharacterCard from '../cards/CharacterCard.jsx';

export default function Carousel({ items, label }) {
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const { index, goTo, reducedMotion } = useAutoRotate(items.length, paused);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const visibleItems = useMemo(
    () => Array.from(
      { length: Math.min(visibleCount, items.length) },
      (_, offset) => items[(index + offset) % items.length],
    ),
    [index, items, visibleCount],
  );

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false);
    }
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
      aria-label={`${label} character carousel`}
    >
      <div className="carousel-controls">
        <p>{reducedMotion ? 'Auto-rotation off for reduced motion' : 'A few favorites, on a loop'}</p>
        <div className="arrow-controls">
          <button type="button" aria-label="Previous characters" onClick={() => goTo(index - 1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label="Next characters" onClick={() => goTo(index + 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div className="carousel-window" aria-live="polite">
        <div className="carousel-cards">
          {visibleItems.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
      <div className="carousel-dots" aria-label="Choose a character set">
        {items.map((character, dotIndex) => (
          <button
            key={character.id}
            type="button"
            className={dotIndex === index ? 'is-active' : ''}
            aria-label={`Show characters starting with ${character.name}`}
            aria-current={dotIndex === index ? 'true' : undefined}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
