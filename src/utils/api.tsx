import useInterceptor from "./interceptor"



const useApi = () => {
    const interceptor = useInterceptor()
    const api = {
        posts: () => interceptor.get(`/blog/posts/`),
        post: (id: string) => interceptor.get(`/blog/post/${id}/`),
        editPost: (id: string, data: any) => interceptor.put(`/blog/post/${id}/`, data),
        deletePost: (id: number) => interceptor.delete(`/blog/post/${id}/`),
        userPosts: (username: string) => interceptor.get(`/blog/user_post/${username}/`),
        comments: (id: any) => interceptor.get(`/blog/comment/${id}/`),
        editComment: (id: any, data: any) => interceptor.put(`/blog/comment_view/${id}/`, data),
        deleteComment: (id: number) => interceptor.delete(`/blog/comment_view/${id}/`),
        userComments: (name: string) => interceptor.get(`blog/user_comment/${name}/`),
        createComment: (data: any) => interceptor.post(`/blog/post_comment/`, data),
        createPost: (data: any) => interceptor.post(`/blog/create_post/`, data),
        signup: (data: any) => interceptor.post(`/account/signup/`, data),
        login: (data: any) => interceptor.post(`/account/login/`, data),
        logout: (data: any) => interceptor.post(`/account/logout/`, data),
        tokenVerify: (data: any) => interceptor.post(`/account/token-verify/`, data),
        getUser: (username: any) => interceptor.get(`/account/get-user/${username}/`),
    }
    return api
}

export default useApi