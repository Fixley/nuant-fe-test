import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PokemonListingPage from "./modules/pokemons/pages/PokemonListingPage";
import PokemonDetailsPage from "./modules/pokemons/pages/PokemonDetailsPage";
import NotFoundPage from "./modules/commons/pages/NotFoundPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/pokemons" />} />
          <Route path="/pokemons" element={<PokemonListingPage />} />
          <Route path="/pokemons/:pokemonName" element={<PokemonDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  );
}

export default App;
