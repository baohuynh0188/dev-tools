import { axiosHttp, axiosHttpNoAuth } from "./axiosClient";

interface ISignInRequest {
    username: string;
    password: string;
}

interface ISignUpRequest {
    first_name: string;
    username: string;
    password: string;
    confirm_password: string;
}

interface IChangePasswordRequest {
    old_password: string;
    password: string;
    confirm_password: string;
}

interface IChangeFirstNameRequest {
    old_password: string;
    password: string;
    confirm_password: string;
}

const authApi = {
    signIn: (params: ISignInRequest) => axiosHttp.post("auth/token/", params),
    signUp: (params: ISignUpRequest) =>
        axiosHttpNoAuth.post("auth/register/", params),
    getCurrentUser: () => axiosHttp.get("auth/me/"),
    refreshToken: (params: any) =>
        axiosHttp.post("auth/token/refresh/", params),
    changePassword: (params: IChangePasswordRequest) =>
        axiosHttp.post("auth/change-password/", params),
    changeFirstName: (params: IChangeFirstNameRequest) =>
        axiosHttp.put("auth/change-name/", params),
};

export default authApi;
