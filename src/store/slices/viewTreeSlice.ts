import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, IView, INewlyInsertedElement, IWrapperType } from "libs/types";

interface viewTreeSliceState {
    viewTree: IView,
    xMultiplier: number,
    yMultiplier: number
}

function fitsWithin(view: IView, element: INewlyInsertedElement): boolean {
    return element.x >= view.x.min && element.x + element.width <= view.x.max &&
        element.y >= view.y.min && element.y + element.height <= view.y.max;
}

function getViewFormatDataFromElement(element: INewlyInsertedElement): IView {
    return {
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

const initialState: viewTreeSliceState = {
    viewTree: {
        type: IComponentType.Wrapper,
        x: { min: 0, max: 100 },
        y: { min: 0, max: 100 },
        details: {
            kind: IWrapperType.Horizontal
        },
        subviews: [
            {
                type: IComponentType.Wrapper,
                x: { min: 0, max: 100 },
                y: { min: 0, max: 50 },
                details: {
                    kind: IWrapperType.Vertical
                }
            },
            {
                type: IComponentType.Wrapper,
                x: { min: 0, max: 100 },
                y: { min: 50, max: 100 },
                details: {
                    kind: IWrapperType.Vertical
                },
                subviews: [
                    {
                        type: IComponentType.Wrapper,
                        x: { min: 0, max: 50 },
                        y: { min: 0, max: 100 },
                        details: {
                            kind: IWrapperType.Horizontal
                        },
                        subviews: [
                            {
                                type: IComponentType.LabelComponent,
                                x: { min: 10, max: 90 },
                                y: { min: 10, max: 20 },
                                details: {
                                    text: "Dragon Fly",
                                    style: {
                                        color: "#f0903c",
                                        fontSize: 20
                                    }
                                }
                            }
                        ]
                    },
                    {
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
    yMultiplier: 650
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
        }
    }
})

export const { fetchViewTree } = viewTreeSlice.actions;

export default viewTreeSlice.reducer