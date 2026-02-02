import React from 'react';
import WritePost from '../components/posts/WritePost';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';

const NewPost = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h2 style={{ marginBottom: '20px' }}>Create New Post</h2>
                <WritePost />
            </div>
            <RightSidebar />
        </div>
    );
};

export default NewPost;
