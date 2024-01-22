import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import networkReducer from './slices/networkSlice'
import userReducer from './slices/userSlice'
const persistConfig = {
  key: 'wallet-keeper',
  storage,
  whitelist: ['user'],
}

const reducers = combineReducers({
  user: userReducer,
  network: networkReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
  reducer: persistedReducer,
})
export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
