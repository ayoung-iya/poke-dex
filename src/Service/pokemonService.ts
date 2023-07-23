import axios from "axios";

const remote = axios.create();

export interface PokemonListReponseType {
  count: number,
  next: string,
  results: {
    name: string,
    url: string
  }[]
}

export const fetchPokemons = async () => {
  const defaultUrl = "https://pokeapi.co/api/v2/pokemon";

  const response = await remote.get<PokemonListReponseType>(defaultUrl);

  return response.data;
};
