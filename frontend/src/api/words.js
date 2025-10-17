import axios from "axios";
export const getRandomWord = (token, language) => {
  let url = "/api/words/random";
  if (language) url += `?language=${language}`;
  return axios.get(url, { headers: { Authorization: "Bearer " + token } });
};
export const checkWord = (data, token) => axios.post("/api/words/check", data, { headers: { Authorization: "Bearer " + token } });