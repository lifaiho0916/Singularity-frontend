import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"

interface toastState {
    show: boolean;
    type: "success" | "info" | "warn" | "error" | undefined;
    title: string;
    content: string;
    life: number;
}

interface notifyAction {
    type: "success" | "info" | "warn" | "error" | undefined;
    title: string;
    content: string;
    life?: number;
}

const initialState: toastState = {
    show: false,
    type: undefined,
    title: '',
    content: '',
    life: 0
}

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        notify: (state, action: PayloadAction<notifyAction>) => {
            const { type, title, content, life = 3000 } = action.payload;
            state.type = type;
            state.title = title;
            state.content = content;
            state.life = life;
            state.show = true;
        },
        unnotify: (state) => {
            state.type = undefined;
            state.title = '';
            state.content = '';
            state.life = 0;
            state.show = false;
        }
    }
})

export const { notify, unnotify } = toastSlice.actions

export default toastSlice.reducer