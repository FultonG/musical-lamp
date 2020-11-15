import axios from 'axios';
import { API_BASE, API_PORT } from "@env";
const API = {
  createUser: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/create`, data)
}

export default API;