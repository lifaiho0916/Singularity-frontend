import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { ViewType } from "constants"

interface Position {
    min: number;
    max: number;
}

interface View {
    type: ViewType;
    x: Position;
    y: Position;
    subviews?: View[];
    detail?: {
    text?: string;
    color?: string;
    };
}

interface Subview {
    x: number;
    y: number;
    type: ViewType;
    width: number;
    height: number;
}
  

interface viewTreeSliceState {
    viewTree: JSON | null
}

function fitsWithin(view: View, subview: Subview): boolean {
    return subview.x >= view.x.min && subview.x + subview.width <= view.x.max &&
           subview.y >= view.y.min && subview.y + subview.height <= view.y.max;
}

function insertSubview(viewTree: View, subview: Subview): void {
    if (fitsWithin(viewTree, subview)) {
        if (!viewTree.subviews) {
          viewTree.subviews = [];
        }
        for (const childView of viewTree.subviews) {
          insertSubview(childView, subview);
        }
        // If no suitable child container is found, add the subview to this container
        if (viewTree.subviews.every(childView => !fitsWithin(childView, subview))) {
          viewTree.subviews.push({ ...subview, subviews: [] });
        }
    }
}

const initialState: viewTreeSliceState = {
    viewTree: {
        type: ViewType.Container,
        x: {min: 0, max: 768},
        y: {min: 0, max: 1024},
        subviews: [
            {
                type: ViewType.Container,
                x: {min: 0, max: 768},
                y: {min: 0, max: 512}
            },
            {
                type: ViewType.Container,
                x: {min: 0, max: 768},
                y: {min: 512, max: 1024},
                subviews: [
                    {
                        type: ViewType.Container,
                        x: {min: 0, max: 384},
                        y: {min: 0, max: 512},
                        subview: {
                            type: ViewType.Container,
                            x: {min: 50, max: 350},
                            y: {min, 50, max: 100},
                            detail: {
                                text: "Dragon Fly",
                                color: "#f0903c"
                            }
                        }
                    },
                    {
                        type: ViewType.Container,
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
        fetchViewTree: (state, action: PayloadAction<View>) => {
            state.viewTree = action.payload;
        },
        addSubViewToViewTree: (state, action: PayloadAction<Subview>) => {
            const subview = action.payload;
            // subview contains mouse position(242, 518), type (view, text, image, label, button).
            insertSubview(state.viewTree, subview);
        }
    }
})

export const { fetchViewTree } = viewTreeSlice.actions;

export default viewTreeSlice.reducer