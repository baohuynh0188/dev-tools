import React, { useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ToastContext from "../contexts/ToastContext";

const Notification = (): JSX.Element => {
    const { toast } = useContext(ToastContext);

    const { content, option } = toast;

    const [show, setShow] = useState<boolean>(false);

    return (
        <ToastContainer
            position="top-end"
            className="position-static p-3"
            style={{ zIndex: 1 }}
        >
            <Toast
                show={show}
                onClose={() => setShow(false)}
                delay={option?.delay}
                autohide
                bg={option?.bgColor}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{option?.title}</strong>
                    <small>fdsf</small>
                </Toast.Header>
                <Toast.Body>{content}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;
