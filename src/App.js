import './App.css';

// Website pages
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Lessons
import ColorLesson from './pages/lessons/colors/lesson/ColorLesson';
import LetterLesson from './pages/lessons/letters/lesson/LetterLesson';
import NumberLesson from './pages/lessons/numbers/lesson/NumberLesson';

// Games
import ColorGame from './pages/lessons/colors/game/ColorGame';
import NumberGame from './pages/lessons/numbers/game/NumberGame';
import LetterGame from './pages/lessons/letters/game/LetterGame';

// Therapy
import Therapy from './pages/therapy/Therapy';

// Utilities
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Redirect Wrapper for Root Route
const RedirectRoot = () => {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ----------------------------------------------- */}
                {/* WEBSITE PAGES */}
                {/* ----------------------------------------------- */}

                {/* Root route */}
                <Route path="/" element={<RedirectRoot />} />

                {/* About page */}
                <Route path="/about" element={<About />} />

                {/* Contact page */}
                <Route path="/contact" element={<Contact />} />

                {/* Login page */}
                <Route path="/login" element={<Login />} />

                {/* Register page */}
                <Route path="/register" element={<Register />} />

                {/* ----------------------------------------------- */}
                {/* WEB APP PAGES */}
                {/* ----------------------------------------------- */}

                {/* Dashboard page */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Lessons */}
                <Route path="/lessons/colors" element={<ColorLesson />} />
                <Route path="/lessons/letters" element={<LetterLesson />} />
                <Route path="/lessons/numbers" element={<NumberLesson />} />

                {/* Games */}
                <Route path="/games/colors" element={<ColorGame />} />
                <Route path="/games/numbers" element={<NumberGame />} />
                <Route path="/games/letters" element={<LetterGame />} />

                {/* Therapy */}
                <Route path="/therapy" element={<Therapy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
