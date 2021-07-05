import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default {
  search: (query) =>
    api.get("/map-search", {
      params: { query },
    }),
  directions5: (departure, arrival) =>
    api.get("/map-directions5", {
      params: { departure, arrival },
    }),
};
