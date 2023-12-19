import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, IView, INewlyInsertedElement } from "libs/types";

interface viewTreeSliceState {
    viewTree: IView
}

function fitsWithin(view: IView, element: INewlyInsertedElement): boolean {
    return element.x >= view.x.min && element.x + element.width <= view.x.max &&
           element.y >= view.y.min && element.y + element.height <= view.y.max;
}

function getViewFormatDataFromElement(element: INewlyInsertedElement): IView {
    return {
        type: element.type,
        x: { min: element.x, max: element.x + element.width},
        y: { min: element.y, max: element.y + element.height},
        details: element.details
    }
}

function insertSubview(view: IView, element: INewlyInsertedElement): void {
    // first check if subview is 
    if (view.type == IComponentType.Wrapper && fitsWithin(view, element)) {
        if (!view.subviews) {
          view.subviews = [];
        }
        for (const childView of view.subviews) {
          insertSubview(childView, element);
        }
        // If no suitable child container is found, add the subview to this container
        if (view.subviews.every(childView => childView.type != IComponentType.Wrapper || !fitsWithin(childView, element))) {
          view.subviews.push(getViewFormatDataFromElement(element));
        }
    }
}

const initialState: viewTreeSliceState = {
    viewTree: {
        type: IComponentType.Wrapper,
        x: {min: 0, max: 768},
        y: {min: 0, max: 1024},
        subviews: [
            {
                type: IComponentType.Wrapper,
                x: {min: 0, max: 768},
                y: {min: 0, max: 512}
            },
            {
                type: IComponentType.Wrapper,
                x: {min: 0, max: 768},
                y: {min: 512, max: 1024},
                subviews: [
                    {
                        type: IComponentType.Wrapper,
                        x: {min: 0, max: 384},
                        y: {min: 0, max: 512},
                        subviews: [
                            {
                                type: IComponentType.LabelComponent,
                                x: {min: 50, max: 350},
                                y: {min: 50, max: 100},
                                details: {
                                    text: "Dragon Fly",
                                    color: "#f0903c"
                                }
                            }
                        ]
                    },
                    {
                        type: IComponentType.Wrapper,
                        x: {min: 384, max: 768},
                        y: {min: 0, max: 512}
                    }
                ]
            }
        ]
    }
}

export const viewTreeSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        fetchViewTree: (state, action: PayloadAction<IView>) => {
            state.viewTree = action.payload;
        },
        addSubViewToViewTree: (state, action: PayloadAction<INewlyInsertedElement>) => {
            const element = action.payload;
            // subview contains mouse position(242, 518), type (view, text, image, label, button).
            insertSubview(state.viewTree, element);
        }
    }
})

export const { fetchViewTree } = viewTreeSlice.actions;

export default viewTreeSlice.reducer