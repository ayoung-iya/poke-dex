import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PokemonListReponseType, fetchPokemonsAPI } from '../Service/pokemonService'

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (nextUrl?:string) => {
    const response = await fetchPokemonsAPI(nextUrl)
    return response
  }
)

interface PokemonsState {
  pokemons: PokemonListReponseType
}

const initialState = {
  pokemons: {
    count: 0,
    next: '',
    results: []
  },
} as PokemonsState

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemons.fulfilled, (state, action:PayloadAction<PokemonListReponseType>) => {
      // 이미 데이터가 존재하는 경우
      if(state.pokemons.results.length > 0) {
        state.pokemons = {
          ...action.payload,
          results: [...state.pokemons.results, ...action.payload.results]
        }
      } else {
        state.pokemons = action.payload;
      }
    })
  },
})

export const pokemonsReducer = pokemonsSlice.reducer