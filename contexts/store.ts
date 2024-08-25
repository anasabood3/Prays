import { configureStore } from '@reduxjs/toolkit'
// adding created settings reducer
import  settingsReducer  from './settingsSlice'
import dataReducer from './dataSlice';
export const store = configureStore({
  reducer: {
    settings:settingsReducer,
    data:dataReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

