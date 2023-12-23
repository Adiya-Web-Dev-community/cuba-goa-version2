import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4001/",
  // baseURL: "https://cuba-goa-version2.onrender.com/",
  baseURL: process.env.REACT_APP_HOST,
});
