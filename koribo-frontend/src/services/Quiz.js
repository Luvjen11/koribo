import axios from "axios";

const API_BASE_URL = "http://localhost:8080/koribo/quizzes";

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

export const createQuiz = async (quizData) => {
    try {
      const response = await apiClient.post("", quizData);
      return response.data;
    } catch (error) {
      console.error("Create quiz error:", error);
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
  };

  export const getQuizById = async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get quiz by ID error:`, error);
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Network Error");
      } else {
        throw new Error("Request configuration Error");
      }
    }
  };
  
  export const submitAnswer = async (quizId, questionId, userAnswer) => {
    try {
      const response = await apiClient.post(`/${quizId}/submit`, {
        questionId,
        userAnswer
      });
      return response.data;
    } catch (error) {
      console.error("Submit answer error:", error);
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Network Error");
      } else {
        throw new Error("Request configuration Error");
      }
    }
  };
  
  export const evaluateQuiz = async (quizId) => {
    try {
      const response = await apiClient.get(`/${quizId}/evaluate`);
      return response.data;
    } catch (error) {
      console.error("Evaluate quiz error:", error);
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Network Error");
      } else {
        throw new Error("Request configuration Error");
      }
    }
  };

  export const getAllQuizzes = async (language = null) => {
    try {
      const url = language ? `?language=${language}` : '';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Get all quizzes error:", error);
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Network Error");
      } else {
        throw new Error("Request configuration Error");
      }
    }
  };