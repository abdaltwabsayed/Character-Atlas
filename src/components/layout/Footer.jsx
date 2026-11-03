export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-title">Character Atlas</p>
          <p>
            An independent fan and learning project. Not affiliated with or endorsed by
            Nintendo, Game Freak, Nickelodeon, Hasbro, or their licensors.
          </p>
        </div>
        <div className="footer-links">
          <span>Data: <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a></span>
          <span>Data: <a href="https://spongebob.fandom.com/" target="_blank" rel="noreferrer">SpongeBob Wiki</a></span>
          <span>Data: <a href="https://ponyapi.net/" target="_blank" rel="noreferrer">PonyAPI</a></span>
          <a href="https://github.com/abdaltwabsayed/Pokemon-Fetcher" target="_blank" rel="noreferrer">
            View source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
