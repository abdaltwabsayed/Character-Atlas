import { useEffect, useState } from 'react';

export default function CharacterCard({ character }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [character.image]);

  const initials = character.name
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
            alt={character.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="character-placeholder" role="img" aria-label={`${character.name}, image unavailable`}>
            <span>{initials}</span>
            <small>Image unavailable</small>
          </div>
        )}
      </div>
      <div className="character-details">
        <h3>{character.name}</h3>
        {character.tags?.length > 0 && (
          <ul className="tag-list" aria-label="Character details">
            {character.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {character.url && (
          <a className="source-link" href={character.url} target="_blank" rel="noreferrer">
            Character source <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
