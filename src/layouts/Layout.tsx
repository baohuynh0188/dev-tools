import React, { Fragment, useCallback, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import { Outlet } from "react-router-dom";
import { AuthContext, AuthContextDispatch } from "../contexts/AuthContext";
import { getLocalAccessToken } from "../utilities/localStorges";
import authApi from "../api/authApi";

const Layout = (): JSX.Element => {
    const userInfo = useContext(AuthContext);
    const setLogin = useContext(AuthContextDispatch);

    const getUserInfo = useCallback(async () => {
        const accessToken = getLocalAccessToken();
        if (accessToken) {
            try {
                const response = await authApi.getCurrentUser();
                setLogin((preState) => ({
                    ...preState,
                    ...response?.data,
                    isLogin: true,
                }));
            } catch (error) {}
        }
    }, [setLogin]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return (
        <Fragment>
            <Navbar />
            <Notification />
            <div className="container">
                <div className="row mt-3">
                    <Outlet />
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;
