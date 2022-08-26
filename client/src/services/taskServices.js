import axios from "axios";
const apiUrl = "http://localhost:8080/api/tasks";

export const getTasks = () => {
  return axios.get(apiUrl);
};

export const addTask = (task) => {
  return axios.post(apiUrl, task);
};

export const updateTask = (taskId, task) => {
  return axios.put(`${apiUrl}/${taskId}`, task);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${apiUrl}/${taskId}`);
};
