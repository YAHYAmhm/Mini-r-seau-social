import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../features/posts/postsSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import { selectPostsByUser } from '../selectors/postSelectors';
import PostCard from '../components/posts/PostCard';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';

const MyPosts = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const userPosts = useSelector((state) => selectPostsByUser(state, currentUser?.id));
    const status = useSelector((state) => state.posts.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this post?")) {
            dispatch(deletePost(id));
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h2 style={{ marginBottom: '20px' }}>My Posts</h2>
                {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <p>You haven't posted anything yet.</p>
                )}
            </div>
            <RightSidebar />
        </div>
    );
};

export default MyPosts;
