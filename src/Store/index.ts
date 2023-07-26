import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { imageTypeReducer } from './imageTypeSlice'
import { pokemonsReducer } from './pokemonsSlice'
import { pokemonDetailReducer } from './pokemonDetailSlice'
// ...

export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
    pokemons: pokemonsReducer,
    pokemonDetail: pokemonDetailReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//Store에 데이터를 업데이트 할 때 사용
export const useAppDispatch = () => useDispatch<AppDispatch>()