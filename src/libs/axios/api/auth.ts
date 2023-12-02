import API from "src/libs/axios/api";

export const getCurrentUser = async (): Promise<object | undefined> => {
    try {
        const res = await API.get('/v1/user/me');
        return res;
    } catch (error) {
        console.warn(error)
        //   handleError(error)
    }
    return undefined
}
