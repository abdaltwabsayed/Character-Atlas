import axios from 'axios';

const pokemonClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 15000,
});

function normalizePokemon(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites?.other?.['official-artwork']?.front_default ??
      pokemon.sprites?.front_default ??
      null,
    tags: pokemon.types?.map(({ type }) => type.name) ?? [],
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
  };
}

export async function getList({ limit = 9, page = 0, signal } = {}) {
  const offset = page * limit;
  const { data } = await pokemonClient.get('pokemon', {
    params: { limit, offset },
    signal,
  });
  const items = await Promise.all(
    data.results.map(async ({ name }) => {
      const response = await pokemonClient.get(`pokemon/${encodeURIComponent(name)}`, {
        signal,
      });
      return normalizePokemon(response.data);
    }),
  );

  return {
    items,
    nextPage: data.next ? page + 1 : null,
  };
}

export async function getByName(name, { signal } = {}) {
  const { data } = await pokemonClient.get(
    `pokemon/${encodeURIComponent(name.trim().toLowerCase())}`,
    { signal },
  );
  return normalizePokemon(data);
}
