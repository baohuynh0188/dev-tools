import INewPost from "../interfaces/newPost.interface";
import { axiosHttp, axiosHttpNoAuth } from "./axiosClient";

const postApi = {
    getPosts: (params?: any) => axiosHttpNoAuth.get("posts/", params),
    getPostById: (id: string, params?: any) =>
        axiosHttpNoAuth.get(`posts/${id}`, params),
    createPost: (params: INewPost) => axiosHttp.post("posts/", params),
    putPostById: (id: number, data: any) => axiosHttp.put(`posts/${id}`, data),
    deletePostById: (id: number) => axiosHttp.delete(`posts/${id}`),
};

export default postApi;
