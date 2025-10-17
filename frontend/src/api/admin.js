import axios from "axios";
export const addWord = (data, token) => axios.post("/api/admin/words", data, { headers: { Authorization: "Bearer " + token } });
export const updateWord = (id, data, token) => axios.put(`/api/admin/words/${id}`, data, { headers: { Authorization: "Bearer " + token } });
export const deleteWord = (id, token) => axios.delete(`/api/admin/words/${id}`, { headers: { Authorization: "Bearer " + token } });
export const getAllWords = (token) => axios.get("/api/admin/words", { headers: { Authorization: "Bearer " + token } });