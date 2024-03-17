import React, { createContext, useState } from "react";

interface IToastProvider {
    children: React.ReactNode;
}

interface IOption {
    title: string;
    delay: number;
    bgColor:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "dark"
        | "light";
}

interface IToast {
    content: string;
    option?: IOption;
}

const initialData: IToast = {
    content: "",
    option: {
        title: "Notification",
        delay: 3000,
        bgColor: "primary",
    },
};

const ToastContext = createContext({
    toast: initialData,
    notify: (content: string, onShow: () => void): void => {},
});

export const ToastProvider = ({ children }: IToastProvider) => {
    const [toast, setToast] = useState<IToast>(initialData);

    const notify = (
        content: string,
        onShow: () => void,
        option?: IOption
    ): void => {
        setToast((prevState) => ({
            ...prevState,
            content,
            ...option,
        }));
        onShow();
    };

    return (
        <ToastContext.Provider value={{ toast, notify }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;
