import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, deletePost } from '../../features/posts/postsSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { Edit, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [showComments, setShowComments] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const isLiked = post.likes && currentUser && post.likes.includes(currentUser.id);
    const isAuthor = currentUser && currentUser.id === post.userId;

    const handleLike = () => {
        if (!currentUser) return alert('Please login to like');
        setIsLiking(true);
        dispatch(toggleLike({ postId: post.id, userId: currentUser.id }));
        setTimeout(() => setIsLiking(false), 500);
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return 'Recently';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="post-container">
            <div className="post-row">
                <div className="user-profile">
                    <img src={post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}`} alt="user" style={{ width: '45px', height: '45px' }} />
                    <div>
                        <p>{post.user?.username || 'Unknown'}</p>
                        <span>{formatTime(post.date)}</span>
                    </div>
                </div>
                {isAuthor && (
                    <div className="post-actions" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                        <Link to={`/posts/edit/${post.id}`} className="action-btn edit" title="Edit Post">
                            <Edit size={18} />
                        </Link>
                        <button
                            onClick={() => window.confirm('Are you sure?') && dispatch(deletePost(post.id))}
                            className="action-btn delete"
                            title="Delete Post"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>

            <p className="post-text">
                {post.content}
                {post.hashtags && post.hashtags.map(tag => (
                    <Link key={tag} to={`/?hashtag=${tag}`} style={{ color: '#1876f2', marginLeft: '5px', textDecoration: 'none' }}>#{tag}</Link>
                ))}
            </p>

            {post.image && <img src={post.image} className="post-img" alt="post" style={{ borderRadius: '8px', marginTop: '10px' }} />}

            <div className="post-row" style={{ marginTop: '15px', borderTop: '1px solid #f0f2f5', paddingTop: '10px' }}>
                <div className="activity-icons">
                    <div onClick={handleLike} className={`like-btn ${isLiked ? 'liked' : ''} ${isLiking ? 'animating' : ''}`} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: isLiked ? '#e0245e' : 'inherit' }}>
                        <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{post.likes?.length || 0}</span>
                    </div>
                    <div onClick={() => setShowComments(!showComments)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MessageCircle size={20} />
                        <span>Discuss</span>
                    </div>
                    <div style={{ cursor: 'pointer' }}>
                        <Share2 size={20} />
                    </div>
                </div>
            </div>

            {showComments && <CommentSection postId={post.id} />}
        </div>
    );
};

export default PostCard;
