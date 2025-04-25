import React, { useState } from 'react';
import './styles/Register.css';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            console.log("Attempting to register the user...");

            // Send the user data to SQLite backend
            const response = await fetch("http://localhost:5000/save-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);  // Show error if returned from backend
                return;
            }

            console.log("User registered successfully:", data);

            // Display success message and redirect to login
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/login";  // Redirect to login page after success
            }, 2000);
        } catch (err) {
            console.error("Registration error:", err);
            setError("An error occurred during registration.");
        }
    };

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        backdropFilter: 'blur(8px)',
    };

    const registerWrapperStyle = {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        width: '80%',
        maxWidth: '900px',
        background: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
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
            <div style={overlayStyle}></div>
            <div style={registerWrapperStyle}>
                <div style={formSectionStyle}>
                    <h2>Create Your Account</h2>
                    <form
                        style={formStyle}
                        className="register-form"
                        onSubmit={handleRegister}
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
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="register-input"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />

                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="register-input"
                        />

                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </form>

                    <p>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
