import axios from "axios";
let url;

if (process.env.NODE_ENV === 'development') {
  url = `${process.env.REACT_APP_LOCAL_BACKEND_URL}/api`;
} else if (process.env.NODE_ENV === 'production') {
  url = `${process.env.REACT_APP_BACKEND_PROXY}/api`;
}


const token = sessionStorage.getItem("token");
const api = axios.create({
  baseURL: url, 
  headers: {
    "Content-Type": "application/json",
    "authorization": token? `Bearer ${token}` : undefined,
  },
});

api.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    console.error(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.error(error);
    return Promise.reject(error);
  }
);

export default api;
