import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
