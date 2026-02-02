import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost.jsx';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import { selectCurrentUser } from './features/auth/authSlice';

function App() {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        const newTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="app">
            <Navbar toggleDarkMode={toggleDarkMode} isDark={isDark} />
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/posts/new" element={<NewPost />} />
                    <Route path="/posts/edit/:id" element={<EditPost />} />
                    <Route path="/my-posts" element={<MyPosts />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
