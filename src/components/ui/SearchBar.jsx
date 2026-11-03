import { useLanguage } from '../../context/LanguageContext.jsx';

export default function SearchBar({ value, onChange, onSearch, label }) {
  const { t } = useLanguage();

  return (
    <form className="search-bar" role="search" onSubmit={onSearch}>
      <label htmlFor="character-search">{label}</label>
      <div className="search-control">
        <input
          id="character-search"
          type="search"
          dir="auto"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t('searchPlaceholder')}
        />
        <button type="submit" disabled={!value.trim()}>
          {t('searchButton')}
        </button>
      </div>
    </form>
  );
}
