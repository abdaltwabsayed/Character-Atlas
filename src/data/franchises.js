import * as pokemonApi from '../api/pokemonApi.js';
import * as spongebobApi from '../api/spongebobApi.js';
import * as ponyApi from '../api/ponyApi.js';

export const franchises = {
  pokemon: {
    id: 'pokemon',
    name: 'Pokémon',
    route: '/pokemon',
    theme: 'pokemon',
    api: pokemonApi,
    description: 'Meet familiar favorites from across the Pokédex.',
  },
  spongebob: {
    id: 'spongebob',
    name: 'SpongeBob SquarePants',
    route: '/spongebob',
    theme: 'spongebob',
    api: spongebobApi,
    description: 'Explore the characters who call Bikini Bottom home.',
  },
  pony: {
    id: 'pony',
    name: 'My Little Pony',
    route: '/ponies',
    theme: 'pony',
    api: ponyApi,
    description: 'Discover the many friends of Equestria.',
  },
};

export const franchiseList = Object.values(franchises);
