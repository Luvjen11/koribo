import { useState, useEffect } from "react";
import { getAllCategories } from "../services/Category";
import { getAllFlashcards } from "../services/Flashcard";
import "../styles/CategoriesPage.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesData, flashcardsData] = await Promise.all([
        getAllCategories(),
        getAllFlashcards()
      ]);
      
      setCategories(categoriesData);
      setFlashcards(flashcardsData);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to load data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const getCategoryFlashcards = (categoryId) => {
    return flashcards.filter(card => 
      card.category && card.category.id === categoryId
    );
  };

  if (loading) {
    return (
      <div className="categories-page">
        <div className="container">
          <div className="loading">Loading categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="container">
        <div className="categories-header">
          <h1 className="page-title">Categories</h1>
        </div>
        
        {categories.length === 0 ? (
          <p className="no-categories">No categories found. Create some to organize your flashcards!</p>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => {
              const categoryFlashcards = getCategoryFlashcards(category.id);
              return (
                <div 
                  key={category.id} 
                  className="category-folder"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="folder-icon">
                    <i className="fas fa-folder"></i>
                  </div>
                  <div className="folder-details">
                    <h3 className="folder-name">{category.name}</h3>
                    <p className="folder-count">{categoryFlashcards.length} flashcards</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popup for displaying flashcards */}
      {showPopup && selectedCategory && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>{selectedCategory.name} Flashcards</h2>
              <button className="close-btn" onClick={closePopup}>×</button>
            </div>
            <div className="popup-body">
              {getCategoryFlashcards(selectedCategory.id).length === 0 ? (
                <p className="no-cards">No flashcards in this category yet.</p>
              ) : (
                <div className="popup-flashcards">
                  {getCategoryFlashcards(selectedCategory.id).map((card) => (
                    <div key={card.id} className="popup-flashcard">
                      <div className="popup-card-front">
                        <h3>{card.word}</h3>
                      </div>
                      <div className="popup-card-back">
                        <p>{card.translation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;