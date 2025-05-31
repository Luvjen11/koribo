import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {


  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/koribo">
          <span>Kori</span>bo
        </Link>
      </div>
      <div className="nav-links">
          <>
            <Link to="/koribo/flashcards">Flashcards</Link>
            <Link to="/koribo/quizzes">Quiz</Link>
            <Link to="/koribo/categories">Categories</Link>
            <Link to="/koribo/modules">Modules</Link>
            </>
      </div>
    </nav>
  );
};

export default Navbar; 