import { axiosHttpNoAuth } from "./axiosClient";

const postApi = {
    getPosts: (params?: any) => axiosHttpNoAuth.get("posts/", params),
    getPostById: (id: string, params?: any) =>
        axiosHttpNoAuth.get(`posts/${id}`, params),
};

export default postApi;
