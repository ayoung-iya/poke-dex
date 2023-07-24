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

export const fetchPokemons = async (nextUrl?:string) => {
  const requestUrl = nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon";

  const response = await remote.get<PokemonListReponseType>(requestUrl);

  return response.data;
};

interface PokemonDetailResponseType {
  id: number,
  weight: number,
  height: number,
  name: string,
  types: {
    type: {
      name: string,
    }
  }[],
  sprites: {
    front_default: string,
    other: {
      dream_world: {
        front_default: string
      }
      'official-artwork': {
        front_default: string
      }
    }
  },
  stats: {
    base_stat: number,
    stat: {
      name: string
    }
  }[],
}

interface PokemonSpeciesResponseType {
  color: {
    name: string
  },
  names: {
    name: string,
    language: {
      name: string,
    }
  }[]
}

export interface PokemonDetailType {
  id: number,
  weight: number,
  height: number,
  name: string,
  koreanName: string,
  color: string,
  types: string[],
  images: {
    frontDefault: string,
    dreamWorldDefault: string,
    OfficialArtworkFront: string
  },
  baseState: {
    name: string,
    value: number
  }[]
}

export const fetchPokemonDetail = async (name:string):Promise<PokemonDetailType> => {
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

  const response = await remote.get<PokemonDetailResponseType>(pokemonDetailUrl);
  const speciesResponse = await remote.get<PokemonSpeciesResponseType>(pokemonSpeciesUrl);
  const detail = response.data;
  const species = speciesResponse.data;

  const koreanName = species.names.find(item => item.language.name === 'ko')?.name ?? detail.name;

  return {
    id: detail.id,
    name: detail.name,
    color: species.color.name,
    koreanName: koreanName,
    height: detail.height / 10,  //미터단위
    weight: detail.weight / 10, // kg 단위
    types: detail.types.map(item => item.type.name),
    images: {
      frontDefault: detail.sprites.front_default,
      dreamWorldDefault: detail.sprites.other.dream_world.front_default,
      OfficialArtworkFront: detail.sprites.other["official-artwork"].front_default
    },
    baseState: detail.stats.map(item => {
      return {
        name: item.stat.name,
        value: item.base_stat
      }
    })
  }
  console.log(response);
}
