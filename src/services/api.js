import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("authToken");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
  responseType: "json",
});

const END_POINTS = {
  LOGIN: "/user/loginUser",
  SIGNUP: "/user/createUser",
  FETCH_USER: "/user/getUserDetails",
  GET_CATEGORIES: "/getCategories",
  GET_PRODUCTS: "/product/getAllProducts",
  GET_REVIEWS: "/review/getAllReviewsOfProduct/:productId",
  ADD_REVIEW: "/review/createReview/:productId",
};

export { axiosInstance, END_POINTS, BASE_URL };
