import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    accessToken: string | null;
    isLogged: boolean;
    refreshToken: string;
}

const initialState: AuthState = {
    accessToken: null,
    isLogged: false,
    refreshToken: ""
}

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
            localStorage.setItem("access_token", action.payload)
            state.isLogged = true
        },
        logout: (state) => {
            state.accessToken = null
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            state.isLogged = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer