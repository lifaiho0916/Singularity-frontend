import { createSlice } from "@reduxjs/toolkit"
import type { IProject, IStructure } from "libs/types";
import type { PayloadAction } from "@reduxjs/toolkit"

interface projectState {
    project: IProject | null;
    structure: IStructure | null;
    projects: Array<IProject>;
    zoom: number;
}

const initialState: projectState = {
    project: null,
    structure: null,
    projects: [],
    zoom: 1
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        InitProject: (state) => {
            state.project = null;
            state.structure = null;
            state.projects = [];
        },
        setProject: (state, action: PayloadAction<IProject | null>) => {
            state.project = action.payload
        },
        setStructure: (state, action: PayloadAction<IStructure>) => {
            state.structure = action.payload
        },
        setProjects: (state, action: PayloadAction<Array<IProject>>) => {
            state.projects = action.payload
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload
        }
    }
})

export const { setProject, setStructure, setProjects, InitProject, setZoom } = projectSlice.actions

export default projectSlice.reducer