import API from "src/libs/axios/api";

export const SocialLogin = async (provider: string): Promise<string | undefined> => {
    try {
        await API.get(`/v1/auth/${provider}`)
        return "Register successful"
    } catch (error) {
        console.warn(error)
        //   handleError(error)
    }
    return undefined
}
