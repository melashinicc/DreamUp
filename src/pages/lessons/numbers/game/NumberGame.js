import React, { useState, useEffect } from 'react';
import './NumberGame.css';
import birdImg from './images/bird.png';
import flowerImg from './images/flower.png';
import carImg from './images/car.png';

import normalFace from './faces/waiting.webp';
import correctFace from './faces/correct.webp';
import wrongFace from './faces/wrong.webp';

const texts = {
    en: {
        howMany: 'How many',
        correct: "That's Correct!",
        tryAgain: 'Try Again!',
        areThere: 'are there?',
    },
    si: {
        howMany: 'මෙතන',
        correct: 'ඒක හරි!',
        tryAgain: 'ඒක වැරදී!',
        areThere: 'කීයක්ද?',
    },
};

const imagesList = [
    { name: { en: 'birds', si: 'කුරුල්ලෝ' }, src: birdImg },
    { name: { en: 'flowers', si: 'මල්' }, src: flowerImg },
    { name: { en: 'cars', si: 'වාහන' }, src: carImg },
];

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOptions(correctNumber) {
    const options = [correctNumber];
    while (options.length < 4) {
        const option = generateRandomNumber(1, 10);
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    return options.sort(() => 0.5 - Math.random());
}

function NumberGame() {
    const [currentImage, setCurrentImage] = useState({});
    const [imageCount, setImageCount] = useState(0);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [currentFace, setCurrentFace] = useState(normalFace);
    const [feedbackText, setFeedbackText] = useState('');
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Load preferred language from localStorage
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        setLanguage(savedLanguage);

        // Generate the first game
        generateNewGame(savedLanguage);
    }, []);

    const generateNewGame = (lang = language) => {
        const selectedImage =
            imagesList[Math.floor(Math.random() * imagesList.length)];
        const count = generateRandomNumber(1, 10);
        setCurrentImage(selectedImage);
        setImageCount(count);
        const correctOption = count;
        setCorrectAnswer(correctOption);
        setOptions(generateOptions(correctOption));
        setCurrentFace(normalFace);
        setFeedbackText(
            `${texts[lang].howMany} ${selectedImage.name[lang]} ${texts[lang].areThere}`
        );
    };

    const handleOptionClick = (option) => {
        if (option === correctAnswer) {
            setCurrentFace(correctFace);
            setFeedbackText(texts[language].correct);
            setTimeout(() => {
                generateNewGame();
            }, 3000);
        } else {
            setCurrentFace(wrongFace);
            setFeedbackText(texts[language].tryAgain);
        }
    };

    // Styles for background and content layout
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
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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

            <div style={overlayStyle}></div>
            <div style={contentWrapperStyle}>
                <div className="numbers-page">
                    {/* Left: Face Image */}
                    <div className="face-container">
                        <img src={currentFace} alt="Feedback Face" />
                    </div>

                    {/* Right: Game Section */}
                    <div className="game-container">
                        {/* Image Row */}
                        <div className="image-row">
                            {Array.from({ length: imageCount }).map(
                                (_, index) => (
                                    <img
                                        key={index}
                                        src={currentImage.src}
                                        alt={currentImage.name[language]}
                                    />
                                )
                            )}
                        </div>

                        {/* Question */}
                        <h2 className="question-text">{feedbackText}</h2>

                        {/* Options Column */}
                        <div className="options-column">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className="option"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {Array.from({ length: option }).map(
                                        (_, i) => (
                                            <div
                                                key={i}
                                                className="circle"
                                            ></div>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NumberGame;
