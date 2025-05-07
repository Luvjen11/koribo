import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFlashcardById } from "../services/Flashcard";
import "../styles/FlashcardPage.css";
import "../styles/Flashcard.css";

const SingleFlashcard = () => {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flipped, setFlipped] = useState(false);
  
  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const data = await getFlashcardById(id);
        setFlashcard(data);
      } catch (err) {
        setError('Failed to load flashcard details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFlashcard();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flashcard-page">
        <div className="container">
          <div className="loading-card">Loading flashcard...</div>
        </div>
      </div>
    );
  }
  
  if (error || !flashcard) {
    return (
      <div className="flashcard-page">
        <div className="container">
          <div className="error-card">
            {error || 'Flashcard not found'}
            <Link to="/koribo/flashcards" className="back-link">Back to Flashcards</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flashcard-page">
      <div className="container">
        <div className="flashcard-header">
          <h1 className="page-title">Flashcard</h1>
        </div>
        
        <div className="single-flashcard-container">
          <div className="wrapper" onClick={() => setFlipped(!flipped)}>
            <div className={`flip-card ${flipped ? "flipped" : ""}`}>
              <div className="front card">
                <h1 className="word">{flashcard.word}</h1>
              </div>
              <div className="back card">
                <h1 className="translation">{flashcard.translation}</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flashcard-details">
          <p className="flashcard-language">Language: {flashcard.language}</p>
          {/* <p className="flashcard-category">Category: {flashcard.category?.name || 'Uncategorized'}</p> */}
        </div>
        
        <div className="flashcard-navigation">
          <p className="flashcard-instruction">Click on the card to flip it</p>
          <Link to="/koribo/flashcards" className="back-to-flashcards">
            Back to All Flashcards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleFlashcard;