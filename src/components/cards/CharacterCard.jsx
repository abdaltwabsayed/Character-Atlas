import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import {
  getCharacterName,
  getLocalizedTag,
} from '../../i18n/translations.js';

export default function CharacterCard({ character, franchiseId }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    setImageFailed(false);
  }, [character.image]);

  const displayName = getCharacterName(franchiseId, character.name, language);
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <article className="character-card">
      <div className="character-art">
        {character.image && !imageFailed ? (
          <img
            src={character.image}
            alt={displayName}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="character-placeholder" role="img" aria-label={`${displayName}, ${t('imageUnavailable')}`}>
            <span>{initials}</span>
            <small>{t('imageUnavailable')}</small>
          </div>
        )}
      </div>
      <div className="character-details">
        <h3 lang={language} dir="auto">{displayName}</h3>
        {character.tags?.length > 0 && (
          <ul className="tag-list" aria-label={t('characterDetails')}>
            {character.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{getLocalizedTag(tag, language)}</li>
            ))}
          </ul>
        )}
        {character.url && (
          <a className="source-link" href={character.url} target="_blank" rel="noreferrer">
            {t('characterSource')} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
