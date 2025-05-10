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


