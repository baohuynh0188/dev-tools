import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import { Outlet } from "react-router-dom";

const Layout = (): JSX.Element => {
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
