import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '6rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                marginBottom: '1rem',
                lineHeight: 1
            }}>404</h1>

            <h2 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
            }}>Page Not Found</h2>

            <p style={{
                color: 'var(--text-secondary)',
                maxWidth: '400px',
                marginBottom: '2rem',
                fontSize: '1.1rem'
            }}>
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>

            <Link to="/home" className="btn">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
