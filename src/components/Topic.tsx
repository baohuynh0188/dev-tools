import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import topicApi from "../api/topicApi";
import { Spinner } from "react-bootstrap";

const Topic = () => {
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const fetchTopic = async (): Promise<void> => {
            try {
                const response = await topicApi.getTopics({
                    signal: controller.signal,
                });
                setTopics(response?.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();

        return () => {
            controller.abort();
        };
    }, []);

    const renderTopics = topics?.map(
        ({ id, name, description, avatar }: any) => (
            <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={id}
            >
                <div className="ms-2 me-auto">
                    <Link to={`/topic/${id}`} className="text-decoration-none">
                        <div className="fw-bold">{name}</div>
                    </Link>
                    {description}
                </div>
                <img
                    className="img-ful rounded-pill"
                    src={avatar}
                    alt=""
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                />
            </li>
        )
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return <ul className="list-group">{renderTopics}</ul>;
};

export default Topic;
