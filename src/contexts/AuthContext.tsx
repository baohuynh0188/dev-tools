import { createContext, useState } from "react";

interface IAuthProvider {
    children: React.ReactNode;
}

type IProductContext = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const AuthContext = createContext<IProductContext>([false, () => null]);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [login, setLogin] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={[login, setLogin]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
