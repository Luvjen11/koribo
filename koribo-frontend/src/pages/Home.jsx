import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Koribo</h1>
          <p>Your ultimate Igbo and Korean learning platform</p>
          <Link to="/koribo/flashcards">
            <button className="cta-button">View Igbo</button>
            <button className="cta-button">View Korean</button>
          </Link>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Koribo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Learn Languages</h3>
              <p>Expand your vocabulary with language flashcards</p>
            </div>
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed statistics</p>
            </div>
            <div className="feature-card">
              <h3>Customize Categories</h3>
              <p>Create your own categories to organize your learning</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Koribo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;