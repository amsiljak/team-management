import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

function Group ({group}) {
    return (
        <Card className="card mb-4">
            <CardBody className="text-center">
                <CardTitle tag="h5">Grupa {group.number}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Tema: {group.theme}</CardSubtitle>
            </CardBody>
        </Card>
    );
};
export default Group;