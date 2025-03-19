import axios from "axios";
console.log(process.env, "from axios");
export default axios.create({
  // baseURL: "https://myformserver-bc81559448c6.herokuapp.com",
  baseURL: "http://localhost:4001",
  // baseURL: process.env.REACT_APP_HOST,
  // baseURL: process.env.REACT_APP_HOST,
});
