import axios from 'axios';
const baseURL = 'http://192.168.1.2/api';
const instance = axios.create({
  baseURL,
});

export default instance;
