import { createContext, useState } from "react";

interface IAuthProvider {
    children: React.ReactNode;
}

interface IUserInforResponse {
    avatar: string;
    first_name: string;
    id: number;
    isLogin: boolean;
    username: string;
}

const userInfoInit = {
    avatar: "",
    first_name: "",
    id: 0,
    isLogin: false,
    username: "",
};

const AuthContext = createContext<IUserInforResponse>(userInfoInit);

const AuthContextDispatch = createContext<
    React.Dispatch<React.SetStateAction<IUserInforResponse>>
>(() => null);

const AuthProvider = ({ children }: IAuthProvider) => {
    const [userInfo, setUserInfo] = useState<IUserInforResponse>(userInfoInit);
    return (
        <AuthContext.Provider value={userInfo}>
            <AuthContextDispatch.Provider value={setUserInfo}>
                {children}
            </AuthContextDispatch.Provider>
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext, AuthContextDispatch };
