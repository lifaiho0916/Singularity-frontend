import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface ToolbarSliceState {
    newToolSelected : boolean
    ToolComponentID : number
}

const initialState: ToolbarSliceState = {
    newToolSelected: false,
    ToolComponentID: 0
}



export const ToolbarSlice = createSlice({
    name: "toolbar",
    initialState,
    reducers: {
        setToolbarComponentSelected: (state, action: PayloadAction<number>) => {
            state.newToolSelected = true;
            state.ToolComponentID = action.payload
        },
        unselectToolBarComponent: (state) => {
            state.newToolSelected = false;
        }
    }
})

export const {
    setToolbarComponentSelected,
    unselectToolBarComponent
} = ToolbarSlice.actions;

export default ToolbarSlice.reducer