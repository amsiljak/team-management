import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import axios from "axios";
import "./Group.css";

function Group({ group }) {
  const groupSelectedCallback = (e) => {
    
    const groupId = group.id;

    axios
      .post("http://localhost:3000/users/setGroup", {groupId}, { withCredentials: "true" })
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <div className="pb-3 mb-4 col-lg-4 col-md-6 col-sm-12 ">
      <Card className="card"  onClick={groupSelectedCallback}>
        <CardBody className="text-center">
          <CardTitle tag="h5">Grupa {group.number}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Tema: {group.theme}
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
}
export default Group;
