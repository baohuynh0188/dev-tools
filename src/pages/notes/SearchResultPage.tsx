import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Topic from "../../components/Topic";
import { useLocation, useParams } from "react-router-dom";
import IPost from "../../interfaces/post.interface";
import postApi from "../../api/postApi";

const SearchResultPage = (): JSX.Element => {
    const params = useParams();
    const location = useLocation();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async (): Promise<void> => {
            try {
                const response = await postApi.getPosts({
                    params: { ...params },
                    signal: controller.signal,
                });
                setPosts(response?.data?.results);
            } catch (error) {
                console.error(error);
            } finally {
                setloading(false);
            }
        };
        fetchPosts();

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const renderPosts = (): JSX.Element[] | JSX.Element => {
        if (loading) {
            return (
                <>
                    <Card
                        key="loading"
                        imgSrc={"http://via.placeholder.com/200x190"}
                        id={0}
                    />
                </>
            );
        }

        return posts?.map(
            ({ id, title, description, created_at, thumbnail }: any) => (
                <Card
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    createdDate={created_at}
                    imgSrc={thumbnail ?? "http://via.placeholder.com/1920x1080"}
                />
            )
        );
    };

    return (
        <>
            <div className="col-8">{renderPosts()}</div>
            <div className="col-4">
                <Topic />
            </div>
        </>
    );
};

export default SearchResultPage;
