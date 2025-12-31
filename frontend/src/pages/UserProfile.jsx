import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return (
            <div className="page" style={{ display: 'grid', placeItems: 'center' }}>
                <p>Loading profile...</p>
            </div>
        );
    }

    const getInitials = (name) => {
        if (!name) return "U";
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="page">
            <section className="section">
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="section-header">
                        <h2 className="section-title">My Profile</h2>
                        <p className="section-subtitle">Manage your account settings and preferences.</p>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            fontWeight: 'bold'
                        }}>
                            {getInitials(user.name)}
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{user.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{user.email}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <span className="badge" style={{
                                    background: user.isVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: user.isVerified ? '#22c55e' : '#ef4444',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}>
                                    {user.isVerified ? 'Verified Account' : 'Unverified'}
                                </span>
                                <span className="badge" style={{
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    textTransform: 'capitalize'
                                }}>
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Profile Sections Placeholder */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        <div className="card">
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Account Settings</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Update your password and security settings.</p>
                            <button onClick={() => window.location.href = '/account-settings'} className="btn" style={{ marginTop: '1rem', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                Edit Settings
                            </button>
                        </div>

                        <div className="card">
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Order History</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>View your past orders and invoices.</p>
                            <button onClick={() => window.location.href = '/my-orders'} className="btn" style={{ marginTop: '1rem', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                View Orders
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default UserProfile;
