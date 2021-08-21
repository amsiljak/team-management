import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups";
import TaskCreate from "./pages/TaskCreate";
import GroupCreate from "./pages/GroupCreate";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState([]);

  useEffect(() => {
    const route = window.location.pathname;

    if (route === "/login" || route === "/sign-up") {
      return;
    }

    axios
      .get("http://localhost:3000/users/loggedUser", {
        withCredentials: "true",
      })
      .then((res) => {
        if (res.data.message) setLoggedIn(false);
        else {
          setLoggedIn(true);
          if (res.data.groupid) setJoinedGroup(true);
          else setJoinedGroup(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          
          <Route path="/sign-up" component={Signup} />
          <Route
            path="/groups"
            render={() =>
              loggedIn ? (
                <Route component={Groups} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/group-create"
            render={() =>
              loggedIn ? (
                <Route component={GroupCreate} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/task-create"
            render={() =>
              loggedIn ? (
                <Route component={TaskCreate} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/"
            render={() =>
              loggedIn ? (
                <Route component={Layout} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
