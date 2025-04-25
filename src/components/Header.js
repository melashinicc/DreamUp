import React from 'react';
import './styles/Header.css';

function Header({ signedIn = '???' }) {
    return (
        <header className="header">
            <div className="logo">[Logo]</div>
            <nav className="menu">
                <a href="/dashboard">Home</a>
                <a href="/about">About</a>
                <a href="/services">Services</a>
                <a href="/contact">Contact</a>
            </nav>
            <button className="sign-out-button">
                {signedIn === true
                    ? 'Sign Out'
                    : signedIn === false
                    ? 'Sign In'
                    : signedIn}
            </button>
        </header>
    );
}

export default Header;
