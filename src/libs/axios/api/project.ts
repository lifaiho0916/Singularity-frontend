import API from "src/libs/axios/api";

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