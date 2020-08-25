import React, { useState } from "react";
import "./Register.css";
import palm from "../../Images/palm1.png";
import hibiscus from "../../Images/hibiscus1.png";
import { API } from "../../Config/api";
import { useHistory, useLocation } from "react-router-dom";

const Register = ({ showModalLogin, showModalRegister }) => {
  let history = useHistory();
  const location = useLocation();
  const [errorForm, setErrorForm] = useState();
  const [formRegister, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const register = async (e) => {
    e.preventDefault();
    const dataUser = {
      fullName: formRegister.fullName,
      email: formRegister.email,
      password: formRegister.password,
      phone: formRegister.phone,
      address: formRegister.address,
      role: formRegister.role,
    };
    console.log(dataUser);
    try {
      const response = await API.post("/register", dataUser);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("fullName", response.data.data.fullName);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("phone", response.data.data.phone);
      localStorage.setItem("address", response.data.data.address);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("token", response.data.data.token);
      showModalRegister();
      history.push(location.pathname);
    } catch (err) {
      setErrorForm(err.response.data.error.message);
    }
  };

  const handleChange = (e) => {
    setRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  return (
    <div className="App-login">
      <div className="modal" style={{ paddingTop: "20px" }}>
        <div className="modal-content">
          <img src={palm} alt="Footer" align="left" width="150px" />
          <img src={hibiscus} alt="Footer" align="right" width="70px" />
          <h4
            align="right"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              showModalRegister();
            }}
          >
            X
          </h4>
          <h1 style={{ position: "absolute", left: "45%" }}>REGISTER</h1>
          {errorForm && (
            <span
              style={{
                color: "red",
                background: "rgba(252, 78, 78, 0.5)",
                padding: "2px 10px",
                borderRadius: "5px",
                position: "absolute",
                top: "150px",
                left: "36%",
                fontSize: "14px",
              }}
            >
              {errorForm}
            </span>
          )}
          <form onSubmit={register}>
            <div className="input-text">
              <div className="form-register">
                <h3>Full Name</h3>
                <input
                  type="text"
                  className="custom-input"
                  name="fullName"
                  value={formRegister.fullName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-register">
                <h3>Email</h3>
                <input
                  type="email"
                  name="email"
                  className="custom-input"
                  value={formRegister.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-register">
                <h3>Password</h3>
                <input
                  type="password"
                  name="password"
                  className="custom-input"
                  value={formRegister.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-register">
                <h3>Phone</h3>
                <input
                  type="number"
                  name="phone"
                  className="custom-input"
                  value={formRegister.phone}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-register">
                <h3>Address</h3>
                <textarea
                  className="custom-input"
                  rows="8"
                  name="address"
                  value={formRegister.address}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
              <div className="form-register" style={{ marginTop: "50px" }}>
                <button className="button" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
