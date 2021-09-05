import React, { useEffect, useState, useContext } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import GroupCreate from "./pages/GroupCreate";
import MyProfile from "./pages/MyProfile";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  onEnter,
} from "react-router-dom";
import axios from "axios";
import { myContext } from "./Context";

function App() {
  const [loggedIn, setLoggedIn] = useState([]);
  // const [user, setUser] = useState([]);
  const [group, setGroup] = useState([]);

  // const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/users/loggedInUser", {
    //     withCredentials: "true",
    //   })
    //   .then((res) => {
    //     if (res.data.message) setLoggedIn(false);
    //     else {
    //       setLoggedIn(true);
    //       setUser(res.data);
    //       axios
    //         .get("http://localhost:3000/groups/group/" + res.data.groupid, {
    //           withCredentials: "true",
    //         })
    //         .then((response) => {
    //           console.log(response.data);
    //           setGroup(response.data);
    //         })
    //         .catch((err) => {
    //           console.log("response.data");
    //           console.log(err);
    //         });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  function requireAuth(nextState, replace, next) {
    console.log("jafn");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user.name) {
      return false;
      // replace({
      //   pathname: "/login",
      //   state: {nextPathname: nextState.location.pathname}
      // });
    }
    return true;
    // next();
  }

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
            component={TaskCreate}
            onEnter={requireAuth}
          />
          <Route
            path="/task-edit"
            render={() =>
              requireAuth ? (
                <Route component={TaskEdit} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/my-profile"
            render={() =>
              loggedIn ? (
                <Route
                  component={() => (
                    <MyProfile
                      user={JSON.parse(localStorage.getItem("user"))}
                    />
                  )}
                />
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
