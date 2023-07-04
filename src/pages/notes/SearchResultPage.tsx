import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import Topic from "../../components/Topic";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import IPost from "../../interfaces/post.interface";
import postApi from "../../api/postApi";

const SearchResultPage = (): JSX.Element => {
    const params = useParams();
    const location = useLocation();
    const observer = useRef<any>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [hasMorePost, setHasMorePost] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query") || "";

    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async (): Promise<void> => {
            try {
                const response = await postApi.getPosts({
                    params: {
                        ...params,
                        page: pageNumber,
                        search: searchQuery,
                    },
                    signal: controller.signal,
                });
                setPosts((prevPost) =>
                    Array.from(
                        new Set([...prevPost, ...response?.data?.results])
                    )
                );
                setHasMorePost(!!response?.data?.next);
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
    }, [location.pathname, searchQuery, pageNumber]);

    const lastPostElementRef = useCallback(
        (node: any) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMorePost) {
                    console.log("Visible");
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMorePost]
    );

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

        return posts?.map((post: any, index: number) => {
            if (posts.length === index + 1) {
                return (
                    <div key={post?.id} ref={lastPostElementRef}>
                        <Card
                            id={post?.id}
                            title={post?.title}
                            description={post?.description}
                            createdDate={post?.created_at}
                            imgSrc={
                                post?.thumbnail ??
                                "http://via.placeholder.com/1920x1080"
                            }
                        />
                    </div>
                );
            }
            return (
                <div key={post?.id}>
                    <Card
                        id={post?.id}
                        title={post?.title}
                        description={post?.description}
                        createdDate={post?.created_at}
                        imgSrc={
                            post?.thumbnail ??
                            "http://via.placeholder.com/1920x1080"
                        }
                    />
                </div>
            );
        });
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
