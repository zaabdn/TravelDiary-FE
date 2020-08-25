import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5001/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    axios.create("http://localhost:5001/api/v1").defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete axios.create("http://localhost:5001/api/v1").defaults.headers.common[
      "Authorization"
    ];
  }
};
