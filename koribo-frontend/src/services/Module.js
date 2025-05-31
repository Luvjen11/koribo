import axios from 'axios';

const API_URL = 'http://localhost:8080/koribo';

// Get all modules
const getAllModules = async () => {
  try {
    const response = await axios.get(`${API_URL}/modules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

// Get a specific module by ID
const getModuleById = async (moduleId) => {
  try {
    const response = await axios.get(`${API_URL}/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching module with ID ${moduleId}:`, error);
    throw error;
  }
};

// Get lessons by module ID
const getLessonsByModuleId = async (moduleId) => {
  try {
    const response = await axios.get(`${API_URL}/lessons?moduleId=${moduleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lessons for module ID ${moduleId}:`, error);
    throw error;
  }
};

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
    throw error;
  }
};

export {
  getAllModules,
  getModuleById,
  getLessonsByModuleId,
  getLessonById,
  getFlashcardsByLessonId
};