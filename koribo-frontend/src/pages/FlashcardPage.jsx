import { useState, useEffect } from "react";
import Flashcard from "../components/Flashcard";
import { getAllFlashcards } from "../services/Flashcard";


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
            const flashcards = await getAllFlashcards();
            setFlashcards(flashcards);
            setError(null);

        } catch (error) {
            setError(error.message || "Something went wrong");
        console.error('Error fetching flashcards:', error);  
        } finally {
            setLoading(false);
        }
    }


  if (loading) {
    return <div className="loading">Loading flashcards...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">My Flashcards</h1>
      {flashcards.length === 0 ? (
        <p className="no-cards">No flashcards found. Create some to get started!</p>
      ) : (
        <div className="flashcard-grid">
          {flashcards.map((card) => (
            <Flashcard 
              key={card.id} 
              word={card.front} 
              translation={card.back} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FlashcardPage;