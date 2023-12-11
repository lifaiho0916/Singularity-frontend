import API from "src/libs/axios/api";
import { IMember } from "src/libs/types";

export const createProject = async (data: object): Promise<object | undefined> => {
    try {
        const res = await API.post('/v1/project', data);
        return res;
    } catch (error) {
        console.warn(error)
    }
    return undefined;
}

export const getProjectsByCreator = async (creatorId: number): Promise<object | undefined> => {
    try {
        const res = await API.get(`/v1/project/created-by/${creatorId}`)
        return res;
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const deleteProject = async (projectId: number): Promise<object | undefined> => {
    try {
        const res = await API.delete(`/v1/project/${projectId}`)
        return res
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const InviteMembersByProject = async (projectId: number, members: Array<IMember>): Promise<object | undefined> => {
    try {
        const res = await API.post(`/v1/project/${projectId}/invite`, { members: members })
        return res
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const AcceptMemberInvitation = async (token: string): Promise<object | undefined> => {
    try {
        const res = await API.post('/v1/project/accept-invitation', { token: token })
        return res
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const getProjectById = async (projectId: number): Promise<object | undefined> => {
    try {
        const res = await API.get(`/v1/project/${projectId}`);
        return res
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const setOpenAtById = async (projectId: number): Promise<object | undefined> => {
    try {
        await API.get(`/v1/project/${projectId}/open`);
    } catch (error) {
        console.warn(error)
    }
    return undefined
}