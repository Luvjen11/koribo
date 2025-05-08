import axios from "axios";

const API_BASE_URL = "http://localhost:8080/koribo/flashcards";

// Create an axios instance with timeout and better defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false
});

export const getAllFlashcards = async () => {
    try {
      const response = await apiClient.get("");
      return response.data;
    } catch (error) {
        console.error("Get all flashcards error:", error);
        if (error.response) {
          throw new Error(`Server Error: ${error.response.status}`);
        } else if (error.request) {
          throw new Error("Network Error");
        } else {
          throw new Error("Request configuration Error");
        }
    }
  };

  export const getFlashcardById = async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      console.log("Flashcard data received:", response.data); // For debugging
      return response.data;
    } catch (error) {
      console.error("Get flashcard by ID error:", error);
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Network Error");
      } else {
        throw new Error("Request configuration Error");
      }
    }
  };

export const createFlashcard = async (flashcardData) => {
  try {
    // Create a modified version of the data that properly handles the category
    const modifiedData = {
      word: flashcardData.word,
      translation: flashcardData.translation,
      language: flashcardData.language
    };

    // Only add category if categoryId exists and is not empty
    if (flashcardData.categoryId) {
      modifiedData.category = {
        id: parseInt(flashcardData.categoryId)
      };
    }

    console.log("Sending flashcard data:", modifiedData);
    const response = await apiClient.post("", modifiedData);
    return response.data;
  } catch (error) {
    console.error("Create flashcard error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      throw new Error(`Server Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error("No response received. Is the backend server running?");
      throw new Error("Network Error - Unable to connect to the server. Please check if the backend is running.");
    } else {
      console.error("Request setup error:", error.message);
      throw new Error("Request configuration Error: " + error.message);
    }
  }
}