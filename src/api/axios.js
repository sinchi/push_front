import axios from 'axios';
const baseURL = 'http://10.192.2.158/api';
const instance = axios.create({
  baseURL,
});

export default instance;
