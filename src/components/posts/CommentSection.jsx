import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, selectCommentsByPost } from '../../features/comments/commentsSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';

const CommentSection = ({ postId }) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const comments = useSelector((state) => selectCommentsByPost(state, postId));
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [postId, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Please login to comment");
        if (!content.trim()) return;

        dispatch(addComment({
            postId,
            userId: currentUser.id,
            content,
            user: currentUser // Simulating expansion for immediate UI update
        }));
        setContent('');
    };

    return (
        <div className="comment-section" style={{ borderTop: '1px solid #ccc', marginTop: '10px', paddingTop: '10px' }}>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <img src={comment.user?.avatar || '/wp1923705.jpg'} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <div style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: '18px' }}>
                            <p style={{ fontWeight: '600', fontSize: '12px' }}>{comment.user?.username || 'User'}</p>
                            <p style={{ fontSize: '13px' }}>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {currentUser && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <img src={currentUser.avatar} alt="user" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ flex: 1, border: 'none', background: '#f0f2f5', padding: '8px 15px', borderRadius: '20px', outline: 'none' }}
                    />
                </form>
            )}
        </div>
    );
};

export default CommentSection;
