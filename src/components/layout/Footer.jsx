import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-title">{t('siteName')}</p>
          <p>{t('fanDisclosure')}</p>
        </div>
        <div className="footer-links">
          <span>{t('dataLabel')} <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a></span>
          <span>{t('dataLabel')} <a href="https://spongebob.fandom.com/" target="_blank" rel="noreferrer">SpongeBob Wiki</a></span>
          <span>{t('dataLabel')} <a href="https://ponyapi.net/" target="_blank" rel="noreferrer">PonyAPI</a></span>
          <a href="https://github.com/abdaltwabsayed/Character-Atlas" target="_blank" rel="noreferrer">
            {t('viewSource')}
          </a>
        </div>
      </div>
    </footer>
  );
}
