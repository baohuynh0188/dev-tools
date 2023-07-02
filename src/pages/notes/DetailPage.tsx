import React, { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import IPost from "../../interfaces/post.interface";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<IPost>();
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {
        if (!postId) {
            return;
        }

        const controller = new AbortController();
        const fetchPost = async (): Promise<void> => {
            try {
                const response = await postApi.getPostById(postId, {
                    signal: controller.signal,
                });
                setPost(response?.data);
            } catch (error) {
                console.error(error);
            } finally {
                setloading(false);
            }
        };

        fetchPost();

        return () => {
            controller.abort();
        };
    }, [postId]);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>{post?.title}</h1>
            </div>
        </div>
    );
};

export default DetailPage;
