import { useEffect, useMemo, useState } from 'react';
import useAutoRotate from '../../hooks/useAutoRotate.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getCharacterName, translate } from '../../i18n/translations.js';
import CharacterCard from '../cards/CharacterCard.jsx';

export default function Carousel({ items, label, franchiseId }) {
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const { index, goTo, reducedMotion } = useAutoRotate(items.length, paused);
  const { language, t } = useLanguage();

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
      aria-label={`${label} ${t('characters')}`}
    >
      <div className="carousel-controls">
        <p>{reducedMotion ? t('reducedMotion') : t('carouselHint')}</p>
        <div className="arrow-controls">
          <button type="button" aria-label={t('previousCharacters')} onClick={() => goTo(index - 1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label={t('nextCharacters')} onClick={() => goTo(index + 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div className="carousel-window" aria-live="polite">
        <div className="carousel-cards">
          {visibleItems.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              franchiseId={franchiseId}
            />
          ))}
        </div>
      </div>
      <div className="carousel-dots" aria-label={t('chooseCharacterSet')}>
        {items.map((character, dotIndex) => (
          <button
            key={character.id}
            type="button"
            className={dotIndex === index ? 'is-active' : ''}
            aria-label={translate(language, 'showCharactersStarting', {
              name: getCharacterName(franchiseId, character.name, language),
            })}
            aria-current={dotIndex === index ? 'true' : undefined}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
