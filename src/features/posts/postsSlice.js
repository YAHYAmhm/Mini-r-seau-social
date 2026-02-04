import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const [postsResponse, usersResponse] = await Promise.all([
        api.get('/posts'),
        api.get('/users')
    ]);
    const posts = postsResponse.data;
    const users = usersResponse.data;
    return posts.map(post => ({
        ...post,
        user: users.find(u => String(u.id) === String(post.userId))
    }));
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost, { getState }) => {
    const response = await api.post('/posts', newPost);
    const currentUser = getState().auth.currentUser;
    return { ...response.data, user: currentUser };
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, data }) => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await api.delete(`/posts/${id}`);
    return id;
});

export const toggleLike = createAsyncThunk('posts/toggleLike', async ({ postId, userId }, { getState }) => {
    const state = getState();
    const post = state.posts.items.find(p => p.id === postId);
    let newLikes = [...post.likes];

    if (newLikes.includes(userId)) {
        newLikes = newLikes.filter(id => id !== userId);
    } else {
        newLikes.push(userId);
    }

    const response = await api.patch(`/posts/${postId}`, { likes: newLikes });
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload };
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.items[index].likes = action.payload.likes;
            });
    },
});

// Selectors
export const selectAllPosts = (state) => state.posts.items;

export default postsSlice.reducer;
