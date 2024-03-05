import axios from "axios";

const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", request);
    return request;
  },
  function (error) {
    // console.log("REQUEST ERROR", error);
    console.error(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    // console.log("RESPONSE ERROR", error);
    console.error(error);
    return Promise.reject(error);
  }
);

export default api;
