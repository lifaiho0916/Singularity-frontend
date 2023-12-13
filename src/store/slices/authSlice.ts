import { createSlice } from "@reduxjs/toolkit"
import { AUTH_ACCESS_TOKEN } from "constants/";

import type { IUser } from "libs/types";
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    currentUser: IUser | null;
    accessToken: string | null;
    isLogged: boolean;
    refreshToken: string;
}

const initialState: AuthState = {
    currentUser: null,
    accessToken: localStorage.getItem(AUTH_ACCESS_TOKEN) || null,
    isLogged: localStorage.getItem(AUTH_ACCESS_TOKEN) ? true : false,
    refreshToken: ""
}

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
            localStorage.setItem(AUTH_ACCESS_TOKEN, action.payload)
            state.isLogged = true
        },
        logout: (state) => {
            state.accessToken = null
            localStorage.removeItem(AUTH_ACCESS_TOKEN)
            state.isLogged = false
            state.currentUser = null
        },
        setCurrentUser: (state, action: PayloadAction<IUser>) => {
            state.currentUser = action.payload
        }
    }
})

export const { login, logout, setCurrentUser } = authSlice.actions

export default authSlice.reducer