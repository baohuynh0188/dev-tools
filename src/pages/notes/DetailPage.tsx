import React, { useContext, useEffect, useState } from "react";
import Highlight from "react-highlight";
import postApi from "../../api/postApi";
import IPost from "../../interfaces/post.interface";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const DetailPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const userInfo = useContext(AuthContext);
    const [post, setPost] = useState<IPost>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!postId) return;
        const controller = new AbortController();
        const fetchPostById = async (): Promise<void> => {
            try {
                const response = await postApi.getPostById(postId, {
                    signal: controller.signal,
                });
                setPost(response?.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostById();

        return () => {
            controller.abort();
        };
    }, [postId]);

    const handleDelete = async () => {
        if (!post?.id) {
            alert("Something was wrong!!!");
            return;
        }
        if (!window.confirm("Are you sure delete this item?")) {
            return;
        }
        try {
            await postApi.deletePostById(post.id);
            alert("Deleted");
            return navigate("/posts");
        } catch (error) {
            alert(error);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="row">
            <div className="col-9">
                <h1>{post?.title}</h1>
                <Highlight innerHTML={true}>{post?.content}</Highlight>
            </div>
            <div className="col-3">
                <h5>Author</h5>
                <Link to={"/user/" + post?.user.username}>
                    {post?.user.first_name}
                </Link>
                <h5 className="mt-4">Topics</h5>
                <Link to={"/topic/" + post?.topic?.id}>
                    {post?.topic?.name}
                </Link>
                <h5 className="mt-4">Tags</h5>
                <Link to={"/tag/" + post?.tags}>{post?.tags}</Link>
                {userInfo && userInfo.id === post?.user.id && (
                    <>
                        <h5 className="mt-4">Actions</h5>
                        <Link
                            to={"/posts/update/" + post.id}
                            className="btn btn-warning me-2"
                        >
                            Edit
                        </Link>
                        |
                        <button
                            className="btn btn-danger ms-2"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailPage;
