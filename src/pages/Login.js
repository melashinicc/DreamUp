import React, { useState } from 'react';
import { auth } from '../auth/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            console.log("Email:", email);
            console.log("Password:", password);
            
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
    
            // Save email in localStorage
            localStorage.setItem('userEmail', email);
    
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };
    
    

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative', // For overlay positioning
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken effect
        zIndex: 1, // Layer above the background
        backdropFilter: 'blur(8px)', // Blur effect
    };

    const loginWrapperStyle = {
        position: 'relative', // To place it above the overlay
        zIndex: 2, // Content above overlay
        display: 'flex',
        width: '80%',
        maxWidth: '900px',
        background: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    };

    const imageSectionStyle = {
        flex: 1,
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/kids-learning.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const formSectionStyle = {
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left',
    };

    const formStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };

    return (
        <div style={backgroundStyle}>
            {/* Darkened blur overlay */}
            <div style={overlayStyle}></div>

            {/* Login wrapper */}
            <div style={loginWrapperStyle}>
                {/* Left side - image */}
                <div style={imageSectionStyle}></div>

                {/* Right side - form */}
                <div style={formSectionStyle}>
                    <h2>Login to DreamUp</h2>
                    <form
                        style={formStyle}
                        className="login-form"
                        onSubmit={handleLogin}
                    >
                        {error && (
                            <p className="error" style={{ color: 'red' }}>
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="success" style={{ color: 'green' }}>
                                {success}
                            </p>
                        )}

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>

                    <p>
                        No account? <a href="/register">Create one</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
