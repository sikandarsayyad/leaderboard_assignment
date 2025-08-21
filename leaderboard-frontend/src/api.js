import axios from "axios";

const API = axios.create({ baseURL: "https://leaderboard-assignment-hric.vercel.app/api/users" });

export default API;
