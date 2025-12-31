import React, { useState, useEffect } from 'react';
import { updateUserDetails } from '../services/authServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setName(user.name);
            setEmail(user.email);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const data = { name, password }; // ID is inferred from token on backend

            const updatedUser = await updateUserDetails(data, token);

            // Update local storage
            localStorage.setItem('user', JSON.stringify(updatedUser)); // Backend returns updated user object + token usually
            if (updatedUser.token) {
                localStorage.setItem('token', updatedUser.token);
            }

            toast.success('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="section-header">
                        <h2 className="section-title">Account Settings</h2>
                        <p className="section-subtitle">Update your profile and security preferences.</p>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="field-group">
                                <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="input"
                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                />
                                <small style={{ color: 'var(--text-secondary)' }}>Email cannot be changed.</small>
                            </div>

                            <div className="field-group" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Change Password</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="input"
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="input"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn"
                                disabled={loading}
                                style={{ marginTop: '1rem' }}
                            >
                                {loading ? 'Updating...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccountSettings;
