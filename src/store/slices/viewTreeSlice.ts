import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, IView, INewlyInsertedElement, IWrapperType } from "libs/types";
import { v4 as uuidv4 } from 'uuid'

interface viewTreeSliceState {
    viewTree: IView,
    xMultiplier: number,
    yMultiplier: number,
    currentElementId: string
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
    // Check if the element fits within the current view
    if (fitsWithin(view, element)) {
      // If the view is a Wrapper and has subviews, check each subview
      if (view.type === IComponentType.Wrapper && view.subviews) {
        for (const childView of view.subviews) {
          insertSubview(childView, element);
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
    currentElementId: ""
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
            element.width *= 100 / state.xMultiplier;
            element.height *= 100 / state.yMultiplier;
            // subview contains mouse position(242, 518), type (view, text, image, label, button).
            insertSubview(state.viewTree, element);
        },
        selectElementInViewTree: (state, action:PayloadAction<string>) => {
            state.currentElementId = action.payload;
        }
    }
})


export const { fetchViewTree, addSubViewToViewTree, selectElementInViewTree } = viewTreeSlice.actions;

export default viewTreeSlice.reducer