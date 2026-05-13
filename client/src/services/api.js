import axios from 'axios';

const apiBaseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:5000/api');

/**
 * Axios instance configured for the backend API.
 * In dev, client/.env points directly to http://localhost:5000/api.
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
    return 'Cannot reach the API. Start the backend in a separate terminal: cd server, then npm.cmd run dev on Windows PowerShell or npm run dev elsewhere.';
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
