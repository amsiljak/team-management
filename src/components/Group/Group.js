import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import "./Group.css";

function Group({ group }) {
  return (
    <div className="pb-3 mb-4 col-lg-4 col-md-6 col-sm-12 ">
      <Card className="card">
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
