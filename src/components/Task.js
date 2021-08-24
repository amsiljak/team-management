import React, { useState } from "react";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  FormFeedback,
  Label,
  Form,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Task({ task }) {
  const history = useHistory();

  const [modal, setModal] = useState(false);

  const initialFormData = {
    title: task.title,
    description: task.description,
    category: task.category,
  };

  const taskSelectedCallback = (e) => {};

  const toggle = () => setModal(!modal);


  const handleClick = (e) => {
    toggle();

    history.push({
      pathname: "/task-edit",
      state: { task },
    });
  };

  const handleDelete = (e) => {
    toggle();
    axios
      .delete(
        "http://localhost:3000/tasks/",
        {
          id: task.id,
        },
        { withCredentials: "true" }
      )
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <div className="my-1">
      <a style={{ cursor: "pointer" }} onClick={handleClick}>
        <ListGroupItem key={task.id} onClick={taskSelectedCallback}>
          <ListGroupItemHeading tag="h6">{task.title}</ListGroupItemHeading>
          <ListGroupItemText tag="p">{task.description}</ListGroupItemText>
        </ListGroupItem>
      </a>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <Form className="mx-3 my-3">
          <FormGroup className="pt-2">
            <Label tag="h6" for="title">
              Naziv
            </Label>
            <ModalBody>{task.title}</ModalBody>
            <FormFeedback invalid>Naziv ne smije biti prazan!</FormFeedback>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="category" className="mb-1 mt-1">
              Kategorija
            </Label>
            <ModalBody>{task.category}</ModalBody>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="title">Opis</Label>
            <ModalBody>{task.description}</ModalBody>
            <FormFeedback invalid>
              Opis ne smije duži od 200 karaktera!
            </FormFeedback>
          </FormGroup>
        </Form>
        <ModalFooter>
          {/* <Button color="primary" onClick={handleEdit}> */}
            {/* Uredi
          </Button>{" "} */}
          <Button color="danger" onClick={handleDelete}>
            Obriši
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Task;
