import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createFlashcard } from "../services/Flashcard";
import axios from "axios";
import "../styles/NewFlashcard.css";

function NewFlashcard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [languages] = useState(["IGBO", "KOREAN"]);
  const [categories, setCategories] = useState([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  
  const [formData, setFormData] = useState({
    word: "",
    translation: "",
    language: "IGBO",
    categoryId: ""
  });

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/koribo/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setIsCreatingCategory(true);
      setFormData({
        ...formData,
        categoryId: ""
      });
    } else {
      setFormData({
        ...formData,
        categoryId: value
      });
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const createNewCategory = async () => {
    if (!newCategory.trim()) {
      setError("Category name cannot be empty");
      return null;
    }

    try {
      const response = await axios.post("http://localhost:8080/koribo/categories", {
        name: newCategory
      });
      
      // Add the new category to the list
      const createdCategory = response.data;
      setCategories([...categories, createdCategory]);
      
      // Reset the new category input
      setNewCategory("");
      setIsCreatingCategory(false);
      
      // Return the ID of the created category
      return createdCategory.id;
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.word || !formData.translation || !formData.language || !formData.categoryId) {
      setError("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      let categoryId = formData.categoryId;
      
      // If creating a new category, do that first
      if (isCreatingCategory && newCategory.trim()) {
        categoryId = await createNewCategory();
        if (!categoryId) {
          setLoading(false);
          return; // Stop if category creation failed
        }
      }
      
      // Prepare data for API
      const flashcardData = {
        ...formData,
        categoryId: categoryId ? parseInt(categoryId) : null
      };
      
      await createFlashcard(flashcardData);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        word: "",
        translation: "",
        language: "IGBO",
        categoryId: ""
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/koribo/flashcards");
      }, 2000);
      
    } catch (err) {
      setError(err.message || "Failed to create flashcard");
      console.error("Error creating flashcard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-flashcard-page">
      <div className="container">
        <div className="new-flashcard-header">
          <h1 className="page-title">Create New Flashcard</h1>
        </div>
        
        {success && (
          <div className="success-message">
            Flashcard created successfully! Redirecting to flashcards...
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form className="flashcard-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="word">Word*</label>
            <input
              type="text"
              id="word"
              name="word"
              value={formData.word}
              onChange={handleChange}
              placeholder="Enter the word"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="translation">Translation*</label>
            <input
              type="text"
              id="translation"
              name="translation"
              value={formData.translation}
              onChange={handleChange}
              placeholder="Enter the translation"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="language">Language*</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="">Select a language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0) + lang.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="categoryId">Category*</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option value="new">+ Create new category</option>
            </select>
          </div>
          
          {isCreatingCategory && (
            <div className="form-group new-category-group">
              <label htmlFor="newCategory">New Category Name*</label>
              <div className="new-category-input">
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  placeholder="Enter new category name"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/koribo/flashcards")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Flashcard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewFlashcard;