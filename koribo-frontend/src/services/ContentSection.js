import axios from 'axios';

const API_URL = 'http://localhost:8080/koribo/content-sections';

// Get all content sections
export const getAllContentSections = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching content sections:', error);
    throw error;
  }
};

// Get content sections by lesson ID
export const getContentSectionsByLesson = async (lessonId) => {
  try {
    const response = await axios.get(`${API_URL}?lessonId=${lessonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content sections for lesson ${lessonId}:`, error);
    throw error;
  }
};

// Get a specific content section by ID
export const getContentSectionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content section ${id}:`, error);
    throw error;
  }
};

// Create a new content section
export const createContentSection = async (lessonId, contentSection) => {
  try {
    const response = await axios.post(`${API_URL}?lessonId=${lessonId}`, contentSection);
    return response.data;
  } catch (error) {
    console.error('Error creating content section:', error);
    throw error;
  }
};

// Update a content section
export const updateContentSection = async (id, contentSection) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contentSection);
    return response.data;
  } catch (error) {
    console.error(`Error updating content section ${id}:`, error);
    throw error;
  }
};

// Delete a content section
export const deleteContentSection = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting content section ${id}:`, error);
    throw error;
  }
}; 