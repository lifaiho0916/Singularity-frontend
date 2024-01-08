import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface DragSliceState {
    dragStartElementID : string
    dragEndElementID : string
    dragFlagOn: boolean
}

const initialState: DragSliceState = {
    dragEndElementID: '',
    dragStartElementID: '',
    dragFlagOn: false
}



export const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        dragStarted(state, action : PayloadAction<string>) {
            state.dragStartElementID = state.dragEndElementID = action.payload;
            state.dragFlagOn = true;
        },
        dragEnded(state, action : PayloadAction<string>) {
            state.dragFlagOn = false;
            state.dragEndElementID = action.payload;
        },
        dragElementChanged(state, action: PayloadAction<string>) {
            state.dragEndElementID = action.payload;
        }
    }
})

export const {
    dragStarted,
    dragElementChanged,
    dragEnded
} = dragSlice.actions;

export default dragSlice.reducer