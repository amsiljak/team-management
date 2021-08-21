import React from "react";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

function Task({ task }) {
  return (
    <div>
      <ListGroupItem key={task.id}>
        <ListGroupItemHeading tag="h6">{task.title}</ListGroupItemHeading>
        <ListGroupItemText tag="p">{task.description}</ListGroupItemText>
      </ListGroupItem>
    </div>
  );
}

export default Task;
