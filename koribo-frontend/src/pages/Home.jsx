import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Koribo</h1>
          <p>Your ultimate flashcard learning platform</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Koribo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Learn Languages</h3>
            <p>Expand your vocabulary with our language flashcards</p>
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
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Koribo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;