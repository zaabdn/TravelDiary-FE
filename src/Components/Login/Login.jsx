import React, { useState } from "react";
import "./Login.css";
import palm from "../../Images/palm1.png";
import hibiscus from "../../Images/hibiscus1.png";
import { useHistory, useLocation } from "react-router-dom";
import { API } from "../../Config/api";

const Login = ({ showModalLogin, showModalRegister, modalLogin }) => {
  let history = useHistory();
  const location = useLocation();
  const [errorForm, setErrorForm] = useState();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    const dataLogin = {
      email: formLogin.email,
      password: formLogin.password,
    };
    try {
      const response = await API.post("/login", dataLogin);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("fullName", response.data.data.fullName);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("phone", response.data.data.phone);
      localStorage.setItem("address", response.data.data.address);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("token", response.data.data.token);
      if (response) {
        history.push(location.pathname);
        showModalLogin(false);
      } else {
        history.push("/incometrip");
      }
    } catch (err) {
      setErrorForm(err.response.data.error.message);
    }
  };

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  return (
    <div className="App-login">
      <div className="modal">
        <div className="modal-content">
          <img src={palm} alt="Footer" align="left" width="150px" />
          <img src={hibiscus} alt="Footer" align="right" width="70px" />
          <h4
            align="right"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              showModalLogin();
            }}
          >
            X
          </h4>
          <h1 style={{ position: "absolute", left: "47%" }}>LOGIN</h1>
          {errorForm && (
            <span
              style={{
                color: "red",
                background: "rgba(252, 78, 78, 0.5)",
                padding: "2px 10px",
                borderRadius: "5px",
                position: "absolute",
                top: "230px",
                left: "36%",
                fontSize: "14px",
              }}
            >
              {errorForm}
            </span>
          )}
          <form onSubmit={login}>
            <div className="input-text">
              <div className="login-group">
                <h3>Email</h3>
                <input
                  type="text"
                  className="custom-input"
                  name="email"
                  value={formLogin.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="login-group">
                <h3>Password</h3>
                <input
                  type="password"
                  className="custom-input"
                  name="password"
                  value={formLogin.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="login-group" style={{ marginTop: "50px" }}>
                <button className="button" type="submit">
                  Login
                </button>
              </div>
            </div>
            <p align="center">
              Don't have an account ? Klik
              <span style={{ fontWeight: "900", cursor: "pointer" }}>Here</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
