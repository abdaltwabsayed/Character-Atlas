import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { franchiseList } from '../data/franchises.js';
import useFetch from '../hooks/useFetch.js';
import CardSkeleton from '../components/cards/CardSkeleton.jsx';
import Carousel from '../components/carousel/Carousel.jsx';
import StatusMessage from '../components/ui/StatusMessage.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

function FranchiseSection({ franchise }) {
  const { t } = useLanguage();
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
            <p className="eyebrow">{t('exploreEyebrow')}</p>
            <h2>{t(franchise.nameKey)}</h2>
            <p className="section-description">{t(franchise.descriptionKey)}</p>
          </div>
          <Link className="button button-outline browse-link" to={franchise.route}>
            {t('browseAll')} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {status === 'loading' && (
          <div className="character-grid skeleton-grid">
            {Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        )}
        {status === 'error' && <StatusMessage status={status} error={error} onRetry={retry} />}
        {status === 'not-found' && (
          <StatusMessage status={status} emptyMessage={t('noCharacters')} />
        )}
        {status === 'success' && data?.items?.length > 0 && (
          <Carousel
            items={data.items}
            label={t(franchise.nameKey)}
            franchiseId={franchise.id}
          />
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <section className="hero-strip">
        <div className="hero-content">
          <p className="eyebrow">{t('heroEyebrow')}</p>
          <h1>{t('heroTitle')}<br /><span>{t('heroTitleAccent')}</span></h1>
          <p>{t('heroDescription')}</p>
          <a className="button hero-button" href="#franchises">
            {t('exploreWorlds')} <span aria-hidden="true">↓</span>
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
