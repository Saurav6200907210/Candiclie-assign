import axios from 'axios';

const apiBaseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://candiclie-assign.onrender.com/api');

/**
 * Axios instance configured for the backend API.
 * Vercel should set REACT_APP_API_URL. The production fallback points to Render.
 */
const API = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/**
 * User-facing message: distinguishes "server down" from validation/API errors.
 */
export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  const body = error.response?.data?.message;
  if (body) return Array.isArray(body) ? body.join(', ') : body;
  if (!error.response) {
    return 'Cannot reach the API. Make sure the backend is running and that Vercel has REACT_APP_API_URL set correctly. If the backend is on Render, also verify Render has CLIENT_URL set to your Vercel app URL.';
  }
  return fallback;
}

// ─── Student API Calls ──────────────────────────────────────────────────────

/** Get all students with optional query params */
export const getAllStudents = (params) => API.get('/students', { params });

/** Get a single student by ID */
export const getStudentById = (id) => API.get(`/students/${id}`);

/** Create a new student */
export const createStudent = (data) => API.post('/students', data);

/** Update a student by ID */
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);

/** Delete a student by ID */
export const deleteStudent = (id) => API.delete(`/students/${id}`);

/** Get dashboard statistics */
export const getStats = () => API.get('/students/stats');

export default API;
