import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import history from "./utils/history";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { authenticate } from "./store/auth-slice";
import Notifications from "react-notify-toast";

import "./App.css";

import initFontAwesome from "./utils/initFontAwesome";
import Empty from "./components/Empty";
initFontAwesome();

const App = () => {
  const { isLoading, error, getAccessTokenSilently, isAuthenticated } =
    useAuth0();
  const dispatch = useDispatch();
  dispatch(authenticate(getAccessTokenSilently));

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Notifications />
       {isAuthenticated? <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Container>
      :<Empty/>  
      }
        <Footer />
      </div>
    </Router>
  );
};

export default App;
