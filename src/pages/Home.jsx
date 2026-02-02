import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchPosts, selectAllPosts } from '../features/posts/postsSlice';
import { selectPostsByHashtag } from '../selectors/postSelectors';
import PostCard from '../components/posts/PostCard';
import WritePost from '../components/posts/WritePost';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const hashtag = searchParams.get('hashtag');
    const allPosts = useSelector(selectAllPosts);
    const posts = hashtag ? selectPostsByHashtag({ posts: { items: allPosts } }, hashtag) : allPosts;
    const status = useSelector((state) => state.posts.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <WritePost />

                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

                <button type="button" className="load-more-btn">Load More</button>
            </div>
            <RightSidebar />
        </div>
    );
};

export default Home;
