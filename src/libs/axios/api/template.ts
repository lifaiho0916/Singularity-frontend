import API from "src/libs/axios/api";

export const getAllTemplates = async (): Promise<object | undefined> => {
    try {
        const res = await API.get('/v1/template')
        return res;
    } catch (error) {
        console.warn(error)
    }
    return undefined
}