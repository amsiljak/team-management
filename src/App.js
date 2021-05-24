import React from "react";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups/Groups";
import GroupCreate from "./pages/GroupCreate";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/groups" component={Groups} />
          <Route path="/group-create" component={GroupCreate} />
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
