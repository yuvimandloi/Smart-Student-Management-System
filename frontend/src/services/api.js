import axios from "axios";

const API_URL = "http://localhost:8089"; // 👈 backend port

export const getStudents = () => axios.get(`${API_URL}/students`);

export const addStudent = (data) =>
  axios.post(`${API_URL}/students`, data);

export const updateStudent = (id, data) =>
  axios.put(`${API_URL}/students/${id}`, data);

export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/students/${id}`);

export const getDashboardStats = () =>
  axios.get(`${API_URL}/dashboard/stats`);