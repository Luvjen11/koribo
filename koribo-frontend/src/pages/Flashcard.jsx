import { useState, useEffect } from "react";
import { getFlashcardById } from "../services/Flashcard";
import "../styles/Flashcard.css";

function Flashcard({ id }) {
  const [flipped, setFlipped] = useState(false);
  const [flashcard, setFlashcard] = useState({
    word: "",
    translation: "",
    loading: true, 
    error: null
  });

  useEffect(() => {
    if (id) {
      fetchFlashcard(id);
    } else {
      setFlashcard(prev => ({
        ...prev,
        loading: false,
        word: "Sample Word",
        translation: "Sample Translation"
      }));
    }
  }, [id]);

  const fetchFlashcard = async (flashcardId) => {
    try {
      setFlashcard(prev => ({ ...prev, loading: true, error: null }));
      const data = await getFlashcardById(flashcardId);
      setFlashcard({
        word: data?.word || "No word available",
        translation: data?.translation || "No translation available",
        loading: false,
        error: null
      });
    } catch (error) {
      setFlashcard(prev => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to load flashcard"
      }));
      console.error("Error fetching flashcard:", error);
    }
  };

  // Handle loading state
  if (flashcard.loading) {
    return <div className="loading-card">Loading flashcard...</div>;
  }

  // Handle error state
  if (flashcard.error) {
    return <div className="error-card">{flashcard.error}</div>;
  }

  return (
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
  );
}

export default Flashcard;