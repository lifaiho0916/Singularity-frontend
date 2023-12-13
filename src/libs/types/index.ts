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
    design: object
    backend: object
}

export interface IStructure {
    project: IProjectStructure
}