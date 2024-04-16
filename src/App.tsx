import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PokemonListingPage from "./modules/pokemons/pages/PokemonListingPage";
import NotFoundPage from "./modules/commons/pages/NotFoundPage";

const PokemonDetailsPage = lazy(() => import('./modules/pokemons/pages/PokemonDetailsPage'));

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/pokemons" />} />
          <Route path="/pokemons" element={<PokemonListingPage />} />
          <Route
            path="/pokemons/:pokemonName"
            element={
              <Suspense fallback={<div>Loading...</div>}> {/* Provide a fallback component */}
                <PokemonDetailsPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  );
}

export default App;
