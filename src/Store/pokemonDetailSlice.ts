import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonDetailType, fetchPokemonDetailAPI } from "../Service/pokemonService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemons/fetchPokemonsDetail",
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      // return 값이 false라면 위의 리퀘스트값을 보내지 않는다.
      // 이미 가지고 있는 값이라면 리퀘스트를 보내고 싶지 않다.

      const { pokemonDetail } = getState() as RootState;
      const pokemon = pokemonDetail.pokemonDetails[name];

      return !pokemon;
    },
  }
);

interface PokemonDetailState {
  /*
    pokemonDetails: {
      '이상해씨': PokemonDetailType,
      '피카츄': PokemonDetailType,
    }
  */
  // Record < key, value >
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        // 이미 데이터가 존재하는 경우
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
