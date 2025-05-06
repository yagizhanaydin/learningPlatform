import React, { useState } from 'react';
import axios from 'axios';
import { Users, BarChart3, LogOut, Loader2, Trash2 } from 'lucide-react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('none');
    const [users, setUsers] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
            setActiveTab('users');
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users. Please try again.');
            setActiveTab('users');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdverts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/adverts');
            setAdverts(response.data);
            setActiveTab('adverts');
        } catch (err) {
            console.error('Error fetching adverts:', err);
            setError('Failed to load advertisements. Please try again.');
            setActiveTab('adverts');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await axios.delete(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete user. Please try again.');
        }
    };

    const handleDeleteAdvert = async (advertId) => {
        if (!window.confirm('Are you sure you want to delete this advertisement?')) {
            return;
        }

        try {
            await axios.delete(`/api/adverts/${advertId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAdverts(adverts.filter(advert => advert.id !== advertId));
        } catch (err) {
            console.error('Error deleting advertisement:', err);
            setError('Failed to delete advertisement. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("cart");
        navigate("/");
    };

    const renderStatusBadge = (status) => {
        let badgeClass = 'badge ';

        switch (status.toLowerCase()) {
            case 'active':
                badgeClass += 'badge-success';
                break;
            case 'inactive':
                badgeClass += 'badge-error';
                break;
            case 'scheduled':
                badgeClass += 'badge-warning';
                break;
            default:
                badgeClass += 'badge-neutral';
        }

        return <span className={badgeClass}>{status}</span>;
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
            </div>

            <div className="admin-container">
                <div className="admin-sidebar">
                    <button
                        className={`admin-nav-button ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={fetchUsers}
                    >
                        <Users size={20} />
                        <span>Show Users</span>
                    </button>

                    <button
                        className={`admin-nav-button ${activeTab === 'adverts' ? 'active' : ''}`}
                        onClick={fetchAdverts}
                    >
                        <BarChart3 size={20} />
                        <span>Show Adverts</span>
                    </button>

                    <button
                        className="admin-nav-button logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>

                <div className="admin-content">
                    {loading ? (
                        <div className="loading-container">
                            <Loader2 size={40} className="loading-spinner" />
                            <p>Loading data...</p>
                        </div>
                    ) : error ? (
                        <div className="error-message">
                            <p>{error}</p>
                            <button
                                className="retry-button"
                                onClick={() => activeTab === 'users' ? fetchUsers() : fetchAdverts()}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : activeTab === 'users' ? (
                        <div className="data-container">
                            <h2>User Management</h2>
                            <p className="data-count">{users.length} users found</p>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>#{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.createdAt}</td>
                                                <td>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        title="Delete user"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : activeTab === 'adverts' ? (
                        <div className="data-container">
                            <h2>Advert Management</h2>
                            <p className="data-count">{adverts.length} advertisements found</p>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Proffession</th>
                                            <th>Location</th>
                                            <th>Lesson</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adverts.map(advert => (
                                            <tr key={advert.id}>
                                                <td>#{advert.id}</td>
                                                <td>{advert.title}</td>
                                                <td>{advert.description}</td>
                                                <td>{advert.price}</td>
                                                <td>{advert.proffession}</td>
                                                <td>{advert.location}</td>
                                                <td>{advert.lesson}</td>
                                                <td>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteAdvert(advert.id)}
                                                        title="Delete advertisement"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="welcome-message">
                            <h2>Welcome to the Admin Dashboard</h2>
                            <p>Select an option from the sidebar to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;