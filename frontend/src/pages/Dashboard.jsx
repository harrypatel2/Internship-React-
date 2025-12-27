import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../services/statsServices';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="page" style={{ display: 'grid', placeItems: 'center' }}>Loading dashboard...</div>;
    }

    return (
        <div className="page">
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Dashboard</h2>
                        <p className="section-subtitle">Overview of your store's performance.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {/* Products Card */}
                        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Total Products</h3>
                            <p style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary)', lineHeight: 1 }}>{stats.products}</p>
                            <Link to="/products" className="btn" style={{ marginTop: '2rem', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                View Products
                            </Link>
                        </div>

                        {/* Users Card */}
                        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Total Users</h3>
                            <p style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--secondary)', lineHeight: 1 }}>{stats.users}</p>
                            <div className="btn" style={{ marginTop: '2rem', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'default' }}>
                                Active Accounts
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
