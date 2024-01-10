import React from 'react'

export interface IUser {
    id: number
    first_name: string
    last_name: string
    avatar: string
}

export interface IMember {
    email: string
    position: string
}

export interface IProjectMember {
    user: IUser
    position: string
}

export interface IMedia {
    id: number
    imageData: string
}


export interface IProject {
    id: number
    name: string
    description: string
    creator: IUser
    openedAt: string
    members: Array<IProjectMember>
    data: string
}

export interface ITemplate {
    id: number
    name: string
    description: string
    defaultTemplate: boolean
}

export interface IProjectStructure {
    id: number
    name: string
    design: any
    backend: object
}

export interface IStructure {
    project: IProjectStructure
}

export interface IElement {
    id: string
    name: string
    parent: string
    style: React.CSSProperties
    child: Array<IElement>
    type: IComponentType
    size: ISize
    detail: any
    content: string
    link: string
    action?: () => void
}

export interface ISplitParameterPair {
    wrapperId: string,
    kind: IWrapperType
}

export enum IComponentType {
    ButtonComponent = 'ButtonComponent',
    TextComponent = 'TextComponent',
    LabelComponent = 'LabelComponent',
    ImageComponent = 'ImageComponent',
    Wrapper = 'Wrapper'
}

export enum IWrapperType {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical'
}

export interface ISize {
    width: number,
    height: number
}

export interface IDragDropInfo { 
    startElementID : string, 
    endElementID : string
}

export interface IAddNewComponentInfo { 
    parent : IElement,
    newElement : IComponentType,
    componentID : number
}

export interface IReplaceViewTreeInfo {
    startElementID: number,
    endElementID: number
}