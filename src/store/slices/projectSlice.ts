import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IProject, IStructure, IComponentType, IView, INewlyInsertedElement, IWrapperType, ISplitParameterPair } from "libs/types";
import { v4 as uuidv4 } from 'uuid'
import { uploadProjectData } from "libs/axios/api/project";

interface projectState {
    project: IProject | null;
    structure: IStructure | null;
    projects: Array<IProject>;
    zoom: number,
    viewTrees: Array<IView>,
    viewTree: IView | null,
    xMultiplier: number,
    yMultiplier: number,
    currentElement: IView | null,
    previewIndex: number
}

function isElementBelongInViewPanel(element: INewlyInsertedElement): boolean {
    // return element.x >= 0 && element.x + element.width <= 100 &&
    //     element.y >= 0 && element.y + element.height <= 100;
    return element.x >= 0 && element.x <= 100 &&
        element.y >= 0 && element.y <= 100;
}

function getViewFormatDataFromElement(element: INewlyInsertedElement): IView {
    return {
        id: uuidv4(),
        type: element.type,
        // x: { min: element.x, max: element.x + element.width },
        // y: { min: element.y, max: element.y + element.height },
        x: { min: 0, max: element.width },
        y: { min: 0, max: element.height },
        details: element.details
    }
}

function deleteElement(view: IView, element: IView): IView | null {
    if (view.id === element.id) {
        // Element found, delete it
        return null;
    } else if (view.content) {
        // Traverse content recursively
        view.content = view.content.filter(subview => deleteElement(subview, element));
        if (view.content.length === 0) {
            delete view.content
        }
        else if (view.content.length === 1 && view.content[0].type === IComponentType.Wrapper) {
            if (view.content[0].content) {
                view.details = view.content[0].details;
                view.content = JSON.parse(JSON.stringify(view.content[0].content));
            } else {
                delete view.content
            }
        }
    }
    return view;
}

function insertSubview(view: IView, element: INewlyInsertedElement): void {
    // Check if the element fits within the current view
    if (isElementBelongInViewPanel(element)) {
        // If the view is a Wrapper and has content, check each subview
        if (view.type === IComponentType.Wrapper && view.content && view.content.length > 0 && view.content[0].type === IComponentType.Wrapper) {
            for (const childView of view.content) {
                let elementClone = JSON.parse(JSON.stringify(element))
                insertSubview(childView, {
                    ...elementClone,
                    x: 100.0 * (elementClone.x - childView.x.min) / (childView.x.max - childView.x.min),
                    y: 100.0 * (elementClone.y - childView.y.min) / (childView.y.max - childView.y.min),
                    width: elementClone.width, //* 100 / (childView.x.max - childView.x.min),
                    height: elementClone.height// * 100 / (childView.y.max - childView.y.min)
                });
            }
        } else {
            // If the view is not a Wrapper or has no content, create a new subview
            if (!view.content) {
                view.content = [];
            }
            view.content.push(getViewFormatDataFromElement(element));
        }
    }
}

function findElementInViewById(view: IView, id: string): IView | null {
    if (view.id === id) {
        return view;
    }
    if (view.content) {
        for (let i = 0; i < view.content.length; i++) {
            const result = findElementInViewById(view.content[i], id);
            if (result) return result;
        }
    }
    return null;
}

function splitWrapper(view: IView, wrapperId: string, kind: IWrapperType) {
    if (view.id === wrapperId && view.type === IComponentType.Wrapper) {
        let firstWrapper: IView = {
            id: uuidv4(),
            type: IComponentType.Wrapper,
            x: kind === IWrapperType.Horizontal ? { min: 0, max: 100 } : { min: 0, max: 50 },
            y: kind === IWrapperType.Horizontal ? { min: 0, max: 50 } : { min: 0, max: 100 },
            details: {
                kind: IWrapperType.Horizontal
            }
        }
        let secondWrapper: IView = {
            id: uuidv4(),
            type: IComponentType.Wrapper,
            x: kind === IWrapperType.Horizontal ? { min: 0, max: 100 } : { min: 50, max: 100 },
            y: kind === IWrapperType.Horizontal ? { min: 50, max: 100 } : { min: 0, max: 100 },
            details: {
                kind: IWrapperType.Horizontal
            }
        }

        if (view.content) {
            firstWrapper.content = view.content
        }
        view.content = [firstWrapper, secondWrapper]
        view.details = {
            ...view.details,
            kind
        }
    }
    if (view.content && view.content.length > 0) {
        for (let i = 0; i < view.content.length; i++) {
            splitWrapper(view.content[i], wrapperId, kind)
        }
    }
    return null;
}

