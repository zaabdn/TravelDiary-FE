import React, { useState, useEffect } from "react";
import "./Card.css";
import palm from "../../Images/palm.png";
import { Link } from "react-router-dom";
import { API } from "../../Config/api";
import bookmark from "../../Images/bookmark.png";
import { useHistory } from "react-router-dom";

function Card() {
  const [datajourney, setJourney] = useState([]);

  const fetchJourneyList = async () => {
    const response = await API.get("/journey");
    try {
      const result = response.data.data;
      setJourney(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJourneyList();
  }, []);

  let history = useHistory();
  const [bookmarks, setBookmark] = useState({
    journeyId: datajourney.id,
    userId: localStorage.id,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const submitBookmark = (e) => {
    const dataBookmark = {
      journeyId: datajourney[0].id,
      userId: bookmarks.userId,
    };
    console.log(dataBookmark);
    e.preventDefault();
    API.post("http://localhost:5001/api/v1/bookmark", dataBookmark, config)
      .then((result) => {
        history.push("/bookmark");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [databook, setBook] = useState([]);
  const fetchBookmarkList = async () => {
    const response = await API.get("/bookmark", config);
    try {
      const result = response.data.data;
      setBook(result);
    } catch (error) {
      console.log(error);
    }
  };

  const book = databook.filter((detail) => {
    console.log(localStorage.id);
    return detail.user.id == localStorage.id;
  });

  useEffect(() => {
    fetchBookmarkList();
  });

  console.log(book);

  return (
    <div className="group">
      <img
        src={palm}
        alt="Gambar"
        align="left"
        style={{ position: "absolute", left: "0" }}
      />
      <div className="groups">
        {datajourney.map((journey) => (
          <div className="group-content" key={journey.id}>
            <div className="box">
              <img src={journey.images} alt="Gambar" align="Center" />
            </div>
            {book.journeyId == journey.id && <div></div>}
            {!(book.journeyId == journey.id) && (
              <form onSubmit={submitBookmark}>
                <button type="submit" className="bookmark">
                  <img src={bookmark} alt="" />
                </button>
              </form>
            )}

            <Link
              to={`detail/${journey.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
              key={journey.id}
            >
              <h4>{journey.title}</h4>
              <p className="story">{journey.updatedAt}</p>
              <p className="story">{journey.story}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
