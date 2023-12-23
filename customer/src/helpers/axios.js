import axios from "axios";
console.log(process.env, "from axios");
export default axios.create({
  // baseURL: "http://localhost:4001/",

  baseURL: process.env.REACT_APP_HOST,
  // baseURL: process.env.REACT_APP_HOST,
});
