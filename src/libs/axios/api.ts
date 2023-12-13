import axios, { AxiosHeaders, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "constants/";
// import { getAccessTokenByRefreshToken } from "./api/auth";

const controller = new AbortController();

const api = axios.create({
    baseURL: API_BASE_URL
})

export const setToken = (access_token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
        const token = localStorage.getItem("access_token");
        if (token) {
            const mHeaders = AxiosHeaders.from({
                Authorization: `Bearer ${token}`,
            }) as AxiosRequestHeaders

            if (mHeaders) {
                config.headers = mHeaders
            }
        }
    } catch (error) { }

    return config
}

api.interceptors.request.use(onRequest)

api.interceptors.response.use(
    (response) => {
        return response.data
    },

    async (error: any) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token")
            //   const newAccessToken = await getAccessTokenByRefreshToken(refreshToken)

            //   if (newAccessToken) {
            //     localStorage.setItem('access_token', newAccessToken);
            //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            //     return api(originalRequest);
            //   } else {
            //     localStorage.removeItem("access_token")
            //     localStorage.removeItem("refresh_token")
            //     window.location.href = "/login"
            //   }
        }
        return Promise.reject(error)
    }

)

export const cancelRequest = () => {
    controller.abort()
}

export default api