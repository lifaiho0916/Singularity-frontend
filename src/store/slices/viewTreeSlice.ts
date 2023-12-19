import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, IView, INewlyInsertedElement, IWrapperType } from "libs/types";
import { v4 as uuidv4 } from 'uuid'

interface viewTreeSliceState {
    viewTree: IView,
    xMultiplier: number,
    yMultiplier: number,
    currentElement: IView | null
}

function fitsWithin(view: IView, element: INewlyInsertedElement): boolean {
    return element.x >= view.x.min && element.x + element.width <= view.x.max &&
        element.y >= view.y.min && element.y + element.height <= view.y.max;
}

function getViewFormatDataFromElement(element: INewlyInsertedElement): IView {
    return {
        id: uuidv4(),
        type: element.type,
        x: { min: element.x, max: element.x + element.width },
        y: { min: element.y, max: element.y + element.height },
        details: element.details
    }
}

function insertSubview(view: IView, element: INewlyInsertedElement): void {
    // first check if subview is 
    if (view.type === IComponentType.Wrapper && fitsWithin(view, element)) {
        if (!view.subviews) {
            view.subviews = [];
        }
        for (const childView of view.subviews) {
            insertSubview(childView, element);
        }
        // If no suitable child container is found, add the subview to this container
        if (view.subviews.every(childView => childView.type !== IComponentType.Wrapper || !fitsWithin(childView, element))) {
            view.subviews.push(getViewFormatDataFromElement(element));
        }
    }
}

function findElementInViewById(view: IView, id: string) : IView | null {
    if (view.id == id) {
      return view;
    }
    if (view.subviews) {
      for (let i = 0; i < view.subviews.length; i++) {
        const result = findElementInViewById(view.subviews[i], id);
        if (result) return result;
      }
    }
    return null;
}

function findAndReplaceSubview(view: IView, updatedSubview: IView) {
    if (view.id == updatedSubview.id) {
        Object.assign(view, updatedSubview);
        return true;
    }
    if (view.subviews) {
        for (let i = 0; i < view.subviews.length; i++) {
            if (findAndReplaceSubview(view.subviews[i], updatedSubview)) {
                return true;
            }
        }
    }
    return false;
}

const initialState: viewTreeSliceState = {
    viewTree: {
        id: uuidv4(),
        type: IComponentType.Wrapper,
        x: { min: 0, max: 100 },
        y: { min: 0, max: 100 },
        details: {
            kind: IWrapperType.Horizontal
        },
        subviews: [
            {
                id: uuidv4(),
                type: IComponentType.Wrapper,
                x: { min: 0, max: 100 },
                y: { min: 0, max: 50 },
                details: {
                    kind: IWrapperType.Vertical
                }
            },
            {
                id: uuidv4(),
                type: IComponentType.Wrapper,
                x: { min: 0, max: 100 },
                y: { min: 50, max: 100 },
                details: {
                    kind: IWrapperType.Vertical
                },
                subviews: [
                    {
                        id: uuidv4(),
                        type: IComponentType.Wrapper,
                        x: { min: 0, max: 50 },
                        y: { min: 0, max: 100 },
                        details: {
                            kind: IWrapperType.Horizontal
                        },
                        subviews: [
                            {
                                id: uuidv4(),
                                type: IComponentType.LabelComponent,
                                x: { min: 10, max: 90 },
                                y: { min: 10, max: 20 },
                                details: {
                                    text: "Dragon Fly",
                                    style: {
                                        fontSize: 20,
                                        color: "#f0903c"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        type: IComponentType.Wrapper,
                        x: { min: 50, max: 100 },
                        y: { min: 0, max: 100 },
                        details: {
                            kind: IWrapperType.Horizontal
                        }
                    }
                ]
            }
        ]
    },
    xMultiplier: 320,
    yMultiplier: 650,
    currentElement: null
}

export const viewTreeSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        fetchViewTree: (state, action: PayloadAction<IView>) => {
            state.viewTree = action.payload;
        },
        addSubViewToViewTree: (state, action: PayloadAction<INewlyInsertedElement>) => {
            let element = action.payload;
            element.x *= 100 / state.xMultiplier;
            element.y *= 100 / state.yMultiplier;
            element.width *= 100 / state.xMultiplier;
            element.height *= 100 / state.yMultiplier;
            // subview contains mouse position(242, 518), type (view, text, image, label, button).
            insertSubview(state.viewTree, element);
        },
        selectElementInViewTreeById: (state, action:PayloadAction<string>) => {
            const elementId = action.payload;
            state.currentElement = findElementInViewById(state.viewTree, elementId);
        },
        updateSelectedElementInViewTree: (state, action:PayloadAction<IView>) => {
            findAndReplaceSubview(state.viewTree, action.payload);
        }
    }
})

export const { fetchViewTree, addSubViewToViewTree, selectElementInViewTreeById, updateSelectedElementInViewTree } = viewTreeSlice.actions;

export default viewTreeSlice.reducer