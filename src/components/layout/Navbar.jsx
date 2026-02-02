import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrentUser } from '../../features/auth/authSlice';
import logo from '../../assets/logo.png';
import notificationIcon from '../../assets/notification.png';
import inboxIcon from '../../assets/inbox.png';
import videoIcon from '../../assets/video.png';
import searchIcon from '../../assets/search.png';
import logoutIcon from '../../assets/logout.png';
import arrowIcon from '../../assets/arrow.png';

const Navbar = ({ toggleDarkMode, isDark }) => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav>
            <div className="nav-left">
                <Link to="/">
                    <img src={logo} className="logo" alt="logo" />
                </Link>
                <ul>
                    <li><img src={notificationIcon} alt="notifications" /></li>
                    <li><img src={inboxIcon} alt="inbox" /></li>
                    <li><img src={videoIcon} alt="videos" /></li>
                </ul>
            </div>
            <div className="nav-right">
                <div className="search-box">
                    <img src={searchIcon} alt="search" />
                    <input type="text" placeholder="Search" />
                </div>
                {currentUser ? (
                    <div className="nav-user-icon online" onClick={() => navigate(`/profile/${currentUser.id}`)}>
                        <img src={currentUser.avatar} alt="user" />
                    </div>
                ) : (
                    <Link to="/login" className="login-btn">Login</Link>
                )}
            </div>

            <div className="settings-menu">
                <div id="dark-btn" className={isDark ? "dark-btn-on" : ""} onClick={toggleDarkMode}>
                    <span></span>
                </div>
                <div className="settings-menu-inner">
                    {currentUser && (
                        <div className="user-profile">
                            <img src={currentUser.avatar} alt="user" />
                            <div>
                                <p>{currentUser.username}</p>
                                <Link to={`/profile/${currentUser.id}`}>See your profile</Link>
                            </div>
                        </div>
                    )}
                    <hr />
                    <div className="settings-links" onClick={handleLogout}>
                        <img src={logoutIcon} className="settings-icon" alt="logout" />
                        <p>Logout <img src={arrowIcon} width="10px" alt="arrow" /></p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
