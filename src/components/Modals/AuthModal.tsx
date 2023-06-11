import React from "react";
import ModalOverlay from "../ModalOverlay";

interface IAuthModal {
    show: boolean;
    title: string;
    onClose: () => void;
}

const AuthModal = ({ show, title, onClose }: IAuthModal): JSX.Element => {
    const isSignUp = title === "Sign Up";
    return (
        <ModalOverlay
            title={title}
            show={show}
            size={undefined}
            backdrop="static"
        >
            <ModalOverlay.Body>
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="username">
                            Username
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username..."
                            aria-label="Username"
                            aria-describedby="username"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="password">
                            Password
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password..."
                            aria-label="Password"
                            aria-describedby="password"
                        />
                    </div>
                    {isSignUp && (
                        <>
                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="first-name"
                                >
                                    First name
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your first name..."
                                    aria-label="First-name"
                                    aria-describedby="first-name"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="username"
                                >
                                    Username
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username..."
                                    aria-label="Username"
                                    aria-describedby="username"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="password"
                                >
                                    Password
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password..."
                                    aria-label="Password"
                                    aria-describedby="password"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="confirm-password"
                                >
                                    Confirm-password
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter confirm password..."
                                    aria-label="Confirm-password"
                                    aria-describedby="Confirm-password"
                                />
                            </div>
                        </>
                    )}
                </form>
            </ModalOverlay.Body>
            <ModalOverlay.Footer onClose={onClose}>
                <button className="btn btn-success" type="submit">
                    {title}
                </button>
            </ModalOverlay.Footer>
        </ModalOverlay>
    );
};

export default AuthModal;
