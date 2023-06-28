import axiosClient from "./axiosClient";

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
    signIn: (params: ISignInRequest) => axiosClient.post("auth/token/", params),
    signUp: (params: ISignUpRequest) =>
        axiosClient.post("auth/register/", params),
    getCurrentUser: () => axiosClient.get("auth/me/"),
    refreshToken: (params: any) =>
        axiosClient.post("auth/token/refresh/", params),
    changePassword: (params: IChangePasswordRequest) =>
        axiosClient.post("auth/change-password/", params),
    changeFirstName: (params: IChangeFirstNameRequest) =>
        axiosClient.put("auth/change-name/", params),
};

export default authApi;
