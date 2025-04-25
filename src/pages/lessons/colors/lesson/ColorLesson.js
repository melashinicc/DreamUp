import React, { useEffect, useState } from 'react';
import './ColorLesson.css';
import MoodSwitcher from '../../../../utils/MoodSwitcher';

const ColorLesson = () => {
    // State for the selected language
    const [language, setLanguage] = useState('en');

    // Check localStorage for preferredLanguage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        setLanguage(savedLanguage);
    }, []);

    // Handle language change
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage);
    };

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg1.jpg)`,
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

    const contentWrapperStyle = {
        position: 'relative',
        zIndex: 2,
    };

    const webcamStyle = {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 3,
        border: '2px solid #2563eb',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '200px',
        height: '150px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 4,
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 4,
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
    };

    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <div style={backgroundStyle}>
            {/* Back Button */}
            <button style={backButtonStyle} onClick={handleBackClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ width: '1.5rem', height: '1.5rem', fill: 'black' }}
                    aria-hidden="true"
                >
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
            </button>

            {/* Language Dropdown */}
            <select
                style={dropdownStyle}
                value={language}
                onChange={handleLanguageChange}
                aria-label="Select Language"
            >
                <option value="en">English</option>
                <option value="si">Sinhala</option>
            </select>

            {/* Overlay */}
            <div style={overlayStyle}></div>

            {/* Content Wrapper */}
            <div style={contentWrapperStyle} className="content-wrapper">
                <div className="video-section">
                    <iframe
                        key={language}
                        width="100%"
                        height="600"
                        src={
                            language === 'en'
                                ? 'https://www.youtube.com/embed/qhOTU8_1Af4'
                                : 'https://www.youtube.com/embed/E4TAe7F4GGc'
                        }
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Colors Lesson Video - ${language}`}
                    />
                </div>
                <div className="info-section">
                    <h2>Colors</h2>
                    <p>
                        Music therapy helps children explore sounds and rhythms,
                        boosting mood, focus, and creativity in a fun,
                        expressive way.
                    </p>
                    <a href="/games/colors">
                        <button className="play-game-button">Play Game</button>
                    </a>
                </div>
            </div>

            {/* Webcam (MoodSwitcher) */}
            <div style={webcamStyle}>
                <MoodSwitcher />
            </div>
        </div>
    );
};

export default ColorLesson;
