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
  }}),
  getMembers: (data) => axios.post(`http://${API_BASE}:${API_PORT}/user/get_batch`, data, {headers: {
    'Cache-Control': 'no-cache'
  }}),
  getTasks: () => axios.get(`http://${API_BASE}:${API_PORT}/task/get`),
  addTask: (data) => axios.post(`http://${API_BASE}:${API_PORT}/task/complete`, data, {headers: {
    'Cache-Control': 'no-cache'
  }}),
  getUser: (id) => axios.get(`http://${API_BASE}:${API_PORT}/user/get?_id=${id}`, {headers: {
    'Cache-Control': 'no-cache'
  }})
}

export default API;