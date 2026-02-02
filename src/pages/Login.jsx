import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setCurrentUser, selectCurrentUser } from '../features/auth/authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentUser, navigate]);

    const handleQuickLogin = (user) => {
        dispatch(setCurrentUser(user));
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/users?username=${username}`);
            if (response.data.length > 0) {
                dispatch(setCurrentUser(response.data[0]));
                navigate('/');
            } else {
                alert('User not found');
            }
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Mini Social Network</h2>

                <div className="quick-login">
                    <p>Log in with a quick switch:</p>
                    {loading ? (
                        <div className="loader">🛞</div>
                    ) : (
                        <div className="user-list">
                            {users.map(u => (
                                <div key={u.id} className="user-item" onClick={() => handleQuickLogin(u)}>
                                    <img src={u.avatar} alt={u.username} />
                                    <span>{u.username}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
