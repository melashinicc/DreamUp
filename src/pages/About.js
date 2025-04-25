import React from 'react';
import Header from '../components/Header';
import './styles/About.css';

function About() {
    return (
        <main className="about-main">
            <Header />

            <section className="about-content">
                <h1>About Us</h1>
                <h2>Get to Know Us</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <div className="image-placeholder">[Image Placeholder]</div>
            </section>

            <footer className="footer">
                <p>© 2024 DreamUp. All rights reserved.</p>
            </footer>
        </main>
    );
}

export default About;
