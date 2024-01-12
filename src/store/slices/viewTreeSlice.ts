import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import {
    IComponentType,
    ISplitParameterPair,
    IElement,
    IWrapperType,
    IDragDropInfo,
    IAddNewComponentInfo,
    IReplaceViewTreeInfo
} from "libs/types";
import { v4 as uuidv4 } from 'uuid'
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
                flexDirection: "column",
                backgroundColor: "lightgray",
                fontSize: 16,
                minHeight: 642,
                minWidth: 320,
                zIndex: 0
            },
            detail: {},
            child: [],
            size: {
                width: 320,
                height: 642
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

const getDetails = (type: string) => {
    switch (type) {
        case IComponentType.ButtonComponent:
            return {
            color: 'primary',
            type: 'contained',
            size: 'medium',
            }
        default:
            return {}
    }
}

const getInitStyles = (type: string, componentID: number) : React.CSSProperties => {
    const commonStyle : React.CSSProperties = {
      textAlign: "start",
      alignItems: "normal",
      fontSize: 16,
      zIndex: 1
    }
    switch (type) {
      case IComponentType.ButtonComponent:
        return {
          ...commonStyle,
          borderRadius: 5,
          width: "100px",
          height: "42px",
          // boxShadow: "5 5 5 rgba(0,0,0,0.3)" // Dropshadow
          // boxShadow: "inset 5 5 5 rgba(0,0,0,0.3)" // Dropshadow
        }
      case IComponentType.LabelComponent:
        return {
          ...commonStyle,
          backgroundColor: "lightgray",
          width: "100px",
          height: "42px",
          color: "black"
        }
      case IComponentType.TextComponent:
        return {
          ...commonStyle,
          letterSpacing: "0px",
          lineHeight: "16px",
          textIndent: "0px",
          width: "100px",
          height: "42px",
        }
      case IComponentType.ImageComponent:
        return {}
      case IComponentType.Wrapper:
        return {
          display: "flex",
          flexDirection: componentID === 4 ? "row" : "column",
          backgroundColor: "lightgray",
          justifyContent: "flex-start",
          minHeight: 42,
          color: "#AAA",
        }
      default:
        return {}
    }
}

function deleteElement(view: IElement, element: IElement) {
    // if element is root element delete all childs
    if (element.parent.startsWith('root')) element.child.splice(0, element.child.length)
    else {
        // delete the component from parent
        const parentElement: IElement = findElementInViewById(view, element.parent)!;
        parentElement.child = parentElement.child.filter(item => item.id !== element.id)
        // if element is wrapper element move child to it's parent's child array
        // if(element.type === IComponentType.Wrapper)  {
        //     element.child.forEach(item => parentElement.child.push(item));
        // }
    }
}

function insertSubview(view: IElement, parent: IElement, element: IComponentType, componentID: number, name: string): void {
    let style = getInitStyles(element, componentID);
    let insertElement: IElement = {
        id: uuidv4(),
        name: name,
        parent: parent.id,
        type: element,
        detail: getDetails(element),
        style: {
            ...style,
        },
        child: [],
        size: {
            width: parent.size.width,
            height: 42
        },
        content: element === IComponentType.ButtonComponent ? 'Button' :
            element === IComponentType.LabelComponent ? 'Label' :
            element === IComponentType.TextComponent ? 'Text' :
            element === IComponentType.ImageComponent ? 'Image' : '',
        link: ''
    };
    let parentElement = findElementInViewById(view, parent.id);
    parentElement?.child.push(insertElement);
}

function findElementInViewById(view: IElement, id: string): IElement | null {
    if (id.startsWith("root")) return view;      // In case of we are looking for a parent element
    if (view.id === id) return view;
    for (const item of view.child) {
        const result = findElementInViewById(item, id);
        if (result) return result;
    }
    return null;
}

function splitWrapper(view: IElement, wrapperId: string, id: number, kind: IWrapperType, zoom : number) {
    let wrapperElement: IElement = findElementInViewById(view, wrapperId)!;
    let sizeInfo = {
        width: wrapperElement.size.width,
        height: wrapperElement.size.height
    }
    let firstWrapper: IElement = {
        id: uuidv4(),
        name: `wrapper ${id + 1}`,
        parent: wrapperElement.id,
        type: IComponentType.Wrapper,
        style: {
            ...wrapperElement.style,
            minWidth: kind === IWrapperType.Vertical ? sizeInfo.width / 2 * zoom: sizeInfo.width * zoom,
            minHeight: kind === IWrapperType.Vertical ? sizeInfo.height * zoom : sizeInfo.height / 2 * zoom,
        },
        detail: {},
        size: {
            width: kind === IWrapperType.Vertical ? sizeInfo.width / 2 : sizeInfo.width,
            height: kind === IWrapperType.Vertical ? sizeInfo.height : sizeInfo.height / 2,
        },
        child: wrapperElement.child,
        content: '',
        link: ''
    }

    firstWrapper.child.forEach( (item)=> {
        item.parent = firstWrapper.id 
    })

    let secondWrapper: IElement = {
        id: uuidv4(),
        parent: wrapperElement.id,
        name: `wrapper ${id + 2}`,
        type: IComponentType.Wrapper,
        style: {
            ...wrapperElement.style,
            minWidth: kind === IWrapperType.Vertical ? sizeInfo.width /2 * zoom : sizeInfo.width * zoom,
            minHeight: kind === IWrapperType.Vertical ? sizeInfo.height * zoom : sizeInfo.height / 2 * zoom,
        },
        detail: {},
        size: {
            width: kind === IWrapperType.Vertical ? sizeInfo.width /2 : sizeInfo.width,
            height: kind === IWrapperType.Vertical ? sizeInfo.height : sizeInfo.height / 2,
        },
        child: [],
        content: '',
        link: ''
    }
    wrapperElement.style = {
        ...wrapperElement.style,
        flexDirection: kind === IWrapperType.Vertical ? "row" : 'column'
    }
    wrapperElement.child = []
    wrapperElement.child.push(firstWrapper)
    wrapperElement.child.push(secondWrapper)
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

function dropElement(view: IElement, deliverElement: IElement, destinationElement: IElement) {
    // Remove deliverElement from its parent
    let deliverElementParent: IElement | null = findElementInViewById(view, deliverElement.parent);
    if (deliverElementParent) {
        deliverElementParent.child = deliverElementParent.child.filter((item) => item.id !== deliverElement.id);
    }

    // Find destinationElementParent
    let destinationElementParent: IElement | null = findElementInViewById(view, destinationElement.parent);

    // Check if destinationElement is a Wrapper
    if (destinationElement.type === IComponentType.Wrapper) {
        // Add deliverElement as the first child of destinationElement (if it's a Wrapper)
        deliverElement.parent = destinationElement.id;
        destinationElement.child.unshift(deliverElement);
    } else if (destinationElementParent) {
        // Add deliverElement after destinationElement in destinationElementParent's child array
        const index = destinationElementParent.child.findIndex((item) => item.id === destinationElement.id);
        if (index !== -1) {
            deliverElement.parent = destinationElementParent.id;
            destinationElementParent.child.splice(index + 1, 0, deliverElement);
        }
    }
}

function updateSizeOfAllElements(viewTrees : Array<IElement>,zoom: number)
{
    viewTrees.forEach((viewTree) => {
        if(viewTree.child.length > 0) {
            updateSizeOfAllElements(viewTree.child, zoom)    
        }
        else {
            viewTree.style = { 
                ...viewTree.style,
                minWidth: viewTree.size.width * zoom,
                minHeight: viewTree.size.height * zoom
            }
            console.log(viewTree.name," Element updated.")
        }
    })
}

export const viewTreeSlice = createSlice({
    name: "viewtree",
    initialState,
    reducers: {
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload
            updateSizeOfAllElements(state.viewTrees,state.zoom);
            state.viewTrees.forEach((item)=> {
                if(item.id === state.viewTree?.id)
                    state.viewTree = item;
            })
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
        addSubViewToViewTree: (state, action: PayloadAction<IAddNewComponentInfo>) => {
            const { parent, newElement, componentID } = action.payload;
            let name;
            switch (newElement) {
                case IComponentType.ButtonComponent:
                    name = `button ${state.button_count + 1}`
                    state.button_count++;
                    break;
                case IComponentType.TextComponent:
                    name = `text ${state.text_count + 1}`
                    state.text_count++;
                    break;
                case IComponentType.LabelComponent:
                    name = `label ${state.label_count + 1}`
                    state.label_count++;
                    break;
                case IComponentType.ImageComponent:
                    name = `image ${state.image_count + 1}`
                    state.image_count++;
                    break;
                case IComponentType.Wrapper:
                    name = `wrapper ${state.wrapper_count + 1}`
                    state.wrapper_count++;
                    break;
            }
            insertSubview(state.viewTree as IElement, parent, newElement, componentID, name);
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
        deleteSelectedViewInViewTree: (state, action: PayloadAction<IElement>) => {
            state.currentElement = null
            let selectedView: IElement = action.payload;
            state.viewTrees = state.viewTrees.filter((view) => view.id !== selectedView.id)
            let sizeInfo = { width: state.responsive === 'desktop' ? 1024 : state.responsive === 'tablet' ? 600 : 320 , height: 642 }
            if (state.viewTrees.length === 0) state.viewTrees.push({
                id: uuidv4(),
                name: 'Screen1',
                parent: 'root1',
                type: IComponentType.Wrapper,
                style: {
                    display: "flex",
                    backgroundColor: "lightgray",
                    justifyContent: "flex-start",
                    alignItems: "normal",
                    border: 1,
                    color: "#AAA",
                    zIndex: -1,
                    flexDirection: "column",
                    minWidth: sizeInfo.width * state.zoom,
                    minHeight: sizeInfo.height * state.zoom
                },
                detail: {},
                child: [],
                size: sizeInfo,
                content: '',
                link: ''
            });
        },
        applySplitToWrapper: (state, action: PayloadAction<ISplitParameterPair>) => {
            const { wrapperId, kind } = action.payload;
            // based on wrapperId & kind, need to add two wrappers.
            splitWrapper(state.viewTree as IElement, wrapperId, state.wrapper_count, kind, state.zoom);
            state.wrapper_count += 2;
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
            let newWidth: number, newHeight: number;
            switch (action.payload) {
                case 'desktop':
                    newWidth = 1024;
                    newHeight = 642;
                    break;
                case 'tablet':
                    newWidth = 600;
                    newHeight = 642;
                    break;
                case 'mobile':
                    newWidth = 320;
                    newHeight = 642;
                    break;
                default:
                    newWidth = 320;
                    newHeight = 642;
                    break;
            }

            state.viewTrees.forEach((viewTree) => {
                viewTree.size = {
                    width: (newWidth + 16),
                    height: (newHeight + 16)
                }

                viewTree.style = {
                    ...viewTree.style,
                    minWidth: viewTree.size.width * state.zoom,
                    minHeight: viewTree.size.height * state.zoom
                }
            })
        },
        dragDropElement: (state, action: PayloadAction<IDragDropInfo>) => {
            let { startElementID, endElementID } = action.payload;
            let deliverElement: IElement = findElementInViewById(state.viewTree as IElement, startElementID)!;
            let destinationElement: IElement = findElementInViewById(state.viewTree as IElement, endElementID)!;
            dropElement(state.viewTree as IElement, deliverElement, destinationElement);
            const index = state.viewTrees.findIndex((view: IElement) => view.id === state.viewTree?.id);
            state.viewTrees[index] = state.viewTree as IElement;
        },
        replaceViewTree: (state, action: PayloadAction<IReplaceViewTreeInfo>) => {
            let { startElementID, endElementID } = action.payload;
            let temp: IElement = state.viewTrees[endElementID];
            state.viewTrees[endElementID] = state.viewTrees[startElementID];
            state.viewTrees[startElementID] = temp;
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
    deleteSelectedViewInViewTree,
    deleteWrapper,
    applySplitToWrapper,
    initCurrentElement,
    setResponsive,
    dragDropElement,
    replaceViewTree
} = viewTreeSlice.actions;

export default viewTreeSlice.reducer