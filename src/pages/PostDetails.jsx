import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { selectPostById } from '../selectors/postSelectors';
import PostCard from '../components/posts/PostCard';
import CommentSection from '../components/posts/CommentSection';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => selectPostById(state, id));
    const allPosts = useSelector(state => state.posts.items);

    useEffect(() => {
        if (allPosts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [allPosts, dispatch]);

    if (!post) return <p>Loading post...</p>;

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <PostCard post={post} />
                <CommentSection postId={post.id} />
            </div>
            <RightSidebar />
        </div>
    );
};

export default PostDetails;
