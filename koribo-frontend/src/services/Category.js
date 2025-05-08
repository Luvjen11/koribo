import axios from "axios";

const API_BASE_URL = "http://localhost:8080/koribo/categories";

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("");
    return response.data;
  } catch (error) {
    console.error("Get all categories error:", error);
    if (error.response) {
      throw new Error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Network Error");
    } else {
      throw new Error("Request configuration Error");
    }
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post("", categoryData);
    return response.data;
  } catch (error) {
    console.error("Create category error:", error);
    if (error.response) {
      throw new Error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Network Error");
    } else {
      throw new Error("Request configuration Error");
    }
  }
};