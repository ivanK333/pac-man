import axios from 'axios';

import { API_URL } from '../../constants/api';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.timeout = 60000;
axios.defaults.transformRequest = [(data) => JSON.stringify(data)];

export const baseFetch = axios.create();
baseFetch.defaults.baseURL = API_URL;
