import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const myContext = createContext({});
function Context(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/loggedInUser", {
        withCredentials: "true",
      })
      .then((res) => {
        if (!res.data.message) {
          setUser(res.data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <myContext.Provider value={user}>{props.children}</myContext.Provider>;
}

export default Context;
