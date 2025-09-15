import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const getUsers = () => axios.get(`${API_URL}?limit=10`);

export const addUser = (user) => axios.post(API_URL + "/add", user);

export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

