import { useEffect, useState } from "react";
import AxiosClient from "./AxiosClient";

export default function usePokemonQuery(query: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  useEffect(() => {
    console.log("hey");

    setLoading(true);
    setError(false);
    AxiosClient.get(query)
      .then((res) => {
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemons(res.data.results);
        setLoading(false);
        console.log(pokemons);
      })
      .catch((e) => {
        setError(true);
      });
  }, [query]);

  return { loading, error, pokemons, nextPage, prevPage };
}
