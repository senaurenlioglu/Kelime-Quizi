import axios from "axios";
export const getDashboard = (token) => axios.get("/api/stats/dashboard", { headers: { Authorization: "Bearer " + token } });