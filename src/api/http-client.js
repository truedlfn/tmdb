import axios from 'axios';
import { localStorage } from '@src/lib/local-storage';

export const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

http.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = process.env.REACT_APP_API_KEY;
 
  const session_id = localStorage.load('session_id') || '';
  config.data = { ...config.data, session_id };

  return config;
});