import { selectAllPosts } from '../features/posts/postsSlice';

export const selectPostsByUser = (state, userId) =>
    state.posts.items.filter(post => String(post.userId) === String(userId));

export const selectPostsByHashtag = (state, hashtag) =>
    state.posts.items.filter(post => post.hashtags && post.hashtags.includes(hashtag));

export const selectPostById = (state, postId) =>
    state.posts.items.find(post => post.id === parseInt(postId));
