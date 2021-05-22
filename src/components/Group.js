import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import "./Groups/Groups.css"

function Group ({group}) {
    return (
        <div className="pb-3 mb-4 col-lg-3 col-md-4 col-sm-4 ">
            <Card className="card">
                <CardBody className="text-center">
                    <CardTitle tag="h5">Grupa {group.number}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Tema: {group.theme}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
};
export default Group;