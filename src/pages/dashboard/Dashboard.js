import React from 'react';
import './Dashboard.css';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';

// Card Components
const Card = ({ children, className, onClick }) => (
    <div className={`card ${className || ''}`} onClick={onClick}>
        {children}
    </div>
);

const CardHeader = ({ children }) => (
    <div className="card-header">{children}</div>
);

const CardContent = ({ children, className }) => (
    <div className={`card-content ${className || ''}`}>{children}</div>
);

// Button Component
const Button = ({ children, className, ...props }) => (
    <button className={`button ${className || ''}`} {...props}>
        {children}
    </button>
);

const Dashboard = () => {
    const navigateToLesson = (path) => {
        window.location.href = path;
    };

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
        paddingBottom: '4rem',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
        zIndex: 1,
    };

    return (
        <div className="dashboard">
            {/* <header className="dashboard-header">
                <div className="header-container">
                    <h1 className="logo">DreamUp</h1>
                    <div className="header-actions">
                        <button className="header-link">Profile</button>
                        <button className="header-link">Settings</button>
                        <button className="logout-button">Log out</button>
                    </div>
                </div>
            </header> */}

            <DashboardHeader />

            <main className="main-section">
                <section className="lessons-section">
                    <h2 className="section-title">Lessons</h2>
                    <div className="lessons-grid">
                        {[
                            {
                                title: 'Numbers',
                                image: `${process.env.PUBLIC_URL}/dashboard/numbers.webp`,
                                className: 'lesson-card lesson-card-1',
                                path: '/lessons/numbers/',
                            },
                            {
                                title: 'Colors',
                                image: `${process.env.PUBLIC_URL}/dashboard/colors.webp`,
                                className: 'lesson-card lesson-card-2',
                                path: '/lessons/colors/',
                            },
                            {
                                title: 'Letters',
                                image: `${process.env.PUBLIC_URL}/dashboard/letters.jpg`,
                                className: 'lesson-card lesson-card-3',
                                path: '/lessons/letters/',
                            },
                        ].map((lesson, index) => (
                            <Card
                                key={index}
                                className={lesson.className}
                                onClick={() => navigateToLesson(lesson.path)}
                            >
                                <div className="lesson-image-container">
                                    <img
                                        src={lesson.image}
                                        alt={lesson.title}
                                        className="lesson-image"
                                    />
                                    <div className="lesson-overlay">
                                        <h3 className="lesson-title">
                                            {lesson.title}
                                        </h3>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <div style={backgroundStyle}>
                <div style={overlayStyle}></div>
                <section className="therapy-section">
                    <div className="therapy-card-container">
                        <Card className="therapy-card">
                            <CardHeader>
                                <h2 className="therapy-title">Music Therapy</h2>
                            </CardHeader>
                            <CardContent className="therapy-content">
                                <p className="therapy-text">
                                    Music therapy helps children explore sounds
                                    and rhythms, boosting mood, focus, and
                                    creativity in a fun, expressive way.
                                </p>
                                <Button
                                    className="therapy-button"
                                    onClick={() => navigateToLesson('/therapy')}
                                >
                                    Start Learning
                                </Button>
                            </CardContent>
                        </Card>
                        <div className="therapy-image-wrapper">
                            <img
                                src="https://thumbs.dreamstime.com/b/kids-home-playing-smartphone-listening-to-music-36069340.jpg"
                                alt="Musical xylophone toy"
                                className="therapy-instrument-image"
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* <footer className="dashboard-footer">
                <div className="footer-container">
                    <p className="footer-text">Copyrights 2024 by DreamUp</p>
                </div>
            </footer> */}

            <DashboardFooter />
        </div>
    );
};

export default Dashboard;
