import React, { useState, useEffect } from 'react';
import './LetterGame.css';

const LetterGame = () => {
    const translations = {
        en: {
            matchPairs: 'Match the letter pairs together!',
            goodJob: 'Good job!',
            tryAgain: 'Try again!',
            congratulations: 'Congratulations!',
            playAgain: 'Play again',
            backToLesson: 'Back to lesson',
        },
        si: {
            matchPairs: 'එක වගේ අකුරු එකට සම්බන්ධ කරමු!',
            goodJob: 'නියමයි!',
            tryAgain: 'ඒක වැරදී!',
            congratulations: 'නියමයි!',
            playAgain: 'ආයේ සෙල්ලම් කරමු',
            backToLesson: 'ආපහු පාඩමට යමු',
        },
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

    const [grid, setGrid] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [message, setMessage] = useState('');
    const [gameCompleted, setGameCompleted] = useState(false);
    const [language, setLanguage] = useState('en');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        const preferredLanguage = localStorage.getItem('preferredLanguage');
        setLanguage(preferredLanguage === 'si' ? 'si' : 'en');
    }, []);

    // Function to generate the grid
    const generateGrid = () => {
        const letters = [];
        const gridSize = 10 * 5;

        const letterPairs = [];
        while (letterPairs.length < gridSize) {
            const letter =
                alphabet[Math.floor(Math.random() * alphabet.length)];
            if (!letterPairs.includes(letter)) {
                letterPairs.push(letter, letter);
            }
        }

        letterPairs.sort(() => Math.random() - 0.5);

        for (let i = 0; i < gridSize; i++) {
            letters.push({
                id: i,
                letter: letterPairs[i],
                matched: false,
                selected: false,
            });
        }

        setGrid(letters);
        setMessage(translations[language].matchPairs);
    };

    // Handle letter selection
    const handleSquareClick = (index) => {
        if (gameCompleted || selectedLetters.length >= 2) return;

        const newGrid = [...grid];
        const selectedLetter = newGrid[index];

        if (selectedLetter.selected || selectedLetter.matched) return;

        selectedLetter.selected = true;
        setGrid(newGrid);

        setSelectedLetters((prev) => {
            const updatedSelected = [...prev, selectedLetter];
            if (updatedSelected.length === 2) {
                if (updatedSelected[0].letter === updatedSelected[1].letter) {
                    setMessage(translations[language].goodJob);
                    updatedSelected.forEach((letter) => {
                        const matchedSquare = newGrid.find(
                            (square) => square.id === letter.id
                        );
                        matchedSquare.matched = true;
                    });
                    setGrid(newGrid);
                } else {
                    setMessage(translations[language].tryAgain);
                    setTimeout(() => {
                        updatedSelected.forEach((letter) => {
                            const resetSquare = newGrid.find(
                                (square) => square.id === letter.id
                            );
                            resetSquare.selected = false;
                        });
                        setGrid(newGrid);
                    }, 1000);
                }
                setSelectedLetters([]);
            }
            return updatedSelected;
        });
    };

    // Check for game completion
    useEffect(() => {
        if (grid.length > 0 && grid.every((square) => square.matched)) {
            setGameCompleted(true);
            setMessage(translations[language].congratulations);
        }
    }, [grid]);

    // Reset the game
    const resetGame = () => {
        setGameCompleted(false);
        setSelectedLetters([]);
        setMessage(translations[language].matchPairs);
        generateGrid();
    };

    // Generate the grid when component mounts
    useEffect(() => {
        generateGrid();
    }, [language]);

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
        window.history.back();
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

            <div
                style={contentWrapperStyle}
                className="letter-game-content-wrapper"
            >
                <h1>{message}</h1>

                <div className="letter-game-grid">
                    {grid.map((square, index) => (
                        <div
                            key={square.id}
                            className={`letter-game-square ${
                                square.selected ? 'selected' : ''
                            } ${square.matched ? 'matched' : ''}`}
                            onClick={() => handleSquareClick(index)}
                        >
                            {square.letter}
                        </div>
                    ))}
                </div>

                {gameCompleted && (
                    <div className="game-popup">
                        <h2>{translations[language].congratulations}</h2>
                        <p>{translations[language].goodJob}</p>
                        <div className="game-buttons">
                            <button onClick={resetGame}>
                                {translations[language].playAgain}
                            </button>
                            <button onClick={handleBackClick}>
                                {translations[language].backToLesson}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LetterGame;
