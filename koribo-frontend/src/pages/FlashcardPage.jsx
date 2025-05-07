import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Flashcard from "./Flashcard";
import { getAllFlashcards } from "../services/Flashcard";
import "../styles/FlashcardPage.css";

function FlashcardPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFlashcards();
  }, [])

  const getFlashcards = async () => {
    try {
      setLoading(true);
      const data = await getAllFlashcards();
      console.log("Fetched flashcards:", data); // For debugging
      setFlashcards(data);
      setError(null);
    } catch (error) {
      setError(error.message || "Something went wrong");
      console.error('Error fetching flashcards:', error);  
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flashcard-page">
        <div className="container">
          <div className="loading">Loading flashcards...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flashcard-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-page">
      <div className="container">
        <div className="flashcard-header">
          <h1 className="page-title">My Flashcards</h1>
        </div>
        
        {flashcards.length === 0 ? (
          <p className="no-cards">No flashcards found. Create some to get started!</p>
        ) : (
          <div className="flashcard-grid">
            {flashcards.map((card) => (
              <Link 
                to={`/koribo/flashcards/${card.id}`} 
                key={card.id}
                className="flashcard-link"
              >
                <div className="flashcard-item">
                  {/* Pass the word and translation directly as props */}
                  <div className="wrapper">
                    <div className="flip-card">
                      <div className="front card">
                        <h1 className="word">{card.word}</h1>
                      </div>
                      <div className="back card">
                        <h1 className="translation">{card.translation}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <button className="add-flashcard-btn">+ Add New Flashcard</button>
      </div>
    </div>
  );
}

export default FlashcardPage;