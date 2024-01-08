import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import authReducer from 'store/slices/authSlice';
import toastReducer from 'store/slices/toastSlice';
import projectReducer from 'store/slices/projectSlice';
import templateReducer from 'store/slices/templateSlice';
import viewTreeReducer from 'store/slices/viewTreeSlice';
import dragSliceReducer from './slices/dragSlice';

const middleware = [...getDefaultMiddleware(), logger];

export const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    project: projectReducer,
    template: templateReducer,
    viewTree: viewTreeReducer,
    drag: dragSliceReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleware 
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;