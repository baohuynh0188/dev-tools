import React, { useContext, useState } from "react";
import AuthModal from "./Modals/AuthModal";
import { AuthContext, AuthContextDispatch } from "../contexts/AuthContext";

const Navbar = (): JSX.Element => {
    const userInfo = useContext(AuthContext);
    const setLogin = useContext(AuthContextDispatch);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<"Sign In" | "Sign Up">(
        "Sign In"
    );

    const onSignInClick = () => {
        setShowModal(true);
        setModalTitle("Sign In");
    };

    const onSignUpClick = () => {
        setShowModal(true);
        setModalTitle("Sign Up");
    };

    const onCloseModal = (): void => {
        setShowModal(false);
    };

    const onLogoutClick = (): void => {
        localStorage.clear();
        setLogin({
            avatar: "",
            first_name: "",
            id: 0,
            isLogin: false,
            username: "",
        });
    };

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">Dev-tools</span>
                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {userInfo?.isLogin ? (
                            <>
                                <li className="nav-item me-1">
                                    <span className="nav-link active">
                                        {userInfo?.first_name}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={onLogoutClick}
                                    >
                                        Log out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-1">
                                    <span
                                        className="nav-link active"
                                        onClick={onSignUpClick}
                                    >
                                        Sign up
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light"
                                        onClick={onSignInClick}
                                    >
                                        Sign in
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <AuthModal
                show={showModal}
                title={modalTitle}
                onClose={onCloseModal}
            />
        </div>
    );
};

export default Navbar;
