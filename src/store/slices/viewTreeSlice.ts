import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IComponentType, INewlyInsertedElement, ISplitParameterPair, IElement, IWrapperType } from "libs/types";
import { v4 as uuidv4 } from 'uuid'
import { IPosition } from '../../libs/types/index';
import { Column } from "primereact/column";

interface viewTreeSliceState {
    zoom: number,
    viewTrees: Array<IElement>,
    viewTree: IElement | null,
    currentElement: IElement | null,
    button_count: number,
    image_count: number,
    text_count: number,
    label_count: number,
    wrapper_count: number,
    responsive: string
}

const initialState: viewTreeSliceState = {
    zoom: 1.0,
    viewTrees: [
        {
            id: uuidv4(),
            name: 'Screen1',
            parent: 'root1',
            type: IComponentType.Wrapper,
            style: {
                display: "flex",
                minHeight: "30px",
                fontSize: 16
            },
            child: [],
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 320,
                height: 650
            },
            content: '',
            link: ''
        },
    ],
    viewTree: null,
    currentElement: null,
    button_count: 0,
    image_count: 0,
    text_count: 0,
    label_count: 0,
    wrapper_count: 0,
    responsive: 'mobile'
}

function deleteElement(view: IElement, element: IElement) {
    // if element is root element delete all childs
    if(element.parent === 'root') element.child.slice(0, element.child.length)
    else {
        // delete the component from parent
        const parentElement:IElement = findElementInViewById(view, element.parent);
        parentElement.child = parentElement.child.filter(item=> item.id !== element.id)
        // if element is wrapper element move child to it's parent's child array
        if(element.type === IComponentType.Wrapper)  element.child.forEach(item => parentElement.child.push(item));
    }
}

function isElementBelongInViewPanel(view: IElement, element: IPosition): boolean {
    return (
        element.x >= view.position.x && 
        element.y >= view.position.y && 
        element.x <= view.position.x + view.size.width && 
        element.y <= view.position.y + view.size.height
    );
}

function findClosestWrapper(view : IElement , pos : IPosition, res: IElement ): IElement  {
    if (view.child) {
        for (const child of view.child) {
            if (child.type === IComponentType.Wrapper && isElementBelongInViewPanel(child, pos)) {
                if (!res || (
                    res.position.x >= child.position.x && res.position.y >= child.position.y &&
                    res.position.x + res.size.width <= child.position.x + child.size.width &&
                    res.position.y + res.size.height <= child.position.y + child.size.height
                )) {
                    res = child;
                }
            }
    
          // Recursively check child elements
          res = findClosestWrapper(child, pos, res);
        }
    }
    return res;
}

function insertSubview(view: IElement, element: INewlyInsertedElement, name: string): void {
    let position: IPosition = {
        x: element.x,
        y: element.y
    };
    let closestWrapper : IElement = findClosestWrapper(view, position, view);
    closestWrapper.child.push({
        id: uuidv4(),
        name: name,
        parent: closestWrapper.id,
        type: element.type,
        style: {
            display: "block",
            position: element.type === IComponentType.Wrapper ? "relative" : 'static',
            minHeight: "30px",
            top: element.x - closestWrapper.position.x,
            left: element.y - closestWrapper.position.y
        },
        child: [],
        position: {
            x: element.x - closestWrapper.position.x,
            y: element.y - closestWrapper.position.y
        },
        size: {
            width: closestWrapper.size.width,
            height: 30
        },
        content: element.content,
        link: ''
    })
}

function findElementInViewById(view: IElement, id: string): IElement {
    if (view.id === id) {
        return view;
    }
    if (view.child) {
        for (let i = 0; i < view.child.length; i++) {
            const result = findElementInViewById(view.child[i], id);
            if (result) return result;
        }
    }
    return {
        id: '',
        name: '',
        parent: '',
        style: {},
        child: [],
        type: IComponentType.ButtonComponent,
        position: {x:0, y:0},
        size: {width:0, height:0},
        content: '',
        link: '',
    };
}

function splitWrapper(view: IElement, wrapperId: string, id: number, kind: IWrapperType) {
    if (view.id === wrapperId && view.type === IComponentType.Wrapper) {
        view.style = {
            ...view.style,
            display: "flex",
            flexWrap: kind === IWrapperType.Vertical ? "wrap" : 'nowrap'
        }
        let firstWrapper: IElement = {
            id: uuidv4(),
            name:`wrapper ${id+1}`,
            parent: view.id,
            type: IComponentType.Wrapper,
            style: {
                position: "relative"
            },
            position: { x:0, y: 0},
            size: { width: view.size.width, height: 30 },
            child: view.child,
            content: '',
            link: ''
        }
        let secondWrapper: IElement = {
            id: uuidv4(),
            parent: view.id,
            name:`wrapper ${id+2}`,
            type: IComponentType.Wrapper,
            style: {
                position: "relative"
            },
            position: { x:0, y: 0},
            size: { width: view.size.width, height: 30 },
            child: [],
            content: '',
            link: ''
        }
        view.child.slice(0, view.child.length)
        view.child.push(firstWrapper)
        view.child.push(secondWrapper)
    }
    else if (view.child && view.child.length > 0) {
        for (let i = 0; i < view.child.length; i++) {
            splitWrapper(view.child[i], wrapperId, id, kind)
        }
    }
    return null;
}

