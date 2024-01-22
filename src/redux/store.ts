import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { NETWORK_SLICE_NAME, USER_SLICE_NAME } from '../constants/redux'
import networkReducer from './slices/networkSlice'
import userReducer from './slices/userSlice'
const persistConfig = {
  key: 'wallet-keeper',
  storage,
  whitelist: [USER_SLICE_NAME, NETWORK_SLICE_NAME],
}

const reducers = combineReducers({
  user: userReducer,
  network: networkReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
