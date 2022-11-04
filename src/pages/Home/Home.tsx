import axiosClient from "../../network/AxiosClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import "./Home.css";
import usePokemonsQuery from "../../network/PokemonsQuery";
import PokemonBox from "./components/PokemonBox";

type FormValues = {
  pokemon: String;
};

type Pokemon = {
  url: string;
  name: string;
};

export default function HomePage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [query, setQuery] = useState<any>("");
  const [id, setId] = useState<number>(25);
  const [pageNumber, setPageNumber] = useState("pokemon?offset=0&limit=20");
  const { pokemons, loading, error, nextPage, prevPage } =
    usePokemonsQuery(pageNumber);

  const onSubmit: SubmitHandler<FormValues> = (e) => {
    axiosClient
      .get(`pokemon/${e.pokemon.toLocaleLowerCase()}`, {})
      .then((response) => {
        setPokemon(response.data);
        setId(response.data.id);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("Pokemon not found");
        }
      });
  };

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  //descontruct pokemon state and increment id
  const incrementPokemonId = () => {
    setId(id + 1);
  };
  const decrementPokemonId = () => {
    setId(id - 1);
  };

  function searchPokemon(id: number) {
    setId(id);
  }

  const levenshteinDistance = (str1 = "", str2 = "") => {
    const track = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    return track[str2.length][str1.length];
  };

  useEffect(() => {
    const controller = new AbortController();

    axiosClient
      .get(`pokemon/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setPokemon(res.data);
        setId(res.data.id);
      })
      .catch((err) => {
        if (err.name === "CanceledError") {
          console.log("Request canceled");
        } else {
          alert(err.message);
        }
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <div className="page">
      <div className="center">
        <h1>Search for a pokemon</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="ex: pikachu | 25"
              type="text"
              {...register("pokemon", { required: true })}
            />
            <input hidden type="submit" />
          </form>

          {pokemon && (
            <>
              <img
                className="pokemonImage"
                src={pokemon.sprites.other.dream_world.front_default}
              />
              <div> {pokemon.id}</div>
              <div> {pokemon.name}</div>
            </>
          )}
          <div className="buttonWrapper">
            <button onClick={decrementPokemonId}>Previous</button>

            <button onClick={incrementPokemonId}>Next</button>
          </div>
        </div>
      </div>
      <div className="pokemonsContainer">
        <h2>Pokemons</h2>
        <input onChange={handleSearch} placeholder="search" type="text" />
        <div className="grid">
          {pokemons &&
            pokemons
              .filter(function (pokemon: Pokemon) {
                if (query === "") {
                  return pokemon;
                } else {
                  let distance = levenshteinDistance(pokemon.name, query);
                  if (distance < 6) {
                    return pokemon;
                  }
                }
              })
              .map((pokemon: Pokemon) => {
                return (
                  <div className="grid-item" key={pokemon.url}>
                    <PokemonBox
                      SearchPokemon={() =>
                        searchPokemon(Number(pokemon.url.split("/")[6]))
                      }
                      name={pokemon.name}
                    />
                  </div>
                );
              })}
        </div>
        <div>
          {prevPage && (
            <button onClick={() => setPageNumber(prevPage.split("v2/")[1])}>
              Prev
            </button>
          )}
          {nextPage && (
            <button onClick={() => setPageNumber(nextPage.split("v2/")[1])}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