function replaceSubview(view: IElement, updatedComponent: IElement | null): IElement | null {
    if (!updatedComponent)
        return null
    if (view.id === updatedComponent.id) {
        return updatedComponent
    }
    if (view.child && view.child.length > 0) {
        for (let i = 0; i < view.child.length; i++) {
            let updatedSubview = replaceSubview(view.child[i], updatedComponent)
            if (updatedSubview) {
                view.child[i] = updatedSubview
                return view
            }
        }
    }
    return null;
}

export const viewTreeSlice = createSlice({
    name: "viewtree",
    initialState,
    reducers: {
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload
        },
        setViewTree: (state, action: PayloadAction<IElement>) => {
            state.viewTree = action.payload
        },
        addViewTrees: (state, action: PayloadAction<IElement>) => {
            state.viewTrees.push(action.payload)
        },
        fetchViewTree: (state, action: PayloadAction<IElement>) => {
            state.viewTree = action.payload;
        },
        addSubViewToViewTree: (state, action: PayloadAction<INewlyInsertedElement>) => {
            let element = action.payload;
            let name;
            switch(element.type)
            {
                case IComponentType.ButtonComponent:
                    name = `button ${state.button_count+1}`
                    state.button_count++;
                    break;
                case IComponentType.TextComponent:
                    name = `text ${state.text_count+1}`
                    state.text_count++;
                    break;
                case IComponentType.LabelComponent:
                    name = `label ${state.label_count+1}`
                    state.label_count++;
                    break;
                case IComponentType.ImageComponent:
                    name = `image ${state.image_count+1}`
                    state.image_count++;
                    break;
                case IComponentType.Wrapper:
                    name = `wrapper ${state.wrapper_count+1}`
                    state.wrapper_count++;
                    break;
            }
            insertSubview(state.viewTree as IElement, element, name);
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        selectElementInViewTreeById: (state, action: PayloadAction<string>) => {
            const elementId = action.payload;
            state.currentElement = findElementInViewById(state.viewTree as IElement, elementId);
        },
        updateSelectedElementInViewTree: (state, action: PayloadAction<IElement>) => {
            replaceSubview(state.viewTree as IElement, action.payload);
            state.currentElement = findElementInViewById(state.viewTree as IElement, action.payload.id);
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        deleteSelectedElementInViewTree: (state, action: PayloadAction<IElement>) => {
            deleteElement(state.viewTree as IElement, action.payload);
            state.currentElement = null
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        applySplitToWrapper: (state, action: PayloadAction<ISplitParameterPair>) => {
            const { wrapperId, kind } = action.payload;
            // based on wrapperId & kind, need to add two wrappers.
            splitWrapper(state.viewTree as IElement, wrapperId, state.wrapper_count, kind);
            state.wrapper_count+=2;
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        deleteWrapper: (state, action: PayloadAction<string>) => {
            const subview = findElementInViewById(state.viewTree as IElement, action.payload);
            if (!subview) return
            if (state.currentElement && findElementInViewById(subview, state.currentElement.id)) {
                state.currentElement = null;
            }
            deleteElement(state.viewTree as IElement, subview);
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        initCurrentElement: (state, action) => {
            state.currentElement = null
        },
        setResponsive: (state, action: PayloadAction<string>) => {
            state.responsive = action.payload;
            let newWidth : number, newHeight : number;
            switch(action.payload)
            {
                case 'desktop': 
                    newWidth = 1024;
                    newHeight = 30;
                    break;
                case 'tablet': 
                    newWidth = 600;
                    newHeight = 30;
                    break;
                case 'mobile': 
                    newWidth = 320;
                    newHeight = 30;
                    break;
                default: 
                    newWidth = 320;
                    newHeight = 30;
                    break;
            }
            console.log("change width , height", newWidth, newHeight);

            state.viewTrees.forEach((viewTree)=> {
                viewTree = {
                    ...viewTree,
                    size: {
                        width: newWidth,
                        height: newHeight
                    }
                }
            })
        }
    }
})

export const {
    setZoom,
    setViewTree,
    addViewTrees,
    fetchViewTree,
    addSubViewToViewTree,
    selectElementInViewTreeById,
    updateSelectedElementInViewTree,
    deleteSelectedElementInViewTree,
    deleteWrapper,
    applySplitToWrapper,
    initCurrentElement,
    setResponsive
} = viewTreeSlice.actions;

export default viewTreeSlice.reducer