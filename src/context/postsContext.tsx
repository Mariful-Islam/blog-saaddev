import { createContext, useState, ReactNode } from "react";
import useApi from "../utils/api";
import { PostTypes } from "../components/Home/HomeMain";

export interface PostsContextType {
    getPosts: () => void;
    posts: PostTypes[];
    setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export const PostsContext = createContext<PostsContextType | null>(null);

const PostsProvider = ({ children }: { children: ReactNode }) => {
    const api = useApi();
    const [posts, setPosts] = useState<PostTypes[]>([]);

    const getPosts = async () => {
        try {
            const response = await api.posts();
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const postsData: PostsContextType = {
        getPosts: getPosts,
        posts: posts,
        setPosts: setPosts,
    };

    return (
        <PostsContext.Provider value={postsData}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;
