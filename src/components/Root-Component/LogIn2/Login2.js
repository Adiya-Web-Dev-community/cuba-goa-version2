import React from "react";
import {
  CForm,
  CFormInput,
  CCol,
  CButton,
  CCardHeader,
  CSpinner,
} from "@coreui/react";
import { useState, useEffect } from "react";
import "./Login2.css";
import { useNavigate } from "react-router";
import axios from "../../../helpers/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Login2 = ({ showLogin, setShowLogin }) => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLoginForm = (params) => (e) => {
    setLoginForm({ ...loginForm, [params]: e.target.value });
    setErr("");
  };

  function ValidateEmail(input) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      // console.log("Valid email address!");
      return true;
    } else {
      // console.log("Invalid email address!");
      return false;
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!loginForm.email || !loginForm.password) {
      setLoading(false);
      return setErr("both the fields are required");
    }
    if (ValidateEmail(loginForm.email) == false) {
      setLoading(false);
      return setErr("Invaild Email Id");
    }
    // await axios.post('https://cubagoa-server.onrender.com/login', loginForm)
    await axios
      .post("/login", loginForm)
      .then((response) => {
        // console.log(response.data)
        // console.log(response.data.username)
        // console.log(response.data.token)
        if (response.status === 200) {
          console.log(response.data.message);
          const userWithToken = {
            userName: "admin",
            //for admin
            authorization: response?.data?.token,
          };

          setLoading(false);

          // localStorage.setItem('token', response.data.token)
          localStorage.setItem("user", JSON.stringify(userWithToken));
          // localStorage.setItem("token", response.data.data.token);
          navigate("/chat");
          toast.success("LoggedIn successfully");
        }

        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response)
        setErr(err.response.data.message);
      });
  };

  return (
    <section className="log-in">
      {/* <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <form
        className="login-form"
        onSubmit={(e) => {
          e.target.preventDefault();
        }}
      >
        <h3>LOG IN</h3>
        <div>
          <input
            type="email"
            className="login-inputs"
            placeholder="Your Email"
            onChange={handleLoginForm("email")}
          />
        </div>
        <div>
          <input
            type="password"
            className="login-inputs"
            placeholder="Password"
            onChange={handleLoginForm("password")}
          />
        </div>
        <p className="login-err">{err}</p>
        <div>
          <button
            id="login-btn"
            type="submit"
            disabled={loading}
            onClick={submitLogin}
          >
            <span style={{ paddingRight: "5px" }}>
              {loading ? (
                <CSpinner component="span" size="sm" aria-hidden="true" />
              ) : null}
            </span>
            <span style={{ paddingLeft: "5px" }}>
              {loading ? "Loading . . ." : "Login"}
            </span>
          </button>
        </div>
        {/* <p className="already-have-an-account">
          Don't have an account?
          <span className='regiser-span' onClick={() => setShowLogin(false)}> register</span>
        </p> */}
      </form>
    </section>
  );
};

export default Login2;
