import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../../features/auth/authSlice';
import { LogOut, Users, LayoutGrid, ShoppingBag, Radio, ChevronDown } from 'lucide-react';
import newsIcon from '../../assets/news.png';
import friendsIcon from '../../assets/friends.png';
import groupIcon from '../../assets/group.png';
import marketplaceIcon from '../../assets/marketplace.png';
import watchIcon from '../../assets/watch.png';
import s1 from '../../assets/shortcut-1.png';
import s2 from '../../assets/shortcut-2.png';

const Sidebar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const handleLogout = () => {
        if (window.confirm("Switch to another account?")) {
            dispatch(logout());
        }
    };

    return (
        <div className="left-sidebar">
            <div className="imp-links">
                <Link to="/"><LayoutGrid size={24} style={{ marginRight: '12px', color: '#1876f2' }} /> Posts</Link>
                <Link to="#"><Users size={24} style={{ marginRight: '12px', color: '#1876f2' }} /> Friends</Link>
                <Link to="#"><Users size={24} style={{ marginRight: '12px', color: '#1876f2' }} /> Group</Link>
                <Link to="#"><ShoppingBag size={24} style={{ marginRight: '12px', color: '#1876f2' }} /> Market-place</Link>
                <Link to="#"><Radio size={24} style={{ marginRight: '12px', color: '#1876f2' }} /> Reels</Link>
                <div onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 12px', color: '#e0245e' }}>
                    <LogOut size={24} style={{ marginRight: '12px' }} />
                    <strong>Logout / Switch</strong>
                </div>
            </div>
            <div className="shortcut-links">
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>Trending Hashtags</p>
                <div style={{ paddingLeft: '10px' }}>
                    <Link to="/?hashtag=react" style={{ display: 'block', marginBottom: '15px', color: '#1876f2', textDecoration: 'none' }}>#react</Link>
                    <Link to="/?hashtag=frontend" style={{ display: 'block', marginBottom: '15px', color: '#1876f2', textDecoration: 'none' }}>#frontend</Link>
                    <Link to="/?hashtag=CHESS" style={{ display: 'block', marginBottom: '15px', color: '#1876f2', textDecoration: 'none' }}>#CHESS</Link>
                </div>
                <p>Your Shortcuts</p>
                <Link to="#"><img src={s1} alt="s1" /> Web Developers</Link>
                <Link to="#"><img src={s2} alt="s2" /> Web Design course</Link>
                {currentUser && (
                    <Link to="/my-posts" className="active" style={{ background: '#e4e6eb', padding: '10px', borderRadius: '8px' }}>My Posts</Link>
                )}
            </div>
            <div className="course-info" style={{ marginTop: '20px', padding: '15px', borderTop: '1px solid var(--glass-border)', fontSize: '13px', color: 'var(--text-soft)' }}>
                <p><strong>Teacher:</strong> ACHERRAT Imane</p>
                <p><strong>Year:</strong> 2025/2026</p>
            </div>
        </div>
    );
};

export default Sidebar;
