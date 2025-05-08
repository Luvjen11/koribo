import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Flashcard from "./Flashcard";
import { getAllFlashcards, getFlashcardsByLanguage } from "../services/Flashcard";
import "../styles/FlashcardPage.css";

function FlashcardPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const languages = ["ALL", "IGBO", "KOREAN"];

  useEffect(() => {
    getFlashcards();
  }, [selectedLanguage]);

  const getFlashcards = async () => {
    try {
      setLoading(true);
      let data;
      
      if (selectedLanguage === "ALL") {
        data = await getAllFlashcards();
      } else {
        data = await getFlashcardsByLanguage(selectedLanguage);
      }
      
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

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
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
          
          <div className="filter-controls">
            <div className="language-filter">
              <label htmlFor="language-select">Filter by language:</label>
              <select 
                id="language-select" 
                value={selectedLanguage} 
                onChange={handleLanguageChange}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === "ALL" ? "All Languages" : lang.charAt(0) + lang.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {flashcards.length === 0 ? (
          <p className="no-cards">
            {selectedLanguage === "ALL" 
              ? "No flashcards found. Create some to get started!" 
              : `No flashcards found for ${selectedLanguage.charAt(0) + selectedLanguage.slice(1).toLowerCase()} language. Create some to get started!`}
          </p>
        ) : (
          <div className="flashcard-grid">
            {flashcards.map((card) => (
              <Link 
                to={`/koribo/flashcards/${card.id}`} 
                key={card.id}
                className="flashcard-link"
              >
                <div className="flashcard-item">
                  <div className="wrapper">
                    <div className="flip-card">
                      <div className="front card">
                        <h1 className="word">{card.word}</h1>
                        <span className="language-tag">{card.language.toLowerCase()}</span>
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
        
        <Link to="/koribo/flashcards/new">
          <button className="add-flashcard-btn">+ Add New Flashcard</button>
        </Link>
      </div>
    </div>
  );
}

export default FlashcardPage;