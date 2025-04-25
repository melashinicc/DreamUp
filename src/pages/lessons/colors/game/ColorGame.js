import React from 'react';
import './ColorGame.css';
import { useState, useEffect } from 'react';

const ColorGame = () => {
    const colors = [
        'red',
        'blue',
        'yellow',
        'green',
        'pink',
        'orange',
        'white',
        'purple',
        'black',
        'brown',
        'gray',
        'teal',
        'lime',
        'cyan',
        'magenta',
        'maroon',
        'navy',
        'olive',
        'gold',
        'silver',
        'beige',
        'turquoise',
        'lavender',
        'coral',
        'indigo',
    ];

    const translations = {
        en: {
            pickColor: 'Pick this color',
            tryAgain: 'Try again!',
            goodJob: 'Good job!',
        },
        si: {
            pickColor: 'හරි පාට තෝරමු',
            tryAgain: 'ඒක වැරදී!',
            goodJob: 'නියමයි!',
        },
    };

    const [targetColor, setTargetColor] = useState('');
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Get preferred language from localStorage
        const preferredLanguage = localStorage.getItem('preferredLanguage');
        setLanguage(preferredLanguage === 'si' ? 'si' : 'en');
    }, []);

    // Initialize game with a new target color and options
    const initializeGame = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const shuffledColors = [...colors]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        const newOptions = [randomColor, ...shuffledColors].sort(
            () => 0.5 - Math.random()
        );

        setTargetColor(randomColor);
        setOptions(newOptions);
        setMessage(translations[language].pickColor);
    };

    // Handle button click
    const handleClick = (color) => {
        if (color === targetColor) {
            setMessage(translations[language].goodJob);
            setTimeout(() => {
                initializeGame();
            }, 2000); // Reset game after 2 seconds
        } else {
            setMessage(translations[language].tryAgain);
        }
    };

    useEffect(() => {
        initializeGame(); // Initialize game on component mount
    }, [language]);

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

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 4, // Ensure it stays above other elements
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    };

    const svgStyle = {
        width: '1.5rem',
        height: '1.5rem',
        fill: 'black',
    };

    const handleBackClick = () => {
        window.history.back(); // Navigate to the previous page
    };

    return (
        <div style={backgroundStyle}>
            <button
                style={backButtonStyle}
                onClick={handleBackClick}
                className="back-button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={svgStyle}
                    aria-hidden="true"
                >
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
            </button>

            {/* Overlay for blur effect */}
            <div style={overlayStyle}></div>

            {/* Content Wrapper */}
            <div className="content-wrapper">
                <div className="game-left">
                    <h2>{message}</h2>
                    <div
                        className="target-color"
                        style={{ backgroundColor: targetColor }}
                    ></div>
                </div>
                <div className="game-right">
                    <div className="color-grid">
                        {options.map((color, index) => (
                            <button
                                key={index}
                                className="color-button"
                                style={{ backgroundColor: color }}
                                onClick={() => handleClick(color)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorGame;
