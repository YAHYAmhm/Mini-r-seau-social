import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/posts/postsSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import photoIcon from '../../assets/photo.png';
import feelingIcon from '../../assets/feeling.png';

const WritePost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [hashtags, setHashtags] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Please login first");

        const newPost = {
            content,
            image: image || "https://picsum.photos/400/300",
            userId: currentUser.id,
            hashtags: hashtags.split(',').map(s => s.trim()).filter(s => s !== ''),
            likes: [],
            date: new Date().toISOString()
        };

        dispatch(createPost(newPost));
        setContent('');
        setImage('');
        setHashtags('');
    };

    if (!currentUser) return null;

    return (
        <div className="write-post-container" style={{ border: '1px solid var(--glass-border)' }}>
            <div className="user-profile">
                <img src={currentUser.avatar} alt="user" style={{ width: '45px', height: '45px' }} />
                <div>
                    <p style={{ fontWeight: '600' }}>{currentUser.username}</p>
                    <small style={{ color: 'var(--text-soft)' }}>Public <i className="fa-solid fa-caret-down"></i></small>
                </div>
            </div>
            <div className="post-input-container" style={{ paddingLeft: '0', marginTop: '15px' }}>
                <textarea
                    rows="2"
                    placeholder={`What's on your mind, ${currentUser.username}?`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        fontSize: '18px',
                        borderBottom: 'none',
                        padding: '10px 0',
                        color: 'var(--text-main)'
                    }}
                ></textarea>

                {image && (
                    <div style={{ position: 'relative', marginBottom: '15px' }}>
                        <img src={image} alt="preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }} />
                        <button
                            onClick={() => setImage('')}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                        >
                            ×
                        </button>
                    </div>
                )}

                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <i className="fas fa-hashtag" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#1876f2' }}></i>
                    <input
                        type="text"
                        placeholder="Hashtags (comma separated)"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #ddd', background: 'var(--body-color)', color: 'var(--text-main)' }}
                    />
                </div>

                <hr style={{ margin: '15px 0', opacity: '0.1' }} />
                <div className="add-post-links" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-soft)' }}>
                            <img src={photoIcon} alt="photo" style={{ width: '24px' }} />
                            <span>Photo/Video</span>
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-soft)' }}>
                            <img src={feelingIcon} alt="feeling" style={{ width: '24px' }} />
                            <span>Feeling</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        style={{
                            background: 'var(--primary-color)',
                            color: 'white',
                            padding: '8px 25px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px var(--primary-soft)'
                        }}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WritePost;
