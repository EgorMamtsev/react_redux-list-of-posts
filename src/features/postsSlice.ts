import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Post } from "../types/Post"
import {  getUserPosts } from "../api/posts"


type PostsState = {
    loaded : boolean,
    hasError: boolean,
    items: Post[],
}

const initialState : PostsState ={
    loaded: false,
    hasError: false,
    items: []
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPost',
    async (userId: number) => {
        const posts = await getUserPosts(userId)
        return posts;
    }
    
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        cleanPosts : (state) => {
            state.items = [],
            state.loaded = false;
    state.hasError = false;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchPosts.pending, state => {
            state.loaded = false,
            state.hasError = false
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loaded = true,
            state.items = action.payload
        })
        .addCase(fetchPosts.rejected, state => {
            state.loaded = true,
            state.hasError = true
        })
    }
})

export const { cleanPosts } = postsSlice.actions;


export default postsSlice.reducer