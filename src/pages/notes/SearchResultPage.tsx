import React from "react";
import Card from "../../components/Card";
import useAxios from "../../hooks/useAxios";
import { getPosts } from "../../api/postApi";

interface IPost {
    id: number;
    title: string;
    description: string | null;
    thumbnail: string | null;
    tags: string | null;
    topic: {
        id: number;
        name: string;
        avatar: string;
    };
    user: {
        id: number;
        first_name: string;
        username: string;
        avatar: string;
    };
    created_at: string;
}

interface IUseAxios {
    response: {
        results: IPost[];
    };
    error: string;
    loading: boolean;
}

const SearchResultPage = (): JSX.Element => {
    const { response, loading, error }: IUseAxios = useAxios(getPosts);

    const renderPosts = (): JSX.Element[] | JSX.Element => {
        if (error && !response) {
            return <h1>Fetch Data failed</h1>;
        }

        if (loading) {
            return (
                <>
                    {/* <Card
                        key="loading"
                        imgSrc={"http://via.placeholder.com/200x190"}
                    /> */}
                </>
            );
        }

        return response?.results.map(
            ({ id, title, description, created_at, thumbnail }) => (
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
            <div className="col-9">{renderPosts()}</div>
            <div className="col-3">2</div>
        </>
    );
};

export default SearchResultPage;
