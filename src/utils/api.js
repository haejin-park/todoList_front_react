import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`, //dev용 로컬주소 (netlify에 이 환경변수는 aws주소로 추가해놨고, 현재 사용하고있는 것은 아래거(http와 https 연결 해주기위해 프록시 설정해놓음)
  // baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`, 
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("token"),
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
