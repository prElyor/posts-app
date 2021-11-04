import axios from 'axios'
 
const baseUrl = 'http://localhost:3000'

export const  httpReq = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json; charset=utf-8'
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
  });

  httpReq.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  httpReq.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );