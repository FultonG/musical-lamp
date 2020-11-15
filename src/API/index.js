import axios from 'axios';
import { API_BASE, API_PORT } from "@env";
const API = {
  createUser: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/create`, data, {headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache'
  }}),
  login: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/login`, data, {headers: {
    'Cache-Control': 'no-cache'
  }}),
  createPool: (data) => axios.post(`http://${API_BASE}:${API_PORT}/pool/create`, data, {headers: {
    'Cache-Control': 'no-cache'
  }}),
  getPools: (data) => axios.post(`http://${API_BASE}:${API_PORT}/pool/get_batch`, data, {headers: {
    'Cache-Control': 'no-cache'
  }}),
  addToPool: (data) => axios.post(`http://${API_BASE}:${API_PORT}/pool/add`, data, {headers: {
    'Cache-Control': 'no-cache'
  }})
}

export default API;