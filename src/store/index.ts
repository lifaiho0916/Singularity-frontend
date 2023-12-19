import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from 'store/slices/authSlice';
import toastReducer from 'store/slices/toastSlice';
import projectReducer from 'store/slices/projectSlice';
import templateReducer from 'store/slices/templateSlice';
import viewTreeReducer from 'store/slices/viewTreeSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    project: projectReducer,
    template: templateReducer,
    viewTree: viewTreeReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;