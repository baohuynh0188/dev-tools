interface SignInRequest {
    username: string;
    password: string;
}

interface SignUpRequest {
    first_name: string;
    username: string;
    password: string;
    confirm_password: string;
}

interface ChangePasswordRequest {
    old_password: string;
    password: string;
    confirm_password: string;
}

interface ChangeFirstNameRequest {
    old_password: string;
    password: string;
    confirm_password: string;
}

export const signIn = {
    method: "POST",
    url: "auth/token",
};

export const signUp = {
    method: "POST",
    url: "auth/register",
};

export const refreshToken = {
    method: "POST",
    url: "auth/token/refresh",
};

export const getCurrentUser = {
    method: "GET",
    url: "auth/me",
};

export const changePassword = {
    method: "POST",
    url: "auth/change-password",
};

export const changeFirstName = {
    method: "PUT",
    url: "auth/change-name",
};
