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

export interface IProject {
    name: string,
    description: string,
    creator: IUser,
    openedAt: string
}