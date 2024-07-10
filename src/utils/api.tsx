import useInterceptor from "./interceptor"



const useApi = () => {
    const interceptor = useInterceptor()
    const api = {
        posts: () => interceptor.get(`/blog/posts/`),
        post: (id: string) => interceptor.get(`/blog/post/${id}/`),
        userPosts: (user: string) => interceptor.get(`/blog/user_post/${user}/`),
        comments: () => interceptor.get(`/`),

    }
    return api
}

export default useApi