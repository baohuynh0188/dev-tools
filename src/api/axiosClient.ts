import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
});

export default axiosClient;
