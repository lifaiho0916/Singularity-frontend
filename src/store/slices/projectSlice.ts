import { createSlice } from "@reduxjs/toolkit"
import type { IProject } from "src/libs/types";
import type { PayloadAction } from "@reduxjs/toolkit"

interface projectState {
    project: object | null;
    projects: Array<IProject>
}

const initialState: projectState = {
    project: null,
    projects: []
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<object>) => {
            state.project = action.payload
        },
        setProjects: (state, action: PayloadAction<Array<IProject>>) => {
            state.projects = action.payload
        }        
    }
})

export const { setProject, setProjects } = projectSlice.actions

export default projectSlice.reducer