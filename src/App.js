import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups/Groups";
import GroupCreate from "./pages/GroupCreate";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState([]);

  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  useEffect(() => {
    const route = window.location.pathname;

    if (route === "/login" || route === "/sign-up") {
      return;
    } 

    axios
      .get("http://localhost:3000/users/isLoggedIn", { withCredentials: "true" })
      .then((res) => {
        if (res.data.message === 'User logged in') setLoggedIn(true);
        else setLoggedIn(false);
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
          {/* <Route
            path="/groups"
            render={() =>
              loggedIn ? (
                <Route component={Groups} />
              ) : (<Redirect to={{pathname: '/login'}} />)
            }
          /> */}
          <Route path="/groups" component={Groups} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
