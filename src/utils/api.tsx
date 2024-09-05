import useInterceptor from "./interceptor"



const useApi = () => {
    const interceptor = useInterceptor()
    const api = {
        posts: () => interceptor.get(`/blog/posts/`),
        createPost: (data:any) => interceptor.post(`/blog/posts/`, data),
        post: (id: string) => interceptor.get(`/blog/post/${id}/`),
        editPost: (id: string, data: any) => interceptor.put(`/blog/post/${id}/`, data),
        deletePost: (id: number) => interceptor.delete(`/blog/post/${id}/`),
        userPosts: (username: string) => interceptor.get(`/blog/user_post/${username}/`),
        
        // Comment
        createComment: (data:any) => interceptor.post(`/blog/comments/`, data),
        comments: (slug: any) => interceptor.get(`/blog/post-comments/${slug}/`),
        editComment: (id: any, data: any) => interceptor.put(`/blog/comment-view/${id}/`, data),
        deleteComment: (id: number) => interceptor.delete(`/blog/comment-view/${id}/`),
        
        userComments: (name: string) => interceptor.get(`blog/user-comment/${name}/`),
        
        signup: (data: any) => interceptor.post(`/account/signup/`, data),
        login: (data: any) => interceptor.post(`/account/login/`, data),
        logout: (data: any) => interceptor.post(`/account/logout/`, data),
        tokenVerify: (data: any) => interceptor.post(`/account/token-verify/`, data),
        getUser: (username: any) => interceptor.get(`/account/get-user/${username}/`),
    }
    return api
}

export default useApi