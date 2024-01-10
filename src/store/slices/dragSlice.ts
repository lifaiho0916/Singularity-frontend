import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface DragSliceState {
    dragStartElementID : string
    dragFlagOn: boolean
}

const initialState: DragSliceState = {
    dragStartElementID: '',
    dragFlagOn: false
}



export const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        dragStarted(state, action : PayloadAction<string>) {
            state.dragStartElementID = action.payload;
            state.dragFlagOn = true;
        },
        dragEnded(state, action : PayloadAction<string>) {
            state.dragFlagOn = false;
        },
    }
})

export const {
    dragStarted,
    dragEnded
} = dragSlice.actions;

export default dragSlice.reducer