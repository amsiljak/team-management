import React from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import GroupCreate from "./pages/GroupCreate";
import MyProfile from "./pages/MyProfile";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

function App() {
  function isLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return false;
    return true;
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
            render={() =>
              isLoggedIn() ? (
                <Route component={TaskCreate} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/task-edit"
            render={() =>
              isLoggedIn() ? (
                <Route component={TaskEdit} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            path="/my-profile"
            render={() =>
              isLoggedIn() ? (
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
            component={Layout}
            // render={() =>
            //   isLoggedIn() ? (
            //     <Route component={Layout} />
            //   ) : (
            //     <Redirect to={{ pathname: "/login" }} />
            //   )
            // }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
