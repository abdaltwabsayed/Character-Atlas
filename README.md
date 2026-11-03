# Character Atlas

An independent fan and learning project for browsing characters from Pokémon,
SpongeBob SquarePants, and My Little Pony. It is not affiliated with or endorsed
by the respective rights holders and is not presented as client work.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. Vite is configured for the
GitHub Pages project path `/Pokemon-Fetcher/`; routes use `HashRouter` so direct
page refreshes work on static hosting.

## Data sources

- Pokémon: [PokéAPI](https://pokeapi.co/), with official-artwork sprites when available.
- SpongeBob: the [SpongeBob Wiki](https://spongebob.fandom.com/) MediaWiki API,
  which returns page titles and thumbnails for its main-character category.
- My Little Pony: [PonyAPI](https://ponyapi.net/), which returns character
  names, kinds, and image URLs.

The character data and images belong to their respective sources and rights
holders. SpongeBob Wiki and PonyAPI image URLs are served by third-party sites;
cards show a local CSS fallback if an image is unavailable. Franchise section
backgrounds are CSS gradients and do not hotlink images.

## Features

- Responsive home-page carousels and searchable, paginated explorers.
- Shared character cards, loading skeletons, API error states, and image fallbacks.
- Franchise themes, mobile navigation, and reduced-motion support.
