import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from 'src/store/slices/authSlice';
import toastReducer from 'src/store/slices/toastSlice';
import projectReducer from 'src/store/slices/projectSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    project: projectReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;