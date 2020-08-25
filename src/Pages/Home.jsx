import React from "react";
import Jumbotron from "../Components/Jumbotron/Jumbotron";
import Card from "../Components/GroupCard/Card";

function Home() {
  return (
    <div>
      {!localStorage.token && (
        <div>
          <Jumbotron />
          <div
            style={{
              paddingTop: "400px",
              position: "relative",
              width: "88%",
              height: "83px",
              marginLeft: "90px",
            }}
          >
            <h1>Journey</h1>
            <input type="text" className="input-search" />
            <button className="btn-search">Search</button>
          </div>
        </div>
      )}
      {localStorage.token && (
        <div>
          <div
            style={{
              paddingTop: "150px",
              position: "relative",
              width: "88%",
              height: "83px",
              marginLeft: "90px",
            }}
          >
            <h1>Journey</h1>
            <input type="text" className="input-search" />
            <button className="btn-search">Search</button>
          </div>
        </div>
      )}

      <Card />
    </div>
  );
}

export default Home;
