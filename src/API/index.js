import axios from 'axios';
import { API_BASE, API_PORT } from "@env";
const API = {
  createUser: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/create`, data),
  login: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/login`, data, {headers: {
    'Cache-Control': 'no-cache'
  }})
}

export default API;