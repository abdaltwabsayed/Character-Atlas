import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { franchiseList } from '../data/franchises.js';
import useFetch from '../hooks/useFetch.js';
import CardSkeleton from '../components/cards/CardSkeleton.jsx';
import Carousel from '../components/carousel/Carousel.jsx';
import StatusMessage from '../components/ui/StatusMessage.jsx';

function FranchiseSection({ franchise }) {
  const loadPreview = useCallback(
    (signal) => franchise.api.getList({ limit: 9, page: 0, signal }),
    [franchise],
  );
  const { data, status, error, retry } = useFetch(loadPreview, [loadPreview]);

  return (
    <section className="franchise-section" data-theme={franchise.theme}>
      <div className="section-inner">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore a world</p>
            <h2>{franchise.name}</h2>
            <p className="section-description">{franchise.description}</p>
          </div>
          <Link className="button button-outline browse-link" to={franchise.route}>
            Browse all <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {status === 'loading' && (
          <div className="character-grid skeleton-grid">
            {Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        )}
        {status === 'error' && <StatusMessage status={status} error={error} onRetry={retry} />}
        {status === 'not-found' && (
          <StatusMessage status={status} emptyMessage="No characters are available right now." />
        )}
        {status === 'success' && data?.items?.length > 0 && (
          <Carousel items={data.items} label={franchise.name} />
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-strip">
        <div className="hero-content">
          <p className="eyebrow">Three worlds, one atlas</p>
          <h1>Characters worth<br /><span>getting to know.</span></h1>
          <p>
            A small fan-made explorer for memorable characters from Pokémon,
            SpongeBob SquarePants, and My Little Pony.
          </p>
          <a className="button hero-button" href="#franchises">
            Explore the worlds <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <span className="hero-spark hero-spark-one" aria-hidden="true">✦</span>
        <span className="hero-spark hero-spark-two" aria-hidden="true">✳</span>
      </section>
      <div id="franchises">
        {franchiseList.map((franchise) => (
          <FranchiseSection key={franchise.id} franchise={franchise} />
        ))}
      </div>
    </div>
  );
}
