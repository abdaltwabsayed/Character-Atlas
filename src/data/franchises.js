import * as pokemonApi from '../api/pokemonApi.js';
import * as spongebobApi from '../api/spongebobApi.js';
import * as ponyApi from '../api/ponyApi.js';

export const franchises = {
  pokemon: {
    id: 'pokemon',
    nameKey: 'pokemon',
    descriptionKey: 'introPokemon',
    route: '/pokemon',
    theme: 'pokemon',
    api: pokemonApi,
  },
  spongebob: {
    id: 'spongebob',
    nameKey: 'spongebob',
    descriptionKey: 'introSpongebob',
    route: '/spongebob',
    theme: 'spongebob',
    api: spongebobApi,
  },
  pony: {
    id: 'pony',
    nameKey: 'ponies',
    descriptionKey: 'introPony',
    route: '/ponies',
    theme: 'pony',
    api: ponyApi,
  },
};

export const franchiseList = Object.values(franchises);