function replaceSubview(view: IView, updatedComponent: IView | null): IView | null {
    if (!updatedComponent)
        return null
    if (view.id === updatedComponent.id) {
        return updatedComponent
    }
    if (view.content && view.content.length > 0) {
        for (let i = 0; i < view.content.length; i++) {
            let updatedSubview = replaceSubview(view.content[i], updatedComponent)
            if (updatedSubview) {
                view.content[i] = updatedSubview
                return view
            }
        }
    }
    return null;
}

const putViewTreesData = async (project: IProject | null, stringifiedViewTrees: string) => {
    if (!project) return
    const res = await uploadProjectData(project.id, stringifiedViewTrees);
    if (res) {
        console.log(`${res}`);
    } else {
        console.log(`There was an issue to save data`);
    }
};

const initialState: projectState = {
    project: null,
    structure: null,
    projects: [],
    zoom: 1.0,
    viewTrees: [
        {
            id: uuidv4(),
            name: 'First Screen',
            type: IComponentType.Wrapper,
            x: { min: 0, max: 100 },
            y: { min: 0, max: 100 },
            details: {
                kind: IWrapperType.Horizontal
            }
        },
    ],
    viewTree: null,
    xMultiplier: 320,
    yMultiplier: 650,
    currentElement: null,
    previewIndex: 0
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
            if (state.project && state.project.data) {
                state.viewTrees = JSON.parse(state.project.data);
            }
        },
        setStructure: (state, action: PayloadAction<IStructure>) => {
            state.structure = action.payload
        },
        setProjects: (state, action: PayloadAction<Array<IProject>>) => {
            state.projects = action.payload
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload
        },
        setViewTree: (state, action: PayloadAction<IView>) => {
            state.viewTree = action.payload
        },
        setViewTrees: (state, action: PayloadAction<Array<IView>>) => {
            state.viewTrees = action.payload
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        fetchViewTree: (state, action: PayloadAction<IView>) => {
            state.viewTree = action.payload;
        },
        addSubViewToViewTree: (state, action: PayloadAction<INewlyInsertedElement>) => {
            let element = action.payload;
            element.x *= 100 / state.xMultiplier * state.zoom;
            element.y *= 100 / state.yMultiplier * state.zoom;
            // element.width *= 100 / state.xMultiplier;
            // element.height *= 100 / state.yMultiplier;

            insertSubview(state.viewTree as IView, element);
            const index = state.viewTrees.findIndex((view: IView) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IView;
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        selectElementInViewTreeById: (state, action: PayloadAction<string>) => {
            const elementId = action.payload;
            state.currentElement = findElementInViewById(state.viewTree as IView, elementId);
        },
        updateSelectedElementInViewTree: (state, action: PayloadAction<IView>) => {
            replaceSubview(state.viewTree as IView, action.payload);
            state.currentElement = findElementInViewById(state.viewTree as IView, action.payload.id);
            const index = state.viewTrees.findIndex((view: IView) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IView;
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        deleteSelectedElementInViewTree: (state, action: PayloadAction<IView>) => {
            deleteElement(state.viewTree as IView, action.payload);
            state.currentElement = null
            const index = state.viewTrees.findIndex((view: IView) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IView;
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        applySplitToWrapper: (state, action: PayloadAction<ISplitParameterPair>) => {
            const { wrapperId, kind } = action.payload;
            // based on wrapperId & kind, need to add two wrappers.
            splitWrapper(state.viewTree as IView, wrapperId, kind);
            const index = state.viewTrees.findIndex((view: IView) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IView;
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        deleteWrapper: (state, action: PayloadAction<string>) => {
            const subview = findElementInViewById(state.viewTree as IView, action.payload);
            if (!subview) return
            if (state.currentElement && findElementInViewById(subview, state.currentElement.id)) {
                state.currentElement = null;
            }
            deleteElement(state.viewTree as IView, subview);
            const index = state.viewTrees.findIndex((view: IView) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IView;
            putViewTreesData(state.project, JSON.stringify(state.viewTrees));
        },
        initCurrentElement: (state, action) => {
            state.currentElement = null
        },
        setMultiplayerSize: (state, action: PayloadAction<{ width: number, height: number }>) => {
            state.xMultiplier = action.payload.width;
            state.yMultiplier = action.payload.height;
        },
        setPreviewIndex: (state, action: PayloadAction<number>) => {
            state.previewIndex = action.payload
        }
    }
})

export const {
    setProject,
    setStructure,
    setProjects,
    InitProject,
    setZoom,
    setViewTree,
    setViewTrees,
    fetchViewTree,
    addSubViewToViewTree,
    selectElementInViewTreeById,
    updateSelectedElementInViewTree,
    deleteSelectedElementInViewTree,
    deleteWrapper,
    applySplitToWrapper,
    initCurrentElement,
    setMultiplayerSize,
    setPreviewIndex
} = projectSlice.actions

export default projectSlice.reducer