import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    //withCredentials za cookie
    axios
      .get("http://localhost:3000/users/user", { withCredentials: "true" })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <div>
    <Label tag="h1" >Grupa {user.groupid} Dashboard</Label>
    </div>
  );
}

export default Dashboard;
