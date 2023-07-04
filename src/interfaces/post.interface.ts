export default interface IPost {
    id: number;
    title: string;
    description: string | null;
    content?: string;
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
