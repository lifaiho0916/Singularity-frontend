import { createSlice } from "@reduxjs/toolkit"
import type { ITemplate } from "src/libs/types";
import type { PayloadAction } from "@reduxjs/toolkit"

interface templateState {
    template: ITemplate | null,
    templates: Array<ITemplate>
}

const initialState: templateState = {
    template: null,
    templates: []
}

export const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction<Array<ITemplate>>) => {
            state.templates = action.payload
        },
        setTemplate: (state, action: PayloadAction<ITemplate>) => {
            state.template = action.payload
        }
    }
})

export const { setTemplates, setTemplate } = templateSlice.actions

export default templateSlice.reducer