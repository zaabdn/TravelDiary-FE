import React, { useState, useEffect } from "react";
import "../GroupCard/Card.css";
import "./Bookmark.css";
import { Link } from "react-router-dom";
import { API } from "../../Config/api";

const Bookmark = () => {
  const [dataBookmark, setBookmark] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const [databook, setBook] = useState([]);
  const fetchBookmarkList = async () => {
    const response = await API.get("/bookmark", config);
    try {
      const result = response.data.data;
      setBook(result);
    } catch (error) {
      setBook(response.error.message);
    }
  };

  const book = databook.filter((detail) => {
    console.log(localStorage.id);
    return detail.user.id == localStorage.id;
  });

  useEffect(() => {
    fetchBookmarkList();
  }, []);

  console.log(book);

  return (
    <div className="App-bookmark">
      <div className="group-book">
        <div className="groups">
          {book.map((booklist) => (
            <div className="group-content" key={booklist.journey.id}>
              <div className="box">
                <img
                  src={booklist.journey.images}
                  alt="Gambar"
                  align="Center"
                />
              </div>
              <Link
                to={`detail/${booklist.journey.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                key={booklist.journey.id}
              >
                <h4>{booklist.journey.title}</h4>
                <p className="story">{booklist.journey.updatedAt}</p>
                <p className="story">{booklist.journey.story}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
