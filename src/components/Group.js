import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Group.css";

function Group({ group, userId }) {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };
  const groupSelectedCallback = (e) => {
    const groupId = group.id;

    axios
      .post(
        "http://localhost:3000/users/setGroup",
        { groupId, userId },
        { withCredentials: "true" }
      )
      .then(switchRoute("/login"))
      .catch((e) => console.log(e));
  };

  return (
    <div className="pb-3 mb-4 col-lg-4 col-md-6 col-sm-12 ">
      <a style={{ cursor: "pointer" }} onClick={groupSelectedCallback}>
        <Card className="card">
          <CardBody className="text-center">
            <CardTitle tag="h5">Grupa {group.no}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Tema: {group.theme}
            </CardSubtitle>
          </CardBody>
        </Card>
      </a>
    </div>
  );
}
export default Group;
