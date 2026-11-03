import ExplorerPage from '../components/ExplorerPage.jsx';
import { franchises } from '../data/franchises.js';

export default function SpongebobPage() {
  return <ExplorerPage franchise={franchises.spongebob} />;
}
