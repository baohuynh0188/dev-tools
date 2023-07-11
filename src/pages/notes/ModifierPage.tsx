import React, { useContext, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import topicApi from "../../api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import INewPost from "../../interfaces/newPost.interface";
import postApi from "../../api/postApi";
import { Spinner } from "react-bootstrap";

const ModifierPage = () => {
    const navigate = useNavigate();
    const { post } = useParams();
    const userInfo = useContext(AuthContext);
    const initialState = {
        title: "",
        content: "",
        topic: "",
        description: "",
    };
    const [newPost, setPost] = useState<INewPost>(initialState);
    const [topics, setTopics] = useState<any[]>([]);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!userInfo?.isLogin) {
            return navigate("/posts");
        }
    }, [userInfo?.isLogin, navigate]);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();

        const fetchPostById = async (): Promise<void> => {
            if (!post) return;
            try {
                const response = await postApi.getPostById(post, {
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
    }, [post]);

    const handleInputChange = (event: any) => {
        const { name, value } = event?.target;
        console.log({ [name]: value });
        setPost((preState) => ({ ...preState, [name]: value }));
    };

    const handleEditorChange = (event: any, editor: any) => {
        const content = editor.getData();
        setPost((preState) => ({ ...preState, content }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (post) {
            handleEdit();
        } else {
            handleCreate();
        }
    };

    const handleCreate = async () => {
        try {
            const response = await postApi.createPost(newPost);
            alert("Your post has been created!");
            setPost(initialState);
            navigate(`/posts/${response.data?.id}`);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const handleEdit = async () => {
        if (!post) return;
        try {
            const response = await postApi.putPostById(post, newPost);
            alert("Your post has been updated!");
            navigate(`/posts/${response.data?.id}`);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <form className="col-12" onSubmit={handleSubmit}>
            <h1 className="mb-3">{post ? "Edit post" : "Create post"}</h1>
            <div className="row mb-3">
                <div className="col-9">
                    <label htmlFor="title" className="form-label">
                        Title*
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        minLength={1}
                        value={newPost.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="topic" className="form-label">
                        Topic*
                    </label>
                    <select
                        className="form-select"
                        aria-label="topic-select"
                        id="topic"
                        name="topic"
                        defaultValue=""
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Choose a topic ...
                        </option>
                        {topics.map((topic) => (
                            <option key={topic?.id} value={topic?.id}>
                                {topic?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={newPost.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">
                    Content*
                </label>
                <CKEditor
                    id="content"
                    editor={ClassicEditor}
                    data={newPost.content}
                    onChange={handleEditorChange}
                    onBlur={(event, editor) => {
                        setFormValid(!!editor.getData());
                    }}
                />
            </div>
            <button
                className="btn btn-success"
                type="submit"
                disabled={!formValid}
            >
                Submit
            </button>
        </form>
    );
};

export default ModifierPage;
