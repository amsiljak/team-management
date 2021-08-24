import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import GroupCreate from "./pages/GroupCreate";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/loggedUser", {
        withCredentials: "true",
      })
      .then((res) => {
        if (res.data.message) setLoggedIn(false);
        else {
          setLoggedIn(true);
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
          <Route path="/groups" component={Groups} />
          <Route path="/group-create" component={GroupCreate} />
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
            path="/task-edit"
            render={() =>
              loggedIn ? (
                <Route component={TaskEdit} />
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
