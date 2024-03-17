import React from "react";

interface ITabs {
    children: React.ReactNode;
}

const Tabs = ({ children }: ITabs): JSX.Element => {
    return <nav className="nav nav-pills nav-justified">{children}</nav>;
};

export default Tabs;
