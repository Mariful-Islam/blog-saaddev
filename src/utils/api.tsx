import useInterceptor from "./interceptor"



const useApi = () => {
    const interceptor = useInterceptor()
    const api = {
        posts: () => interceptor.get(`/blog/posts/`),
        post: (id: string) => interceptor.get(`/blog/post/${id}/`),
        deletePost: (id: number) => interceptor.delete(`/blog/post_delete/${id}/`),
        userPosts: (user: string) => interceptor.get(`/blog/user_post/${user}/`),
        comments: (id: any) => interceptor.get(`/blog/comment/${id}/`),
        editComment: (id: any) => interceptor.get(`/blog/comment/${id}/`),
        deleteComment: (id: number) => interceptor.delete(`/blog/delete_comment/${id}/`),
        userComments: (name: string) => interceptor.get(`blog/user_comment/${name}/`),
        createComment: (data: any) => interceptor.post(`/blog/post_comment/`, data),
        createPost: (data: any) => interceptor.post(`/blog/create_post/`, data),
    }
    return api
}

export default useApi