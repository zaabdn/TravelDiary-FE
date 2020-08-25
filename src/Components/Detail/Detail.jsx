import React, { useState, useEffect } from "react";
import "./Detail.css";
import { API } from "../../Config/api";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [dataJourney, setData] = useState([]);
  console.log(id);
  const fetchDetailJourney = async () => {
    try {
      const response = await API.get(`/journey/${id}`);
      const result = response.data.data;
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetailJourney();
  });

  return (
    <div className="App-detail">
      {!dataJourney || !dataJourney?.user ? (
        <h1 style={{ marginTop: "150px" }}>Loading..</h1>
      ) : (
        <div className="content-detail" key={dataJourney.id}>
          <br />
          <br />
          <h1>{dataJourney.title}</h1>
          <div style={{ display: "flex" }}>
            <h4 style={{ color: "grey" }}>{dataJourney.updatedAt}</h4>
            <h4 style={{ float: "right" }}> {dataJourney.user.fullName}</h4>
          </div>
          <img src={dataJourney.images} alt="gambar" className="img-title" />
          <div>{dataJourney.story}</div>
        </div>
      )}
    </div>
  );
};

export default Detail;
