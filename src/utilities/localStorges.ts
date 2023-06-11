export const getLocalAccessToken = (): string | null =>
    localStorage.getItem("access_token");

export const getLocalRefressToken = (): string | null =>
    localStorage.getItem("refresh_token");

export const setLocalAccessToken = (accessToken: string): void => {
    localStorage.setItem("access_token", accessToken);
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
