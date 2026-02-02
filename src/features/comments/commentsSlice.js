import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchComments = createAsyncThunk('comments/fetchByPost', async (postId) => {
    const response = await api.get(`/comments?postId=${postId}&_expand=user`);
    return { postId, comments: response.data };
});

export const addComment = createAsyncThunk('comments/addComment', async (newComment) => {
    const response = await api.post('/comments', newComment);
    return response.data;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        byPostId: {}, // { postId: [comments] }
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.byPostId[action.payload.postId] = action.payload.comments;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { postId } = action.payload;
                if (!state.byPostId[postId]) state.byPostId[postId] = [];
                state.byPostId[postId].push(action.payload);
            });
    },
});

export const selectCommentsByPost = (state, postId) => state.comments.byPostId[postId] || [];

export default commentsSlice.reducer;
