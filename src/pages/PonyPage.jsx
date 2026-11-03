import ExplorerPage from '../components/ExplorerPage.jsx';
import { franchises } from '../data/franchises.js';

export default function PonyPage() {
  return <ExplorerPage franchise={franchises.pony} />;
}
