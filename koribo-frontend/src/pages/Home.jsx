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
          <div className="cta-buttons">
            <Link to="/koribo/modules">
              <button className="cta-button primary">Start Learning</button>
            </Link>
            <Link to="/koribo/flashcards">
              <button className="cta-button secondary">Practice Flashcards</button>
            </Link>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Koribo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Structured Learning</h3>
              <p>Follow our carefully designed modules and lessons to learn step by step</p>
            </div>
            <div className="feature-card">
              <h3>Interactive Content</h3>
              <p>Engage with stories, cultural notes, and multimedia content</p>
            </div>
            <div className="feature-card">
              <h3>Smart Flashcards</h3>
              <p>Learn vocabulary with categorized flashcards and spaced repetition</p>
            </div>
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed statistics</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose a Module</h3>
              <p>Select from our curated modules based on your level</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Follow Lessons</h3>
              <p>Learn through interactive content and cultural insights</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Practice with Flashcards</h3>
              <p>Reinforce your learning with vocabulary practice</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Koribo</h4>
            <p>Making language learning accessible and enjoyable</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/koribo/modules">Modules</Link>
            <Link to="/koribo/flashcards">Flashcards</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@koribo.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Koribo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;