import React from "react";
import { useRoutes } from "react-router-dom";
import router from "./router";
import Layout from "./layouts/Layout";

const App = (): any => {
    const element = useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: router,
        },
    ]);
    return element;
};

export default App;
