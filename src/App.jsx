import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import SpongebobPage from './pages/SpongebobPage.jsx';
import PonyPage from './pages/PonyPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pokemon" element={<PokemonPage />} />
        <Route path="spongebob" element={<SpongebobPage />} />
        <Route path="ponies" element={<PonyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
