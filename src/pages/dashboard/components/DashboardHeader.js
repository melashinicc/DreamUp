import React from 'react';
import './styles/DashboardHeader.css';

const DashboardHeader = () => {
    const handleLogout = () => {
        // Clear userEmail from localStorage
        localStorage.removeItem('userEmail');
        // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <header className="header">
            <div className="header-logo">DreamUp</div>
            <div className="header-right">
                {/* <i className="icon profile-icon">Profile</i>
                <i className="icon settings-icon">Settings</i> */}
                <button className="logout-button" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
