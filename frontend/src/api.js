// src/api.js
import axios from "axios";

// Create axios instance with backend URL from .env
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api"
});

// Function to save a student
export const saveStudent = async (studentData) => {
  try {
    const response = await API.post("/students", studentData);
    return response.data; // { message: "Student saved successfully!" }
  } catch (error) {
    console.error("Error saving student:", error);
    throw error;
  }
};

// Function to get all students
export const getStudents = async () => {
  try {
    const response = await API.get("/students");
    return response.data; // Array of students
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
