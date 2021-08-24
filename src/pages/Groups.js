import React, { useEffect, useState } from "react";
import { Button, Label } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import "./Groups.css";
import axios from "axios";
import GroupComponent from "../components/Group";

function Groups() {
  const [groups, setGroups] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/groups/getAllGroups", {
        withCredentials: "true",
      })
      .then((res) => setGroups(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5">Pridružite se svojoj grupi</h2>
      <Label tag="p" size="md" className="text-center mt-1 mb-5">
        Odaberite grupu kojoj pripadate na predmetu OOAD
      </Label>
      <div>
        <div className="py-3 groups row">
          {groups.map((group) => (
            <GroupComponent
              key={group.id}
              group={group}
              userId={location.state.id}
            />
          ))}
        </div>

        <div className="new-group">
          <p className="text-center new-group-text">
            Ne vidite grupu kojoj pripadate?
          </p>
          <div className="text-center">
            <Button
              color="dark"
              size="md"
              className="mb-5 px-5"
              onClick={() =>
                history.push({
                  pathname: "/group-create",
                  state: { id: location.state.id },
                })
              }
            >
              Kreiraj novu grupu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
