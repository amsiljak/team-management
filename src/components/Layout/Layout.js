import React from "react";
import Navbar from "./NavBar";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

function Layout() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default Layout;
