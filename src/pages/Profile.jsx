import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { selectPostsByUser } from '../selectors/postSelectors';
import { selectCurrentUser, logout } from '../features/auth/authSlice';
import api from '../services/api';
import PostCard from '../components/posts/PostCard';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import coverImg from '../assets/cover.png';
import leoImg from '../assets/Leo.jpg';
import neyImg from '../assets/Ney.jpg';
import addFriendsImg from '../assets/add-friends.png';
import messageImg from '../assets/message.png';
import moreImg from '../assets/more.png';
import jobImg from '../assets/profile-job.png';
import studyImg from '../assets/profile-study.png';
import homeImg from '../assets/profile-home.png';
import locationImg from '../assets/profile-location.png';
import feelingImg from '../assets/feeling.png';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const currentUser = useSelector(selectCurrentUser);
    const posts = useSelector((state) => selectPostsByUser(state, parseInt(id)));
    const status = useSelector((state) => state.posts.status);

    const isOwnProfile = currentUser && currentUser.id === parseInt(id);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            dispatch(logout());
            navigate('/login');
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);
            } catch (err) {
                console.error("User not found", err);
            }
        };
        fetchUser();
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [id, status, dispatch]);

    if (!user) return <p>Loading user profile...</p>;

    return (
        <div className="profile-container">
            <img src={coverImg} className="cover-img" alt="cover" />

            <div className="profile-details">
                <div className="pd-row">
                    <img src={user.avatar} className="pd-image" alt="user" />
                    <div>
                        <h3>{user.username}</h3>
                        <p>235 Friends - 15 mutual</p>
                        <img src={leoImg} width="32px" alt="friend" />
                        <img src={neyImg} width="32px" alt="friend" />
                    </div>
                </div>
                <div className="pd-right">
                    <button type="button"><img src={addFriendsImg} alt="add" /> Friends</button>
                    <button type="button"><img src={messageImg} alt="msg" /> Message</button>
                    {isOwnProfile && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{ background: '#e0245e', color: '#fff', marginLeft: '10px' }}
                        >
                            Logout
                        </button>
                    )}
                    <br />
                    <a href="#"><img src={moreImg} alt="more" /></a>
                </div>
            </div>

            <div className="profile-info">
                <div className="info-col">
                    <div className="profile-intro">
                        <h3>Intro</h3>
                        <p className="intro-text">Believe in yourself and you can do anything <img src={feelingImg} alt="emoji" /></p>
                        <hr />
                        <ul>
                            <li><img src={jobImg} alt="job" /> Went to High School</li>
                            <li><img src={studyImg} alt="study" /> Studied at OFPPT</li>
                            <li><img src={homeImg} alt="home" /> Lives in Casablanca</li>
                            <li><img src={locationImg} alt="location" /> From Casablanca</li>
                        </ul>
                    </div>
                </div>
                <div className="post-col">
                    {posts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
};

export default Profile;
