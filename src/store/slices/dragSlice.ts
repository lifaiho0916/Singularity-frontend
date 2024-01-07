import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IPosition } from "libs/types"

interface DragSliceState {
    startPos_x: number,
    startPos_y: number,
    dragPos_x: number,
    dragPos_y: number,
    dragFlagOn: boolean
}

const initialState: DragSliceState = {
    startPos_x: 0,
    startPos_y: 0,
    dragPos_x: 0,
    dragPos_y: 0,
    dragFlagOn: false
}



export const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        dragStarted(state, action : PayloadAction<IPosition>) {
            state.dragFlagOn = true;
            state.startPos_x = action.payload.x;
            state.startPos_y = action.payload.y;
        },
        drawDraggedElement(state, action : PayloadAction<IPosition>) {
            if(state.dragFlagOn) {
                state.dragPos_x = action.payload.x;
                state.dragPos_y = action.payload.y;
            }
        },
        dragEnded(state) {
            state.dragFlagOn = false;
            state.startPos_x = state.startPos_y = state.dragPos_x = state.dragPos_y = 0;
        }
    }
})

export const {
    dragStarted,
    drawDraggedElement,
    dragEnded
} = dragSlice.actions;

export default dragSlice.reducer