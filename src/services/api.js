import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
  withCredentials: true,
  responseType: "json",
});

const END_POINTS = {
  LOGIN: "/user/loginUser",
  SIGNUP: "/user/createUser",
  FETCH_USER: "/user/getUserDetails",
  GET_CATEGORIES: "/getCategories",
  GET_PRODUCTS: "/getProducts",
};

export { axiosInstance, END_POINTS, BASE_URL };
