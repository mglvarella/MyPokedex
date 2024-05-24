import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import Container from "./components/Container";
import SearchBar from "./components/SearchBar";
import './output.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadedInitialPokemons, setLoadedInitialPokemons] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPokemons();
  }, []);

  const loadMorePokemons = () => {
    const nextOffset = offset + 20;
    setOffset(nextOffset);
    getPokemons(nextOffset);
  };

  const getPokemons = async (nextOffset) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${nextOffset}`);
      const results = res.data.results;
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: details.data.name,
            image: details.data.sprites.front_default,
            type: details.data.types.map((typeInfo) => typeInfo.type.name).join(", "),
          };
        })
      );

      if (loadedInitialPokemons) {
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
      } else {
        setPokemons(pokemonDetails);
        setLoadedInitialPokemons(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPokemonsByName = async (name) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const pokemonData = res.data;
      return [{
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        type: pokemonData.types.map((typeInfo) => typeInfo.type.name).join(", "),
      }];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleSearchChange = async (value) => {
    setSearchTerm(value);
  
    try {
      if (value.trim() === '') {
        getPokemons();
        return;
      }
  
      const pokemonDetails = await getPokemonsByName(value);
      setPokemons(pokemonDetails);
    } catch (error) {
      console.log(error);
      setPokemons([]);
    }
  };

  if (loading && pokemons.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="bg-accent">
        <Header />
        <div className="mx-10 max-w-md">
          <SearchBar onChange={handleSearchChange} />
        </div>
        <Container>
          {pokemons.map((pokemon, index) => (
            <PokeCard key={index} name={pokemon.name} image={pokemon.image} type={pokemon.type} />
          ))}
        </Container>
        <div className="w-full mb-10 flex justify-center text-white">
          <button onClick={loadMorePokemons} className="btn btn-primary">Carregar mais</button>
        </div>
      </div>
    </>
  );
}

export default App;
