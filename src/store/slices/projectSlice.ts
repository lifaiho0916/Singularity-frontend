import { createSlice } from "@reduxjs/toolkit"
import type { IProject } from "src/libs/types";
import type { PayloadAction } from "@reduxjs/toolkit"

interface projectState {
    project: IProject | null;
    structure: Object | null;
    projects: Array<IProject>;
}

const initialState: projectState = {
    project: null,
    structure: null,
    projects: []
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<IProject>) => {
            state.project = action.payload
        },
        setStructure: (state, action: PayloadAction<Array<Object>>) => {
            state.structure = action.payload
        },
        setProjects: (state, action: PayloadAction<Array<IProject>>) => {
            state.projects = action.payload
        }
    }
})

export const { setProject, setStructure, setProjects } = projectSlice.actions

export default projectSlice.reducer