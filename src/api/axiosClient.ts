import axios from "axios";
import qs from "qs";
import { getLocalAccessToken } from "../utilities/localStorges";

const axiosConfig = {
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
};

// http with auth
export const axiosHttp = axios.create({
    ...axiosConfig,
    paramsSerializer: (params) => qs.stringify(params),
});

// Request interceptor
axiosHttp.interceptors.request.use(
    (config) => {
        if (getLocalAccessToken()) {
            config.headers.authorization = "Bearer " + getLocalAccessToken();
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosHttp.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // const originalRequest = error.config;
        // if (token && error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     const access_token = await refreshAccessToken();
        //     axios.defaults.headers.common["Authorization"] =
        //         "Bearer " + access_token;
        //     return axiosApiInstance(originalRequest);
        // }
        return Promise.reject(error);
    }
);

// http without auth
export const axiosHttpNoAuth = axios.create(axiosConfig);
