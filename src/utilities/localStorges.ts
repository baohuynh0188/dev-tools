export const getLocalAccessToken = (): string | null =>
    localStorage.getItem("access_token");

export const getLocalRefreshToken = (): string | null =>
    localStorage.getItem("refresh_token");

export const setLocalAccessToken = (accessToken: string): void => {
    localStorage.setItem("access_token", accessToken);
};

export const setLocalRefreshToken = (refreshToken: string): void => {
    localStorage.setItem("refresh_token", refreshToken);
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
