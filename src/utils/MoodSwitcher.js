import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './MoodSwitcher.css';

const MoodSwitcher = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const [moodText, setMoodText] = useState('Initializing face detection...');
    const [isWebcamReady, setWebcamReady] = useState(false);
    const [isLookingAway, setIsLookingAway] = useState(false);
    const lookAwayTimer = useRef(null);
    let consecutiveNoFaceFrames = 0;

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models'; // Ensure the models are in the public/models folder
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                console.log('Models loaded successfully!');
            } catch (error) {
                console.error('Error loading face-api.js models:', error);
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        const countdown = setTimeout(() => {
            setWebcamReady(true);
            setMoodText('Initializing...');
        }, 10000); // 10 seconds
        return () => clearTimeout(countdown);
    }, []);

    const detectMoodAndEyeContact = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const detection = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            if (detection) {
                consecutiveNoFaceFrames = 0;
                if (isLookingAway) {
                    setIsLookingAway(false);
                    clearTimeout(lookAwayTimer.current);
                    lookAwayTimer.current = null;
                }

                const { expressions } = detection;
                if (expressions.happy > 0.6) {
                    setMoodText('Mood: Happy');
                } else if (expressions.sad > 0.6) {
                    setMoodText('Mood: Sad');
                } else if (expressions.neutral > 0.6) {
                    setMoodText('Mood: Neutral');
                } else {
                    setMoodText('Mood: Undetected');
                }
            } else {
                consecutiveNoFaceFrames += 1;
                if (consecutiveNoFaceFrames > 5 && !isLookingAway) {
                    setMoodText('User is looking away');
                    setIsLookingAway(true);
                    if (!lookAwayTimer.current) {
                        console.log('Redirecting to /therapy...');
                        lookAwayTimer.current = setTimeout(() => {
                            navigate('/therapy');
                        }, 5000);
                    }
                }
            }
        }
    };

    useEffect(() => {
        let interval = null;
        if (isWebcamReady) {
            interval = setInterval(detectMoodAndEyeContact, 1000);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(lookAwayTimer.current);
        };
    }, [isWebcamReady]);

    return (
        <div className="webcam-container">
            <Webcam ref={webcamRef} className="webcam-feed" />
            <div className="mood-text-overlay">
                {moodText} {/* Display the mood text */}
            </div>
        </div>
    );
};

export default MoodSwitcher;
