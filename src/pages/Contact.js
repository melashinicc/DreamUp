import React from 'react';
import Header from '../components/Header';
import './styles/Contact.css';

function Contact() {
    return (
        <main className="contact-main">
            <Header signedIn={true} />

            <div className="contact-content">
                <h1>Contact Us</h1>
                <h2>We're here to help</h2>

                <form className="contact-form">
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="text" placeholder="Subject" required />
                    <textarea placeholder="Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>

                <div className="contact-info">
                    <p>Email: support@dreamup.com</p>
                    <p>Phone: +1 (800) 123-4567</p>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; 2024 DreamUp. All rights reserved.</p>
            </footer>
        </main>
    );
}

export default Contact;
