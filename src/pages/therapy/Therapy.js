import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Therapy.css';

const Therapy = () => {
    const [bubbles, setBubbles] = useState([]);
    const [popCount, setPopCount] = useState(0);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Add a new bubble every second
        const interval = setInterval(() => {
            const newBubble = {
                id: Date.now(),
                size: Math.random() * 50 + 50, // Bubble size between 50px and 100px
                left: Math.random() * 100, // Random left position (percentage)
            };
            setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

            // Remove bubble after 10 seconds
            setTimeout(() => {
                setBubbles((prevBubbles) =>
                    prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
                );
            }, 10000);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const popBubble = (id) => {
        setBubbles((prevBubbles) =>
            prevBubbles.filter((bubble) => bubble.id !== id)
        );
        setPopCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        // Load the YouTube IFrame Player API script
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);

        // Initialize YouTube player when the API script is loaded
        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player('background-audio', {
                videoId: 'pJYwKJPaEKU', // YouTube video ID
                playerVars: {
                    autoplay: 1, // Auto-play the video on load
                    controls: 0, // Hide video controls
                    showinfo: 0, // Hide video info
                    modestbranding: 1, // Minimal YouTube branding
                    loop: 1, // Loop the video
                    playlist: 'pJYwKJPaEKU', // Required for looping
                    fs: 0, // Disable fullscreen button
                    rel: 0, // Disable related videos at the end
                },
                events: {
                    onReady: (event) => {
                        event.target.playVideo(); // Automatically play the video
                    },
                },
            });
        };

        return () => {
            // Clean up the YouTube player script
            delete window.onYouTubeIframeAPIReady;
        };
    }, []);

    return (
        <div className="bubble-container">
            {/* Hidden YouTube IFrame Player */}
            <div id="background-audio" style={{ display: 'none' }}></div>

            <h1 className="title">Pop the Bubbles!</h1>
            <div className="pop-counter">Bubbles popped: {popCount}</div>

            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: `${bubble.left}%`,
                    }}
                    onClick={() => popBubble(bubble.id)}
                />
            ))}

            {/* "Go back" button */}
            <button className="go-back-button" onClick={() => navigate(-1)}>
                Go back
            </button>
        </div>
    );
};

export default Therapy;
