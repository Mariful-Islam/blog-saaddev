import { createSlice } from "@reduxjs/toolkit";
import useApi from "../utils/api";

interface PostType {
    posts: any[];
    isLoaded: boolean;
}

const initialState: PostType = {
    posts: [],
    isLoaded: false
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            state.isLoaded = true
        }
    }
})


export const { setPosts } = postsSlice.actions


export const fetchPosts = () => async (dispatch:any) => {
    const api = useApi()
    try {
        const response = await api.posts()
        dispatch(setPosts(response.data))
    } catch {
        console.log('Error fetch posts.')
    }
}

export default postsSlice.reducer