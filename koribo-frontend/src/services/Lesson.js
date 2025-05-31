import axios from 'axios';

const API_URL = 'http://localhost:8080/koribo';

// Get a specific lesson by ID
const getLessonById = async (lessonId) => {
  try {
   
    const response = await axios.get(`${API_URL}/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lesson with ID ${lessonId}:`, error);
    throw error;
  }
};

// Get flashcards by lesson ID
const getFlashcardsByLessonId = async (lessonId) => {
  try {
    
    const response = await axios.get(`${API_URL}/flashcards?lessonId=${lessonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching flashcards for lesson ID ${lessonId}:`, error);
    return [];
  }
};

// Mark a lesson as completed
const markLessonAsCompleted = async (lessonId) => {
  try {
    
    const response = await axios.patch(`${API_URL}/lessons/${lessonId}/complete`, {
      completed: true
    });
    return response.data;
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    throw error;
  }
};

export {
  getLessonById,
  getFlashcardsByLessonId,
  markLessonAsCompleted
};