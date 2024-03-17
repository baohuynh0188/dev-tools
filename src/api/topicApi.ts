import { axiosHttpNoAuth } from "./axiosClient";

const topicApi = {
    getTopics: (params?: any) => axiosHttpNoAuth.get("topics/", params),
};

export default topicApi;
