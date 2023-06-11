import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

interface IUseAxios {
    response: any;
    error: string;
    loading: boolean;
}

const useAxios = (params: object): IUseAxios => {
    const [response, setResponse] = useState<any>(undefined);
    const [error, setError] = useState<any>(undefined);
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async (): Promise<void> => {
            try {
                const response = await axiosClient.request({
                    ...params,
                    signal: controller.signal,
                });
                setResponse(response?.data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setloading(false);
            }
        };

        fetchPosts();

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { response, error, loading };
};

export default useAxios;
