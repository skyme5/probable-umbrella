import axios from 'axios';

import { APP_API_URL } from '#/config';

const EXCLUDE_REDIRECT_PATHS = ['/login'];

const axiosClient = axios.create({
  baseURL: `${APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && token !== 'undefined') {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.config.url === `/auth/login` && response.status === 200) {
      localStorage.setItem('token', JSON.stringify(response.data.access_token));
    }

    return response;
  },
  (error) => {
    const {
      response: { status },
    } = error;

    if (status === 401 && !EXCLUDE_REDIRECT_PATHS.includes(window.location.pathname)) {
      window.localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
