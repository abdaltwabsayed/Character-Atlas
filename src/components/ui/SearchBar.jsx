export default function SearchBar({ value, onChange, onSearch, label }) {
  return (
    <form className="search-bar" role="search" onSubmit={onSearch}>
      <label htmlFor="character-search">{label}</label>
      <div className="search-control">
        <input
          id="character-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try a character name"
        />
        <button type="submit" disabled={!value.trim()}>
          Search
        </button>
      </div>
    </form>
  );
}
