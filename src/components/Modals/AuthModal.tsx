import React, { useContext, useEffect, useState } from "react";
import ModalOverlay from "../ModalOverlay";
import authApi from "../../api/authApi";
import { setLocalAccessToken } from "../../utilities/localStorges";
import { AuthContextDispatch } from "../../contexts/AuthContext";

interface IAuthModal {
    show: boolean;
    title: string;
    onClose: () => void;
}

interface IInputValue {
    first_name: string;
    username: string;
    password: string;
    confirm_password: string;
}

const initInputValue = {
    first_name: "",
    username: "",
    password: "",
    confirm_password: "",
};

const AuthModal = ({ show, title, onClose }: IAuthModal): JSX.Element => {
    const isSignUp = title === "Sign Up";
    const setLogin = useContext(AuthContextDispatch);
    const [inputValue, setInputValue] = useState<IInputValue>(initInputValue);

    useEffect(() => {
        setInputValue(initInputValue);
    }, [isSignUp]);

    const onInputChangeHandler = (event: any) => {
        const { name, value } = event?.target;
        setInputValue((preState) => ({ ...preState, [name]: value }));
    };

    const onAuthSubmitHandler = async (event: any): Promise<void> => {
        event.preventDefault();
        try {
            if (!isSignUp) {
                const { username, password } = inputValue;
                const response = await authApi.signIn({ username, password });
                setLocalAccessToken(response?.data?.access_token);
                setLogin((preState) => ({ ...preState, isLogin: true }));
                onClose();
                return;
            }
            if (inputValue?.password === inputValue?.confirm_password) {
                await authApi.signUp(inputValue);
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ModalOverlay
            title={title}
            show={show}
            size={undefined}
            backdrop="static"
        >
            <form id="authentication-form" onSubmit={onAuthSubmitHandler}>
                <ModalOverlay.Body>
                    {isSignUp && (
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">
                                Firstname
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={inputValue.first_name}
                                onChange={onInputChangeHandler}
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={inputValue.username}
                            onChange={onInputChangeHandler}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            autoComplete="off"
                            minLength={6}
                            value={inputValue.password}
                            onChange={onInputChangeHandler}
                            required
                        />
                    </div>
                    {isSignUp && (
                        <div className="mb-3">
                            <label
                                htmlFor="confirm_password"
                                className="form-label"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                name="confirm_password"
                                autoComplete="off"
                                minLength={6}
                                value={inputValue.confirm_password}
                                onChange={onInputChangeHandler}
                                required
                            />
                        </div>
                    )}
                </ModalOverlay.Body>
                <ModalOverlay.Footer onClose={onClose}>
                    <button className="btn btn-success" type="submit">
                        {title}
                    </button>
                </ModalOverlay.Footer>
            </form>
        </ModalOverlay>
    );
};

export default AuthModal;
