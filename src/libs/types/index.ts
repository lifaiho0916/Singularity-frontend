import React from 'react'

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface IMember {
    email: string;
    position: string;
}

export interface IProjectMember {
    user: IUser;
    position: string;
}

export interface IProject {
    id: number,
    name: string,
    description: string,
    creator: IUser,
    openedAt: string,
    members: Array<IProjectMember>
    data: string
}

export interface ITemplate {
    id: number,
    name: string,
    description: string,
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
    id: string,
    parent: string,
    name: string,
    style: React.CSSProperties,
    child: Array<IElement>,
    type: IComponentType,
    action: () => void
}

export enum IComponentType {
    ButtonComponent = 'ButtonComponent',
    TextComponent = 'TextComponent',
    LabelComponent = 'LabelComponent',
    ImageComponent = 'ImageComponent',
    Wrapper = 'Wrapper'
}