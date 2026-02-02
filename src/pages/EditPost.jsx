import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../features/posts/postsSlice';
import { selectPostById } from '../selectors/postSelectors';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector(state => selectPostById(state, id));

    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (post) {
            setContent(post.content);
            setImage(post.image);
        }
    }, [post]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updatePost({ id: parseInt(id), data: { content, image } }));
        navigate('/my-posts');
    };

    if (!post) return <p>Post not found...</p>;

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <div className="write-post-container" style={{ padding: '20px', border: '1px solid var(--glass-border)' }}>
                    <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>Edit Post</h2>
                    <form onSubmit={handleUpdate}>
                        <textarea
                            rows="5"
                            style={{
                                width: '100%',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                background: 'var(--body-color)',
                                color: 'var(--text-main)',
                                fontSize: '16px',
                                marginBottom: '15px'
                            }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>

                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ fontSize: '14px', color: 'var(--text-soft)', marginBottom: '8px' }}>Post Image:</p>
                            {image && (
                                <div style={{ position: 'relative', marginBottom: '10px' }}>
                                    <img src={image} alt="preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '250px', objectFit: 'cover' }} />
                                    <button
                                        type="button"
                                        onClick={() => setImage('')}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            <label style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 15px',
                                background: 'var(--primary-soft)',
                                color: 'var(--primary-color)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}>
                                <i className="fas fa-image"></i>
                                {image ? 'Change Image' : 'Add Image'}
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button type="submit" style={{ background: 'var(--primary-color)', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
                            <button type="button" onClick={() => navigate(-1)} style={{ background: 'transparent', color: 'var(--text-soft)', padding: '10px 20px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <RightSidebar />
        </div>
    );
};

export default EditPost;
