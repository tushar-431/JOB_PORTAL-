import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import jobSlice from "./jobSlice.js"
import jobReducer from "./jobSlice.js"
import companyReducer from "./companySlice.js";
import { createRoot } from "react-dom/client";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { companySlice } from './companySlice.js'
import applicationSlice from './applicationSlice.js'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
    
        auth: authReducer,
        job: jobSlice,
        jobs:jobReducer,
        company: companySlice,
        company: companyReducer,
        application: applicationSlice
        
    
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
   
    
    
})

export default store