import ExplorerPage from '../components/ExplorerPage.jsx';
import { franchises } from '../data/franchises.js';

export default function PokemonPage() {
  return <ExplorerPage franchise={franchises.pokemon} />;
}
