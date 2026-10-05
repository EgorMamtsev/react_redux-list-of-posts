import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Comment, CommentData } from "../types/Comment"
import * as commentsApi from '../api/comments';




type CommentsState = { 
    loaded : boolean,
    hasError: boolean,
    items : Comment[]
}

const initialState: CommentsState = {
    loaded: false,
    hasError: false,
    items: []
}

export const fetchComments = createAsyncThunk(
'comments/fetchComments',
async (postId: number) =>{
    const comments = await commentsApi.getPostComments(postId)
    return comments;
})

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData & { postId: number }) => {
    const newComment = await commentsApi.createComment(data);
    return newComment;
  },
);


export const deleteComment = createAsyncThunk (
    'comments/deleteComment',
    async (commentId: number) => {
        await commentsApi.deleteComment(commentId)
        return commentId;
    }

)
const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers: {
        clearComments: state => {
            state.loaded = false,
            state.hasError = false,
            state.items = []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.loaded = true;
        state.items = action.payload;
        })
        .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.meta.arg)
      })
        
    }
})

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;