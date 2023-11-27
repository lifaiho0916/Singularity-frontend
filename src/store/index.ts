import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from 'src/store/slices/authSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;