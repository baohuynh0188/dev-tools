import INewPost from "../interfaces/newPost.interface";
import { axiosHttp, axiosHttpNoAuth } from "./axiosClient";

const postApi = {
    getPosts: (params?: any) => axiosHttpNoAuth.get("posts/", params),
    getPostById: (id: string, params?: any) =>
        axiosHttpNoAuth.get(`posts/${id}`, params),
    createPost: (params: INewPost) => axiosHttp.post("posts/", params),
    putPostById: (id: string, params: any) =>
        axiosHttp.put(`posts/${id}/`, params),
    deletePostById: (id: number) => axiosHttp.delete(`posts/${id}/`),
};

export default postApi;
