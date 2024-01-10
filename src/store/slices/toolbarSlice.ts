import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface ToolbarSliceState {
    newToolSelected : boolean
    ToolComponentID : number
    toolbarDragStartElementID : number
    toolbarDragFlagOn: boolean
}

const initialState: ToolbarSliceState = {
    newToolSelected: false,
    ToolComponentID: 0,
    toolbarDragFlagOn: false,
    toolbarDragStartElementID: -1

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
        },
        toolbarDragStarted (state, action : PayloadAction<number>) {
            state.toolbarDragStartElementID = action.payload;
            state.toolbarDragFlagOn = true;
        },
        toolbarDragEnded(state) {
            state.toolbarDragFlagOn = false;
        },
    }
})

export const {
    setToolbarComponentSelected,
    unselectToolBarComponent,
    toolbarDragEnded,
    toolbarDragStarted
} = ToolbarSlice.actions;

export default ToolbarSlice.reducer