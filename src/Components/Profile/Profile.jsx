import React, { useState, useEffect } from "react";
import "../GroupCard/Card.css";
import profile from "../../Images/profile.png";
import "./Profile.css";
import { API } from "../../Config/api";
import { Link } from "react-router-dom";

const Profile = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const [transactions, setTransaction] = useState([]);
  const fetchTransactionList = async () => {
    const response = await API.get("/journey", config);
    const result = response.data.data;
    setTransaction(result);
  };

  const book = transactions.filter((detail) => {
    console.log(localStorage.id);
    return detail.user.id == localStorage.id;
  });
  useEffect(() => {
    fetchTransactionList();
  });
  return (
    <div className="App-profile">
      <div className="profile">
        <img src={profile} width="100px" alt="avatar" />
        <h4>{localStorage.fullName}</h4>
        <p>{localStorage.email}</p>
      </div>
      <div className="group-book">
        <div className="groups">
          {book.map((booklist) => (
            <div className="group-content" key={booklist.id}>
              <div className="box">
                <img src={booklist.images} alt="Gambar" align="Center" />
              </div>
              <Link
                to={`detail/${booklist.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                key={booklist.id}
              >
                <h4>{booklist.title}</h4>
                <p className="story">{booklist.updatedAt}</p>
                <p className="story">{booklist.story}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
