import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, IView, INewlyInsertedElement, IWrapperType, IMinMaxPair, ISplitParameterPair } from "libs/types";
import { v4 as uuidv4 } from 'uuid'

interface viewTreeSliceState {
    viewTree: IView,
    xMultiplier: number,
    yMultiplier: number,
    currentElement: IView | null
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

function insertSubview(view: IView, element: INewlyInsertedElement): void {
    // Check if the element fits within the current view
    if (isElementBelongInViewPanel(element)) {
        // If the view is a Wrapper and has subviews, check each subview
        if (view.type === IComponentType.Wrapper && view.subviews && view.subviews.length > 0 && view.subviews[0].type === IComponentType.Wrapper) {
            for (const childView of view.subviews) {
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
            // If the view is not a Wrapper or has no subviews, create a new subview
            if (!view.subviews) {
                view.subviews = [];
            }
            view.subviews.push(getViewFormatDataFromElement(element));
        }
    }
}

function findElementInViewById(view: IView, id: string): IView | null {
    if (view.id === id) {
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

function splitWrapper(view: IView, wrapperId: string, kind: IWrapperType) {
    if (view.id === wrapperId && view.type == IComponentType.Wrapper) {
        let firstWrapper: IView = {
            id: uuidv4(),
            type: IComponentType.Wrapper,
            x: kind == IWrapperType.Horizontal ? { min: 0, max: 100} : { min: 0, max: 50 },
            y: kind == IWrapperType.Horizontal ? { min: 0, max: 50 } : { min: 0, max: 100},
            details: {
                kind: IWrapperType.Horizontal
            }
        }
        let secondWrapper: IView = {
            id: uuidv4(),
            type: IComponentType.Wrapper,
            x: kind == IWrapperType.Horizontal ? { min: 0, max: 100} : { min: 0, max: 50 },
            y: kind == IWrapperType.Horizontal ? { min: 0, max: 50 } : { min: 0, max: 100},
            details: {
                kind: IWrapperType.Horizontal
            }
        }

        if (view.subviews) {
            firstWrapper.subviews = view.subviews
        }
        view.subviews = [firstWrapper, secondWrapper]
        view.details = {
            ...view.details,
            kind
        }
    }
    if (view.subviews && view.subviews.length > 0) {
        for (let i = 0; i < view.subviews.length; i++) {
            splitWrapper(view.subviews[i], wrapperId, kind)
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
    if (view.subviews && view.subviews.length > 0) {
        for (let i = 0; i < view.subviews.length; i++) {
            let updatedSubview = replaceSubview(view.subviews[i], updatedComponent)
            if (updatedSubview) {
                view.subviews[i] = updatedSubview
                return view
            }
        }
    }
    return null;
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
                    kind: IWrapperType.Horizontal
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
                                x: { min: 0, max: 90 },
                                y: { min: 0, max: 20 },
                                details: {
                                    text: "Dragon Fly",
                                    style: {
                                        fontSize: 20
                                    }
                                }
                            },
                            {
                                id: uuidv4(),
                                type: IComponentType.ButtonComponent,
                                x: { min: 0, max: 90 },
                                y: { min: 0, max: 20 },
                                details: {
                                    text: "Hello",
                                    style: {
                                        fontSize: 20,
                                        backgroundColor: '#00FF00'
                                    }
                                }
                            },
                            {
                                id: uuidv4(),
                                type: IComponentType.TextComponent,
                                x: { min: 0, max: 90 },
                                y: { min: 0, max: 20 },
                                details: {
                                    text: "Hello",
                                    style: {
                                        fontSize: 20
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
    xMultiplier: 480,
    yMultiplier: 850,
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
            console.log("Payload : ", action.payload);
            let element = action.payload;
            element.x *= 100 / state.xMultiplier;
            element.y *= 100 / state.yMultiplier;
            // element.width *= 100 / state.xMultiplier;
            // element.height *= 100 / state.yMultiplier;

            insertSubview(state.viewTree, element);
        },
        selectElementInViewTreeById: (state, action: PayloadAction<string>) => {
            const elementId = action.payload;
            state.currentElement = findElementInViewById(state.viewTree, elementId);
        },
        updateSelectedElementInViewTree: (state, action: PayloadAction<IView>) => {
            replaceSubview(state.viewTree, action.payload);
            state.currentElement = findElementInViewById(state.viewTree, action.payload.id);
        },
        applySplitToWrapper: (state, action: PayloadAction<ISplitParameterPair>) => {
            const {wrapperId, kind} = action.payload;
            // based on wrapperId & kind, need to add two wrappers.
            splitWrapper(state.viewTree, wrapperId, kind);
        }
    }
})

export const { fetchViewTree, addSubViewToViewTree, selectElementInViewTreeById, updateSelectedElementInViewTree, applySplitToWrapper } = viewTreeSlice.actions;

export default viewTreeSlice.reducer