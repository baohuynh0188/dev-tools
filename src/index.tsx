import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </AuthProvider>
        </React.StrictMode>
    </BrowserRouter>
);
