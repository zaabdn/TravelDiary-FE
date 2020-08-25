import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Profile from "./Pages/Profile";
import Bookmarks from "./Pages/Bookmarks";
import AddJourney from "./Pages/AddJourney";
import ModalLogin from "./Components/Login/Login";
import ModalRegister from "./Components/Register/Register";
import Header from "./Components/Header/Header";
import "./App.css";
import ScrollToTop from "./Components/utils/ScrollToTop";
import { setAuthToken } from "./Config/api";
import PrivateRouteAdmin from "./Components/PrivateRoute/PrivateRouteAdmin";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const showModalLogin = () => {
    setModalLogin(!modalLogin);
    setModalRegister(false);
  };

  const showModalRegister = () => {
    setModalRegister(!modalRegister);
    setModalLogin(false);
  };

  return (
    <div className="App">
      <Router>
        <Header
          showModalLogin={showModalLogin}
          showModalRegister={showModalRegister}
        />{" "}
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />{" "}
            <Route exact path="/detail/:id" component={Detail} />{" "}
            <PrivateRouteAdmin exact path="/profile" component={Profile} />{" "}
            <PrivateRouteAdmin
              exact
              path="/add-journey"
              component={AddJourney}
            />{" "}
            <PrivateRouteAdmin exact path="/bookmark" component={Bookmarks} />{" "}
          </Switch>{" "}
        </ScrollToTop>{" "}
        {modalLogin && (
          <ModalLogin
            showModalLogin={showModalLogin}
            showModalRegister={showModalRegister}
            modalLogin={modalLogin}
          />
        )}{" "}
        {modalRegister && (
          <ModalRegister
            showModalLogin={showModalLogin}
            showModalRegister={showModalRegister}
            modalRegister={modalRegister}
          />
        )}{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
